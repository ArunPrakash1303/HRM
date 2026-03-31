import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { interviews2 } from '../data';
import { hex2rgba } from '../utils/colors';

export default function Interviews({ onNav, context }) {
  const [interviewList, setInterviewList] = useState(interviews2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ candidate: '', role: '', type: 'Technical', date: '', time: '', interviewer: '' });

  useEffect(() => {
    if (context && context.openModal) {
      setIsModalOpen(true);
    }
  }, [context]);

  const statuses = ['Scheduled', 'Pending', 'Completed'];
  const statusColors = { Scheduled: '#3B82F6', Pending: '#F59E0B', Completed: '#10B981' };
  const statusIcons = { Scheduled: 'schedule', Pending: 'event_note', Completed: 'check_circle' };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <div className="breadcrumb">HR › Interviews</div>
          <h1>Interview Scheduling</h1>
          <p>Manage and track all interviews</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm" onClick={() => onNav('liveinterview')}>
            <span className="material-icons" style={{ fontSize: '16px' }}>videocam</span> Live Interview
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
            <span className="material-icons" style={{ fontSize: '16px' }}>add</span> Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-3">
        {statuses.map(status => {
          const items = interviewList.filter(i => i.status === status);
          return (
            <div key={status}>
              <div className="flex items-center gap-2 mb-3">
                <span className="material-icons" style={{ fontSize: '16px', color: statusColors[status] }}>
                  {statusIcons[status]}
                </span>
                <span className="font-bold" style={{ fontSize: '0.85rem' }}>{status}</span>
                <span 
                  className="chip" 
                  style={{ background: hex2rgba(statusColors[status], 0.12), color: statusColors[status], height: '18px', padding: '2px 6px', fontSize: '0.65rem' }}
                >
                  {items.length}
                </span>
              </div>
              
              {items.map(iv => (
                <div className="card card-hover p-4 mb-3" key={iv.id}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="emp-avatar" style={{ width: '34px', height: '34px', fontSize: '0.72rem', background: hex2rgba(statusColors[status], 0.12), color: statusColors[status] }}>
                      {iv.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="font-bold" style={{ fontSize: '0.82rem' }}>{iv.candidate}</div>
                      <div className="text-xs text-sec">{iv.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap mb-3">
                    <span className="chip" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text-sec)', height: '22px' }}>{iv.type}</span>
                    <span className="chip" style={{ background: 'rgba(0,0,0,0.04)', color: 'var(--text-sec)', height: '22px' }}>{iv.date} · {iv.time}</span>
                  </div>
                  <div className="text-xs text-sec mb-3">
                    Interviewer: <strong>{iv.interviewer}</strong>
                  </div>
                  
                  {status !== 'Completed' && (
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-primary btn-sm w-full" 
                        style={{ justifyContent: 'center', fontSize: '0.72rem' }}
                        onClick={() => onNav(iv.type === 'Live Coding' ? 'livecoding' : 'liveinterview')}
                      >
                        <span className="material-icons" style={{ fontSize: '14px' }}>
                          {iv.type === 'Live Coding' ? 'code' : 'videocam'}
                        </span> 
                        {iv.type === 'Live Coding' ? 'Start Coding' : 'Join'}
                      </button>
                      <button className="btn btn-danger btn-sm" style={{ padding: '6px 10px' }} onClick={() => {
                        const idx = interviews2.findIndex(interview => interview.id === iv.id);
                        if(idx > -1) interviews2.splice(idx, 1);
                        setInterviewList([...interviews2]);
                      }}>
                        <span className="material-icons" style={{ fontSize: '14px' }}>cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {items.length === 0 && <div className="empty-state">No interviews</div>}
            </div>
          );
        })}
      </div>

      {isModalOpen && createPortal(
        <div className="modal-bg open" style={{ display: 'flex' }}>
          <div className="modal">
            <div className="modal-header">
              <h3>Schedule Interview</h3>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}><span className="material-icons">close</span></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group-m">
                  <label>Candidate Name</label>
                  <input placeholder="Candidate name" value={form.candidate} onChange={e=>setForm({...form, candidate: e.target.value})}/>
                </div>
                <div className="form-group-m">
                  <label>Job Role</label>
                  <input placeholder="Applied role" value={form.role} onChange={e=>setForm({...form, role: e.target.value})} />
                </div>
                <div className="form-group-m">
                  <label>Interview Type</label>
                  <select value={form.type} onChange={e=>setForm({...form, type: e.target.value})}>
                    <option>Technical</option>
                    <option>HR Round</option>
                    <option>Live Coding</option>
                    <option>Culture Fit</option>
                  </select>
                </div>
                <div className="form-group-m">
                  <label>Interviewer</label>
                  <input placeholder="Interviewer name" value={form.interviewer} onChange={e=>setForm({...form, interviewer: e.target.value})} />
                </div>
                <div className="form-group-m">
                  <label>Date</label>
                  <input type="date" value={form.date} onChange={e=>setForm({...form, date: e.target.value})} />
                </div>
                <div className="form-group-m">
                  <label>Time</label>
                  <input type="time" value={form.time} onChange={e=>setForm({...form, time: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline btn-sm" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={() => {
                const candidateName = form.candidate || 'New Candidate';
                const newInterview = {
                  id: Date.now(),
                  candidate: candidateName,
                  role: form.role || 'Any Role',
                  type: form.type,
                  interviewer: form.interviewer || 'N/A',
                  date: form.date || 'TBD',
                  time: form.time || 'TBD',
                  status: 'Scheduled',
                  avatar: candidateName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()
                };
                interviews2.unshift(newInterview);
                setInterviewList([...interviews2]);
                setForm({ candidate: '', role: '', type: 'Technical', date: '', time: '', interviewer: '' });
                setIsModalOpen(false);
              }}>Schedule</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
