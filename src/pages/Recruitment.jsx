import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { candidates, stageColors, jobOpenings } from '../data';
import { hex2rgba } from '../utils/colors';

export default function Recruitment({ onNav, context }) {
  const [activeTab, setActiveTab] = useState('kanban');
  const [jobList, setJobList] = useState(jobOpenings);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobForm, setJobForm] = useState({ title: '', dept: 'Engineering', location: '', type: 'Full-time', openings: 1, desc: '' });

  useEffect(() => {
    if (context && context.openModal) {
      if (context.tab) setActiveTab(context.tab);
      setIsJobModalOpen(true);
    }
  }, [context]);

  const renderKanban = () => {
    const stages = ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];
    return (
      <div style={{ overflowX: 'auto' }}>
        <div className="kanban-board">
          {stages.map(stage => {
            const cs = candidates.filter(c => c.stage === stage);
            return (
              <div key={stage}>
                <div className="kanban-col-header">
                  <div className="k-dot" style={{ background: stageColors[stage] }}></div>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>{stage}</span>
                  <span 
                    className="chip" 
                    style={{ background: hex2rgba(stageColors[stage], 0.12), color: stageColors[stage], height: '18px', padding: '2px 6px', fontSize: '0.65rem' }}
                  >
                    {cs.length}
                  </span>
                </div>
                {cs.map(c => (
                  <div className="kanban-card" key={c.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="emp-avatar" style={{ width: '30px', height: '30px', fontSize: '0.7rem', background: hex2rgba(stageColors[stage], 0.12), color: stageColors[stage] }}>
                        {c.avatar}
                      </div>
                      <span 
                        className="score-pill" 
                        style={{ 
                          background: c.score >= 80 ? 'rgba(16,185,129,0.12)' : c.score >= 60 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.1)',
                          color: c.score >= 80 ? '#10B981' : c.score >= 60 ? '#F59E0B' : '#EF4444' 
                        }}
                      >
                        {c.score}%
                      </span>
                    </div>
                    <div className="font-bold" style={{ fontSize: '0.78rem', marginBottom: '2px' }}>{c.name}</div>
                    <div className="text-xs text-sec">{c.role}</div>
                    <div className="text-xs text-sec">{c.experience}</div>
                    <div className="progress-mini" style={{ background: hex2rgba(stageColors[stage], 0.12) }}>
                      <div className="progress-mini-fill" style={{ width: `${c.score}%`, background: stageColors[stage] }}></div>
                    </div>
                  </div>
                ))}
                {cs.length === 0 && <div className="empty-state" style={{ padding: '24px' }}>No candidates</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCandidateList = () => (
    <div className="grid grid-3">
      {candidates.map(c => (
        <div className="card card-hover p-5" key={c.id}>
          <div className="flex items-center gap-3 mb-3">
            <div className="emp-avatar" style={{ width: '42px', height: '42px', fontSize: '0.9rem', background: hex2rgba(stageColors[c.stage], 0.12), color: stageColors[c.stage] }}>
              {c.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div className="font-bold" style={{ fontSize: '0.85rem' }}>{c.name}</div>
              <div className="text-xs text-sec">{c.role}</div>
            </div>
            <div className={`chip chip-${c.stage.toLowerCase()}`}>{c.stage}</div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-sec">{c.experience} experience</span>
            <span style={{ fontWeight: 700, fontSize: '0.82rem', color: c.score >= 80 ? '#10B981' : c.score >= 60 ? '#F59E0B' : '#EF4444' }}>
              {c.score}%
            </span>
          </div>
          <div style={{ height: '4px', borderRadius: '2px', marginTop: '8px', background: hex2rgba(stageColors[c.stage], 0.12), overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${c.score}%`, background: stageColors[c.stage], borderRadius: '2px' }}></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderJobs = () => (
    <div className="grid grid-2">
      {jobList.map(j => (
        <div className="card card-hover p-5" key={j.id}>
          <div className="flex justify-between items-start mb-2">
            <div style={{ flex: 1 }}>
              <div className="font-bold" style={{ fontSize: '0.95rem', marginBottom: '4px' }}>{j.title}</div>
              <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                <span className="text-xs text-sec flex items-center gap-1">
                  <span className="material-icons" style={{ fontSize: '12px' }}>business</span>{j.dept}
                </span>
                <span className="text-xs text-sec flex items-center gap-1">
                  <span className="material-icons" style={{ fontSize: '12px' }}>location_on</span>{j.location}
                </span>
              </div>
            </div>
            <div className={`chip chip-${j.status.toLowerCase()}`}>{j.status}</div>
          </div>
          <div className="flex gap-2 flex-wrap items-center mt-3">
            <div className="chip" style={{ background: 'var(--primary-subtle)', color: 'var(--primary)' }}>{j.type}</div>
            <div className="chip" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text-sec)' }}>{j.openings} openings</div>
            <div className="flex items-center gap-1 text-xs text-sec" style={{ marginLeft: 'auto' }}>
              <span className="material-icons" style={{ fontSize: '14px' }}>people</span>{j.applicants} applicants
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="btn btn-outline btn-sm w-full" style={{ justifyContent: 'center' }}>View Details</button>
            <button className="btn btn-primary btn-sm w-full" style={{ justifyContent: 'center' }}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <div className="breadcrumb">HR › Recruitment</div>
          <h1>Recruitment</h1>
          <p>Manage job openings and candidates</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setIsJobModalOpen(true)}>
          <span className="material-icons" style={{ fontSize: '16px' }}>add</span> New Job
        </button>
      </div>

      <div className="flex gap-2 mb-4" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        <button 
          className="btn btn-sm" 
          onClick={() => setActiveTab('kanban')}
          style={{ 
            borderRadius: 0, 
            borderBottom: activeTab === 'kanban' ? '2px solid var(--primary)' : '2px solid transparent', 
            color: activeTab === 'kanban' ? 'var(--primary)' : 'var(--text-sec)', 
            paddingBottom: '12px', background: 'transparent' 
          }}
        >
          Kanban Board
        </button>
        <button 
          className="btn btn-sm" 
          onClick={() => setActiveTab('candlist')}
          style={{ 
            borderRadius: 0, 
            borderBottom: activeTab === 'candlist' ? '2px solid var(--primary)' : '2px solid transparent', 
            color: activeTab === 'candlist' ? 'var(--primary)' : 'var(--text-sec)', 
            paddingBottom: '12px', background: 'transparent' 
          }}
        >
          Candidates List
        </button>
        <button 
          className="btn btn-sm" 
          onClick={() => setActiveTab('jobs')}
          style={{ 
            borderRadius: 0, 
            borderBottom: activeTab === 'jobs' ? '2px solid var(--primary)' : '2px solid transparent', 
            color: activeTab === 'jobs' ? 'var(--primary)' : 'var(--text-sec)', 
            paddingBottom: '12px', background: 'transparent' 
          }}
        >
          Job Openings
        </button>
      </div>

      {activeTab === 'kanban' && renderKanban()}
      {activeTab === 'candlist' && renderCandidateList()}
      {activeTab === 'jobs' && renderJobs()}

      {isJobModalOpen && createPortal(
        <div className="modal-bg open" style={{ display: 'flex' }}>
          <div className="modal">
            <div className="modal-header">
              <h3>Create New Job Opening</h3>
              <button className="icon-btn" onClick={() => setIsJobModalOpen(false)}><span className="material-icons">close</span></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group-m form-full">
                  <label>Job Title</label>
                  <input placeholder="e.g. Senior Frontend Developer" value={jobForm.title} onChange={e=>setJobForm({...jobForm, title: e.target.value})} />
                </div>
                <div className="form-group-m">
                  <label>Department</label>
                  <select value={jobForm.dept} onChange={e=>setJobForm({...jobForm, dept: e.target.value})}>
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                  </select>
                </div>
                <div className="form-group-m">
                  <label>Location</label>
                  <input placeholder="e.g. Chennai / Remote" value={jobForm.location} onChange={e=>setJobForm({...jobForm, location: e.target.value})}/>
                </div>
                <div className="form-group-m">
                  <label>Job Type</label>
                  <select value={jobForm.type} onChange={e=>setJobForm({...jobForm, type: e.target.value})}>
                    <option>Full-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div className="form-group-m">
                  <label>Openings</label>
                  <input type="number" value={jobForm.openings} onChange={e=>setJobForm({...jobForm, openings: e.target.value})} />
                </div>
                <div className="form-group-m form-full">
                  <label>Description</label>
                  <textarea rows="3" placeholder="Job description..." value={jobForm.desc} onChange={e=>setJobForm({...jobForm, desc: e.target.value})}></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline btn-sm" onClick={() => setIsJobModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={() => {
                const title = jobForm.title || 'New Job Position';
                const newJob = {
                  id: Date.now(), title: title, dept: jobForm.dept, location: jobForm.location || 'Remote',
                  type: jobForm.type, openings: parseInt(jobForm.openings)||1, applicants: 0, status: 'Active'
                };
                jobOpenings.unshift(newJob);
                setJobList([...jobOpenings]);
                setIsJobModalOpen(false);
                setJobForm({ title: '', dept: 'Engineering', location: '', type: 'Full-time', openings: 1, desc: '' });
              }}>Create Job</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
