import extractAS from './extractAS';
import extractLib from './extractLib';

export default function App() {
  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const lib = await extractLib(file);
    const scripts = lib.forEach(xml => extractAS(xml))
    console.log(lib, scripts);
  }

  return (
    <div id="app">
      <input type='file' accept='.fla' id="fileIn" onChange={handleFile} />
    </div>
  )
}
