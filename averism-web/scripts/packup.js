const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const ignore = require('ignore');

// Function to read and parse .gitignore files
function parseGitIgnore(filePath) {
  const gitIgnore = ignore();
  const contents = fs.readFileSync(filePath, 'utf8');
  gitIgnore.add(contents);
  return gitIgnore;
}

// Function to recursively zip folders while respecting .gitignore
function zipFolder(srcFolder, zipFileName, gitIgnore) {
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Compression level (optional)
  });

  const output = fs.createWriteStream(zipFileName);

  archive.pipe(output);

  archive.on('error', (err) => {
    throw err;
  });

  const addDirectory = (dirPath, baseDir) => {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const relativePath = path.relative(baseDir, filePath);
      if (!gitIgnore.ignores(relativePath)) {
        if (fs.lstatSync(filePath).isDirectory()) {
          addDirectory(filePath, baseDir);
        } else {
          archive.file(filePath, { name: relativePath });
        }
      }
    }
  };

  addDirectory(srcFolder, srcFolder);

  archive.finalize();

  output.on('close', () => {
    console.log(`Zipped '${srcFolder}' to '${zipFileName}'`);
  });
}

// Example usage:
const sourceFolder = '..';
const zipFileName = 'sourceCodeRepository.zip';
const gitIgnoreFilePath = path.join(sourceFolder, '.gitignore');

try {
  fs.unlinkSync(zipFileName);
  const gitIgnore = parseGitIgnore(gitIgnoreFilePath);
  zipFolder(sourceFolder, zipFileName, gitIgnore);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
