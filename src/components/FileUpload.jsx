export default function FileUpload({ onFile }) {
  function handleChange(e) {
    const file = e.target.files[0];
    if (file) onFile(file);
  }

  return (
    <div class="toolbar">
      <input type="file" accept=".fla" onChange={handleChange} />
    </div>
  );
}