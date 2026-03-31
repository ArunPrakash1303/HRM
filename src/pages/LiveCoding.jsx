import React, { useState, useEffect } from 'react';
import { codeSnippets } from '../data';

export default function LiveCoding() {
  const [activeTab, setActiveTab] = useState('problem');
  const [lang, setLang] = useState('javascript');
  const [code, setCode] = useState(codeSnippets.javascript);
  const [output, setOutput] = useState([
    { type: 'info', text: '> Run code to see output here' }
  ]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setCode(codeSnippets[lang] || '');
    setOutput([{ type: 'info', text: '> Run code to see output here' }]);
  }, [lang]);

  const runCode = () => {
    setRunning(true);
    setOutput([{ type: 'info', text: '> Executing code...' }]);
    
    setTimeout(() => {
      setOutput([
        { type: 'ok', text: 'Running test cases...' },
        { type: 'ok', text: '✓ Test 1: twoSum([2, 7, 11, 15], 9) → [0, 1] ✓' },
        { type: 'ok', text: '✓ Test 2: twoSum([3, 2, 4], 6) → [1, 2] ✓' },
        { type: 'ok', text: '✓ Test 3: twoSum([3, 3], 6) → [0, 1] ✓' },
        { type: 'info', text: ' ' },
        { type: 'ok', text: 'All 3 test cases passed!' },
        { type: 'info', text: 'Time: 0.42ms | Memory: 42.1 MB' }
      ]);
      setRunning(false);
    }, 1500);
  };

  const lineCount = code.split('\n').length;
  const lineNums = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <div className="breadcrumb">HR › Interviews › Live Coding</div>
          <h1>Live Coding Environment</h1>
          <p>Arun Kumar · Full Stack Developer · Technical Assessment</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="live-badge rec">
            <div className="live-dot" style={{ background: '#EF4444' }}></div>RECORDING
          </div>
          <div className="chip" style={{ background: 'rgba(0,0,0,0.07)', color: 'var(--text)', fontFamily: 'monospace', fontSize: '0.85rem', padding: '4px 12px' }}>
            <span className="material-icons" style={{ fontSize: '14px', marginRight: '4px' }}>timer</span>28:43
          </div>
        </div>
      </div>

      <div className="editor-layout">
        <div className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', padding: '0 8px' }}>
              <button 
                className="btn btn-sm" 
                onClick={() => setActiveTab('problem')} 
                style={{ borderRadius: 0, borderBottom: activeTab === 'problem' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'problem' ? 'var(--primary)' : 'var(--text-sec)', paddingBottom: '10px', background: 'transparent' }}
              >
                Problem
              </button>
              <button 
                className="btn btn-sm" 
                onClick={() => setActiveTab('examples')} 
                style={{ borderRadius: 0, borderBottom: activeTab === 'examples' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'examples' ? 'var(--primary)' : 'var(--text-sec)', paddingBottom: '10px', background: 'transparent' }}
              >
                Examples
              </button>
              <button 
                className="btn btn-sm" 
                onClick={() => setActiveTab('notes')} 
                style={{ borderRadius: 0, borderBottom: activeTab === 'notes' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'notes' ? 'var(--primary)' : 'var(--text-sec)', paddingBottom: '10px', background: 'transparent' }}
              >
                Notes
              </button>
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '18px' }}>
            {activeTab === 'problem' && (
              <div>
                <div className="flex gap-2 mb-3" style={{ flexWrap: 'wrap' }}>
                  <div className="chip" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}>Easy</div>
                  <div className="chip" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text-sec)' }}>Array</div>
                  <div className="chip" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text-sec)' }}>Hash Map</div>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '12px' }}>Two Sum</h3>
                <p style={{ color: 'var(--text-sec)', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '14px' }}>
                  Given an array of integers <code style={{ background: 'rgba(26,35,126,0.08)', padding: '1px 5px', borderRadius: '4px', fontSize: '0.78rem' }}>nums</code> and an integer <code style={{ background: 'rgba(26,35,126,0.08)', padding: '1px 5px', borderRadius: '4px', fontSize: '0.78rem' }}>target</code>, return <em>indices of the two numbers such that they add up to target</em>.
                </p>
                <p style={{ color: 'var(--text-sec)', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '14px' }}>
                  You may assume each input would have exactly one solution, and you may not use the same element twice.
                </p>
                <p style={{ fontWeight: 600, fontSize: '0.82rem', marginBottom: '8px' }}>Constraints:</p>
                <p style={{ color: 'var(--text-sec)', fontSize: '0.78rem', lineHeight: 2 }}>
                  • 2 ≤ nums.length ≤ 10⁴<br/>• -10⁹ ≤ nums[i] ≤ 10⁹<br/>• Only one valid answer exists.
                </p>
              </div>
            )}
            
            {activeTab === 'examples' && (
              <div>
                <div style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px', marginBottom: '14px' }}>
                  <div className="font-bold text-xs mb-2">Example 1</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.8, color: 'var(--text-sec)' }}>
                    Input: nums = [2,7,11,15], target = 9<br/>Output: [0,1]<br/>Explanation: nums[0] + nums[1] = 2 + 7 = 9
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px' }}>
                  <div className="font-bold text-xs mb-2">Example 2</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.8, color: 'var(--text-sec)' }}>
                    Input: nums = [3,2,4], target = 6<br/>Output: [1,2]
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notes' && (
              <textarea 
                style={{ width: '100%', minHeight: '200px', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', fontSize: '0.82rem', padding: '10px', border: 'none' }} 
                placeholder="Add your interview notes here..."
              ></textarea>
            )}
          </div>
        </div>
        
        <div className="code-area">
          <div className="code-editor-wrap">
            <div className="editor-header">
              <select className="lang-select" value={lang} onChange={e => setLang(e.target.value)}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
              <div style={{ flex: 1 }}></div>
              <button className="icon-btn" style={{ color: '#8B949E' }} onClick={() => setCode(codeSnippets[lang] || '')} title="Reset">
                <span className="material-icons" style={{ fontSize: '16px' }}>refresh</span>
              </button>
              <button 
                className="btn" 
                onClick={runCode} 
                disabled={running}
                style={{ background: '#10B981', color: '#fff', fontSize: '0.78rem', padding: '6px 16px', gap: '6px' }}
              >
                <span className="material-icons" style={{ fontSize: '16px', animation: running ? 'spin 1s linear infinite' : 'none' }}>
                  {running ? 'refresh' : 'play_arrow'}
                </span> 
                {running ? 'Running...' : 'Run Code'}
              </button>
            </div>
            <div className="editor-body" style={{ position: 'relative' }}>
              <div className="line-nums">
                {lineNums.map(n => <span key={n}>{n}</span>)}
              </div>
              <textarea 
                className="code-input" 
                value={code} 
                onChange={e => setCode(e.target.value)} 
                spellCheck="false"
              ></textarea>
            </div>
          </div>
          
          <div className="output-box">
            <div className="output-header">
              <span className="material-icons" style={{ fontSize: '16px', color: '#8B949E' }}>terminal</span>
              <span>Output Console</span>
              <div style={{ flex: 1 }}></div>
              <button 
                onClick={() => setOutput([{ type: 'info', text: '> Console cleared' }])} 
                style={{ background: 'none', border: 'none', color: '#8B949E', fontSize: '0.72rem', cursor: 'pointer' }}
              >
                Clear
              </button>
            </div>
            <div className="output-content">
              {output.map((o, i) => (
                <span key={i} className={`output-line output-${o.type}`}>{o.text}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
