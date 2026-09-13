import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      <nav className="navbar">
        <h2>📝 Mini Notes</h2>

        <div>
          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/register" className="nav-register">
            Register
          </Link>
        </div>
      </nav>

      <main className="hero">

        <div className="hero-content">

          <p className="small-title">
            YOUR SIMPLE NOTE TAKING APP
          </p>

          <h1>
            Your ideas,
            <br />
            <span>organized beautifully.</span>
          </h1>

          <p className="description">
            Create, manage and keep all your important notes
            in one simple and secure place.
          </p>

          <div className="buttons">

            <Link to="/register" className="start-btn">
              Get Started →
            </Link>

            <Link to="/login" className="login-btn">
              Login
            </Link>

          </div>

        </div>

        <div className="note-card">

          <div className="card-top">
            <span>📌</span>
            <span>•••</span>
          </div>

          <h3>My Notes</h3>

          <div className="note">
            <strong>Project Ideas</strong>
            <p>Build something amazing today...</p>
          </div>

          <div className="note">
            <strong>Important Tasks</strong>
            <p>Complete my tasks and stay focused.</p>
          </div>

          <div className="note">
            <strong>Today's Thoughts</strong>
            <p>Write down what comes to mind.</p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Home;