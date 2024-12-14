const fs = require('fs');
const process = require('process');
const axios = require('axios');

function output(content, out) {
  if (out) {
    fs.appendFile(out, content, 'utf8', err => {
      if (err) {
        console.error(`Couldn't write ${out}:\n  ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(content);
  }
}

function cat(path, out) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
    } else {
      output(data, out);
    }
  });
}

async function webCat(url, out) {
  try {
    const response = await axios.get(url);
    output(response.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
  }
}

// Get the arguments from command-line
let pathsOrUrls;
let out;
if (process.argv[2] === '--out') {
  out = process.argv[3];
  pathsOrUrls = process.argv.slice(4);
} else {
  pathsOrUrls = process.argv.slice(2);
}

// Iterate through each path or URL and process it
pathsOrUrls.forEach(pathOrUrl => {
  if (pathOrUrl.startsWith('http')) {
    webCat(pathOrUrl, out);
  } else {
    cat(pathOrUrl, out);
  }
});
