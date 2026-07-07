import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <main className="auth-info-page" aria-labelledby="privacy-title">
      <section className="auth-info-card">
        <p className="auth-info-eyebrow">MyGuy Logistics</p>
        <h1 id="privacy-title">Privacy Policy</h1>
        <p>
          We process operational and account data only for platform delivery,
          security, compliance, and service quality improvements.
        </p>

        <ul className="auth-info-list" aria-label="Privacy summary">
          <li>Credentials are protected and access is role controlled.</li>
          <li>Transaction records are retained for audit and reconciliation.</li>
          <li>Support cases are stored to improve service response quality.</li>
        </ul>

        <div className="auth-info-actions">
          <Link to="/" className="auth-info-link primary">
            Back to Login
          </Link>
          <Link to="/terms-of-service" className="auth-info-link">
            View Terms of Service
          </Link>
        </div>
      </section>
    </main>
  );
}

export default PrivacyPolicy;
