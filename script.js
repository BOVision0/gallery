function downloadPDF() {
  const link = document.createElement("a");
  link.href = "Health.pdf";
  link.download = "Health.pdf";
  link.click();
}
