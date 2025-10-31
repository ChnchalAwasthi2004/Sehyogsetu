import React, { useState } from "react";
import IntroVideo from "./Innovideo";
import UserDashboard from "./UserDashboard";
import UserProfile from "./UserProfile";
import "./App.css";

function App() {
  const [showVideo, setShowVideo] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');
  const [loginMethod, setLoginMethod] = useState('email');
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleVideoFinish = () => {
    setShowVideo(false);
  };

  const handleSkipVideo = () => {
    setShowVideo(false);
  };

  // Login Form Data
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Signup Form Data
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert("Login functionality coming soon!");
    setShowLogin(false);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    // Password validation check
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (signupData.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    
    if (!/\d/.test(signupData.password)) {
      alert("Password must contain at least one number!");
      return;
    }
    
    if (!/[!@#$%^&*]/.test(signupData.password)) {
      alert("Password must contain at least one special character!");
      return;
    }

    // User profile data save karo
    const userProfileData = {
      name: signupData.name,
      email: signupData.email,
      phone: signupData.phone,
      joinDate: new Date().toISOString().split('T')[0],
      points: 0,
      level: "Beginner",
      avatar: "👤",
      location: "Lucknow, UP",
      complaintsResolved: 0,
      complaintsPending: 0
    };
    
    localStorage.setItem('userProfile', JSON.stringify(userProfileData));
    localStorage.setItem('userComplaints', JSON.stringify([]));

    // SIGNUP SUCCESSFUL - DASHBOARD SHOW KARO
    setCurrentPage('dashboard');
    setShowSignup(false);
  };

  // Get Started button - Signup show karega
  const handleGetStarted = () => {
    setShowSignup(true);
  };

  // Logout function - Landing page par wapas jaye
  const handleLogout = () => {
    setCurrentPage('landing');
    setShowUserProfile(false);
  };

  // User Profile show karega
  const handleShowProfile = () => {
    setShowUserProfile(true);
  };

  const handleModalClose = (e) => {
    if (e.target.className === "modal-overlay") {
      setShowLogin(false);
      setShowSignup(false);
    }
  };

  // AGAR USER PROFILE PAR HAI TOH SIRF WAHI DIKHAO
  if (showUserProfile) {
    return <UserProfile onBack={() => setShowUserProfile(false)} />;
  }

  // AGAR USER DASHBOARD PAR HAI TOH SIRF WAHI DIKHAO
  if (currentPage === 'dashboard') {
    return <UserDashboard onLogout={handleLogout} onShowProfile={handleShowProfile} />;
  }

  // AGAR VIDEO CHAL RAHA HAI
  if (showVideo) {
    return (
      <>
        {/* VIDEO PATH UPDATE KAR DIYA HAI */}
        <div className="video-container">
          <video 
            width="100%" 
            height="100%" 
            controls 
            autoPlay 
            muted 
            onEnded={handleVideoFinish}
          >
            <source src="/video/Landingpage_video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <button className="skip-button" onClick={handleSkipVideo}>
          Skip Intro
        </button>
      </>
    );
  }

  // LANDING PAGE (SAME AS BEFORE)
  return (
    <div className="main-content">
      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Login to SEHYOGSETU</h3>
            <form onSubmit={handleLoginSubmit}>
              <input 
                type="email" 
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
              />
              <input 
                type="password" 
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
              <button type="submit" className="login-btn">Login</button>
              <button 
                type="button" 
                className="close-btn"
                onClick={() => setShowLogin(false)}
              >
                Close
              </button>
            </form>
            <div className="login-links">
              <a href="#forgot">Forgot Password?</a>
              <a href="#signup" onClick={() => {setShowLogin(false); setShowSignup(true);}}>
                Create New Account
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal - IMPROVED */}
      {showSignup && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create Your Account</h3>
            
            {/* Login Options */}
            <div className="login-options">
              <button 
                type="button"
                className={loginMethod === 'email' ? "option-btn active" : "option-btn"}
                onClick={() => setLoginMethod('email')}
              >
                📧 Email
              </button>
              <button 
                type="button"
                className={loginMethod === 'phone' ? "option-btn active" : "option-btn"}
                onClick={() => setLoginMethod('phone')}
              >
                📱 Phone
              </button>
            </div>

            <form onSubmit={handleSignupSubmit}>
              <input 
                type="text" 
                placeholder="Full Name"
                value={signupData.name}
                onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                required
              />
              
              {loginMethod === 'email' ? (
                <input 
                  type="email" 
                  placeholder="Email Address"
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                  required
                />
              ) : (
                <input 
                  type="tel" 
                  placeholder="Phone Number"
                  value={signupData.phone}
                  onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                  required
                />
              )}
              
              <div className="password-field">
                <input 
                  type="password" 
                  placeholder="Create Password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                  required
                />
                {/* Password Requirements */}
                <div className="password-requirements">
                  <p>Password must contain:</p>
                  <ul>
                    <li className={signupData.password.length >= 8 ? "valid" : "invalid"}>
                      {signupData.password.length >= 8 ? "✓" : "✗"} At least 8 characters
                    </li>
                    <li className={/\d/.test(signupData.password) ? "valid" : "invalid"}>
                      {/\d/.test(signupData.password) ? "✓" : "✗"} At least one number
                    </li>
                    <li className={/[!@#$%^&*]/.test(signupData.password) ? "valid" : "invalid"}>
                      {/[!@#$%^&*]/.test(signupData.password) ? "✓" : "✗"} At least one special character
                    </li>
                  </ul>
                </div>
              </div>

              <div className="password-field">
                <input 
                  type="password" 
                  placeholder="Confirm Password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                  required
                />
                {/* Password Match Check */}
                {signupData.confirmPassword && (
                  <div className="password-match">
                    {signupData.password === signupData.confirmPassword ? (
                      <span className="match-success">✓ Passwords match</span>
                    ) : (
                      <span className="match-error">✗ Passwords do not match</span>
                    )}
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="login-btn"
                disabled={
                  !signupData.name ||
                  (loginMethod === 'email' && !signupData.email) ||
                  (loginMethod === 'phone' && !signupData.phone) ||
                  signupData.password !== signupData.confirmPassword || 
                  signupData.password.length < 8 ||
                  !/\d/.test(signupData.password) ||
                  !/[!@#$%^&*]/.test(signupData.password)
                }
              >
                Create Account
              </button>
              
              <button 
                type="button" 
                className="close-btn"
                onClick={() => setShowSignup(false)}
              >
                Close
              </button>
            </form>
            
            <div className="login-links">
              <a href="#login" onClick={() => {setShowSignup(false); setShowLogin(true);}}>
                Already have an account? Login
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Header with Logo */}
      <header className="header">
        <div className="logo">
          <img src="/sehyogsetu_logo.jpg" alt="SEHYOGSETU Logo" className="logo-img" />
          SEHYOGSETU
        </div>
        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#contact">Contact</a>
          <button 
            className="nav-login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Smart Civic Solutions with SEHYOGSETU</h1>
          <p className="hero-subtitle">"Where Responsibility Meets Action"</p>
          <p className="hero-description">
            Join India's first integrated platform for waste management, 
            civic issue resolution, and animal welfare. Making cities cleaner 
            and more responsive through technology.
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            Get Started
          </button>
          
          {/* Stats */}
          <div className="hero-stats">
            <div className="stat">
              <h3>10,000+</h3>
              <p>Issues Resolved</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Cities Covered</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - COMPLETELY UPDATED FLIP CARDS */}
      <section id="features">
        <h2>Our Features</h2>
        <p className="section-subtitle">Comprehensive solutions for urban challenges</p>
        <div className="feature-cards">
          {/* Waste Management - FIXED */}
          <div 
            className="flip-card"
            onMouseEnter={(e) => e.currentTarget.classList.add('flipped')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('flipped')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="feature-icon">🚮</div>
                <h3>Smart Waste Management</h3>
                <p>Report uncollected garbage with GPS tagging and real-time pickup tracking</p>
              </div>
              <div className="flip-card-back">
                <div className="back-icon">📍</div>
                <h3>GPS Tracking</h3>
                <p>Precise location tagging for efficient waste collection and management</p>
              </div>
            </div>
          </div>

          {/* Civic Issues - FIXED */}
          <div 
            className="flip-card"
            onMouseEnter={(e) => e.currentTarget.classList.add('flipped')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('flipped')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="feature-icon">🏗️</div>
                <h3>Civic Issue Reporting</h3>
                <p>Report potholes, broken streetlights, drainage issues with location tracking</p>
              </div>
              <div className="flip-card-back">
                <div className="back-icon">⚡</div>
                <h3>Quick Resolution</h3>
                <p>Automated routing to relevant departments for faster problem solving</p>
              </div>
            </div>
          </div>

          {/* Animal Welfare - FIXED */}
          <div 
            className="flip-card"
            onMouseEnter={(e) => e.currentTarget.classList.add('flipped')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('flipped')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="feature-icon">🐾</div>
                <h3>Animal Welfare</h3>
                <p>Report injured stray animals with automatic NGO notifications and rescue tracking</p>
              </div>
              <div className="flip-card-back">
                <div className="back-icon">🏥</div>
                <h3>Rescue Network</h3>
                <p>Connected with local NGOs and animal rescue teams for immediate help</p>
              </div>
            </div>
          </div>

          {/* Real-time Tracking - FIXED */}
          <div 
            className="flip-card"
            onMouseEnter={(e) => e.currentTarget.classList.add('flipped')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('flipped')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="feature-icon">📱</div>
                <h3>Real-time Tracking</h3>
                <p>Track complaint status from Pending → In Progress → Resolved with notifications</p>
              </div>
              <div className="flip-card-back">
                <div className="back-icon">🔔</div>
                <h3>Live Updates</h3>
                <p>Instant notifications at every stage of your complaint resolution process</p>
              </div>
            </div>
          </div>

          {/* Secure Platform - FIXED */}
          <div 
            className="flip-card"
            onMouseEnter={(e) => e.currentTarget.classList.add('flipped')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('flipped')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="feature-icon">🔒</div>
                <h3>Secure Platform</h3>
                <p>Secure authentication, profile management, and complaint history</p>
              </div>
              <div className="flip-card-back">
                <div className="back-icon">🛡️</div>
                <h3>Data Protection</h3>
                <p>Your personal information and complaint data are completely secure</p>
              </div>
            </div>
          </div>

          {/* Reward System - FIXED */}
          <div 
            className="flip-card"
            onMouseEnter={(e) => e.currentTarget.classList.add('flipped')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('flipped')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="feature-icon">🏆</div>
                <h3>Reward System</h3>
                <p>Earn points and badges for active community participation</p>
              </div>
              <div className="flip-card-back">
                <div className="back-icon">⭐</div>
                <h3>Earn Rewards</h3>
                <p>Get recognized for your contributions with points, badges, and certificates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="how-it-works">
        <h2>How SEHYOGSETU Works</h2>
        <p className="section-subtitle">4 simple steps to resolve any issue</p>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Report Issue</h3>
            <p>Use our app to report waste, civic issues, or animal welfare cases with photos and GPS location</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Automated Routing</h3>
            <p>System categorizes and routes issues to relevant authorities or NGOs based on location and type</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Track Progress</h3>
            <p>Monitor your complaint status in real-time with push notifications at every stage</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Issue Resolved</h3>
            <p>Get confirmation when issues are resolved and provide feedback for improvement</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p className="section-subtitle">Get in touch with our team</p>
        <div className="contact-info">
          <div className="contact-item">
            <h3>📧 Email</h3>
            <p>support@sehyogsetu.com</p>
          </div>
          <div className="contact-item">
            <h3>📞 Phone</h3>
            <p>+91-8752380042</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <img src="/sehyogsetu_logo.jpg" alt="SEHYOGSETU" className="logo-img" />
              <span>SEHYOGSETU</span>
            </div>
            <p>"Where Responsibility Meets Action"</p>
            <p>Making cities smarter, cleaner and more responsive</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📧 support@sehyogsetu.com</p>
            <p>📞 +91-8752380042</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 SEHYOGSETU. All rights reserved. | BCA Final Year Project - PSIT College</p>
        </div>
      </footer>
    </div>
  );
}

export default App;