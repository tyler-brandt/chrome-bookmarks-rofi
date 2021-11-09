#!/usr/bin/env node
const { readFileSync } = require('fs');
const childprocess = require('child_process');

if (process.argv.length < 3) {
  console.log('At least one argument is required');
  process.exit(1);
}

const filepath = process.argv[2];

(async () => {
  const file = JSON.parse(await readFileSync(filepath, 'utf-8').toString());

  const roots = ['bookmark_bar', 'other'];

  const bookmarks = [];
  const findBookmarks = node => {
    if (node.type === 'folder') {
      node.children.forEach(c => findBookmarks(c));
    } else {
      bookmarks.push({
        name: node.name,
        url: node.url,
      });
    }
  }

  roots.forEach(root => {
    const marks = file.roots[root];
    marks.children.forEach(c => findBookmarks(c));
  });

  // console.log(JSON.stringify(bookmarks, null, 2))
  const output = bookmarks.map(b => `"${b.name}" "${b.url}"`).join('\n')
  console.log(output);
})();



