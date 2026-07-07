import { useId, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";


type LoginProps = {
  onLogin?: (email: string) => void;
};

function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const rememberId = useId();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    if (typeof email === "string" && email.trim()) {
      onLogin?.(email.trim());
      navigate("/overview");
    }
  };

  return (
    <div className="login-page">
      <main className="login-card" aria-labelledby="login-title">
        <header className="login-header">
          <h1>
            <span className="login-brand-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="presentation">
                <path d="M2.5 6.5h10v8h-10z" />
                <path d="M12.5 10.5h4l2.2 2.1V14.5h-6.2z" />
                <circle cx="7" cy="16.5" r="1.9" />
                <circle cx="17.2" cy="16.5" r="1.9" />
              </svg>
            </span>
            <span>MyGuy Logistics</span>
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
            <div className="input-wrap">
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
                required
              />
            </div>

            <div className="password-row">
              <label htmlFor="password">Password</label>
              <a href="#" className="forgot-link">
                Forgot Password?
              </a>
            </div>
            <div className="input-wrap">
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
                required
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="presentation">
                  <path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="2.8" />
                </svg>
              </button>
            </div>

            <div className="remember-row">
              <input id={rememberId} name="remember" type="checkbox" />
              <label htmlFor={rememberId}>Remember this device for 30 days</label>
            </div>

            <button type="submit" className="sign-in-btn">
              Login <span aria-hidden="true">→</span>
            </button>

            <div className="support-block">
              <p>Need assistance? Contact your system administrator or support team.</p>
              <button type="button" className="support-btn">
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="presentation">
                    <path d="M12 19v-2.4" />
                    <path d="M6.7 17.5A7.5 7.5 0 1 1 17.3 17.5" />
                    <path d="M4.8 13.1h1.9v3.7H4.8z" />
                    <path d="M17.3 13.1h1.9v3.7h-1.9z" />
                  </svg>
                </span>
                <span>Support</span>
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="login-footer">
        <p>MyGuy Logistics</p>
        <nav aria-label="Legal links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Support</a>
        </nav>
        <p>Copyright 2024 MyGuy Logistics. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
