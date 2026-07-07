import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <main className="auth-info-page" aria-labelledby="forgot-title">
      <section className="auth-info-card">
        <p className="auth-info-eyebrow">MyGuy Logistics</p>
        <h1 id="forgot-title">Reset Password</h1>
        <p>
          To reset your password, contact your administrator or use your
          organization's approved identity recovery process.
        </p>

        <ul className="auth-info-list" aria-label="Recovery steps">
          <li>Confirm your registered company email address.</li>
          <li>Request a temporary reset token from support.</li>
          <li>Use the token to complete password reset verification.</li>
        </ul>

        <div className="auth-info-actions">
          <Link to="/" className="auth-info-link primary">
            Back to Login
          </Link>
          <Link to="/support" className="auth-info-link">
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;
