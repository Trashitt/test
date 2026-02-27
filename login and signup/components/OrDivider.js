function OrDivider() {
  try {
    return (
      <div className="relative my-5" data-name="or-divider" data-file="components/OrDivider.js">
        <div className="h-px bg-white/10" data-name="or-line" data-file="components/OrDivider.js"></div>
        <div className="absolute left-1/2 -translate-x-1/2 -top-3 px-3 text-xs text-white/45 bg-[rgba(12,19,38,.85)] rounded-full border border-white/10"
          data-name="or-pill"
          data-file="components/OrDivider.js"
        >
          OR
        </div>
      </div>
    );
  } catch (error) {
    console.error('OrDivider component error:', error);
    return null;
  }
}