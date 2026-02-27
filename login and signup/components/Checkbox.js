function Checkbox({ checked, onChange, label, id }) {
  try {
    const cid = id || 'rememberMe';

    return (
      <label className="inline-flex items-center gap-2 cursor-pointer select-none" data-name="checkbox" data-file="components/Checkbox.js">
        <input
          id={cid}
          type="checkbox"
          checked={!!checked}
          onChange={() => onChange && onChange()}
          className="sr-only"
          data-name="checkbox-input"
          data-file="components/Checkbox.js"
        />

        <span
          className={[
            "w-4 h-4 rounded-[6px] flex items-center justify-center",
            "border border-white/25 bg-white/5",
            checked ? "border-[rgba(124,92,255,.75)] bg-[rgba(124,92,255,.18)]" : ""
          ].join(' ')}
          data-name="checkbox-box"
          data-file="components/Checkbox.js"
        >
          {checked ? (
            <span className="icon-check text-sm text-white" data-name="checkbox-check" data-file="components/Checkbox.js"></span>
          ) : (
            <span className="w-3 h-3" data-name="checkbox-empty" data-file="components/Checkbox.js"></span>
          )}
        </span>

        <span className="text-sm text-white/70" data-name="checkbox-label" data-file="components/Checkbox.js">
          {label}
        </span>
      </label>
    );
  } catch (error) {
    console.error('Checkbox component error:', error);
    return null;
  }
}