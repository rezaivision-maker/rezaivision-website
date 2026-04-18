const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : 
      callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!filePath.match(/\.(tsx|ts|html|xml|json)$/)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace variants
  // We want to replace RezaEmotion, RezaiEmotion, rezaemotion, rezaiemotion
  // keeping the casing for the replacement as reza-e-motion, except maybe if it's in a path, 
  // wait, the user said "mache aus allem auf der website das rezaiemotion und rezaemotion zeigt reza-e-motion"
  
  content = content.replace(/RezaiEmotion/g, 'reza-e-motion');
  content = content.replace(/RezaEmotion/g, 'reza-e-motion');
  content = content.replace(/rezaiemotion/g, 'reza-e-motion');
  content = content.replace(/rezaemotion/g, 'reza-e-motion');
  content = content.replace(/REZAEMOTION/g, 'REZA-E-MOTION'); // preserving all caps if used
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

walkDir(path.join(__dirname, 'src'), processFile);
walkDir(path.join(__dirname, 'public'), processFile);
