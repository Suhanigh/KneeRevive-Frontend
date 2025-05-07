// src/pages/SaviourMode.js

import React from "react";
import SensorChart from "../components/SensorChart";
import "./SaviourMode.css";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaRobot, FaHeartbeat } from "react-icons/fa";

const SaviourMode = () => {
  const navigate = useNavigate();

  return (
    <div className="saviour-container">
      <h1 className="saviour-title">Knee Movement Insights</h1>

      <div className="chart-card">
        <div className="chart-header">
          <FaChartLine size={24} className="chart-icon" />
          <h2>Real-Time Sensor Data</h2>
        </div>
        <SensorChart />
      </div>

      <div className="options-section">
        <div
          className="option-card"
          onClick={() => navigate("/weekly-assessment")}
        >
          <FaHeartbeat size={30} className="card-icon" />
          <h2>Assessment of the Week</h2>
          <p>Check your weekly knee movement summary and critical alerts.</p>
        </div>

        <div className="option-card" onClick={() => navigate("/botknee")}>
          <FaRobot size={30} className="card-icon" />
          <h2>Talk to BotKnee</h2>
          <p>Get AI-based feedback, advice, and track improvement tips.</p>
        </div>
      </div>
    </div>
  );
};

export default SaviourMode;
