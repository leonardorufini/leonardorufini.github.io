// Download CV function
function downloadCV() {
  const link = document.createElement('a');
  link.href = "file/CV.pdf";
  link.download = "Leonardo_Rufini_CV.pdf";
  link.click();
}

// Download generic file function
function downloadFile(filepath, filename) {
  const link = document.createElement('a');
  link.href = filepath;
  link.download = filename;
  link.click();
}
