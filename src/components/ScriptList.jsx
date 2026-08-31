export default function ScriptList({ scripts, selected, onSelect, loaded }) {
  if (!scripts.length) {
    return (
      <p class="empty-state">
        {loaded
          ? `No scripts found in this .fla.
          You may need to upload external ActionScript.`
          : 'No scripts yet — choose a .fla file by clicking the button.'}
      </p>
    );
  }

  return (
    <ul class="script-list">
      {scripts.map(({ id, name }) => (
        <li key={id}>
          <button
            class={id === selected ? 'active' : ''}
            onClick={() => onSelect(id)}
          >
            {name.replace('.xml', '')}
          </button>
        </li>
      ))}
    </ul>
  );
}