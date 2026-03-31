import React, { useState } from 'react';

export default function Settings({ isDark, setTheme }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [toastVisible, setToastVisible] = useState(false);
  const [notifState, setNotifState] = useState({
    newApp: true,
    intReminder: true,
    docUpload: false,
    offerAcc: true,
    weeklyRep: true
  });
  const [primaryColor, setPrimaryColor] = useState('#FF7A28');

  const showSaveToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const renderProfile = () => (
    <div className="card p-6">
      <div className="section-title">Profile Information</div>
      <div className="flex items-center gap-3 mb-4">
        <div style={{ position: 'relative' }}>
          <div className="user-avatar" style={{ width: '72px', height: '72px', fontSize: '1.4rem', borderRadius: '50%' }}>AP</div>
          <button className="icon-btn" style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '24px', height: '24px', background: 'var(--card)', border: '1px solid var(--border)' }}>
            <span className="material-icons" style={{ fontSize: '12px' }}>edit</span>
          </button>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>Arun Prakash</div>
          <div className="text-sm text-sec">HR Manager</div>
          <div className="chip" style={{ background: 'var(--primary-subtle)', color: 'var(--primary)', marginTop: '4px' }}>Human Resources</div>
        </div>
      </div>
      <div className="form-grid">
        <div className="form-group-m"><label>Full Name</label><input defaultValue="Arun Prakash" /></div>
        <div className="form-group-m"><label>Email Address</label><input defaultValue="m.arunprakashnkl@gmail.com" /></div>
        <div className="form-group-m"><label>Job Role</label><input defaultValue="HR Manager" /></div>
        <div className="form-group-m"><label>Department</label><input defaultValue="Human Resources" /></div>
        <div className="form-group-m"><label>Phone</label><input defaultValue="+91 98765 43210" /></div>
        <div className="form-group-m"><label>Location</label><input defaultValue="Chennai, Tamil Nadu" /></div>
        <div className="form-full form-group-m">
          <label>Bio</label>
          <textarea rows="2" defaultValue="HR Manager with 8+ years of experience in talent acquisition and employee management."></textarea>
        </div>
      </div>
      <div className="flex gap-2 mt-4" style={{ justifyContent: 'flex-end' }}>
        <button className="btn btn-outline btn-sm">Cancel</button>
        <button className="btn btn-primary btn-sm" onClick={showSaveToast}>
          <span className="material-icons" style={{ fontSize: '16px' }}>save</span> Save Changes
        </button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="card p-6">
      <div className="section-title">Change Password</div>
      <div style={{ maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        <div className="form-group-m"><label>Current Password</label><input type="password" placeholder="••••••••" /></div>
        <div className="form-group-m"><label>New Password</label><input type="password" placeholder="••••••••" /></div>
        <div className="form-group-m"><label>Confirm Password</label><input type="password" placeholder="••••••••" /></div>
        <button className="btn btn-primary btn-sm" onClick={showSaveToast} style={{ alignSelf: 'flex-start' }}>
          <span className="material-icons" style={{ fontSize: '16px' }}>lock</span> Update Password
        </button>
      </div>
      <div className="divider"></div>
      <div className="section-title">Two-Factor Authentication</div>
      <div className="settings-row" style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '14px 16px', marginBottom: 0 }}>
        <div>
          <div className="font-semibold text-sm">Authenticator App</div>
          <div className="text-xs text-sec">Use an authenticator app for extra security</div>
        </div>
        <div className={`toggle-switch on`} onClick={(e) => e.currentTarget.classList.toggle('on')}></div>
      </div>
    </div>
  );

  const renderNotif = () => {
    const items = [
      { k: 'newApp', l: 'New Application', d: 'When a candidate applies for an open position' },
      { k: 'intReminder', l: 'Interview Reminders', d: 'Reminders 1 hour before scheduled interviews' },
      { k: 'docUpload', l: 'Document Uploads', d: 'When new documents are uploaded to the system' },
      { k: 'offerAcc', l: 'Offer Accepted', d: 'When a candidate accepts an offer letter' },
      { k: 'weeklyRep', l: 'Weekly Report', d: 'Receive a weekly summary of HR activities' },
    ];
    return (
      <div className="card p-6">
        <div className="section-title">Notification Preferences</div>
        <div>
          {items.map(item => (
            <div className="settings-row" key={item.k}>
              <div><div className="font-semibold text-sm">{item.l}</div><div className="text-xs text-sec">{item.d}</div></div>
              <div 
                className={`toggle-switch ${notifState[item.k] ? 'on' : ''}`} 
                onClick={() => setNotifState(prev => ({...prev, [item.k]: !prev[item.k]}))}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex" style={{ justifyContent: 'flex-end', marginTop: '16px' }}>
          <button className="btn btn-primary btn-sm" onClick={showSaveToast}>
            <span className="material-icons" style={{ fontSize: '16px' }}>save</span> Save
          </button>
        </div>
      </div>
    );
  };

  const renderAppearance = () => {
    const colors = ['#FF7A28', '#0D47A1', '#1565C0', '#0277BD', '#00695C', '#2E7D32'];
    return (
      <div className="card p-6">
        <div className="section-title">Theme Mode</div>
        <div className="grid-2 mb-4" style={{ maxWidth: '320px' }}>
          <div className={`theme-option ${!isDark ? 'selected' : ''}`} onClick={() => setTheme(false)}>
            <span className="material-icons" style={{ fontSize: '28px', marginBottom: '8px' }}>light_mode</span>
            <div className="text-sm font-semibold">Light</div>
          </div>
          <div className={`theme-option ${isDark ? 'selected' : ''}`} onClick={() => setTheme(true)}>
            <span className="material-icons" style={{ fontSize: '28px', marginBottom: '8px' }}>dark_mode</span>
            <div className="text-sm font-semibold">Dark</div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="section-title">Primary Color</div>
        <div className="flex gap-3 flex-wrap mb-4">
          {colors.map(c => (
            <div 
              key={c}
              className={`color-swatch ${primaryColor === c ? 'selected' : ''}`}
              style={{ background: c }}
              onClick={() => {
                setPrimaryColor(c);
                document.documentElement.style.setProperty('--primary', c);
              }}
            ></div>
          ))}
        </div>
        <button className="btn btn-primary btn-sm" onClick={showSaveToast}>
          <span className="material-icons" style={{ fontSize: '16px' }}>save</span> Save Appearance
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <div className="breadcrumb">HR › Settings</div>
          <h1>Settings</h1>
          <p>Manage your account and preferences</p>
        </div>
      </div>
      
      <div className="grid-12">
        <div className="card p-4">
          <div className={`settings-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <span className="material-icons" style={{ fontSize: '18px' }}>person</span>Profile
          </div>
          <div className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
            <span className="material-icons" style={{ fontSize: '18px' }}>lock</span>Security
          </div>
          <div className={`settings-nav-item ${activeTab === 'notif' ? 'active' : ''}`} onClick={() => setActiveTab('notif')}>
            <span className="material-icons" style={{ fontSize: '18px' }}>notifications</span>Notifications
          </div>
          <div className={`settings-nav-item ${activeTab === 'appearance' ? 'active' : ''}`} onClick={() => setActiveTab('appearance')}>
            <span className="material-icons" style={{ fontSize: '18px' }}>palette</span>Appearance
          </div>
        </div>
        <div>
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'security' && renderSecurity()}
          {activeTab === 'notif' && renderNotif()}
          {activeTab === 'appearance' && renderAppearance()}
        </div>
      </div>

      <div 
        id="toast" 
        style={{ 
          position: 'fixed', bottom: '24px', right: '24px', background: '#10B981', color: '#fff', 
          padding: '12px 20px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, 
          display: toastVisible ? 'flex' : 'none', zIndex: 9999, boxShadow: '0 4px 20px rgba(16,185,129,0.4)', 
          alignItems: 'center', gap: '8px' 
        }}
      >
        <span className="material-icons" style={{ fontSize: '18px' }}>check_circle</span> Settings saved successfully!
      </div>
    </div>
  );
}
