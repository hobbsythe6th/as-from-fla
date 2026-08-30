import { useState } from 'preact/hooks';
import extractAS from './extractAS';
import extractLib from './extractLib';
import FileUpload from './components/FileUpload';
import ScriptList from './components/ScriptList';
import ScriptViewer from './components/ScriptViewer';

export default function App() {
  const [scripts, setScripts] = useState([]);
  const [selected, setSelected] = useState(null);

  async function handleFile(file) {
    const lib = await extractLib(file);
    const results = await Promise.all(lib.map(entry => extractAS(entry, entry.filename)));
    const flattened = results
      .filter(result => Object.keys(result).length)
      .map(result => {
        const name = Object.keys(result)[0];
        return { name, code: result[name] };
      });
    setScripts(flattened);
    setSelected(flattened[0]?.name ?? null);
  }

  const activeEntry = scripts.find(s => s.name === selected);

  return (
    <div class="app">
      <FileUpload onFile={handleFile} />
      <div class="layout">
        <ScriptList scripts={scripts} selected={selected} onSelect={setSelected} />
        <ScriptViewer entry={activeEntry} />
      </div>
    </div>
  )
}