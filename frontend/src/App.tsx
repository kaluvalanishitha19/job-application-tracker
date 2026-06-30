import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ApplicationDetail from "./components/ApplicationDetail";
import "./App.css";

function App() {
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications/:id" element={<ApplicationDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;