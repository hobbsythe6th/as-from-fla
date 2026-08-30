import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-actionscript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

export default function ScriptViewer({ entry }) {
  if (!entry) {
    return <p class="empty-state">Select a symbol on the left to view its ActionScript.</p>;
  }

  function onChange(script) {
    console.log('Editing is currently unsupported, sorry');
  }
  return (
    <div class="script-viewer">
      {entry.code.map((code) => (
        <div id="script-viewer-div">
          <AceEditor
            mode="actionscript"
            theme="monokai"
            onChange={onChange}
            name="script-viewer"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true
            }}
            value={code}
            width={window.width / 3}
            height={window.height} />
        </div>
      ))}
    </div>
  );
}
