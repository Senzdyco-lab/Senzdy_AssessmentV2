import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Admin from "./pages/Admin.jsx";
import Assessment from "./pages/Assessment.jsx";
import Intro from "./pages/Intro.jsx";
import Result from "./pages/Result.jsx";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="sz-app">
        <Header />
        <main className="sz-container sz-main">
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/assessment_3_12" element={<Assessment ageGroup="3-12" />} />
            <Route path="/assessment_13" element={<Assessment ageGroup="13+" />} />
            <Route path="/result" element={<Result />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
