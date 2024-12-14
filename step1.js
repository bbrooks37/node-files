const fs = require('fs');
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

// Get the path from command-line arguments
const [,, path] = process.argv;

cat(path);
