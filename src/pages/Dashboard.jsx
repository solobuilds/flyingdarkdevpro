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
  TrendingUp,
  Zap,
  Shield,
  RefreshCw
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight">
                FlyingDarkDev<span className="text-blue-600">Pro</span>
              </span>
              <p className="text-xs text-slate-500 font-medium">Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              title="Refresh data"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-sm font-medium text-slate-700">
              <User className="w-4 h-4 text-slate-500" />
              {session.user.email}
            </div>
            <button
              onClick={() => supabase.auth.signOut()}
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
            <p className="text-slate-600">Monitor your API usage and manage credentials</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-6 -mb-6"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <TrendingUp className="w-5 h-5 text-white/60" />
              </div>
              <p className="text-blue-100 text-sm font-medium mb-1">Monthly Usage</p>
              <h3 className="text-3xl font-bold">
                {stats.totalTokens.toLocaleString()}
              </h3>
              <p className="text-blue-100 text-sm mt-1">tokens consumed</p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-xl shadow-emerald-500/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-6 -mb-6"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Database className="w-6 h-6" />
                </div>
                <BarChart3 className="w-5 h-5 text-white/60" />
              </div>
              <p className="text-emerald-100 text-sm font-medium mb-1">Total Requests</p>
              <h3 className="text-3xl font-bold">
                {stats.requests}
              </h3>
              <p className="text-emerald-100 text-sm mt-1">API calls made</p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl shadow-amber-500/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-6 -mb-6"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Key className="w-6 h-6" />
                </div>
                <Shield className="w-5 h-5 text-white/60" />
              </div>
              <p className="text-amber-100 text-sm font-medium mb-1">Active Keys</p>
              <h3 className="text-3xl font-bold">
                {keys.filter(k => k.is_active).length}
              </h3>
              <p className="text-amber-100 text-sm mt-1">credentials in use</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Key className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">API Credentials</h2>
                  <p className="text-sm text-slate-500">Manage your API keys</p>
                </div>
              </div>
              <button
                onClick={createKey}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" /> Generate Key
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Label</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Last Used</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {keys.map(k => (
                    <tr key={k.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900">{k.name}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(k.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {k.last_used ? new Date(k.last_used).toLocaleDateString() : (
                          <span className="text-slate-400">Never</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          k.is_active
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {k.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {keys.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                            <Key className="w-8 h-8 text-slate-400" />
                          </div>
                          <p className="text-slate-500 font-medium">No API keys yet</p>
                          <p className="text-sm text-slate-400">Generate your first key to get started</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                <p className="text-sm text-slate-500">Latest API requests</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl rounded-2xl p-5">
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {usage.slice(0, 10).map((u, index) => (
                  <div
                    key={u.id}
                    className="flex items-start gap-3 pb-4 relative last:pb-0 last:border-0 border-b border-slate-100"
                  >
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mt-2"></div>
                      {index !== usage.slice(0, 10).length - 1 && (
                        <div className="absolute left-1/2 top-4 bottom-0 w-px bg-slate-200 -translate-x-1/2"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm font-bold text-slate-900 truncate">{u.model}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {u.provider} • {(u.tokens_in + u.tokens_out).toLocaleString()} tokens
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(u.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {usage.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Activity className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-medium">No activity yet</p>
                    <p className="text-sm text-slate-400 mt-1">Your API usage will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
