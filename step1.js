const fs = require('fs');

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

// Capture the command-line argument for file path
const path = process.argv[2];
if (!path) {
    console.error("Usage: node step1.js <file-path>");
    process.exit(1);
}

// Call the cat function with the specified path
cat(path);
