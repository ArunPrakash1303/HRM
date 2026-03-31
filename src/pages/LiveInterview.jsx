import React, { useState } from 'react';

export default function LiveInterview() {
  const [ctrlState, setCtrlState] = useState({ mic: true, cam: true, share: false, record: false });
  const [chatOpen, setChatOpen] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { author: 'HR', time: '10:00', text: 'Hello! Welcome to the technical interview.', isHr: true },
    { author: 'Candidate', time: '10:01', text: 'Thank you! Looking forward to it.', isHr: false },
    { author: 'HR', time: '10:01', text: "Let's start with a brief introduction.", isHr: true },
    { author: 'Candidate', time: '10:02', text: "Sure! I'm a Full Stack Developer with 4 years of experience...", isHr: false },
  ]);

  const toggleCtrl = (type) => {
    setCtrlState(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const sendMsg = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [
      ...prev,
      { author: 'HR', time: 'Now', text: chatInput, isHr: true }
    ]);
    setChatInput('');
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <div className="breadcrumb">HR › Interviews › Live Interview</div>
          <h1>Live Interview</h1>
          <p>Arun Kumar · Full Stack Developer · Technical Round</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="live-badge live">
            <div className="live-dot" style={{ background: '#10B981' }}></div>LIVE · 00:24:37
          </div>
          <div className="chip" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>
            <span className="material-icons" style={{ fontSize: '14px', marginRight: '4px' }}>people</span>2 participants
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: chatOpen ? '1fr 320px' : '1fr', gap: '16px', height: 'calc(100vh - 220px)', minHeight: '500px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="video-panel" style={{ flex: 1 }}>
            <div className="video-inner"><div className="video-avatar">AK</div></div>
            <div className="video-label">Arun Kumar (Candidate)</div>
            {ctrlState.record && <div className="rec-badge"><div className="rec-dot"></div>REC</div>}
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="video-panel" style={{ width: '160px', flexShrink: 0 }}>
              <div className="video-inner" style={{ minHeight: '90px', background: '#111827' }}>
                {ctrlState.cam ? <div className="video-avatar" style={{ width: '40px', height: '40px', fontSize: '0.85rem' }}>AP</div> : null}
              </div>
              <div className="video-label">You (HR)</div>
            </div>
          </div>
          
          <div className="controls">
            <button 
              className="ctrl-btn ctrl-default" 
              onClick={() => toggleCtrl('mic')} 
              style={{ background: ctrlState.mic ? 'rgba(0,0,0,0.06)' : 'rgba(239,68,68,0.12)', color: ctrlState.mic ? 'var(--text)' : '#EF4444' }}
              title="Mute/Unmute"
            >
              <span className="material-icons">{ctrlState.mic ? 'mic' : 'mic_off'}</span>
            </button>
            <button 
              className="ctrl-btn ctrl-default" 
              onClick={() => toggleCtrl('cam')} 
              style={{ background: ctrlState.cam ? 'rgba(0,0,0,0.06)' : 'rgba(239,68,68,0.12)', color: ctrlState.cam ? 'var(--text)' : '#EF4444' }}
              title="Camera"
            >
              <span className="material-icons">{ctrlState.cam ? 'videocam' : 'videocam_off'}</span>
            </button>
            <button 
              className="ctrl-btn ctrl-default" 
              onClick={() => toggleCtrl('share')} 
              style={{ background: ctrlState.share ? 'rgba(59,130,246,0.12)' : 'rgba(0,0,0,0.06)', color: ctrlState.share ? '#3B82F6' : 'var(--text)' }}
              title="Screen share"
            >
              <span className="material-icons">{ctrlState.share ? 'stop_screen_share' : 'screen_share'}</span>
            </button>
            <button 
              className="ctrl-btn ctrl-default" 
              onClick={() => toggleCtrl('record')} 
              style={{ background: ctrlState.record ? 'rgba(239,68,68,0.12)' : 'rgba(0,0,0,0.06)', color: ctrlState.record ? '#EF4444' : 'var(--text)' }}
              title="Record"
            >
              <span className="material-icons">fiber_manual_record</span>
            </button>
            <button 
              className="ctrl-btn ctrl-default" 
              onClick={() => setChatOpen(!chatOpen)} 
              title="Chat"
            >
              <span className="material-icons">chat</span>
            </button>
            <button className="btn btn-danger" style={{ borderRadius: '20px', padding: '8px 20px' }}>
              <span className="material-icons" style={{ fontSize: '18px' }}>call_end</span> End
            </button>
          </div>
        </div>

        {chatOpen && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: '0.9rem' }}>
              Interview Chat
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column' }}>
              {messages.map((m, i) => (
                <div key={i}>
                  <div className={`text-xs text-sec mb-1 ${m.isHr ? '' : 'mt-2'}`}>{m.author} · {m.time}</div>
                  <div className={`chat-msg ${m.isHr ? 'hr' : 'candidate'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '10px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Type message..." 
                style={{ borderRadius: '20px', fontSize: '0.8rem', flex: 1 }} 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') sendMsg(); }}
              />
              <button className="icon-btn" onClick={sendMsg} style={{ background: 'var(--primary-subtle)', color: 'var(--primary)' }}>
                <span className="material-icons" style={{ fontSize: '18px' }}>send</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
