#!/usr/bin/env node
const { readFileSync } = require('fs');

if (process.argv.length < 3) {
  console.log('At least one argument is required');
  process.exit(1);
}

const [, , bookmarkFilepath] = process.argv;

(async () => {
  const file = JSON.parse(await readFileSync(bookmarkFilepath, 'utf-8').toString());

  // chrome has two root properties containing bookmarks - others could potentially be added
  const roots = ['bookmark_bar', 'other'];

  const findBookmarks = (node) => {
    if (node.type === "folder") return node.children.flatMap(findBookmarks);
    return [
      {
        name: node.name,
        url: node.url,
      },
    ];
  };
  const bookmarks = roots.flatMap(root => file.roots[root].children.flatMap(findBookmarks));

  const output = bookmarks.map(b => `${b.name};${b.url}`).join('\n')
  console.log(output);
})();



