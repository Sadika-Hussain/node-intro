const fs = require('fs');
const axios = require('axios');

// Function to read a file and optionally write to an output file
function cat(path, outputFile = null) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1);
        } else if (outputFile) {
            writeFile(outputFile, data);
        } else {
            console.log(data);
        }
    });
}

// Function to fetch content from a URL and optionally write to an output file
async function webCat(url, outputFile = null) {
    try {
        const res = await axios.get(url);
        if (outputFile) {
            writeFile(outputFile, res.data);
        } else {
            console.log(res.data);
        }
    } catch (err) {
        console.error(`Error fetching ${url}:\n  ${err}`);
        process.exit(1);
    }
}

// Helper function to write data to a file
function writeFile(outputFile, data) {
    fs.writeFile(outputFile, data, function (err) {
        if (err) {
            console.error(`Couldn't write ${outputFile}:\n  ${err}`);
            process.exit(1);
        }
    });
}

// Capture command-line arguments
const args = process.argv.slice(2); // Exclude "node" and script name, to get only user-provided arguments
let outputFile = null;
let pathOrUrl = null;

// Parse arguments for --out flag
if (args[0] === '--out') {
    outputFile = args[1];
    pathOrUrl = args[2];
} else {
    pathOrUrl = args[0];
}

// Verify that path or URL is provided
if (!pathOrUrl) {
    console.error("Usage: node step3.js [--out <output-filename>] <file-path or URL>");
    process.exit(1);
}

// Determine if the argument is a file path or a URL
if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    webCat(pathOrUrl, outputFile);
} else {
    cat(pathOrUrl, outputFile);
}
