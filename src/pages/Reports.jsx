import React from 'react';
import { hiringData, deptData2, retData } from '../data';
import { hex2rgba } from '../utils/colors';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Reports({ isDark }) {
  const maxHiring = 90;
  const maxRet = 100;
  const minRet = 88;
  const totalDept = deptData2.reduce((s, d) => s + d.c, 0);
  const funnel = [
    { s: 'Applied', v: 90, c: 'var(--primary)' },
    { s: 'Shortlisted', v: 52, c: '#3B82F6' },
    { s: 'Interview', v: 31, c: '#8B5CF6' },
    { s: 'Offer', v: 18, c: '#10B981' },
    { s: 'Joined', v: 14, c: '#F59E0B' }
  ];

  const textColor = isDark ? '#F8FAFC' : '#1E293B';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#FF7A28';

  const hiringChartData = {
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

  const retChartData = {
    labels: retData.map(d => d.m),
    datasets: [
      {
        label: 'Retention Rate',
        data: retData.map(d => d.r),
        borderColor: '#10B981',
        backgroundColor: hex2rgba('#10B981', 0.2),
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10B981'
      }
    ]
  };

  const commonOptions = {
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
        usePointStyle: true
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor, font: { family: "'Plus Jakarta Sans', sans-serif", size: 10 } }
      },
      y: {
        grid: { color: gridColor },
        border: { display: false },
        ticks: { color: textColor, font: { family: "'Plus Jakarta Sans', sans-serif", size: 10 } }
      }
    }
  };

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
          <div className="stat-icon" style={{ background: 'var(--primary-subtle)' }}>
            <span className="material-icons" style={{ color: 'var(--primary)' }}>people</span>
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
        <div className="card p-5" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="section-title">Hiring Trend (Applications vs Hires)</div>
          <div style={{ flex: 1, minHeight: '180px', width: '100%' }}>
            <Bar data={hiringChartData} options={commonOptions} />
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
        
        <div className="card p-5" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="section-title">Retention Rate Trend (%)</div>
          <div style={{ flex: 1, minHeight: '180px', width: '100%' }}>
            <Line data={retChartData} options={{ ...commonOptions, scales: { ...commonOptions.scales, y: { ...commonOptions.scales.y, min: 80, max: 100 } } }} />
          </div>
        </div>
      </div>
    </div>
  );
}
