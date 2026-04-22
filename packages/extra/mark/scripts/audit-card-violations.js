import { globSync } from 'glob';
import fs from 'fs';
import path from 'path';

const BASE = 'vanilla-cards/mark';
const ALLOWED_CARDS = ['stats-card', 'list-card', 'table-card', 'chart-card', 'form-card', 'actions-card'];
const VIOLATIONS = [];

function findViolations() {
  const phpFiles = globSync(`${BASE}/**/*.php`);
  const cssFiles = globSync(`${BASE}/**/*.css`);
  
  const allFiles = [...phpFiles, ...cssFiles];
  
  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      
      const cardMatches = line.match(/\.([a-z]+-card[a-z0-9-]*)/g);
      if (cardMatches) {
        cardMatches.forEach(match => {
          const cardName = match.substring(1);
          if (!ALLOWED_CARDS.includes(cardName) && !cardName.endsWith('-card')) {
            VIOLATIONS.push({
              file: path.relative(BASE, file),
              line: lineNum,
              type: 'custom-card-variant',
              card: cardName,
              snippet: line.trim().substring(0, 100)
            });
          }
        });
      }
      
      if (line.includes('card-grid-')) {
        const match = line.match(/card-grid-[a-z]+/);
        if (match) {
          VIOLATIONS.push({
            file: path.relative(BASE, file),
            line: lineNum,
            type: 'custom-card-grid',
            card: match[0],
            snippet: line.trim().substring(0, 100)
          });
        }
      }
    });
  }
}

function report() {
  console.log('\nAudit: Card Variant Violations');
  console.log(`Allowed cards: ${ALLOWED_CARDS.join(', ')}`);
  console.log(`Found ${VIOLATIONS.length} violations\n`);

  if (VIOLATIONS.length > 0) {
    console.table(VIOLATIONS.map(v => ({
      file: v.file,
      line: v.line,
      type: v.type,
      card: v.card,
      snippet: v.snippet
    })));

    const outputDir = `${BASE}/violations`;
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(
      `${outputDir}/card-violations.json`,
      JSON.stringify(VIOLATIONS, null, 2)
    );
    console.log(`\nReport saved to ${outputDir}/card-violations.json`);
    process.exit(1);
  } else {
    console.log('No violations found');
  }
}

findViolations();
report();