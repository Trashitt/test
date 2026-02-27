function TextField({ id, label, value, onChange, type, placeholder, autoComplete, rightSlot }) {
  try {
    return (
      <div className="w-full" data-name="textfield" data-file="components/TextField.js">
        <label className="text-sm font-bold text-white/70" htmlFor={id} data-name="textfield-label" data-file="components/TextField.js">
          {label}
        </label>
        <div className="mt-2 field flex items-center gap-2" data-name="textfield-field" data-file="components/TextField.js">
          <input
            id={id}
            className="input text-white placeholder:text-white/25"
            type={type || 'text'}
            placeholder={placeholder || ''}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            autoComplete={autoComplete || 'off'}
            data-name="textfield-input"
            data-file="components/TextField.js"
          />
          {rightSlot ? (
            <div className="shrink-0" data-name="textfield-right" data-file="components/TextField.js">{rightSlot}</div>
          ) : (
            <span className="w-8 h-8" data-name="textfield-right-empty" data-file="components/TextField.js"></span>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('TextField component error:', error);
    return null;
  }
}