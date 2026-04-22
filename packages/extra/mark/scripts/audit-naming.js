import { globSync } from 'glob';
import fs from 'fs';
import path from 'path';

const BASE = 'vanilla-cards/mark';
const AUTH_ENTRY_POINTS = ['mark-login', 'mark-register', 'mark-forgot-password', 'mark-reset-password'];
const AUTH_ENTRY_POINT_RE = new RegExp(`^(${AUTH_ENTRY_POINTS.join('|')})$`);
const HAS_STATE_RE = /new\s+State\s*\(/;
const HAS_INNERHTML_RE = /\.innerHTML\s*=/;
const HAS_FETCH_RE = /\bfetch\s*\(/;
const VIOLATIONS = [];

function findViolations() {
  const tsFiles = globSync(`${BASE}/**/*.ts`);
  const cssFiles = globSync(`${BASE}/**/*.css`);
  const phpFiles = globSync(`${BASE}/**/*.php`);
  const allFiles = [...tsFiles, ...cssFiles, ...phpFiles];

  const entryPointFiles = globSync(`${BASE}/entry-points/*.ts`);
  const entryPointNames = new Set(entryPointFiles.map(f => path.basename(f, '.ts')));

  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    const relativePath = path.relative(BASE, file);
    const ext = path.extname(file);

    // File-level checks (constant per file, computed once)
    const isBaseFormHandler = ext === '.ts' && /class\s+\w+\s+extends\s+BaseFormHandler/.test(content);
    const baseName = ext === '.ts' ? path.basename(file, '.ts') : '';
    const isAuthForm = ext === '.ts' && entryPointNames.has(baseName) && AUTH_ENTRY_POINT_RE.test(baseName);

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      if (ext === '.ts' && entryPointNames.has(baseName)) {
        const hasBusinessLogic = HAS_STATE_RE.test(line);
        const hasInnerHTML = HAS_INNERHTML_RE.test(line);
        const hasFetch = HAS_FETCH_RE.test(line);

        if (!isBaseFormHandler && (hasBusinessLogic || hasInnerHTML || (hasFetch && !isAuthForm))) {
          VIOLATIONS.push({
            file: relativePath,
            line: lineNum,
            type: 'entry-point-thick',
            issue: 'business logic in entry point'
          });
        }
        if (/\$data\s*\[|data->|\$_GET|\$_POST|\$_REQUEST/.test(line)) {
          VIOLATIONS.push({
            file: relativePath,
            line: lineNum,
            type: 'entry-point-raw-payload',
            issue: 'raw PHP payload without normalization'
          });
        }
      }

      const deepDescendant = /\.[a-z][a-z0-9-]*\s+\.[a-z][a-z0-9-]*\s+\.[a-z][a-z0-9-]*\s+\.[a-z][a-z0-9-]*/i;
      if (deepDescendant.test(line)) {
        const match = line.match(/\.([a-z][a-z0-9-]*)\s+\.([a-z][a-z0-9-]*)\s+\.([a-z][a-z0-9-]*)\s+\.([a-z][a-z0-9-]*)/i);
        if (match) {
          VIOLATIONS.push({
            file: relativePath,
            line: lineNum,
            type: 'bem-deep-descendant',
            issue: `.${match[1]} .${match[2]} .${match[3]} .${match[4]}`
          });
        }
      }

      const genericClasses = /\.(item|title|box|content|text|row|col|header|footer|container|wrapper)\b/i;
      if (genericClasses.test(line) && !line.includes('//') && !line.includes('/*')) {
        const match = line.match(/\.(item|title|box|content|text|row|col|header|footer|container|wrapper)\b/i);
        // Skip HTML attribute class=, React className=, template literals (innerHTML), and test files
        const isHtmlAttr = line.includes('class="');
        const isReact = line.includes('className=');
        const isTemplateLiteral = line.includes('`');
        const isTestFile = file.includes('.test.');
        // Skip JavaScript property access like .container in this.container or element.container
        const isJSProperty = /[a-z]\.[a-z]+\s*[=;]/.test(line) || /\w+\.[a-z]+\(/.test(line);
        const isJSAssignment = /\.container\s*=/.test(line) || /\.title\s*=/.test(line);
        // Skip inline CSS style definitions and .container.style patterns or in conditions
        const isInlineStyle = line.includes('cssText') || line.includes('.container.style') || line.includes('!this.container');
        // Skip JS property chains like this.title.textContent, item.name, etc.
        const isJSPropertyChain = /[a-z]\.[a-z]+\.[a-z]+/.test(line);
        // Skip this.property access like this.container, this.title
        const isThisProperty = /this\.(container|title|content|text|item)\b/.test(line);
        
        if (match && !isHtmlAttr && !isReact && !isTemplateLiteral && !isTestFile && !isJSProperty && !isJSAssignment && !isInlineStyle && !isJSPropertyChain && !isThisProperty) {
          VIOLATIONS.push({
            file: relativePath,
            line: lineNum,
            type: 'generic-class-names',
            issue: `.${match[1]} is generic class name`
          });
        }
      }

      const unclearModifiers = /--(special|alt|other|custom|extra|misc)/;
      if (unclearModifiers.test(line)) {
        const match = line.match(/--([a-z]+)/);
        if (match) {
          VIOLATIONS.push({
            file: relativePath,
            line: lineNum,
            type: 'unclear-modifiers',
            issue: `--${match[1]} is unclear modifier`
          });
        }
      }
    });

    if (ext === '.ts') {
      // Skip test files
      if (file.includes('.test.')) return;

      const hasCamelCase = /[a-z][A-Z]/.test(content);
      const hasSnakeCase = /[a-z]_[a-z]/.test(content);

      // Skip if only snake_case is in CSS/BEM class names (intentional)
      const hasBEM = /_[a-z]+\s*\{/.test(content) || /__[a-z]+/.test(content);

      if (hasCamelCase && hasSnakeCase && !hasBEM) {
        VIOLATIONS.push({
          file: relativePath,
          line: '-',
          type: 'mixed-naming',
          issue: 'mix of camelCase and snake_case'
        });
      }
    }
  }

  // ── File name and directory checks ──────────────────────

  const entryPointsDir = path.join(BASE, 'entry-points');
  const componentsDir = path.join(BASE, 'components');

  if (fs.existsSync(entryPointsDir)) {
    const entryFiles = fs.readdirSync(entryPointsDir).filter(f => f.endsWith('.ts'));
    for (const file of entryFiles) {
      if (file !== 'index.ts' && !/^mark-[a-z0-9-]+\.ts$/.test(file)) {
        VIOLATIONS.push({
          file: `entry-points/${file}`,
          line: '-',
          type: 'entry-point-naming',
          issue: 'should be mark-{feature}.ts'
        });
      }

      if (/[A-Z]/.test(file)) {
        VIOLATIONS.push({
          file: `entry-points/${file}`,
          line: '-',
          type: 'file-kebab-case',
          issue: `${file} should be kebab-case`
        });
      }
    }
  }

  const checkDir = (dir, type) => {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const indexFile = path.join(dir, entry.name, 'index.ts');
        if (!fs.existsSync(indexFile)) {
          VIOLATIONS.push({
            file: `${type}/${entry.name}/`,
            line: '-',
            type: 'feature-dir-index',
            issue: 'missing index.ts'
          });
        }

        const dirPath = path.join(dir, entry.name);
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
          if (/[A-Z]/.test(file) && (file.endsWith('.ts') || file.endsWith('.js'))) {
            if (!file.includes('index.ts') && !file.includes('.test.') && !file.includes('.spec.')) {
              VIOLATIONS.push({
                file: `${type}/${entry.name}/${file}`,
                line: '-',
                type: 'file-kebab-case',
                issue: `${file} should be kebab-case`
              });
            }
          }

          if (/TypeDefinition/i.test(file) || /DataType/i.test(file) || /Model\.ts$/.test(file)) {
            VIOLATIONS.push({
              file: `${type}/${entry.name}/${file}`,
              line: '-',
              type: 'types-naming',
              issue: 'should be types.ts'
            });
          }
        }
      }
    }
  };

  checkDir(componentsDir, 'components');
  checkDir(entryPointsDir, 'entry-points');

  const baseFiles = globSync(`${BASE}/*.ts`);
  for (const file of baseFiles) {
    const basename = path.basename(file);
    if (/[A-Z]/.test(basename) && !basename.includes('.test.') && !basename.includes('.spec.')) {
      VIOLATIONS.push({
        file: basename,
        line: '-',
        type: 'file-kebab-case',
        issue: `${basename} should be kebab-case`
      });
    }
  }
}

function report() {
  console.log('\nAudit: Naming and Path Conventions');
  console.log(`Found ${VIOLATIONS.length} violations\n`);

  if (VIOLATIONS.length > 0) {
    console.table(VIOLATIONS.map(v => ({
      file: v.file,
      line: v.line,
      type: v.type,
      issue: v.issue
    })));

    const outputDir = `${BASE}/violations`;
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(
      `${outputDir}/naming-violations.json`,
      JSON.stringify(VIOLATIONS, null, 2)
    );
    console.log(`\nReport saved to ${outputDir}/naming-violations.json`);
    process.exit(1);
  } else {
    console.log('No violations found');
  }
}

findViolations();
report();