import "./App.css";
import Login from "./Pages/Login";
import { useState } from "react";
import Vendors from "./Pages/Vendors";
import Riders from "./Pages/Riders";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail(null);
  };

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">MG</span>
          <div>
            <h1>MyGuy</h1>
            <p>Logistics Control</p>
          </div>
        </div>

        <nav className="side-nav" aria-label="Main navigation">
          <h2>Workspace</h2>
          <button className="nav-item active" type="button">
            Dashboard <span className="badge">Live</span>
          </button>
          <button className="nav-item" type="button">
            Vendors
          </button>
          <button className="nav-item" type="button">
            Riders
          </button>
        </nav>

        <div className="profile-chip">
          <div className="avatar">MG</div>
          <div>
            <strong>{email ?? "Guest User"}</strong>
            <p>{isLoggedIn ? "Authenticated" : "Not signed in"}</p>
          </div>
        </div>
      </aside>
      

      <main className="main-panel">
        <header className="top-strip">
          <div>
            <p className="eyebrow">Operations</p>
            <h2>MyGuy Service Hub</h2>
          </div>
          <div className="health-pill">
            <span className="dot" aria-hidden="true" />
            <div>
              System Status
              <br />
              <small>{isLoggedIn ? "User online" : "Awaiting authentication"}</small>
            </div>
          </div>
        </header>

        {!isLoggedIn ? (
          <section>
            <article className="panel auth-card">
              <div className="panel-head">
                <h3>Welcome Back</h3>
                <span>Login</span>
              </div>
              <p className="panel-sub">Sign in and continue monitoring operations.</p>
              <Login onLogin={handleLogin} />
            </article>
          </section>
        ) : (
          <section className="panel info-panel">
            <div className="panel-head">
              <h3>Welcome, {email}!</h3>
              <span>Active Session</span>
            </div>
            <p className="panel-sub">You are signed in and can now review vendors and riders below.</p>
            <button className="nav-item logout-btn" type="button" onClick={handleLogout}>
              Logout
            </button>
          </section>
        )}

        <section className="bottom-row">
          <article className="panel">
            <Vendors />
          </article>
          <article className="panel riders-panel">
            <Riders />
          </article>
          <article className="panel info-panel">
            <div className="panel-head">
              <h3>Route Notes</h3>
              <span>Today</span>
            </div>
            <p className="panel-sub">
              Keep vendor stock synchronized with rider assignments for improved turnaround.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;