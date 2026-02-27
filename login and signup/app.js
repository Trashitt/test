// Important: DO NOT remove this `ErrorBoundary` component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50" data-name="error-boundary" data-file="app.js">
          <div className="text-center" data-name="error-boundary-inner" data-file="app.js">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" data-name="error-title" data-file="app.js">Something went wrong</h1>
            <p className="text-gray-600 mb-4" data-name="error-desc" data-file="app.js">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
              data-name="error-reload"
              data-file="app.js"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [remember, setRemember] = React.useState(true);

    const [busy, setBusy] = React.useState(false);
    const [toast, setToast] = React.useState(null);

    const submit = async () => {
      try {
        if (busy) return;

        const nameErr = validateDisplayName(name);
        if (nameErr) {
          setToast({ type: 'error', title: 'Check your name', message: nameErr });
          return;
        }

        const pwdErr = validatePassword(password);
        if (pwdErr) {
          setToast({ type: 'error', title: 'Check your password', message: pwdErr });
          return;
        }

        setBusy(true);
        const resp = await fakeSignIn({ name, password, remember });
        setBusy(false);

        if (!resp.ok) {
          setToast({ type: 'error', title: 'Sign-in failed', message: resp.message || 'Please try again.' });
          return;
        }

        setToast({ type: 'success', title: 'Welcome back!', message: `Signed in as ${resp.user.name}.` });
        if (window.confetti) {
          window.confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      } catch (e) {
        setBusy(false);
        setToast({ type: 'error', title: 'Something went wrong', message: 'Please refresh the page and try again.' });
      }
    };

    const signInWithGoogle = async () => {
      try {
        if (busy) return;
        setBusy(true);
        const resp = await fakeOAuthSignIn({ provider: 'Google' });
        setBusy(false);

        if (!resp.ok) {
          setToast({ type: 'error', title: 'Google sign-in failed', message: resp.message || 'Please try again.' });
          return;
        }

        setToast({ type: 'success', title: 'Signed in', message: `Connected with ${resp.provider}.` });
      } catch (e) {
        setBusy(false);
        setToast({ type: 'error', title: 'Something went wrong', message: 'Please try again in a moment.' });
      }
    };

    return (
      <div className="min-h-screen px-4 py-10 flex items-center justify-center" data-name="app" data-file="app.js">
        <AppShell
          name={name}
          password={password}
          remember={remember}
          busy={busy}
          onChangeName={setName}
          onChangePassword={setPassword}
          onToggleRemember={() => setRemember((v) => !v)}
          onSubmit={submit}
          onGoogle={signInWithGoogle}
          onForgot={() => setToast({ type: 'info', title: 'Forgot password', message: 'This is a screen. Hook this to your reset flow.' })}
          onSignUp={() => { window.location.href = 'signup.html'; }}
        />

        <AlertToast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);