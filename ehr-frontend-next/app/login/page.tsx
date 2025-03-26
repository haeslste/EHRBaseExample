// /pages/login.tsx
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/authService";
import Cookies from 'js-cookie'; 

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
        const { token, role } = await login(username, password);

        Cookies.set('token', token);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        console.log("role: ", role);
        // Redirect based on role
        switch (role) {
            case "ROLE_ADMIN":
            setTimeout(() => router.push("/admin"), 10);
            break;
            case "ROLE_DOCTOR":
            setTimeout(() => router.push("/doctor"), 10);
            break;
            case "ROLE_PATIENT":
            setTimeout(() => router.push("/patient"), 10);
            break;
            default:
            setTimeout(() => router.push("/"), 10);
        }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
