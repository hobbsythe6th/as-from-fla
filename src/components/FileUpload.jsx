export default function FileUpload({ onFile, onASFiles }) {
  function handleChange(e) {
    const file = e.target.files[0];
    if (file) onFile(file);
  }

  function handleASChange(e) {
    const files = [...e.target.files];
    if (files.length) onASFiles(files);
  }

  return (
    <div class="toolbar">
      <input type="file" accept=".fla" onChange={handleChange} />
      <input type="file" accept=".as" multiple onChange={handleASChange} />
    </div>
  );
}