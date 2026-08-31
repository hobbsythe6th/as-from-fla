import { useState } from 'preact/hooks';
import extractAS from './extractAS';
import extractLib from './extractLib';
import FileUpload from './components/FileUpload';
import ScriptList from './components/ScriptList';
import ScriptViewer from './components/ScriptViewer';

export default function App() {
  const [flaScripts, setFlaScripts] = useState([]);
  const [ASScripts, setASScripts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [flaLoaded, setFlaLoaded] = useState(false);

  async function handleFile(file) {
    const lib = await extractLib(file);
    const results = await Promise.all(lib.map(entry => extractAS(entry, entry.filename)));
    const flattened = results
      .filter(result => Object.keys(result).length)
      .map(result => {
        const name = Object.keys(result)[0];
        return { id: `fla-${name}`, name, code: result[name] };
      });
    setFlaScripts(flattened);
    setFlaLoaded(true);
    setSelected(flattened[0]?.id ?? null);
  }

  async function handleASFiles(files) {
    const results = await Promise.all(files.map(async file => ({
      id: `as-${file.name}`,
      name: file.name,
      code: [{ frame: null, layer: null, code: await file.text() }]
    })));
    setASScripts(prev => [...prev, ...results]);
    setSelected(prev => prev ?? results[0]?.id ?? null);
  }

  const scripts = [...flaScripts, ...ASScripts];
  const activeEntry = scripts.find(s => s.id === selected);

  return (
    <div class="app">
      <FileUpload onFile={handleFile} onASFiles={handleASFiles} />
      <div class="layout">
        <ScriptList scripts={scripts} selected={selected} onSelect={setSelected} loaded={flaLoaded} />
        <ScriptViewer entry={activeEntry} />
      </div>
    </div>
  )
}