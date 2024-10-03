import React, { useState } from 'react';
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

  const calculateROI = () => {
    // Calculate manual testing hours saved
    const hoursSaved = testCases * releases * (regressionCoverage / 100);
    setManualHoursSaved(hoursSaved);

    // Calculate savings in dollar value for manual testing
    const dollarSavings = hoursSaved * 36;
    setManualDollarSavings(dollarSavings);

    // Calculate savings in maintenance effort in person hours
    const maintenanceHours = hoursSaved * 0.1; // Assuming 10% of manual hours saved in maintenance
    setMaintenanceHoursSaved(maintenanceHours);

    // Calculate savings in dollar value for maintenance effort
    const maintenanceDollar = maintenanceHours * 40;
    setMaintenanceDollarSavings(maintenanceDollar);
  };

  return (
    <div className="roi-calculator">
      <h1>ROI Calculator</h1>
      <label>
        Number of Environments/Sandboxes:
        <input
          type="number"
          placeholder="Enter number of environments"
          value={environments}
          onChange={(e) => setEnvironments(e.target.value)}
        />
      </label>
      <label>
        Number of Test Cases per Cycle:
        <input
          type="number"
          placeholder="Enter number of test cases"
          value={testCases}
          onChange={(e) => setTestCases(e.target.value)}
        />
      </label>
      <label>
        Number of Releases per Month:
        <input
          type="number"
          placeholder="Enter number of releases"
          value={releases}
          onChange={(e) => setReleases(e.target.value)}
        />
      </label>
      <label>
        Regression Coverage per Release (%):
        <input
          type="number"
          placeholder="Enter regression coverage percentage"
          value={regressionCoverage}
          onChange={(e) => setRegressionCoverage(e.target.value)}
        />
      </label>
      <button onClick={calculateROI}>Calculate ROI</button>
      {manualHoursSaved !== null && (
        <div className="output-fields">
          <div>
            <p>Project Savings in First Year (hours): {manualHoursSaved}</p>
            <p>Number of manual testing hours saved in a year</p>
          </div>
          <div>
            <p>Savings in Dollar Value for Manual Testing: ${manualDollarSavings.toFixed(2)}</p>
            <p>Average $36 per hour rate for a manual tester</p>
          </div>
          <div>
            <p>Savings in Maintenance Effort (hours): {maintenanceHoursSaved}</p>
            <p>Assuming 10% of manual hours saved in maintenance</p>
          </div>
          <div>
            <p>Savings in Dollar Value for Maintenance Effort: ${maintenanceDollarSavings.toFixed(2)}</p>
            <p>Average $40 per hour rate for an automation engineer</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ROICalculator;
