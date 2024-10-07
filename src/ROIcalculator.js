import React, { useState, useEffect, useCallback } from 'react';
import './ROICalculator.css';

function ROICalculator() {
  const [environments, setEnvironments] = useState('');
  const [testCases, setTestCases] = useState('');
  const [releases, setReleases] = useState('');
  const [regressionCoverage, setRegressionCoverage] = useState('');
  const [manualHoursSaved, setManualHoursSaved] = useState(null);
  const [manualDollarSavings, setManualDollarSavings] = useState(null);
  const [maintenanceHoursSaved, setMaintenanceHoursSaved] = useState(null);
  const [maintenanceDollarSavings, setMaintenanceDollarSavings] = useState(null);

  const calculateROI = useCallback(() => {
    const hoursSaved = testCases * releases * (regressionCoverage / 100);
    setManualHoursSaved(hoursSaved);

    const dollarSavings = hoursSaved * 36;
    setManualDollarSavings(dollarSavings);

    const maintenanceHours = hoursSaved * 0.1;
    setMaintenanceHoursSaved(maintenanceHours);

    const maintenanceDollar = maintenanceHours * 40;
    setMaintenanceDollarSavings(maintenanceDollar);
  }, [testCases, releases, regressionCoverage]);

  useEffect(() => {
    calculateROI();
  }, [testCases, releases, regressionCoverage, calculateROI]);

  return (
    <div className="roi-calculator">
      <h1>ROI Calculator</h1>
      <div className="form-group">
        <label htmlFor="environments">Number of Environments/Sandboxes:</label>
        <input
          id="environments"
          type="number"
          placeholder="Enter number of environments"
          value={environments}
          onChange={(e) => setEnvironments(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="testCases">Number of Test Cases per Cycle:</label>
        <input
          id="testCases"
          type="number"
          placeholder="Enter number of test cases"
          value={testCases}
          onChange={(e) => setTestCases(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="releases">Number of Releases per Month:</label>
        <input
          id="releases"
          type="number"
          placeholder="Enter number of releases"
          value={releases}
          onChange={(e) => setReleases(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="regressionCoverage">Regression Coverage per Release (%):</label>
        <input
          id="regressionCoverage"
          type="number"
          placeholder="Enter regression coverage percentage"
          value={regressionCoverage}
          onChange={(e) => setRegressionCoverage(e.target.value)}
        />
      </div>
      {manualHoursSaved !== null && (
        <div className="output-fields">
          <div className="card">
            <p className="card-title">Project Savings in First Year (hours): {manualHoursSaved}</p>
            <p className="card-content">Number of manual testing hours saved in a year</p>
          </div>
          <div className="card">
            <p className="card-title">Savings in Dollar Value for Manual Testing: ${manualDollarSavings.toFixed(2)}</p>
            <p className="card-content">Average $36 per hour rate for a manual tester</p>
          </div>
          <div className="card">
            <p className="card-title">Savings in Maintenance Effort (hours): {maintenanceHoursSaved}</p>
            <p className="card-content">Assuming 10% of manual hours saved in maintenance</p>
          </div>
          <div className="card">
            <p className="card-title">Savings in Dollar Value for Maintenance Effort: ${maintenanceDollarSavings.toFixed(2)}</p>
            <p className="card-content">Average $40 per hour rate for an automation engineer</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ROICalculator;
