import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-actionscript";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/actionscript";

export default function ScriptViewer({ entry }) {
  if (!entry) {
    return <p class="empty-state">Select a symbol on the left to view its ActionScript.</p>;
  }

  function onChange(script) {
    console.log('Editing is currently unsupported, sorry');
  }
  return (
    <div class="script-viewer">
      {entry.code.map(({ frame, layer, code }, i) => (
        <div class="script-viewer-div" key={i}>
          <p class="frame-label">
            {frame !== null ? `Frame ${frame}` : 'Unknown frame'}
            {layer ? ` — ${layer}` : ''}
          </p>
          <AceEditor
            mode="actionscript"
            theme="chaos"
            onChange={onChange}
            name={`script-viewer-${i}`}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              readOnly: true,
              useWorker: false
            }}
            value={code}
            className="ace-editor"
            width="100%"
            height="100%" />
        </div>
      ))}
    </div>
  );
}
