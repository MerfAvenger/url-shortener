export function copyUrl(url: string) {
  navigator.clipboard.writeText(url).then(
    () => {
      console.log(`URL ${url} copied to clipboard.`);
      alert(`URL ${url} copied to clipboard.`);
    },
    (err) => {
      console.error("Could not copy URL: ", err);
      alert(`Failed to copy URL.`);
    },
  );
}
