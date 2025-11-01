import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Oops! Page not found</h2>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
