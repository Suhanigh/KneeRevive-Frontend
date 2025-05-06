import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import "./SaviourMode.css";

const API_BASE = "http://localhost:5000";
const user_id = "user123"; // You might want to make this dynamic in a real app

const SaviourMode = () => {
  const [sensorData, setSensorData] = useState({
    x: 0, y: 0, z: 0,
    gx: 0, gy: 0, gz: 0,
    knee_angle: 0
  });
  
  const [prediction, setPrediction] = useState("");
  const [chartData, setChartData] = useState([]);
  const [assessment, setAssessment] = useState(null);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState({
    predict: false,
    record: false,
    assessment: false,
    history: false,
    chat: false
  });
  const [error, setError] = useState("");

  // Initialize with empty data points
  useEffect(() => {
    const initialData = Array(30).fill({
      x: 0, y: 0, z: 0,
      gx: 0, gy: 0, gz: 0,
      knee_angle: 0
    });
    setChartData(initialData);
  }, []);

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        x: +(Math.random() * 2 - 1).toFixed(2),
        y: +(Math.random() * 2 - 1).toFixed(2),
        z: +(Math.random() * 2 - 1).toFixed(2),
        gx: +(Math.random() * 250).toFixed(2),
        gy: +(Math.random() * 250).toFixed(2),
        gz: +(Math.random() * 250).toFixed(2),
        knee_angle: +(Math.random() * 90).toFixed(2)
      };
      setSensorData(newData);
      setChartData(prev => [...prev.slice(-29), newData]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePrediction = async () => {
    setLoading(prev => ({ ...prev, predict: true }));
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/predict`, sensorData);
      setPrediction(res.data.prediction_class);
    } catch (err) {
      setError("Failed to get prediction");
      console.error("Prediction error:", err);
    } finally {
      setLoading(prev => ({ ...prev, predict: false }));
    }
  };

  const handleRecord = async () => {
    setLoading(prev => ({ ...prev, record: true }));
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/record`, { 
        ...sensorData, 
        user_id,
        timestamp: new Date().toISOString()
      });
      setPrediction(res.data.prediction_class);
      alert("Data recorded successfully!");
    } catch (err) {
      setError("Failed to record data");
      console.error("Recording error:", err);
    } finally {
      setLoading(prev => ({ ...prev, record: false }));
    }
  };

  const fetchAssessment = async () => {
    setLoading(prev => ({ ...prev, assessment: true }));
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/assessment`, { 
        params: { user_id } 
      });
      setAssessment(res.data);
    } catch (err) {
      setError("Failed to fetch assessment");
      console.error("Assessment error:", err);
    } finally {
      setLoading(prev => ({ ...prev, assessment: false }));
    }
  };

  const fetchHistory = async () => {
    setLoading(prev => ({ ...prev, history: true }));
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/history`, { 
        params: { user_id } 
      });
      setHistory(res.data);
    } catch (err) {
      setError("Failed to fetch history");
      console.error("History error:", err);
    } finally {
      setLoading(prev => ({ ...prev, history: false }));
    }
  };

  const handleChat = async () => {
    if (!message.trim()) return;
    
    setLoading(prev => ({ ...prev, chat: true }));
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/chatbot`, { 
        user_id, 
        message 
      });
      setChatResponse(res.data.response);
      setMessage("");
    } catch (err) {
      setError("Failed to get chatbot response");
      console.error("Chat error:", err);
    } finally {
      setLoading(prev => ({ ...prev, chat: false }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleChat();
    }
  };

  const lineChart = {
    labels: chartData.map((_, i) => i),
    datasets: [
      {
        label: "Accel X",
        data: chartData.map(d => d.x),
        borderColor: "#007BFF",
        borderWidth: 2,
        fill: false,
        tension: 0.3
      },
      {
        label: "Gyro X",
        data: chartData.map(d => d.gx),
        borderColor: "#FF6B00",
        borderWidth: 2,
        fill: false,
        tension: 0.3
      },
      {
        label: "Knee Angle",
        data: chartData.map(d => d.knee_angle),
        borderColor: "#28a745",
        borderWidth: 2,
        fill: false,
        tension: 0.3
      }
    ]
  };

  return (
    <div className="saviour-mode">
      <h1>Saviour Mode: Real-Time Knee Motion</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="dashboard">
        <div className="data-section">
          <h2>Sensor Data</h2>
          <div className="sensor-data">
            <p>Accel: x: {sensorData.x}, y: {sensorData.y}, z: {sensorData.z}</p>
            <p>Gyro: gx: {sensorData.gx}, gy: {sensorData.gy}, gz: {sensorData.gz}</p>
            <p>Knee Angle: {sensorData.knee_angle}°</p>
          </div>
          
          <div className="chart-container">
            <Line data={lineChart} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false
                }
              }
            }} />
          </div>
          
          <div className="action-buttons">
            <button 
              onClick={handlePrediction} 
              disabled={loading.predict}
            >
              {loading.predict ? "Predicting..." : "Predict"}
            </button>
            <button 
              onClick={handleRecord} 
              disabled={loading.record}
            >
              {loading.record ? "Recording..." : "Record"}
            </button>
          </div>
          
          <div className="prediction-result">
            <h3>Prediction: {prediction || "Not predicted yet"}</h3>
          </div>
        </div>
        
        <div className="assessment-section">
          <h2>Assessment</h2>
          <button 
            onClick={fetchAssessment} 
            disabled={loading.assessment}
          >
            {loading.assessment ? "Loading..." : "Get Assessment"}
          </button>
          
          {assessment && (
            <div className="assessment-results">
              <p>Total Readings: {assessment.total_readings}</p>
              <p>Abnormal %: {assessment.abnormal_percentage}%</p>
              <p>Avg Accel Magnitude: {assessment.average_acceleration_magnitude}</p>
            </div>
          )}
        </div>
        
        <div className="history-section">
          <h2>History</h2>
          <button 
            onClick={fetchHistory} 
            disabled={loading.history}
          >
            {loading.history ? "Loading..." : "Fetch History"}
          </button>
          
          <div className="history-list">
            {history.map((h, i) => (
              <div key={i} className="history-item">
                <p>{new Date(h.timestamp).toLocaleString()} - {h.prediction}</p>
                <p>Accel: ({h.x.toFixed(2)}, {h.y.toFixed(2)}, {h.z.toFixed(2)})</p>
                <p>Gyro: ({h.gx.toFixed(2)}, {h.gy.toFixed(2)}, {h.gz.toFixed(2)})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="chat-section">
        <h2>🤖 BotKnee</h2>
        <div className="chat-container">
          <div className="chat-response">
            {chatResponse || "Ask me anything about your knee health..."}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="I'll help you become healthier!"
              disabled={loading.chat}
            />
            <button 
              onClick={handleChat} 
              disabled={loading.chat || !message.trim()}
            >
              {loading.chat ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaviourMode;