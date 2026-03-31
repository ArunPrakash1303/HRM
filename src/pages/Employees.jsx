import React, { useState } from 'react';
import { employees, deptColors } from '../data';
import { hex2rgba } from '../utils/colors';

export default function Employees({ onNav }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filteredEmployees = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All Status' ? true : e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <div className="breadcrumb">HR › Employees</div>
          <h1>Employees</h1>
          <p>6 active members</p>
        </div>
        <button className="btn btn-primary btn-sm">
          <span className="material-icons" style={{ fontSize: '16px' }}>add</span> Add Employee
        </button>
      </div>

      <div className="grid grid-4 mb-4">
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'rgba(26,35,126,0.1)' }}>
            <span className="material-icons" style={{ color: '#1A237E' }}>groups</span>
          </div>
          <div className="stat-value">8</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.1)' }}>
            <span className="material-icons" style={{ color: '#10B981' }}>check_circle</span>
          </div>
          <div className="stat-value">6</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.1)' }}>
            <span className="material-icons" style={{ color: '#F59E0B' }}>beach_access</span>
          </div>
          <div className="stat-value">1</div>
          <div className="stat-label">On Leave</div>
        </div>
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'rgba(139,92,246,0.1)' }}>
            <span className="material-icons" style={{ color: '#8B5CF6' }}>business</span>
          </div>
          <div className="stat-value">6</div>
          <div className="stat-label">Departments</div>
        </div>
      </div>

      <div className="card">
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="input-wrap flex-1" style={{ minWidth: '200px' }}>
            <span className="material-icons">search</span>
            <input 
              type="text" 
              className="input-icon" 
              placeholder="Search employees..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select 
            style={{ width: 'auto', flexShrink: 0 }} 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
        </div>
        
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th className="desktop-hidden">Department</th>
                <th>Status</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(e => (
                <tr key={e.id}>
                  <td>
                    <div className="emp-cell">
                      <div className="emp-avatar" style={{ background: hex2rgba(deptColors[e.dept] || '#1A237E', 0.12), color: deptColors[e.dept] || '#1A237E' }}>
                        {e.avatar}
                      </div>
                      <div>
                        <div className="font-semibold" style={{ fontSize: '0.82rem' }}>{e.name}</div>
                        <div className="text-xs text-sec">{e.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="desktop-hidden">
                    <span className="chip" style={{ background: hex2rgba(deptColors[e.dept] || '#666', 0.1), color: deptColors[e.dept] || '#666' }}>
                      {e.dept}
                    </span>
                  </td>
                  <td>
                    <div className={`chip chip-${e.status.toLowerCase().replace(' ', '-')}`}>
                      {e.status}
                    </div>
                  </td>
                  <td className="text-xs text-sec">{e.joinDate}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="icon-btn" title="Edit">
                        <span className="material-icons" style={{ fontSize: '15px' }}>edit</span>
                      </button>
                      <button className="icon-btn" style={{ color: '#EF4444' }} title="Delete">
                        <span className="material-icons" style={{ fontSize: '15px' }}>delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
