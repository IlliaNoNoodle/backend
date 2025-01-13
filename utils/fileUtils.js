const fileType = require('file-type');

const validateFileType = (fileBuffer) => {
  const type = fileType(fileBuffer);
  if (!type || type.mime !== 'audio/wav') {
    throw new Error('Invalid file type');
  }
};

module.exports = { validateFileType };
