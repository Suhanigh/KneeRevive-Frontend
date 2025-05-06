import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modeselection from "./Modeselection";
import SaviourMode from "./SaviourMode";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Modeselection />} />
        <Route path="/saviour" element={<SaviourMode />} />
      </Routes>
    </Router>
  );
}

export default App;
