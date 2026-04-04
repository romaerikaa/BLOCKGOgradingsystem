import React, { useState } from 'react';
import plvlogo from './plvlogo.png';

const FacultyPortal = ({ facultyData, onLogout }) => {
  const [sections, setSections] = useState({
    "BSIT 2-1": {
      subjectCode: "GE 101",
      subjectTitle: "Understanding the Self",
      sectionCourse: "BS Information Technology",
      students: [
        { id: '2023-001', name: 'Juan Dela Cruz', midterm: 85, finals: 90 },
        { id: '2023-002', name: 'Maria Santos', midterm: 70, finals: 75 },
      ]
    },
    "BSIT 2-2": {
      subjectCode: "IT 21",
      sectionCourse: "BS Information Technology",
      subjectTitle: "Object Oriented Programming",
      students: [
        { id: '2023-101', name: 'Ricardo Dalisay', midterm: 88, finals: 82 },
        { id: '2023-102', name: 'Liza Soberano', midterm: 95, finals: 91 },
      ]
    },
    "BSIT 3-1": {
      subjectCode: "IT 23",
      subjectTitle: "Web Development",
      sectionCourse: "BS Information Technology",
      students: [
        { id: '2023-201', name: 'Boni Facio', midterm: 75, finals: 80 },
      ]
    }
  });

  const [activeSection, setActiveSection] = useState(null);

  const calculatePLVPoint = (m, f) => {
    const avg = (parseFloat(m) + parseFloat(f)) / 2;
    if (avg >= 97) return 1.00;
    if (avg >= 75) return 3.00;
    return 5.00; // Simplified for brevity
  };

  const handleGradeChange = (sectionName, index, field, value) => {
    const updatedSections = JSON.parse(JSON.stringify(sections)); // Deep copy to avoid direct state mutation issues
    updatedSections[sectionName].students[index][field] = parseFloat(value) || 0;
    setSections(updatedSections);
  };

  const ENCODING_START = new Date('2026-04-01');
  const ENCODING_END = new Date('2026-04-06');


  const getBannerState = () => {
  const today = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil((ENCODING_END - today) / msPerDay);

  if (today < ENCODING_START) {
    return { state: 'closed', daysLeft: 0 };
  } else if (today > ENCODING_END) {
    return { state: 'over', daysLeft: 0 };
  } else if (daysLeft <= 3) {
    return { state: 'urgent', daysLeft };
  } else {
    return { state: 'open', daysLeft };
  }
  };

  const banner = getBannerState();

  const formatDate = (date) =>
  date.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });

  return (
    <div className="portal-container">

    
      {/* ── NAVBAR ── */}
      <nav className="header-greetings">
        <div className="greeting-text">
          <div className="greeting-text-content">
            <img src={plvlogo} alt="PLV Logo" className="plv-header-logo" />
            <h1>Welcome, {facultyData.sex === "Male" ? "Mr." : "Ms./Mrs."} {facultyData.lastName}!</h1>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            LOGOUT
          </button>
        </div>
      </nav>

    <header className="student-header">
    <div>
        <h1 style={{ margin: 0 }}>{facultyData.firstName} {facultyData.lastName}</h1>
        <h2 style={{ fontSize: '1.2rem', opacity: 0.9 }}>{facultyData.name}</h2>
        <p style={{ margin: '5px 0 0 0' }}>{facultyData.department}</p>
    </div>

    <div className="summary-section">
    {/* Section Count Box */}
        <div className="stat-card">
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Sections</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{Object.keys(sections).length}</div>
        </div>

    {/* Employment Status Box (GWA Style) */}
        <div className="stat-card gold">
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Classification</div>
            <div style={{ fontSize: '1.1rem' }}>{facultyData.status}</div>
        </div>

  </div>
    </header>
    {banner.state === 'open' && (
  <div className="banner-open encoding-banner">
    <div>
      <strong>Grade Encoding Period is Open!</strong>
      <p>Finalize your section grades and upload to the Registrar by <strong>{formatDate(ENCODING_END)}</strong>.</p>
    </div>
  </div>
)}

{banner.state === 'urgent' && (
  <div className="banner-open banner-urgent encoding-banner">
    <div>
      <strong>Grade Encoding Deadline in {banner.daysLeft} Day{banner.daysLeft > 1 ? 's' : ''}!</strong>
      <p>You have <strong>{banner.daysLeft} day{banner.daysLeft > 1 ? 's' : ''}</strong> left to submit grades before the deadline on <strong>{formatDate(ENCODING_END)}</strong>. Please upload immediately to avoid penalties.</p>
    </div>
  </div>
)}

{banner.state === 'over' && (
  <div className="banner-open banner-closed encoding-banner">
    <div>
      <strong>Grade Encoding Period is currently Closed.</strong>
      <p>The encoding deadline has passed as of <strong>{formatDate(ENCODING_END)}</strong>. Contact or visit the Registrar's Office for any concerns.</p>
    </div>
  </div>
)}

{banner.state === 'closed' && (
  <div className="banner-open banner-closed encoding-banner">
    <div className="banner-icon">📅</div>
    <div>
      <strong>Grade Encoding is not yet Open</strong>
      <p>The encoding period opens on <strong>{formatDate(ENCODING_START)}</strong>. Check back then to submit your grades.</p>
    </div>
  </div>
)}

      {/* 2. Section Selector Cards */}
      {!activeSection ? (
        <div className="section-grid"> 
  {Object.entries(sections).map(([sectionName, sectionData]) => (
    <div key={sectionName} className="section-card">
      {/* 1. Subject Code Pill */}
      <div className="subject-pill">{sectionData.subjectCode}</div>

      {/* 2. Subject Title */}
      <h2 className="subject-title">{sectionData.subjectTitle}</h2>

      {/* 3. Section & Department Pill */}
      <div className="section-dept-row"> 
        <span className="section-name">{sectionName}</span>
        <span className="dept-pill">{sectionData.sectionCourse}</span>
      </div>

      <hr className="card-divider" />

      {/* 4. Mini Stats Row */}
      <div className="card-stats">
        <span>Students: {sectionData.students.length}</span>
        <span>SY: 2025-2026</span>
        <span>Semester: 2nd</span>
      </div>
 
      {/* 5. Action Buttons */}
      <div className="section-actions">
        <button className="view-btn" onClick={() => setActiveSection(sectionName)}>
          View Grades
        </button>
        
        <label className="upload-label">
          Upload Grading Sheet
          <input type="file" style={{ display: 'none' }} />
        </label>

        <button className="registrar-btn">
          Upload to Registrar
        </button>
      </div>
    </div>
  ))}
</div>
      ) : (
        /* 3. Grading Table View */
        <div>
          <button className="back-btn" onClick={() => setActiveSection(null)}>
            ← Back to Sections
          </button>
          <div className="table-container">
            <div className="table-header-custom">
              <h3 style={{ padding: '20px', margin: 0 }}>Section: {activeSection}</h3>
            </div>
            <table className="plv-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Midterm</th>
                  <th>Finals</th>
                  <th>Final Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sections[activeSection].students.map((stu, index) => {
                  const finalPoint = calculatePLVPoint(stu.midterm, stu.finals);
                  const isPassed = finalPoint <= 3.0;
                  return (
                    <tr key={stu.id}>
                      <td className="sub-code">{stu.id}</td>
                      <td className="sub-title">{stu.name}</td>
                      <td><input type="number" className="grade-input" value={stu.midterm} onChange={(e) => handleGradeChange(activeSection, index, 'midterm', e.target.value)} /></td>
                      <td><input type="number" className="grade-input" value={stu.finals} onChange={(e) => handleGradeChange(activeSection, index, 'finals', e.target.value)} /></td>
                      <td className="final-point">{finalPoint.toFixed(2)}</td>
                      <td><span className={`status-pill ${isPassed ? 'passed' : 'failed'}`}>{isPassed ? "PASSED" : "FAILED"}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyPortal;