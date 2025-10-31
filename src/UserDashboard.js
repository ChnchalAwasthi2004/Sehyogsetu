import React, { useState, useEffect } from "react";
import "./App.css";

function UserDashboard({ onLogout, onShowProfile }) {
  const [userData, setUserData] = useState(null);
  const [userComplaints, setUserComplaints] = useState([]);

  // Load user data from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('userProfile'));
    const savedComplaints = JSON.parse(localStorage.getItem('userComplaints')) || [];
    
    if (savedUser) {
      setUserData(savedUser);
    } else {
      // Default user data
      const defaultUser = {
        name: 'User',
        points: 0,
        level: 'New Member',
        complaintsResolved: 0,
        complaintsPending: 0
      };
      setUserData(defaultUser);
    }
    
    setUserComplaints(savedComplaints);
  }, []);

  // Handle complaint submission
  const handleReportIssue = (type) => {
    const newComplaint = {
      id: Date.now(),
      type: type,
      title: getComplaintTitle(type),
      description: '',
      status: 'pending',
      date: new Date().toLocaleDateString(),
      points: getPointsForType(type)
    };

    const updatedComplaints = [...userComplaints, newComplaint];
    setUserComplaints(updatedComplaints);
    localStorage.setItem('userComplaints', JSON.stringify(updatedComplaints));

    // Update user points
    if (userData) {
      const updatedUser = {
        ...userData,
        points: userData.points + newComplaint.points,
        complaintsPending: userData.complaintsPending + 1
      };
      setUserData(updatedUser);
      localStorage.setItem('userProfile', JSON.stringify(updatedUser));
    }

    alert(`Thank you for reporting ${getComplaintTitle(type)}! You earned ${newComplaint.points} points.`);
  };

  const getComplaintTitle = (type) => {
    switch(type) {
      case 'waste': return 'Waste Management Issue';
      case 'civic': return 'Civic Issue';
      case 'animal': return 'Animal Welfare Case';
      default: return 'Issue';
    }
  };

  const getPointsForType = (type) => {
    switch(type) {
      case 'waste': return 10;
      case 'civic': return 15;
      case 'animal': return 20;
      default: return 5;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'resolved': return '✅ Resolved';
      case 'in-progress': return '🔄 In Progress';
      case 'pending': return '⏳ Pending';
      default: return '📝 Submitted';
    }
  };

  const getComplaintIcon = (type) => {
    switch(type) {
      case 'waste': return '🚮';
      case 'civic': return '🏗️';
      case 'animal': return '🐾';
      default: return '📝';
    }
  };

  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-dashboard">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src="/sehyogsetu_logo.jpg" alt="SEHYOGSETU Logo" className="logo-img" />
          SEHYOGSETU
        </div>
        <nav>
          <a href="#dashboard">Dashboard</a>
          <button 
            className="nav-profile-btn"
            onClick={onShowProfile}
          >
            👤 Profile
          </button>
          <button className="nav-logout-btn" onClick={onLogout}>
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Welcome Section with Gradient */}
        <div className="welcome-section">
          <div className="welcome-badge">🎉</div>
          <h1>Welcome back, {userData.name}! 👋</h1>
          <p className="welcome-message">Thank you for joining our mission to make cities cleaner and better</p>
          <div className="user-stats">
            <div className="user-stat">
              <span className="stat-number">{userComplaints.length}</span>
              <span className="stat-label">Total Reports</span>
            </div>
            <div className="user-stat">
              <span className="stat-number">{userData.points}</span>
              <span className="stat-label">Points Earned</span>
            </div>
            <div className="user-stat">
              <span className="stat-number">{userData.complaintsResolved}</span>
              <span className="stat-label">Resolved</span>
            </div>
            <div className="user-stat">
              <span className="stat-number">{userData.complaintsPending}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>🚀 Quick Actions</h2>
          <p className="section-description">Choose what you want to report</p>
          <div className="action-cards">
            <div className="action-card waste-card">
              <div className="card-icon">🚮</div>
              <h3>Report Waste Issue</h3>
              <p>Report uncollected garbage or waste management problems in your area</p>
              <p className="points-info">🎯 Earn 10 points</p>
              <button 
                className="action-btn waste-btn"
                onClick={() => handleReportIssue('waste')}
              >
                Report Now
              </button>
            </div>
            
            <div className="action-card civic-card">
              <div className="card-icon">🏗️</div>
              <h3>Report Civic Issue</h3>
              <p>Report potholes, broken streetlights, drainage issues with location</p>
              <p className="points-info">🎯 Earn 15 points</p>
              <button 
                className="action-btn civic-btn"
                onClick={() => handleReportIssue('civic')}
              >
                Report Now
              </button>
            </div>
            
            <div className="action-card animal-card">
              <div className="card-icon">🐾</div>
              <h3>Animal Welfare</h3>
              <p>Report injured stray animals needing immediate help and rescue</p>
              <p className="points-info">🎯 Earn 20 points</p>
              <button 
                className="action-btn animal-btn"
                onClick={() => handleReportIssue('animal')}
              >
                Report Now
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <div className="activity-header">
            <h2>📊 Your Activity</h2>
            <span className="activity-badge">
              {userComplaints.length > 0 ? `${userComplaints.length} Reports` : 'New User'}
            </span>
          </div>
          
          {userComplaints.length > 0 ? (
            <div className="complaints-list">
              {userComplaints.slice().reverse().map(complaint => (
                <div key={complaint.id} className="complaint-item">
                  <div className="complaint-icon">
                    {getComplaintIcon(complaint.type)}
                  </div>
                  <div className="complaint-details">
                    <h4>{complaint.title}</h4>
                    <p>Submitted on {complaint.date}</p>
                    <span className="points-earned">+{complaint.points} points</span>
                  </div>
                  <div className="complaint-status">
                    {getStatusBadge(complaint.status)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No complaints yet</h3>
              <p>Start by reporting your first issue and make a difference!</p>
              <button 
                className="cta-button"
                onClick={() => handleReportIssue('waste')}
              >
                Report Your First Issue
              </button>
            </div>
          )}
        </div>

        {/* Achievement Section */}
        <div className="achievement-section">
          <h3>🏆 Your Achievements</h3>
          <div className="achievements-grid">
            <div className={`achievement ${userComplaints.length >= 1 ? 'unlocked' : 'locked'}`}>
              <span>🚀</span>
              <p>First Report</p>
              <small>{userComplaints.length >= 1 ? 'Unlocked!' : 'Report 1 issue'}</small>
            </div>
            <div className={`achievement ${userData.points >= 50 ? 'unlocked' : 'locked'}`}>
              <span>⭐</span>
              <p>Active Citizen</p>
              <small>{userData.points >= 50 ? 'Unlocked!' : 'Earn 50 points'}</small>
            </div>
            <div className={`achievement ${userComplaints.length >= 5 ? 'unlocked' : 'locked'}`}>
              <span>🏅</span>
              <p>Community Helper</p>
              <small>{userComplaints.length >= 5 ? 'Unlocked!' : '5 reports'}</small>
            </div>
            <div className={`achievement ${userData.points >= 100 ? 'unlocked' : 'locked'}`}>
              <span>👑</span>
              <p>City Champion</p>
              <small>{userData.points >= 100 ? 'Unlocked!' : '100 points'}</small>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h3>💡 Quick Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-number">1</span>
              <p>Take clear photos of the issue</p>
            </div>
            <div className="tip-card">
              <span className="tip-number">2</span>
              <p>Enable location for accurate tracking</p>
            </div>
            <div className="tip-card">
              <span className="tip-number">3</span>
              <p>Add detailed description</p>
            </div>
            <div className="tip-card">
              <span className="tip-number">4</span>
              <p>Track your complaint status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;