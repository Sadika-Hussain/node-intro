const fs = require('fs');
const axios = require('axios')

// Function to read a file
function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1); // Stop execution on error
        } else {
            console.log(data);
        }
    });
}

// Function to fetch content from a URL
async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.error(`Error fetching ${url}:\n  ${err}`);
        process.exit(1); // Stop execution on error
    }
}

// Capture the command-line argument for file path or URL
const pathOrUrl = process.argv[2];
if (!pathOrUrl) {
    console.error("Usage: node step2.js <file-path or URL>");
    process.exit(1);
}

// Decide if the argument is a file path or a URL
if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    webCat(pathOrUrl); // It's a URL, so use webCat
} else {
    cat(pathOrUrl); // It's a file path, so use cat
}

