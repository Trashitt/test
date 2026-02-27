function SignUpShell({
  name,
  email,
  area,
  password,
  confirmPassword,
  busy,
  onChangeName,
  onChangeEmail,
  onChangeArea,
  onChangePassword,
  onChangeConfirmPassword,
  onSubmit,
  onGoogle,
  onSignIn
}) {
  try {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const onKeyDown = (e) => {
      try {
        if (e.key === 'Enter') onSubmit && onSubmit();
      } catch (error) {
        console.error('SignUpShell onKeyDown error:', error);
      }
    };

    return (
      <div className="w-full max-w-5xl" data-name="shell" data-file="components/SignUpShell.js">
        <div className="glass noise ring-soft overflow-hidden" data-name="card" data-file="components/SignUpShell.js">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]" data-name="split" data-file="components/SignUpShell.js">
            <div className="hidden md:flex md:flex-col md:bg-black md:p-7 relative" data-name="left" data-file="components/SignUpShell.js">
              <div className="mb-auto">
                <img src="logo.png" alt="Logo" className="h-15 w-auto brightness-110 drop-shadow-md" data-name="brand-logo" data-file="components/SignUpShell.js" />
              </div>
              <HeroIllustration />
            </div>

            <div className="p-7 sm:p-10" data-name="right" data-file="components/SignUpShell.js">
              {/* mobile logo above header */}
              <div className="flex justify-center md:hidden mb-4" data-name="mobile-logo" data-file="components/SignUpShell.js">
                <img src="logo.png" alt="Logo" className="h-11 w-auto brightness-110 drop-shadow-md" />
              </div>

              <div className="mt-8 text-center sm:text-left" data-name="header" data-file="components/SignUpShell.js">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lg:pl-[68px]" data-name="title" data-file="components/SignUpShell.js">
                  Create an <span className="text-[#2EE59D]" data-name="title-accent" data-file="components/SignUpShell.js">Account</span>
                </h1>
                <p className="mt-2 text-sm text-white/55 lg:pl-[95px]" data-name="subtitle" data-file="components/SignUpShell.js">
                  Please provide your details to sign up.
                </p>
              </div>

              <div className="mt-8 space-y-6" onKeyDown={onKeyDown} data-name="form" data-file="components/SignUpShell.js">
                <TextField
                  id="name"
                  label="Name"
                  value={name}
                  onChange={onChangeName}
                  placeholder="Your name"
                  autoComplete="name"
                />

                <TextField
                  id="email"
                  label="Email"
                  value={email}
                  onChange={onChangeEmail}
                  placeholder="you@example.com"
                  autoComplete="email"
                />

                <TextField
                  id="area"
                  label="Area"
                  value={area}
                  onChange={onChangeArea}
                  placeholder="Your area"
                  autoComplete="off"
                />

                <TextField
                  id="password"
                  label="Password"
                  value={password}
                  onChange={onChangePassword}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  rightSlot={
                    <button
                      className="btn h-9 px-3 bg-transparent hover:bg-white/5"
                      onClick={() => setShowPassword((v) => !v)}
                      type="button"
                      data-name="toggle-password"
                      data-file="components/SignUpShell.js"
                    >
                      <div className={showPassword ? "icon-eye-off text-xl text-white/80" : "icon-eye text-xl text-white/80"} data-name="toggle-password-icon" data-file="components/SignUpShell.js"></div>
                    </button>
                  }
                />

                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  rightSlot={
                    <button
                      className="btn h-9 px-3 bg-transparent hover:bg-white/5"
                      onClick={() => setShowConfirm((v) => !v)}
                      type="button"
                      data-name="toggle-confirm"
                      data-file="components/SignUpShell.js"
                    >
                      <div className={showConfirm ? "icon-eye-off text-xl text-white/80" : "icon-eye text-xl text-white/80"} data-name="toggle-confirm-icon" data-file="components/SignUpShell.js"></div>
                    </button>
                  }
                />

                <button
                  className="btn w-full justify-center bg-[#2EE59D] text-black font-semibold hover:bg-[#1DD584] hover:scale-105 transition transform"
                  onClick={onSubmit}
                  disabled={!!busy}
                  data-name="submit"
                  data-file="components/SignUpShell.js"
                >
                  {busy ? (
                    <span className="inline-flex items-center gap-2" data-name="submit-busy" data-file="components/SignUpShell.js">
                      <span className="w-4 h-4 rounded-full border-2 border-white/25 border-t-white animate-spin" data-name="spinner" data-file="components/SignUpShell.js"></span>
                      <span data-name="submit-text" data-file="components/SignUpShell.js">Signing up…</span>
                    </span>
                  ) : (
                    <span data-name="submit-text" data-file="components/SignUpShell.js">Sign Up</span>
                  )}
                </button>

                <OrDivider />

                <SocialButton busy={busy} onClick={onGoogle} />

                <div className="mt-5 text-sm text-white/55 text-center" data-name="footer" data-file="components/SignUpShell.js">
                  <span data-name="footer-q" data-file="components/SignUpShell.js">Already have an account?</span>{" "}
                  <button
                    className="text-white/85 hover:text-white underline underline-offset-4"
                    onClick={onSignIn}
                    type="button"
                    data-name="signin"
                    data-file="components/SignUpShell.js"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SignUpShell component error:', error);
    return null;
  }
}
