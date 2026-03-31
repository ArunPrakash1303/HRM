import React, { useState } from 'react';
import { documents2 } from '../data';
import { hex2rgba } from '../utils/colors';

export default function Documents() {
  const [activeFolder, setActiveFolder] = useState('All Files');
  const [docList, setDocList] = useState(documents2);
  const folders = ['All Files', 'Policies', 'Templates', 'Reports', 'General'];

  const filteredDocs = activeFolder === 'All Files' 
    ? docList 
    : docList.filter(d => d.folder === activeFolder);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <div className="breadcrumb">HR › Documents</div>
          <h1>Document Management</h1>
          <p>6 documents across 4 folders</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">
            <span className="material-icons" style={{ fontSize: '16px' }}>upload</span> Upload
          </button>
          <button className="btn btn-primary btn-sm">
            <span className="material-icons" style={{ fontSize: '16px' }}>create_new_folder</span> New Folder
          </button>
        </div>
      </div>

      <div className="grid-12">
        <div className="card p-4">
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-sec)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', padding: '0 4px' }}>
            Folders
          </div>
          <div>
            {folders.map((f, i) => (
              <div 
                key={i} 
                className={`folder-item ${activeFolder === f ? 'active' : ''}`}
                onClick={() => setActiveFolder(f)}
              >
                <span className="material-icons" style={{ fontSize: '18px' }}>folder</span>
                <span style={{ flex: 1, fontSize: '0.82rem' }}>{f}</span>
                <span className="chip" style={{ height: '18px', fontSize: '0.65rem', padding: '2px 6px' }}>
                  {f === 'All Files' ? docList.length : docList.filter(d => d.folder === f).length}
                </span>
              </div>
            ))}
          </div>
          <div className="divider"></div>
          <div className="p-2">
            <div className="text-xs text-sec mb-2">Storage Used</div>
            <div style={{ height: '6px', borderRadius: '3px', background: 'var(--border)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '62%', background: 'var(--primary)', borderRadius: '3px' }}></div>
            </div>
            <div className="text-xs text-sec mt-2">6.2 GB of 10 GB used</div>
          </div>
        </div>

        <div>
          <div className="grid grid-3">
            {filteredDocs.map(d => (
              <div key={d.id} className="card card-hover doc-card">
                <div className="flex justify-between items-start mb-3">
                  <div className="doc-icon-wrap" style={{ background: hex2rgba(d.color, 0.1) }}>
                    <span className="material-icons" style={{ color: d.color }}>{d.icon}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="icon-btn" title="Download">
                      <span className="material-icons" style={{ fontSize: '15px' }}>download</span>
                    </button>
                    <button className="icon-btn" style={{ color: '#EF4444' }} title="Delete" onClick={() => {
                      const idx = documents2.findIndex(doc => doc.id === d.id);
                      if (idx > -1) documents2.splice(idx, 1);
                      setDocList([...documents2]);
                    }}>
                      <span className="material-icons" style={{ fontSize: '15px' }}>delete</span>
                    </button>
                  </div>
                </div>
                <div className="font-semibold truncate" style={{ fontSize: '0.8rem' }}>{d.name}</div>
                <div className="flex justify-between items-center mt-2">
                  <span className="chip" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text-sec)', height: '18px', fontSize: '0.65rem' }}>{d.folder}</span>
                  <span className="text-xs text-sec">{d.size}</span>
                </div>
                <div className="text-xs text-sec mt-1">Modified {d.modified}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
