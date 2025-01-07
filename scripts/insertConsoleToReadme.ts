import { join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

async function copy() {
  const readmePath = join(__dirname, '../README.md');

  const srcPath = join(
    __dirname,
    '../packages/scu-pecourse-utils-console/index.js'
  );
  const srcContent = await readFile(srcPath, 'utf-8');
  const wrapperContent = '<!-- PLACEHOLDER-S -->\n```javascript\n' + srcContent + '```\n<!-- PLACEHOLDER-E -->';

  const mdContent = await readFile(readmePath, 'utf-8');
  const replacedContent = mdContent.replace(
    /<!-- PLACEHOLDER-S -->[\s\S]*?<!-- PLACEHOLDER-E -->/,
    wrapperContent
  );

  await writeFile(readmePath, replacedContent, 'utf-8');
  console.log('写入reademe成功');
}

copy();
