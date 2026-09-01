import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-actionscript";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/actionscript";

export default function ScriptViewer({ entry }) {
  if (!entry) {
    return;
  }

  return (
    <div class="script-viewer">
      {entry.scripts.map(({ frame, layer, node }, i) => (
        <div class="script-viewer-div" key={`${entry.id}-${i}`}>
          {(frame !== null || layer) && (
            <p class="frame-label">
              {frame !== null ? `Frame ${frame}` : ''}
              {layer ? ` — ${layer}` : ''}
            </p>
          )}
          <AceEditor
            mode="actionscript"
            theme="chaos"
            onChange={(newCode) => { node.textContent = newCode; }}
            name={`script-viewer-${entry.id}-${i}`}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              useWorker: false
            }}
            defaultValue={node.textContent}
            className="ace-editor"
            width="100%"
            height="100%" />
        </div>
      ))}
    </div>
  );
}
