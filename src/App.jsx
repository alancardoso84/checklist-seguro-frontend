import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NovoChecklist from "./pages/NovoChecklist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/novo-checklist" element={<NovoChecklist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
