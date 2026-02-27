function AlertToast({ toast, onClose }) {
  try {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      try {
        if (toast) {
          setOpen(true);
          const t = setTimeout(() => {
            setOpen(false);
            setTimeout(() => {
              if (onClose) onClose();
            }, 180);
          }, 3600);
          return () => clearTimeout(t);
        }
      } catch (error) {
        console.error('AlertToast effect error:', error);
      }
    }, [toast]);

    if (!toast) return null;

    const meta = {
      success: { icon: 'icon-circle-check', ring: 'ring-1 ring-[rgba(46,229,157,.30)]', bg: 'bg-[rgba(46,229,157,.10)]', ic: 'text-[var(--success)]' },
      error: { icon: 'icon-circle-alert', ring: 'ring-1 ring-[rgba(255,77,109,.30)]', bg: 'bg-[rgba(255,77,109,.10)]', ic: 'text-[var(--danger)]' },
      info: { icon: 'icon-circle-help', ring: 'ring-1 ring-[rgba(124,92,255,.30)]', bg: 'bg-[rgba(124,92,255,.10)]', ic: 'text-[var(--primary-color)]' }
    }[toast.type || 'info'];

    return (
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-xl"
        data-name="toast-wrap"
        data-file="components/AlertToast.js"
      >
        <div
          className={[
            "glass noise ring-soft",
            "px-4 py-3 flex items-start gap-3",
            "transition duration-200",
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          ].join(' ')}
          data-name="toast"
          data-file="components/AlertToast.js"
        >
          <div
            className={[
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
              meta.bg,
              meta.ring
            ].join(' ')}
            data-name="toast-icon-wrap"
            data-file="components/AlertToast.js"
          >
            <div className={[meta.icon, "text-xl", meta.ic].join(' ')} data-name="toast-icon" data-file="components/AlertToast.js"></div>
          </div>

          <div className="min-w-0 flex-1" data-name="toast-content" data-file="components/AlertToast.js">
            <div className="font-semibold text-[var(--text)]" data-name="toast-title" data-file="components/AlertToast.js">{toast.title}</div>
            <div className="text-sm text-[var(--muted)] mt-0.5" data-name="toast-msg" data-file="components/AlertToast.js">{toast.message}</div>
          </div>

          <button
            className="btn h-9 px-3 bg-transparent hover:bg-[rgba(255,255,255,.06)]"
            onClick={() => { setOpen(false); setTimeout(() => onClose && onClose(), 180); }}
            data-name="toast-close"
            data-file="components/AlertToast.js"
          >
            <div className="icon-x text-xl text-white/85" data-name="toast-close-icon" data-file="components/AlertToast.js"></div>
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AlertToast component error:', error);
    return null;
  }
}