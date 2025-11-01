import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const apiUrl = "https://69062801ee3d0d14c13503fd.mockapi.io/users";
      const response = await axios.get(apiUrl);
      const users = response.data;

      const existingUser = users.find(
        (u) => u.user_name === username && u.pin === pin
      );

      if (existingUser) {
        localStorage.setItem("user", JSON.stringify(existingUser));
        navigate("/dashboard");
        return;
      }

      const userExists = users.find((u) => u.user_name === username);
      if (!userExists) {
        const newUser = {
          user_name: username,
          first_name: username,
          last_name: "",
          pin,
          balance: 0,
          birthday: "2000-01-01",
          transactions: [],
          profile_img:
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        };
        const created = await axios.post(apiUrl, newUser);
        localStorage.setItem("user", JSON.stringify(created.data));
        navigate("/dashboard");
      } else {
        setError("Invalid username or PIN");
      }
    } catch (err) {
      setError("API connection error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Smart ATM Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Or try demo user:{" "}
        <Link to="/dashboard">Go to Dashboard</Link>
      </p>
    </div>
  );
}

export default Login;
