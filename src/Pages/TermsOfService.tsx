import { Link } from "react-router-dom";

function TermsOfService() {
  return (
    <main className="auth-info-page" aria-labelledby="terms-title">
      <section className="auth-info-card">
        <p className="auth-info-eyebrow">MyGuy Logistics</p>
        <h1 id="terms-title">Terms of Service</h1>
        <p>
          By using this portal, administrators agree to follow account security,
          approved operational workflows, and data handling standards.
        </p>

        <ul className="auth-info-list" aria-label="Terms summary">
          <li>Accounts must not be shared across unauthorized personnel.</li>
          <li>Operational updates should reflect verified shipment states.</li>
          <li>Abuse or unauthorized access attempts may be restricted.</li>
        </ul>

        <div className="auth-info-actions">
          <Link to="/" className="auth-info-link primary">
            Back to Login
          </Link>
          <Link to="/privacy-policy" className="auth-info-link">
            View Privacy Policy
          </Link>
        </div>
      </section>
    </main>
  );
}

export default TermsOfService;
