// /pages/login.tsx
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/authService";
import Cookies from 'js-cookie'; 

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);
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
    setIsLoggingIn(false);
  };

  return (
    <div className="flex flex-col p-4 max-w-md mx-auto self-auto">
      <h1 className="mb-4 text-2xl">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="mb-2 border rounded p-2" 
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="mb-2 border rounded p-2" 
        />
        <br />
        <button type="submit" className="center w-45 in-focus-visible:border-b-blue-500  form-button bg-blue-400 p-3 rounded-xl "  disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
