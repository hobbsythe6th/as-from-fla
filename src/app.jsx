import { useState } from 'preact/hooks';
import extractAS from './extractAS';
import extractLib from './extractLib';
import saveFla from './saveFla';
import FileUpload from './components/FileUpload';
import ScriptList from './components/ScriptList';
import ScriptViewer from './components/ScriptViewer';

export default function App() {
  const [flaFile, setFlaFile] = useState(null);
  const [flaScripts, setFlaScripts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [flaLoaded, setFlaLoaded] = useState(false);

  async function handleFile(file) {
    const lib = await extractLib(file);
    const results = await Promise.all(lib.map(entry => extractAS(entry, entry.filename)));
    const flattened = results
      .filter(result => result !== null)
      .map(result => ({ id: `fla-${result.filename}`, ...result }));
    setFlaFile(file);
    setFlaScripts(flattened);
    setFlaLoaded(true);
    setSelected(flattened[0]?.id ?? null);
  }

  async function handleSave() {
    const editedDocs = new Map(flaScripts.map(entry => [entry.filename, entry.doc]));
    const blob = await saveFla(flaFile, editedDocs);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = flaFile.name;
    a.click();
    URL.revokeObjectURL(url);
  }

  const activeEntry = flaScripts.find(s => s.id === selected);

  return (
    <div class="app">
      <FileUpload onFile={handleFile} />
      {flaFile && <button class="save-btn" onClick={handleSave}>Save .fla</button>}
      <div class="layout">
        <ScriptList scripts={flaScripts} selected={selected} onSelect={setSelected} loaded={flaLoaded} />
        <ScriptViewer entry={activeEntry} />
      </div>
    </div>
  )
}