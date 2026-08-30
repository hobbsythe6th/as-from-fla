export default function ScriptList({ scripts, selected, onSelect }) {
  if (!scripts.length) {
    return <p class="empty-state">No scripts yet — choose a .fla file by clicking the button.</p>;
  }

  return (
    <ul class="script-list">
      {scripts.map(({ name }) => (
        <li key={name}>
          <button
            class={name === selected ? 'active' : ''}
            onClick={() => onSelect(name)}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
}