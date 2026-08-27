import extractAS from './extractAS';
import extractLib from './extractLib';

export default function App() {
  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const lib = await extractLib(file);
    const scripts = await Promise.all(lib.map(entry => extractAS(entry, entry.filename)));
    console.log(lib, scripts);
    let ul = document.getElementById('scriptList');
    scripts.forEach(file => {
      let li = document.createElement('li');
      let btn = document.createElement('button');
      btn.textContent = Object.keys(file)[0];
      btn.onclick = openAce;
      li.append(btn);
      ul.append(li);
    })
  }

  function openAce(){}

  return (
    <div id="app">
      <input type='file' accept='.fla' id="fileIn" onChange={handleFile} />
      <ul id="scriptList"></ul>
    </div>
  )
}