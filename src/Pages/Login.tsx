import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

type LoginErrors = {
  email?: string;
  password?: string;
};

type LoginToast = {
  kind: "error" | "success";
  message: string;
};

type LoginProps = {
  onLogin?: (email: string) => void;
};

function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [toast, setToast] = useState<LoginToast | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rememberId = useId();
  const navigate = useNavigate();
  const redirectTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current !== null) {
        window.clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const clearFieldError = (field: keyof LoginErrors) => {
    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      return {
        ...currentErrors,
        [field]: undefined,
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const nextErrors: LoginErrors = {};
    const emailValue = typeof email === "string" ? email.trim() : "";
    const passwordValue = typeof password === "string" ? password : "";

    if (!emailValue) {
      nextErrors.email = "Enter your admin email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nextErrors.email = "Use a valid email format, for example name@company.com.";
    }

    if (!passwordValue.trim()) {
      nextErrors.password = "Enter your password to continue.";
    } else if (passwordValue.trim().length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (nextErrors.email || nextErrors.password) {
      setErrors(nextErrors);
      setToast({
        kind: "error",
        message: "Fix the highlighted login fields and try again.",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setToast({
      kind: "success",
      message: "Login details look valid. Redirecting to your dashboard...",
    });

    onLogin?.(emailValue);

    redirectTimerRef.current = window.setTimeout(() => {
      navigate("/overview");
    }, 900);
  };

  const handleEmailInput = () => {
    clearFieldError("email");
  };

  const handlePasswordInput = () => {
    clearFieldError("password");
  };

  const dismissToast = () => {
    setToast(null);
  };

  const emailErrorId = errors.email ? "login-email-error" : undefined;
  const passwordErrorId = errors.password ? "login-password-error" : undefined;

  const emailInputClassName = errors.email ? "input-wrap has-error" : "input-wrap";
  const passwordInputClassName = errors.password ? "input-wrap has-error" : "input-wrap";

  return (
    <div className="login-page">
      {toast ? (
        <div className={`login-toast ${toast.kind}`} role="status" aria-live="polite">
          <p>{toast.message}</p>
          <button type="button" className="login-toast-close" onClick={dismissToast} aria-label="Dismiss notification">
            ×
          </button>
        </div>
      ) : null}

      <main className="login-card" aria-labelledby="login-title">
        <header className="login-header">
          <h1>
            <img className="login-brand-logo" src="/mg-logo.png" alt="MyGuy logo" />
          </h1>
          <p>Admin Portal</p>
        </header>

        <section className="login-body">
          <h2 id="login-title">Welcome Back</h2>
          <p className="login-subtitle">
            Enter your credentials to access the logistics management system.
          </p>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <label htmlFor="email">Email Address</label>
            <div className={emailInputClassName}>
              <span className="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="presentation">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 8.5 12 13l9-4.5" />
                </svg>
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@myguy-logistics.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={emailErrorId}
                onInput={handleEmailInput}
                required
              />
            </div>
            {errors.email ? <p id={emailErrorId} className="login-field-error">{errors.email}</p> : null}

            <div className="password-row">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>
            <div className={passwordInputClassName}>
              <span className="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="presentation">
                  <rect x="6" y="10" width="12" height="10" rx="2" />
                  <path d="M9 10V7a3 3 0 0 1 6 0v3" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="........"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={passwordErrorId}
                onInput={handlePasswordInput}
                required
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="presentation">
                    <path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="2.8" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="presentation">
                    <path d="M3 3 21 21" />
                    <path d="M10.6 10.7a2.7 2.7 0 0 0 3.8 3.8" />
                    <path d="M9.9 5.2A10.4 10.4 0 0 1 12 5c6.2 0 10 7 10 7a17.2 17.2 0 0 1-4 4.8" />
                    <path d="M6.2 6.3C3.9 8 2 12 2 12s3.8 7 10 7a9.7 9.7 0 0 0 3-.5" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password ? <p id={passwordErrorId} className="login-field-error">{errors.password}</p> : null}

            <div className="remember-row">
              <input id={rememberId} name="remember" type="checkbox" />
              <label htmlFor={rememberId}>Remember this device for 30 days</label>
            </div>

            <button type="submit" className="sign-in-btn" disabled={isSubmitting}>
              {isSubmitting ? "Opening..." : "Login"} <span aria-hidden="true">→</span>
            </button>

            <div className="support-block">
              <p>Need assistance? Contact your system administrator or support team.</p>
              <Link to="/support" className="support-btn" aria-label="Open support page">
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="presentation">
                    <path d="M12 19v-2.4" />
                    <path d="M6.7 17.5A7.5 7.5 0 1 1 17.3 17.5" />
                    <path d="M4.8 13.1h1.9v3.7H4.8z" />
                    <path d="M17.3 13.1h1.9v3.7h-1.9z" />
                  </svg>
                </span>
                <span>Support</span>
              </Link>
            </div>
          </form>
        </section>
      </main>

      <footer className="login-footer">
        <p>MyGuy Logistics</p>
        <nav aria-label="Legal links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/support">Support</Link>
        </nav>
        <p>Copyright 2024 MyGuy Logistics. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
