import React, { useState, useEffect } from "react";
import { Activity, X } from "lucide-react";
import "./TherapyMode.css";

const TherapyMode = () => {
  const [therapyStatus, setTherapyStatus] = useState("idle");
  const [sessionDuration, setSessionDuration] = useState(0);
  const [showDurationSelector, setShowDurationSelector] = useState(false);
  const [showGelPadInstructions, setShowGelPadInstructions] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(15);
  const [remainingTime, setRemainingTime] = useState(0);
  const [intervalIds, setIntervalIds] = useState({ duration: null, countdown: null });

  useEffect(() => {
    return () => {
      if (intervalIds.duration) clearInterval(intervalIds.duration);
      if (intervalIds.countdown) clearInterval(intervalIds.countdown);
    };
  }, [intervalIds]);

  const startTherapy = () => {
    setShowDurationSelector(true);
  };

  const selectDurationAndContinue = () => {
    setShowDurationSelector(false);
    setShowGelPadInstructions(true);
    setRemainingTime(selectedDuration * 60);
  };

  const continueToActiveTherapy = () => {
    setShowGelPadInstructions(false);
    setTherapyStatus("active");

    const durationIntervalId = setInterval(() => {
      setSessionDuration(prev => prev + 1);
    }, 1000);

    const countdownIntervalId = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(countdownIntervalId);
          clearInterval(durationIntervalId);
          stopTherapy();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalIds({ duration: durationIntervalId, countdown: countdownIntervalId });
  };

  const stopTherapy = () => {
    setTherapyStatus("idle");
    setSessionDuration(0);

    if (intervalIds.duration) clearInterval(intervalIds.duration);
    if (intervalIds.countdown) clearInterval(intervalIds.countdown);

    setIntervalIds({ duration: null, countdown: null });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const renderDurationSelector = () => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Set Therapy Duration</h2>
          <div className="duration-selector">
            <input 
              type="range" 
              min="5" 
              max="60" 
              step="5"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
            />
            <div className="preset-durations">
              {[15, 20, 30].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setSelectedDuration(mins)}
                  className={`preset-button ${selectedDuration === mins ? "selected" : ""}`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>
          <button onClick={selectDurationAndContinue} className="continue-button">
            Continue
          </button>
        </div>
      </div>
    );
  };

  const renderGelPadInstructions = () => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Attach Gel Pads</h2>
          <p>Attach the gel pads to your knee as shown in the diagram below.</p>
          <button onClick={continueToActiveTherapy} className="continue-button">Continue</button>
        </div>
      </div>
    );
  };

  return (
    <div className="therapy-mode">
      <h1>Therapy Mode</h1>
      <div className="therapy-status-card">
        <div className="status-row">
          <span>Status:</span>
          <span>{therapyStatus === "active" ? "Therapy Active" : "Idle"}</span>
        </div>
        <div className="status-row">
          <span>Session Duration:</span>
          <span>{formatTime(sessionDuration)}</span>
        </div>
        {therapyStatus === "active" && (
          <div className="status-row">
            <span>Remaining Time:</span>
            <span>{formatTime(remainingTime)}</span>
          </div>
        )}
        {therapyStatus === "idle" ? (
          <button onClick={startTherapy} className="action-button start">
            <Activity size={20} /> Start Therapy
          </button>
        ) : (
          <button onClick={stopTherapy} className="action-button stop">
            <X size={20} /> Stop Therapy
          </button>
        )}
      </div>
      {showDurationSelector && renderDurationSelector()}
      {showGelPadInstructions && renderGelPadInstructions()}
    </div>
  );
};

export default TherapyMode;
