import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import axios from 'axios';
import { 
  Key, 
  Activity, 
  LogOut, 
  Plus, 
  Clock, 
  Database,
  BarChart3,
  User,
  ExternalLink
} from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api';

export default function Dashboard({ session }) {
  const [keys, setKeys] = useState([]);
  const [usage, setUsage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalTokens: 0, requests: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${session.access_token}` };
      const [keysRes, usageRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/auth/keys`, { headers }),
        axios.get(`${BACKEND_URL}/tools/usage-summary`, { headers })
      ]);
      setKeys(keysRes.data);
      setUsage(usageRes.data);
      
      const total = usageRes.data.reduce((acc, curr) => acc + curr.tokens_in + curr.tokens_out, 0);
      setStats({ totalTokens: total, requests: usageRes.data.length });
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createKey = async () => {
    const name = prompt('Key label (e.g., "Production", "Testing"):');
    if (!name) return;
    try {
      const headers = { Authorization: `Bearer ${session.access_token}` };
      const res = await axios.post(`${BACKEND_URL}/auth/keys`, { name }, { headers });
      alert(`NEW API KEY: ${res.data.key}\n\nIMPORTANT: Copy this now. You won't see it again.`);
      fetchData();
    } catch (error) {
      alert('Failed to create key');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar / Nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">FlyingDarkDev<span className="text-indigo-600">Pro</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
            <User className="w-3 h-3" />
            {session.user.email}
          </div>
          <button 
            onClick={() => supabase.auth.signOut()} 
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Monthly Usage</p>
              <h3 className="text-2xl font-bold">{stats.totalTokens.toLocaleString()} <span className="text-sm font-normal text-slate-400">tokens</span></h3>
            </div>
          </div>
          
          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Requests</p>
              <h3 className="text-2xl font-bold">{stats.requests} <span className="text-sm font-normal text-slate-400">calls</span></h3>
            </div>
          </div>

          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Keys</p>
              <h3 className="text-2xl font-bold">{keys.filter(k => k.is_active).length} <span className="text-sm font-normal text-slate-400">keys</span></h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Keys Management */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Key className="w-5 h-5 text-indigo-600" />
                API Credentials
              </h2>
              <button onClick={createKey} className="btn-primary py-1.5 px-3 text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" /> Generate Key
              </button>
            </div>
            
            <div className="glass-card overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Label</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Created</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Last Used</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {keys.map(k => (
                    <tr key={k.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700">{k.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{new Date(k.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {k.last_used ? new Date(k.last_used).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          k.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {k.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {keys.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                        No API keys generated yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Recent Activity
            </h2>
            <div className="glass-card p-4 space-y-4">
              {usage.slice(0, 8).map(u => (
                <div key={u.id} className="flex items-start gap-3 relative before:absolute before:left-2 before:top-8 before:bottom-0 before:w-px before:bg-slate-100 last:before:hidden">
                  <div className="w-4 h-4 rounded-full bg-indigo-100 border-2 border-white flex-shrink-0 mt-1"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{u.model}</p>
                    <div className="flex justify-between items-center text-xs text-slate-500 mt-0.5">
                      <span>{u.provider} • {u.tokens_in + u.tokens_out} tokens</span>
                      <span>{new Date(u.timestamp).getHours()}:{new Date(u.timestamp).getMinutes()}</span>
                    </div>
                  </div>
                </div>
              ))}
              {usage.length === 0 && (
                <p className="text-center py-8 text-slate-400 text-sm">No recent logs</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
