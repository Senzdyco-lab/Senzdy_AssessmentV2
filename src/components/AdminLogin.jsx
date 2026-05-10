import { useState } from "react";
import Button from "./Button.jsx";
import { signIn } from "../lib/supabase.js";

export default function AdminLogin({ onSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const session = await signIn(email, password);
      onSignedIn?.(session);
    } catch (err) {
      setError(err?.message || "Sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="sz-admin-login" onSubmit={submit}>
      <h2 className="sz-section-title">Admin login</h2>
      <input
        type="email"
        className="sz-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="username"
      />
      <input
        type="password"
        className="sz-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      {error && <p className="sz-admin-error">{error}</p>}
      <Button type="submit" onClick={() => {}}>
        {busy ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
