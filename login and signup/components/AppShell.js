function AppShell({
  name,
  password,
  remember,
  busy,
  onChangeName,
  onChangePassword,
  onToggleRemember,
  onSubmit,
  onGoogle,
  onForgot,
  onSignUp
}) {
  try {
    const [showPassword, setShowPassword] = React.useState(false);
    const [mobileHoverGreen, setMobileHoverGreen] = React.useState(false);
    const [mobileHoverBlue, setMobileHoverBlue] = React.useState(false);

    const onKeyDown = (e) => {
      try {
        if (e.key === 'Enter') onSubmit && onSubmit();
      } catch (error) {
        console.error('AppShell onKeyDown error:', error);
      }
    };

    return (
      <div className="w-full max-w-5xl" data-name="shell" data-file="components/AppShell.js">
        <div className="glass noise ring-soft overflow-hidden" data-name="card" data-file="components/AppShell.js">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]" data-name="split" data-file="components/AppShell.js">
            <div className="hidden md:flex md:flex-col md:bg-black md:p-7 relative" data-name="left" data-file="components/AppShell.js">
              <div className="mb-auto">
                <img src="logo.png" alt="Logo" className="h-15 w-auto brightness-110 drop-shadow-md" data-name="brand-logo" data-file="components/AppShell.js" />
              </div>
              <HeroIllustration />
            </div>

            <div className="p-7 sm:p-10" data-name="right" data-file="components/AppShell.js">
              {/* mobile logo above header on small screens */}
            <div className="flex justify-center md:hidden mb-4" data-name="mobile-logo" data-file="components/AppShell.js">
              <img src="logo.png" alt="Logo" className="h-11 w-auto brightness-110 drop-shadow-md" />
            </div>

            <div className="mt-8 text-center sm:text-left" data-name="header" data-file="components/AppShell.js">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight lg:pl-[68px]" data-name="title" data-file="components/AppShell.js">
                  Hello, <span className="text-[#2EE59D]" data-name="title-accent" data-file="components/AppShell.js">Welcome Back!</span>
                </h1>
                <p className="mt-2 text-sm text-white/55 lg:pl-[95px]" data-name="subtitle" data-file="components/AppShell.js">
                  To continue, please enter your details.
                </p>
              </div>

              <div className="mt-8 space-y-6" onKeyDown={onKeyDown} data-name="form" data-file="components/AppShell.js">
                <TextField
                  id="name"
                  label="Name"
                  value={name}
                  onChange={onChangeName}
                  placeholder="Your name"
                  autoComplete="username"
                />

                <TextField
                  id="password"
                  label="Password"
                  value={password}
                  onChange={onChangePassword}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  autoComplete="current-password"
                  rightSlot={
                    <button
                      className="btn h-9 px-3 bg-transparent hover:bg-white/5"
                      onClick={() => setShowPassword((v) => !v)}
                      type="button"
                      data-name="toggle-password"
                      data-file="components/AppShell.js"
                    >
                      <div className={showPassword ? "icon-eye-off text-xl text-white/80" : "icon-eye text-xl text-white/80"} data-name="toggle-password-icon" data-file="components/AppShell.js"></div>
                    </button>
                  }
                />

                <div className="flex items-center justify-between gap-3" data-name="row" data-file="components/AppShell.js">
                  <Checkbox checked={remember} onChange={onToggleRemember} label="Remember me" id="remember" />

                  <button
                    className="text-sm text-white/60 hover:text-white transition"
                    onClick={onForgot}
                    type="button"
                    data-name="forgot"
                    data-file="components/AppShell.js"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  className="btn w-full justify-center bg-[#2EE59D] text-black font-semibold hover:bg-[#1DD584] hover:scale-105 transition transform"
                  onClick={onSubmit}
                  disabled={!!busy}
                  data-name="submit"
                  data-file="components/AppShell.js"
                >
                  {busy ? (
                    <span className="inline-flex items-center gap-2" data-name="submit-busy" data-file="components/AppShell.js">
                      <span className="w-4 h-4 rounded-full border-2 border-white/25 border-t-white animate-spin" data-name="spinner" data-file="components/AppShell.js"></span>
                      <span data-name="submit-text" data-file="components/AppShell.js">Logging in…</span>
                    </span>
                  ) : (
                    <span data-name="submit-text" data-file="components/AppShell.js">Login</span>
                  )}
                </button>

                <OrDivider />

                <SocialButton busy={busy} onClick={onGoogle} />

                <div className="mt-5 text-sm text-white/55 text-center" data-name="footer" data-file="components/AppShell.js">
                  <span data-name="footer-q" data-file="components/AppShell.js">Don't have account?</span>{" "}
                  <button
                    className="text-white/85 hover:text-white underline underline-offset-4"
                    onClick={onSignUp}
                    type="button"
                    data-name="signup"
                    data-file="components/AppShell.js"
                  >
                    Sign Up
                  </button>
                </div>

                {/* Mobile Dustbins */}
                <div className="block md:hidden mt-12 pt-8 border-t border-white/10" data-name="mobile-dustbins-section" data-file="components/AppShell.js">
                  <p className="text-center text-sm text-white/55 mb-6">Select waste type:</p>
                  <div className="flex justify-center gap-8" data-name="mobile-dustbins-container" data-file="components/AppShell.js">
                    
                    {/* Mobile Green Dustbin */}
                    <div 
                      className="flex flex-col items-center cursor-pointer select-none"
                      onMouseEnter={() => setMobileHoverGreen(true)}
                      onMouseLeave={() => setMobileHoverGreen(false)}
                      onTouchStart={() => setMobileHoverGreen(true)}
                      onTouchEnd={() => setMobileHoverGreen(false)}
                      data-name="mobile-dustbin-green"
                    >
                      <div className="relative w-24 h-32 mx-auto mb-3">
                        <div className="absolute -top-3 left-0 w-24 h-3 bg-green-600 rounded-t-lg shadow-md"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-green-700 rounded-full shadow-md"></div>
                        <div className="absolute top-3 left-0 w-24 h-20 bg-gradient-to-b from-green-500 to-green-700 rounded-lg shadow-lg border-2 border-green-700/50"></div>
                        <div className="absolute top-4 left-2 w-4 h-16 bg-green-400 opacity-40 rounded-full blur-sm"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-2 bg-green-800 rounded-b-lg shadow-inner"></div>
                      </div>
                      <div className="text-center">
                        {mobileHoverGreen && (
                          <div className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg animate-fadeIn whitespace-nowrap">
                            dry waste
                          </div>
                        )}
                        {!mobileHoverGreen && (
                          <p className="text-xs text-green-400 font-medium">Dry Waste</p>
                        )}
                      </div>
                    </div>

                    {/* Mobile Blue Dustbin */}
                    <div 
                      className="flex flex-col items-center cursor-pointer select-none"
                      onMouseEnter={() => setMobileHoverBlue(true)}
                      onMouseLeave={() => setMobileHoverBlue(false)}
                      onTouchStart={() => setMobileHoverBlue(true)}
                      onTouchEnd={() => setMobileHoverBlue(false)}
                      data-name="mobile-dustbin-blue"
                    >
                      <div className="relative w-24 h-32 mx-auto mb-3">
                        <div className="absolute -top-3 left-0 w-24 h-3 bg-blue-600 rounded-t-lg shadow-md"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-blue-700 rounded-full shadow-md"></div>
                        <div className="absolute top-3 left-0 w-24 h-20 bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg shadow-lg border-2 border-blue-700/50"></div>
                        <div className="absolute top-4 left-2 w-4 h-16 bg-blue-400 opacity-40 rounded-full blur-sm"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-2 bg-blue-800 rounded-b-lg shadow-inner"></div>
                      </div>
                      <div className="text-center">
                        {mobileHoverBlue && (
                          <div className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg animate-fadeIn whitespace-nowrap">
                            wet waste
                          </div>
                        )}
                        {!mobileHoverBlue && (
                          <p className="text-xs text-blue-400 font-medium">Wet Waste</p>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        
      </div>
    );
  } catch (error) {
    console.error('AppShell component error:', error);
    return null;
  }
}