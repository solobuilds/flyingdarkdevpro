import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import axios from 'axios';
import {
  Users,
  ShieldCheck,
  TrendingUp,
  Search,
  RefreshCw,
  Edit2,
  Zap,
  LogOut,
  User,
  Activity,
  Crown,
  Settings
} from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api';

export default function Admin({ session }) {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${session.access_token}` };
      const [logsRes, usersRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/usage/all`, { headers }),
        axios.get(`${BACKEND_URL}/usage/users`, { headers })
      ]);
      setLogs(logsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Admin fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, data) => {
    try {
      const headers = { Authorization: `Bearer ${session.access_token}` };
      await axios.patch(`${BACKEND_URL}/usage/users/${userId}`, data, { headers });
      fetchData();
    } catch (error) {
      alert('Failed to update user');
    }
  };

  const filteredUsers = users.filter(u => u.email.toLowerCase().includes(searchTerm.toLowerCase()));

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.subscription_status !== 'free').length,
    totalActivity: logs.length
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
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-500" />
                Admin Panel
              </p>
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
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-xl text-sm font-medium text-amber-700">
              <ShieldCheck className="w-4 h-4" />
              Admin
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
            <h1 className="text-3xl font-bold text-slate-900 mb-2">System Administration</h1>
            <p className="text-slate-600">Manage users, budgets, and monitor global system usage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-6 -mb-6"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Users</p>
              <h3 className="text-3xl font-bold">{stats.totalUsers}</h3>
              <p className="text-blue-100 text-sm mt-1">registered accounts</p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-xl shadow-emerald-500/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-6 -mb-6"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6" />
                </div>
              </div>
              <p className="text-emerald-100 text-sm font-medium mb-1">Premium Users</p>
              <h3 className="text-3xl font-bold">{stats.activeUsers}</h3>
              <p className="text-emerald-100 text-sm mt-1">paid subscriptions</p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl shadow-amber-500/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-6 -mb-6"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
              <p className="text-amber-100 text-sm font-medium mb-1">Total Activity</p>
              <h3 className="text-3xl font-bold">{stats.totalActivity}</h3>
              <p className="text-amber-100 text-sm mt-1">recent requests</p>
            </div>
          </div>
        </div>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">User Directory</h2>
                <p className="text-sm text-slate-500">Manage user accounts and permissions</p>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 w-80 bg-white"
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Monthly Budget</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                            {u.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{u.email}</div>
                            <div className="text-xs text-slate-500">
                              Joined {new Date(u.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${
                          u.subscription_status === 'pro'
                            ? 'bg-blue-100 text-blue-700'
                            : u.subscription_status === 'enterprise'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {u.subscription_status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono font-semibold text-slate-900">
                          {u.monthly_budget.toLocaleString()}
                        </span>
                        <span className="text-slate-500 text-sm ml-1">tokens</span>
                      </td>
                      <td className="px-6 py-4">
                        {u.is_admin ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold">ADMIN</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs font-medium uppercase">User</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            const newBudget = prompt('Enter new monthly budget:', u.monthly_budget);
                            if (newBudget) updateUser(u.id, { monthly_budget: parseInt(newBudget) });
                          }}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                            <Users className="w-8 h-8 text-slate-400" />
                          </div>
                          <p className="text-slate-500 font-medium">No users found</p>
                          <p className="text-sm text-slate-400">Try adjusting your search</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Global Activity Stream</h2>
              <p className="text-sm text-slate-500">Real-time API usage across all users</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl rounded-2xl overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-slate-50/90 backdrop-blur-sm border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Model</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Provider</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Tokens</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.slice(0, 50).map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-900">{log.users?.email || 'Unknown'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-700">{log.model}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
                          {log.provider}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono font-semibold text-slate-900">
                          {(log.tokens_in + log.tokens_out).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-500">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                            <Activity className="w-8 h-8 text-slate-400" />
                          </div>
                          <p className="text-slate-500 font-medium">No activity yet</p>
                          <p className="text-sm text-slate-400">Usage data will appear here</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
