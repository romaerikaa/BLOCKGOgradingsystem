import React, { useState, useEffect } from 'react';
import plvlogo from './plvlogo.png';
import infoLogo from './infoLogo.webp';

const StudentPortal = ({ studentData, onLogout }) => {
  const [showWarning, setShowWarning] = useState(false);

  const getPLVPoint = (midterm, finals) => {
    const average = (midterm + finals) / 2;
    if (average >= 97) return 1.00;
    if (average >= 94) return 1.25;
    if (average >= 91) return 1.50;
    if (average >= 88) return 1.75;
    if (average >= 85) return 2.00;
    if (average >= 75) return 3.00;
    return 5.00; // Failing grade
  };

  // --- CALCULATION LOGIC ---
  const totalUnits = studentData.subjects.reduce((sum, sub) => sum + sub.units, 0);
  const totalWeight = studentData.subjects.reduce((sum, sub) => {
    const point = getPLVPoint(sub.midterm, sub.finals);
    return sum + (point * sub.units);
  }, 0);
  
  const calculatedGWA = totalUnits > 0 ? (totalWeight / totalUnits).toFixed(2) : "0.00";

  // --- FIX: Define failedSubjects and failedUnits ---
  const failedSubjects = studentData.subjects.filter(sub => getPLVPoint(sub.midterm, sub.finals) === 5.00);
  const failedUnits = failedSubjects.reduce((sum, sub) => sum + sub.units, 0);

  // Auto-show warning if they have failed subjects
  useEffect(() => {
    if (failedSubjects.length > 0) {
      setShowWarning(true);
    }
  }, [failedSubjects.length]);

  const isDeansLister = calculatedGWA <= 1.75 && studentData.subjects.every(s => getPLVPoint(s.midterm, s.finals) <= 2.25);

  return (
    <div className="portal-container">

      {/* ── ACADEMIC WARNING MODAL ── */}
      {showWarning && (
        <div className="warning-overlay">
          <div className="warning-modal">
            <div className="warning-modal-header">
              <div className="warning-icon-circle">
                <span className="warning-triangle">⚠</span>
              </div>
              <div className="warning-header-text">
                <h2>Academic Warning</h2>
                <p>This requires your immediate attention</p>
              </div>
            </div>

            <div className="warning-modal-body">
              <p className="warning-description">
                You have{' '}
                <strong className="warning-highlight">
                  {failedSubjects.length} failed subject{failedSubjects.length > 1 ? 's' : ''} equivalent to {failedUnits} units
                </strong>
                . Please proceed to the Registrar's Office for proper assessment or transfer out process.
              </p>

              <div className="warning-subjects-list">
                {failedSubjects.map((sub, index) => (
                  <div className="warning-subject-row" key={index}>
                    <span className="warning-subject-name">
                      {sub.code || 'N/A'} — {sub.name}
                    </span>
                    <span className="warning-subject-grade">5.00</span>
                  </div>
                ))}
              </div>

              <div className="warning-actions">
                <button className="warning-btn-secondary" onClick={() => setShowWarning(false)}>
                  Continue to Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav className="header-greetings">
        <div className="greeting-text">
          <div className="greeting-text-content">
            <img src={plvlogo} alt="PLV Logo" className="plv-header-logo" />
            <h1>Welcome, PLVian!</h1>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            LOGOUT
          </button>
        </div>
      </nav>

      {/* ── STUDENT PERSONAL INFORMATION CARD ── */}
      <div className="personal-info-card">
        <h3 className="personal-info-title">Student Personal Information</h3>
        <div className="personal-info-grid">
          <div className="info-field">
            <span className="info-label">First Name</span>
            <span className="info-value">{studentData.firstName || '—'}</span>
          </div>
          <div className="info-field">
            <span className="info-label">Last Name</span>
            <span className="info-value">{studentData.lastName || '—'}</span>
          </div>
          <div className="info-field">
            <span className="info-label">Middle Name</span>
            <span className="info-value">{studentData.middleName || '—'}</span>
          </div>
          <div className="info-field">
            <span className="info-label">Student ID</span>
            <span className="info-value">{studentData.studentId || '—'}</span>
          </div>
          <div className="info-field">
            <span className="info-label">Date Of Birth</span>
            <span className="info-value">{studentData.dateOfBirth || '—'}</span>
          </div>
          <div className="info-field"></div>
          <div className="info-field">
            <span className="info-label">Phone Number</span>
            <span className="info-value">{studentData.phone || '—'}</span>
          </div>
          <div className="info-field">
            <span className="info-label">Sex</span>
            <span className="info-value">{studentData.sex || '—'}</span>
          </div>
          <div className="info-field">
            <span className="info-label">Email Address</span>
            <span className="info-value">{studentData.email || '—'}</span>
          </div>
          <div className="info-field info-field--wide">
            <span className="info-label">Home Address</span>
            <span className="info-value">{studentData.address || '—'}</span>
          </div>
        </div>
        <p className="personal-info-note">
          <img src={infoLogo} alt="info Logo" className="info-logo" />
          If your personal information is incorrect or requires an update, kindly visit the Office of the Registrar for assistance.
        </p>
      </div>

      {/* ── SEMESTER HEADER + GWA ── */}
      <header className="student-header">
        <div className="student-info">
          <h2>School Year: 2023-2024</h2>
          <p>1st Semester Grades</p>
        </div>
        <div className="summary-section">
          {isDeansLister && (
            <div className="dean-card">
              <span>Dean's Lister</span>
            </div>
          )}
          <div className="stat-card">
            <span>Total Units</span>
            <h3>{totalUnits}</h3>
          </div>
          <div className="stat-card gold">
            <span>General Weighted</span><br />
            <span>Average</span>
            <h3>{calculatedGWA}</h3>
          </div>
        </div>
      </header>

      {/* ── GRADE TABLE ── */}
      
      <div className="table-container">
        <table className="plv-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Subject Title</th>
              <th>Units</th>
              <th>Midterm</th>
              <th>Finals</th>
              <th>Final Grade</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {studentData.subjects.map((sub, index) => {
              const finalPoint = getPLVPoint(sub.midterm, sub.finals);
              const passed = finalPoint <= 3.0;
              return (
                <tr key={index}>
                  <td className="sub-code">{sub.code || 'IT-XXX'}</td>
                  <td className="sub-title">{sub.name}</td>
                  <td className="units-count">{sub.units}</td>
                  <td>{sub.midterm}</td>
                  <td>{sub.finals}</td>
                  <td className="final-point">{finalPoint.toFixed(2)}</td>
                  <td>
                    <span className={`status-pill ${passed ? 'passed' : 'failed'}`}>
                      {passed ? "PASSED" : "FAILED"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      {/* ── CONDITIONAL GRADE WARNING SECTION ── */}
      {failedSubjects.length >= 2 && (
        <div className="grade-warning-section">
          <p>
              Academic Warning: You have{' '}
            <strong>
              {failedSubjects.length} failed subject{failedSubjects.length > 1 ? 's' : ''} equivalent to {failedUnits} units
            </strong>. Please visit the Registrar's Office for assistance or assessment.
          </p>
        </div>
      )}

    </div>
  );
};

export default StudentPortal;