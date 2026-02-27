// duplicate of ErrorBoundary for safety
class ErrorBoundary2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary2 caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50" data-name="error-boundary" data-file="signup-app.js">
          <div className="text-center" data-name="error-boundary-inner" data-file="signup-app.js">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" data-name="error-title" data-file="signup-app.js">Something went wrong</h1>
            <p className="text-gray-600 mb-4" data-name="error-desc" data-file="signup-app.js">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
              data-name="error-reload"
              data-file="signup-app.js"
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

function SignUpApp() {
  try {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [area, setArea] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

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
        const emailErr = validateEmail(email);
        if (emailErr) {
          setToast({ type: 'error', title: 'Check your email', message: emailErr });
          return;
        }
        const areaErr = validateArea(area);
        if (areaErr) {
          setToast({ type: 'error', title: 'Check your area', message: areaErr });
          return;
        }
        const pwdErr = validatePassword(password);
        if (pwdErr) {
          setToast({ type: 'error', title: 'Check your password', message: pwdErr });
          return;
        }
        const confirmErr = validateConfirmPassword(password, confirmPassword);
        if (confirmErr) {
          setToast({ type: 'error', title: 'Check passwords', message: confirmErr });
          return;
        }

        setBusy(true);
        const resp = await fakeSignUp({ name, email, area, password, confirm: confirmPassword });
        setBusy(false);

        if (!resp.ok) {
          setToast({ type: 'error', title: 'Sign-up failed', message: resp.message || 'Please try again.' });
          return;
        }

        setToast({ type: 'success', title: 'Welcome!', message: `Account created for ${resp.user.name}.` });
        // maybe redirect to login after a moment
        setTimeout(() => { window.location.href = 'login.html'; }, 1500);
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

        setToast({ type: 'success', title: 'Signed up', message: `Connected with ${resp.provider}.` });
      } catch (e) {
        setBusy(false);
        setToast({ type: 'error', title: 'Something went wrong', message: 'Please try again in a moment.' });
      }
    };

    return (
      <div className="min-h-screen px-4 py-10 flex items-center justify-center" data-name="signup-app" data-file="signup-app.js">
        <SignUpShell
          name={name}
          email={email}
          area={area}
          password={password}
          confirmPassword={confirmPassword}
          busy={busy}
          onChangeName={setName}
          onChangeEmail={setEmail}
          onChangeArea={setArea}
          onChangePassword={setPassword}
          onChangeConfirmPassword={setConfirmPassword}
          onSubmit={submit}
          onGoogle={signInWithGoogle}
          onSignIn={() => { window.location.href = 'login.html'; }}
        />

        <AlertToast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  } catch (error) {
    console.error('SignUpApp component error:', error);
    return null;
  }
}

const root2 = ReactDOM.createRoot(document.getElementById('root'));
root2.render(
  <ErrorBoundary2>
    <SignUpApp />
  </ErrorBoundary2>
);
