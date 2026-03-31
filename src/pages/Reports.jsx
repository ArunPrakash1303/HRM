import React from 'react';
import { hiringData, deptData2, retData } from '../data';
import { hex2rgba } from '../utils/colors';

export default function Reports() {
  const maxHiring = 90;
  const maxRet = 100;
  const minRet = 88;
  const totalDept = deptData2.reduce((s, d) => s + d.c, 0);
  const funnel = [
    { s: 'Applied', v: 90, c: '#1A237E' },
    { s: 'Shortlisted', v: 52, c: '#3B82F6' },
    { s: 'Interview', v: 31, c: '#8B5CF6' },
    { s: 'Offer', v: 18, c: '#10B981' },
    { s: 'Joined', v: 14, c: '#F59E0B' }
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <div className="breadcrumb">HR › Reports</div>
          <h1>Reports & Analytics</h1>
          <p>Insights across hiring, interviews, and workforce</p>
        </div>
        <button className="btn btn-outline btn-sm">
          <span className="material-icons" style={{ fontSize: '16px' }}>download</span> Export
        </button>
      </div>

      <div className="grid grid-4 mb-4">
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'rgba(26,35,126,0.1)' }}>
            <span className="material-icons" style={{ color: '#1A237E' }}>people</span>
          </div>
          <div className="stat-value">73</div>
          <div className="stat-label">Total Hires (Year)</div>
          <div className="trend up">↑ +18%</div>
        </div>
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'rgba(139,92,246,0.1)' }}>
            <span className="material-icons" style={{ color: '#8B5CF6' }}>work</span>
          </div>
          <div className="stat-value">12</div>
          <div className="stat-label">Open Positions</div>
          <div className="trend up">↑ +2</div>
        </div>
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.1)' }}>
            <span className="material-icons" style={{ color: '#F59E0B' }}>schedule</span>
          </div>
          <div className="stat-value">18d</div>
          <div className="stat-label">Avg Time to Hire</div>
          <div className="trend down">↓ -3 days</div>
        </div>
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.1)' }}>
            <span className="material-icons" style={{ color: '#10B981' }}>check_circle</span>
          </div>
          <div className="stat-value">87%</div>
          <div className="stat-label">Offer Accept Rate</div>
          <div className="trend up">↑ +5%</div>
        </div>
      </div>

      <div className="grid-21 mb-4">
        <div className="card p-5">
          <div className="section-title">Hiring Trend (Applications vs Hires)</div>
          <div className="bar-chart" style={{ height: '160px' }}>
            {hiringData.map((d, i) => (
              <div className="bar-group" key={i}>
                <div className="bar" style={{ height: `${(d.a / maxHiring) * 140}px`, width: '45%', background: 'rgba(26,35,126,0.22)', borderRadius: '4px 4px 0 0' }}></div>
                <div className="bar" style={{ height: `${(d.h / maxHiring) * 140}px`, width: '45%', background: 'var(--primary)', borderRadius: '4px 4px 0 0' }}></div>
              </div>
            ))}
          </div>
          <div className="chart-labels">
            {hiringData.map((d, i) => <div className="chart-label" key={i}>{d.m}</div>)}
          </div>
        </div>
        
        <div className="card p-5">
          <div className="section-title">Headcount by Department</div>
          <div style={{ padding: '8px 0' }}>
            {deptData2.map(d => (
              <div className="flex items-center gap-2 mb-2" key={d.d}>
                <div className="pie-dot" style={{ background: d.color }}></div>
                <div style={{ fontSize: '0.78rem', flex: 1 }}>{d.d}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-sec)', width: '30px', textAlign: 'right' }}>{d.c}</div>
                <div style={{ width: '80px', height: '6px', borderRadius: '3px', background: 'rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(d.c / totalDept) * 100}%`, background: d.color, borderRadius: '3px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card p-5">
          <div className="section-title">Recruitment Funnel</div>
          <div>
            {funnel.map(f => (
              <div className="mb-3" key={f.s}>
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{f.s}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: f.c }}>{f.v}</span>
                </div>
                <div style={{ height: '8px', borderRadius: '4px', background: hex2rgba(f.c, 0.12), overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(f.v / 90) * 100}%`, background: f.c, borderRadius: '4px', transition: 'width 0.6s ease' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card p-5">
          <div className="section-title">Retention Rate Trend</div>
          <div className="bar-chart" style={{ height: '160px' }}>
            {retData.map((d, i) => (
              <div className="bar-group" key={i}>
                <div className="bar" style={{ height: `${((d.r - minRet) / (maxRet - minRet)) * 130 + 10}px`, width: '100%', background: '#10B981', borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
              </div>
            ))}
          </div>
          <div className="chart-labels">
            {retData.map((d, i) => <div className="chart-label" key={i}>{d.m}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
