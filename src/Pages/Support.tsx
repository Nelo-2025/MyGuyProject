import { Link } from "react-router-dom";

function Support() {
  return (
    <main className="auth-info-page" aria-labelledby="support-title">
      <section className="auth-info-card">
        <p className="auth-info-eyebrow">MyGuy Logistics</p>
        <h1 id="support-title">Support Center</h1>
        <p>
          Reach your system administrator or support desk for account access,
          delivery operations support, and billing questions.
        </p>

        <ul className="auth-info-list" aria-label="Support channels">
          <li>Email: support@myguy-logistics.com</li>
          <li>Phone: +234 800 000 0000</li>
          <li>Hours: Monday to Saturday, 8:00 AM to 7:00 PM</li>
        </ul>

        <div className="auth-info-actions">
          <Link to="/" className="auth-info-link primary">
            Back to Login
          </Link>
          <Link to="/overview" className="auth-info-link">
            Go to Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Support;
