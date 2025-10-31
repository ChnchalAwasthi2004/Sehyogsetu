import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = ({ onBack }) => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  // User data localStorage se load karna
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('userProfile'));
    const savedComplaints = JSON.parse(localStorage.getItem('userComplaints')) || [];
    
    if (savedUser) {
      setUserData(savedUser);
      setEditedData(savedUser);
    } else {
      // Default demo data
      const defaultUser = {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '+91-9876543210',
        joinDate: '2024-01-15',
        points: 450,
        level: 'Community Hero',
        avatar: '👨‍💼',
        location: 'Lucknow, UP',
        complaintsResolved: 23,
        complaintsPending: 4
      };
      setUserData(defaultUser);
      setEditedData(defaultUser);
      localStorage.setItem('userProfile', JSON.stringify(defaultUser));
    }
  }, []);

  // Data update karna
  const handleUpdateProfile = () => {
    setUserData(editedData);
    localStorage.setItem('userProfile', JSON.stringify(editedData));
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      {/* Header */}
      <div className="profile-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1>My Profile</h1>
      </div>

      {/* Main Profile Section */}
      <div className="profile-content">
        {/* Left Sidebar - Profile Card */}
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="avatar-section">
              <div className="avatar">{userData.avatar}</div>
              <div className="user-info">
                <h2>{userData.name}</h2>
                <p className="user-level">{userData.level}</p>
                <p className="user-join">Member since {userData.joinDate}</p>
              </div>
            </div>

            {/* Points & Stats */}
            <div className="points-section">
              <div className="points-display">
                <span className="points-label">Points Earned</span>
                <span className="points-value">{userData.points} pts</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{width: `${Math.min((userData.points / 1000) * 100, 100)}%`}}
                ></div>
              </div>
              <p className="next-level">Next level at 1000 points</p>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-number">{userData.complaintsResolved}</span>
                <span className="stat-label">Resolved</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userData.complaintsPending}</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15</span>
                <span className="stat-label">Cities</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="profile-nav">
            <button 
              className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              👤 Personal Info
            </button>
            <button 
              className={`nav-btn ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              📊 My Activity
            </button>
            <button 
              className={`nav-btn ${activeTab === 'rewards' ? 'active' : ''}`}
              onClick={() => setActiveTab('rewards')}
            >
              🏆 Rewards
            </button>
            <button 
              className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="profile-main">
          {/* Personal Info Tab */}
          {activeTab === 'profile' && (
            <div className="tab-content">
              <div className="tab-header">
                <h3>Personal Information</h3>
                <button 
                  className="edit-btn"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <div className="info-form">
                <div className="form-group">
                  <label>Full Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    <p>{userData.name}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  {editMode ? (
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <p>{userData.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <p>{userData.phone}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Location</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={editedData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  ) : (
                    <p>{userData.location}</p>
                  )}
                </div>

                {editMode && (
                  <button className="save-btn" onClick={handleUpdateProfile}>
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="tab-content">
              <h3>My Activity</h3>
              <div className="activity-stats">
                <div className="activity-card">
                  <h4>📈 This Month</h4>
                  <p>12 Reports Submitted</p>
                  <p>8 Issues Resolved</p>
                </div>
                <div className="activity-card">
                  <h4>🏆 Achievements</h4>
                  <p>First Report ✓</p>
                  <p>Quick Responder ✓</p>
                  <p>Community Hero ✓</p>
                </div>
              </div>
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div className="tab-content">
              <h3>My Rewards & Badges</h3>
              <div className="badges-grid">
                <div className="badge earned">
                  <span>🚀</span>
                  <p>First Report</p>
                </div>
                <div className="badge earned">
                  <span>⚡</span>
                  <p>Quick Action</p>
                </div>
                <div className="badge earned">
                  <span>🏆</span>
                  <p>Community Hero</p>
                </div>
                <div className="badge locked">
                  <span>🌟</span>
                  <p>Super Star</p>
                </div>
                <div className="badge locked">
                  <span>👑</span>
                  <p>City Champion</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-content">
              <h3>Account Settings</h3>
              <div className="settings-options">
                <div className="setting-item">
                  <span>🔔 Notifications</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <span>🌙 Dark Mode</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <span>📧 Email Updates</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserProfile;