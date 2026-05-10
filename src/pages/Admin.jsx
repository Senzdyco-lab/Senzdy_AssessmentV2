import { useEffect, useState } from "react";
import AdminDashboard from "../components/AdminDashboard.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import Button from "../components/Button.jsx";
import { checkIsAdmin, getSession, onAuthChange, signOut } from "../lib/supabase.js";

export default function Admin() {
  const [session, setSession] = useState(undefined); // undefined = loading, null = signed out
  const [isAdmin, setIsAdmin] = useState(undefined);

  useEffect(() => {
    let mounted = true;
    getSession().then((s) => mounted && setSession(s));
    const unsub = onAuthChange((s) => {
      if (!mounted) return;
      setSession(s);
      setIsAdmin(undefined);
    });
    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  // Re-check admin status whenever session changes to a signed-in user.
  useEffect(() => {
    if (!session) return;
    let mounted = true;
    checkIsAdmin().then((ok) => mounted && setIsAdmin(ok));
    return () => {
      mounted = false;
    };
  }, [session]);

  if (session === undefined) {
    return (
      <section className="sz-fade sz-section">
        <p className="sz-meta">Loading…</p>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="sz-fade sz-section">
        <AdminLogin />
      </section>
    );
  }

  if (isAdmin === undefined) {
    return (
      <section className="sz-fade sz-section">
        <p className="sz-meta">Checking permissions…</p>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="sz-fade sz-section">
        <h2 className="sz-section-title">ไม่มีสิทธิ์เข้าถึง</h2>
        <p className="sz-meta sz-disclaimer">
          บัญชีนี้ ({session.user.email}) ไม่ใช่บัญชีผู้ดูแลระบบ
        </p>
        <div className="sz-button-row">
          <Button variant="outline" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="sz-fade sz-section">
      <AdminDashboard session={session} />
    </section>
  );
}
