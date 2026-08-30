import AceEditor from 'react-ace';
//import 'ace-builds/src-noconflict/theme-monokai';

export default function ScriptViewer({ entry }) {
  if (!entry) {
    return <p class="empty-state">Select a symbol on the left to view its ActionScript.</p>;
  }

  return (
    <div class="script-viewer">
      {entry.code.map((code, i) => (
        <pre key={i}><code>{code}</code></pre>
      ))}
    </div>
  );
}
