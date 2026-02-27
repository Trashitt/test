function SocialButton({ busy, onClick }) {
  try {
    return (
      <button
        className="btn w-full justify-center bg-transparent hover:bg-white/10 hover:scale-105 transition transform"
        onClick={onClick}
        disabled={!!busy}
        data-name="social-button"
        data-file="components/SocialButton.js"
      >
        <span
          className="w-5 h-5 rounded-md flex items-center justify-center bg-white"
          data-name="social-icon-wrap"
          data-file="components/SocialButton.js"
        >
          <span className="text-[11px] font-black text-black" data-name="social-g" data-file="components/SocialButton.js">G</span>
        </span>
        <span className="text-sm text-white/85" data-name="social-label" data-file="components/SocialButton.js">Login with Google</span>

        {busy ? (
          <span className="ml-1 inline-flex items-center gap-1" data-name="social-busy" data-file="components/SocialButton.js">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-0.12s]" data-name="dot1" data-file="components/SocialButton.js"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-0.06s]" data-name="dot2" data-file="components/SocialButton.js"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" data-name="dot3" data-file="components/SocialButton.js"></span>
          </span>
        ) : null}
      </button>
    );
  } catch (error) {
    console.error('SocialButton component error:', error);
    return null;
  }
}