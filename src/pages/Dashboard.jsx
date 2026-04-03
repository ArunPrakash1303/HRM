import React from 'react';
import { hiringData, employees, deptColors } from '../data';
import { hex2rgba } from '../utils/colors';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard({ onNav, isDark }) {
  const renderTeamList = () => {
    return employees.slice(0, 5).map(e => (
      <div className="team-item" key={e.id}>
        <div
          className="emp-avatar"
          style={{ background: deptColors[e.dept] ? hex2rgba(deptColors[e.dept], 0.12) : 'var(--primary-subtle)', color: deptColors[e.dept] || 'var(--primary)' }}
        >
          {e.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div className="font-semibold text-sm">{e.name}</div>
          <div className="text-xs text-sec">{e.role} · {e.dept}</div>
        </div>
        <div className={`chip chip-${e.status.toLowerCase().replace(' ', '-')}`}>
          {e.status}
        </div>
      </div>
    ));
  };

  const HiringChart = () => {
    const textColor = isDark ? '#F8FAFC' : '#1E293B';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#FF7A28';

    const data = {
      labels: hiringData.map(d => d.m),
      datasets: [
        {
          label: 'Applications',
          data: hiringData.map(d => d.a),
          backgroundColor: hex2rgba(primaryColor, 0.2),
          borderRadius: 4,
          barPercentage: 0.6,
          categoryPercentage: 0.8
        },
        {
          label: 'Hires',
          data: hiringData.map(d => d.h),
          backgroundColor: primaryColor,
          borderRadius: 4,
          barPercentage: 0.6,
          categoryPercentage: 0.8
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: gridColor,
          borderWidth: 1,
          padding: 10,
          boxPadding: 4,
          usePointStyle: true
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColor, font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 } },
          title: { display: true, text: 'Month', color: textColor, font: { weight: 'bold' } }
        },
        y: {
          grid: { color: gridColor },
          border: { display: false },
          ticks: { color: textColor, font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 }, stepSize: 20 },
          title: { display: true, text: 'Count', color: textColor, font: { weight: 'bold' } },
          min: 0,
          max: 100
        }
      }
    };

    return (
      <div className="card p-5" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="flex justify-between items-center mb-3">
          <div className="section-title" style={{ marginBottom: 0 }}>Hiring Overview</div>
          <button className="btn btn-outline btn-sm" onClick={() => onNav('reports')}>View report →</button>
        </div>

        <div style={{ flex: 1, minHeight: '200px', width: '100%' }}>
          <Bar data={data} options={options} />
        </div>

        <div className="flex gap-3 justify-center mt-3">
          <div className="flex items-center gap-2">
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: hex2rgba(primaryColor, 0.2) }}></div>
            <span className="text-xs font-semibold" style={{ color: textColor }}>Applications</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: primaryColor }}></div>
            <span className="text-xs font-semibold" style={{ color: textColor }}>Hires</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <div className="breadcrumb">HR › Dashboard</div>
          <h1>Good morning, Arun</h1>
          <p>Here's what's happening with your team today.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-4 mb-4">
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-subtle)' }}>
            <span className="material-icons" style={{ color: 'var(--primary)' }}>people</span>
          </div>
          <div className="stat-value">8</div>
          <div className="stat-label">Total Employees</div>
          <div className="stat-sub">2 on leave</div>
          <div className="trend up">↑ +3 this month</div>
        </div>
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'rgba(139,92,246,0.1)' }}>
            <span className="material-icons" style={{ color: '#8B5CF6' }}>work</span>
          </div>
          <div className="stat-value">12</div>
          <div className="stat-label">Open Positions</div>
          <div className="stat-sub">4 urgent</div>
          <div className="trend up">↑ +2 new</div>
        </div>
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.1)' }}>
            <span className="material-icons" style={{ color: '#F59E0B' }}>event_note</span>
          </div>
          <div className="stat-value">2</div>
          <div className="stat-label">Today's Interviews</div>
          <div className="stat-sub">2 live</div>
          <div className="trend down">↓ -1 vs yesterday</div>
        </div>
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.1)' }}>
            <span className="material-icons" style={{ color: '#10B981' }}>trending_up</span>
          </div>
          <div className="stat-value">7</div>
          <div className="stat-label">Active Candidates</div>
          <div className="stat-sub">3 in final stage</div>
          <div className="trend up">↑ +5 this week</div>
        </div>
      </div>

      <div className="grid-12 mb-4">
        {/* Quick Actions */}
        <div className="card p-5">
          <div className="section-title">Quick Actions</div>
          <div className="quick-actions">
            <div className="qa-item" onClick={() => onNav('employees', { openModal: true })}>
              <div className="qa-icon" style={{ background: 'var(--primary-subtle)' }}><span className="material-icons" style={{ color: 'var(--primary)', fontSize: '18px' }}>person_add</span></div>
              <div className="qa-label">Add Employee</div>
            </div>
            <div className="qa-item" onClick={() => onNav('interviews', { openModal: true })}>
              <div className="qa-icon" style={{ background: 'rgba(139,92,246,0.1)' }}><span className="material-icons" style={{ color: '#8B5CF6', fontSize: '18px' }}>schedule</span></div>
              <div className="qa-label">Schedule Interview</div>
            </div>
            <div className="qa-item" onClick={() => onNav('liveinterview')}>
              <div className="qa-icon" style={{ background: 'rgba(16,185,129,0.1)' }}><span className="material-icons" style={{ color: '#10B981', fontSize: '18px' }}>videocam</span></div>
              <div className="qa-label">Live Interview</div>
            </div>
            <div className="qa-item" onClick={() => onNav('livecoding')}>
              <div className="qa-icon" style={{ background: 'rgba(245,158,11,0.1)' }}><span className="material-icons" style={{ color: '#F59E0B', fontSize: '18px' }}>code</span></div>
              <div className="qa-label">Live Coding</div>
            </div>
            <div className="qa-item" onClick={() => onNav('documents')}>
              <div className="qa-icon" style={{ background: 'rgba(59,130,246,0.1)' }}><span className="material-icons" style={{ color: '#3B82F6', fontSize: '18px' }}>description</span></div>
              <div className="qa-label">Documents</div>
            </div>
            <div className="qa-item" onClick={() => onNav('recruitment', { openModal: true, tab: 'jobs' })}>
              <div className="qa-icon" style={{ background: 'rgba(239,68,68,0.1)' }}><span className="material-icons" style={{ color: '#EF4444', fontSize: '18px' }}>work_outline</span></div>
              <div className="qa-label">Recruitment</div>
            </div>
          </div>
        </div>

        <HiringChart />
      </div>

      <div className="grid-21 mb-4">
        {/* Today's Interviews */}
        <div className="card p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="section-title" style={{ marginBottom: 0 }}>Today's Interviews</div>
            <button className="btn btn-outline btn-sm" onClick={() => onNav('interviews')}>Schedule</button>
          </div>

          <div className="interview-item">
            <div className="emp-avatar" style={{ background: 'var(--primary-subtle)', color: 'var(--primary)' }}>AK</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Arun Kumar</div>
              <div className="text-xs text-sec">Full Stack Developer · Technical</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="font-semibold text-xs">10:00 AM</div>
              <div className="chip chip-scheduled mt-1">Scheduled</div>
            </div>
          </div>

          <div className="interview-item">
            <div className="emp-avatar" style={{ background: 'rgba(139,92,246,0.12)', color: '#8B5CF6' }}>MI</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Meera Iyer</div>
              <div className="text-xs text-sec">UI/UX Designer · Portfolio Review</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="font-semibold text-xs">2:00 PM</div>
              <div className="chip chip-scheduled mt-1">Scheduled</div>
            </div>
          </div>

          <div className="interview-item">
            <div className="emp-avatar" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}>DR</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Divya Reddy</div>
              <div className="text-xs text-sec">Product Manager · HR Round</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="font-semibold text-xs">9:00 AM</div>
              <div className="chip chip-completed mt-1">Completed</div>
            </div>
          </div>

          <div className="interview-item">
            <div className="emp-avatar" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>PS</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Pooja Sharma</div>
              <div className="text-xs text-sec">Frontend Developer · Live Coding</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="font-semibold text-xs">11:00 AM</div>
              <div className="chip chip-pending mt-1">Pending</div>
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className="card p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="section-title" style={{ marginBottom: 0 }}>Candidate Pipeline</div>
            <button className="btn btn-outline btn-sm" onClick={() => onNav('recruitment')}>View all</button>
          </div>

          <div className="pipeline-bar">
            <div className="pipeline-info">
              <span className="text-sm font-semibold">Applied</span>
              <span className="font-bold text-sm" style={{ color: '#3B82F6' }}>24</span>
            </div>
            <div className="pipeline-bar-track" style={{ background: 'rgba(59,130,246,0.12)' }}>
              <div className="pipeline-bar-fill" style={{ width: '100%', background: '#3B82F6' }}></div>
            </div>
          </div>
          <div className="pipeline-bar">
            <div className="pipeline-info">
              <span className="text-sm font-semibold">Shortlisted</span>
              <span className="font-bold text-sm" style={{ color: '#8B5CF6' }}>14</span>
            </div>
            <div className="pipeline-bar-track" style={{ background: 'rgba(139,92,246,0.12)' }}>
              <div className="pipeline-bar-fill" style={{ width: '58%', background: '#8B5CF6' }}></div>
            </div>
          </div>
          <div className="pipeline-bar">
            <div className="pipeline-info">
              <span className="text-sm font-semibold">Interview</span>
              <span className="font-bold text-sm" style={{ color: '#F59E0B' }}>9</span>
            </div>
            <div className="pipeline-bar-track" style={{ background: 'rgba(245,158,11,0.12)' }}>
              <div className="pipeline-bar-fill" style={{ width: '38%', background: '#F59E0B' }}></div>
            </div>
          </div>
          <div className="pipeline-bar">
            <div className="pipeline-info">
              <span className="text-sm font-semibold">Selected</span>
              <span className="font-bold text-sm" style={{ color: '#10B981' }}>5</span>
            </div>
            <div className="pipeline-bar-track" style={{ background: 'rgba(16,185,129,0.12)' }}>
              <div className="pipeline-bar-fill" style={{ width: '21%', background: '#10B981' }}></div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="section-title">Recent Activity</div>
          <div className="flex items-start gap-3 mb-3">
            <div className="activity-dot" style={{ background: 'var(--primary)' }}></div>
            <div>
              <div className="font-semibold text-sm">New application received</div>
              <div className="text-xs text-sec">Pooja Sharma applied for Frontend Developer</div>
              <div className="text-xs text-sec" style={{ opacity: 0.7 }}>10 min ago</div>
            </div>
          </div>
          <div className="flex items-start gap-3 mb-3">
            <div className="activity-dot" style={{ background: 'var(--warning)' }}></div>
            <div>
              <div className="font-semibold text-sm">Interview reminder</div>
              <div className="text-xs text-sec">Interview with Arun Kumar in 1 hour</div>
              <div className="text-xs text-sec" style={{ opacity: 0.7 }}>30 min ago</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="activity-dot" style={{ background: 'rgba(156,163,175,0.5)' }}></div>
            <div>
              <div className="text-sm text-sec">Offer accepted</div>
              <div className="text-xs text-sec">Divya Reddy accepted the offer</div>
              <div className="text-xs text-sec" style={{ opacity: 0.7 }}>1 day ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Overview */}
      <div className="card p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="section-title" style={{ marginBottom: 0 }}>Team Overview</div>
          <button className="btn btn-outline btn-sm" onClick={() => onNav('employees')}>View all</button>
        </div>
        <div>
          {renderTeamList()}
        </div>
      </div>
    </div>
  );
}
