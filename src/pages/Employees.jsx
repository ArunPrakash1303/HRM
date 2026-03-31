import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { employees, deptColors } from '../data';
import { hex2rgba } from '../utils/colors';

export default function Employees({ onNav, context }) {
  const [employeeList, setEmployeeList] = useState(employees);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', dept: 'Engineering', location: '' });

  useEffect(() => {
    if (context && context.openModal) setIsModalOpen(true);
  }, [context]);

  const filteredEmployees = employeeList.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All Status' ? true : e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAddEmployee = () => {
    const name = formData.name || 'New Employee';
    const newEmp = {
      id: Date.now(),
      name: name,
      role: formData.role || 'Employee',
      dept: formData.dept,
      email: formData.email,
      status: 'Active',
      avatar: name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase(),
      joinDate: new Date().toISOString().split('T')[0],
      location: formData.location || 'Remote'
    };
    employees.unshift(newEmp);
    setEmployeeList([...employees]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', role: '', dept: 'Engineering', location: '' });
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <div className="breadcrumb">HR › Employees</div>
          <h1>Employees</h1>
          <p>6 active members</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
          <span className="material-icons" style={{ fontSize: '16px' }}>add</span> Add Employee
        </button>
      </div>

      <div className="grid grid-4 mb-4">
        <div className="card card-hover stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-subtle)' }}>
            <span className="material-icons" style={{ color: 'var(--primary)' }}>groups</span>
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
                      <div className="emp-avatar" style={{ background: deptColors[e.dept] ? hex2rgba(deptColors[e.dept], 0.12) : 'var(--primary-subtle)', color: deptColors[e.dept] || 'var(--primary)' }}>
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
                      <button className="icon-btn" style={{ color: '#EF4444' }} title="Delete" onClick={() => {
                        const idx = employees.findIndex(emp => emp.id === e.id);
                        if(idx > -1) employees.splice(idx, 1);
                        setEmployeeList([...employees]);
                      }}>
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

      {isModalOpen && createPortal(
        <div className="modal-bg open" style={{ display: 'flex' }}>
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Employee</h3>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}><span className="material-icons">close</span></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group-m form-full">
                  <label>Full Name</label>
                  <input placeholder="e.g. Priya Nair" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group-m">
                  <label>Email Address</label>
                  <input type="email" placeholder="email@company.com" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="form-group-m">
                  <label>Phone Number</label>
                  <input placeholder="+91 98765 43210" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="form-group-m">
                  <label>Job Role</label>
                  <input placeholder="e.g. Software Engineer" value={formData.role} onChange={e=>setFormData({...formData, role: e.target.value})} />
                </div>
                <div className="form-group-m">
                  <label>Department</label>
                  <select value={formData.dept} onChange={e=>setFormData({...formData, dept: e.target.value})}>
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                    <option>Analytics</option>
                    <option>Human Resources</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div className="form-group-m">
                  <label>Location</label>
                  <input placeholder="e.g. Chennai" value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline btn-sm" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleAddEmployee}>Add Employee</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
