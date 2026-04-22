import { globSync } from 'glob';
import fs from 'fs';
import path from 'path';

const BASE = 'vanilla-cards/mark';
const VIOLATIONS = [];

function findViolations() {
  const phpFiles = globSync(`${BASE}/**/*.php`);
  
  for (const file of phpFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      
      if (line.includes('style="') || line.includes("style='")) {
        const match = line.match(/style=["'][^"']*["']/);
        VIOLATIONS.push({
          file: path.relative(BASE, file),
          line: lineNum,
          type: 'inline-style',
          snippet: line.trim().substring(0, 100)
        });
      }
      
      if (line.includes('<style')) {
        VIOLATIONS.push({
          file: path.relative(BASE, file),
          line: lineNum,
          type: 'style-tag',
          snippet: line.trim().substring(0, 100)
        });
      }
    });
  }
}

function report() {
  console.log('\nAudit: Inline CSS in PHP');
  console.log(`Found ${VIOLATIONS.length} violations\n`);

  if (VIOLATIONS.length > 0) {
    console.table(VIOLATIONS.map(v => ({
      file: v.file,
      line: v.line,
      type: v.type,
      snippet: v.snippet
    })));

    const outputDir = `${BASE}/violations`;
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(
      `${outputDir}/inline-css.json`,
      JSON.stringify(VIOLATIONS, null, 2)
    );
    console.log(`\nReport saved to ${outputDir}/inline-css.json`);
    process.exit(1);
  } else {
    console.log('No violations found');
  }
}

findViolations();
report();