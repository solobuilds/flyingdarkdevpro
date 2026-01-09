import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  Search,
  RefreshCw,
  Edit2
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

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">System Administration</h1>
            <p className="text-slate-500">Manage users, budgets, and monitor global system usage.</p>
          </div>
          <button onClick={fetchData} className="btn-secondary flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {/* User Management Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              User Directory
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64"
              />
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">User</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Monthly Budget</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">{u.email}</div>
                      <div className="text-xs text-slate-500">Joined {new Date(u.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        u.subscription_status === 'pro' ? 'bg-indigo-100 text-indigo-700' : 
                        u.subscription_status === 'enterprise' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {u.subscription_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {u.monthly_budget.toLocaleString()} tokens
                    </td>
                    <td className="px-6 py-4">
                      {u.is_admin ? (
                        <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                          <ShieldCheck className="w-3 h-3" /> ADMIN
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs font-medium">USER</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => {
                          const newBudget = prompt('Enter new monthly budget:', u.monthly_budget);
                          if (newBudget) updateUser(u.id, { monthly_budget: parseInt(newBudget) });
                        }}
                        className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Global Usage Logs */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Global Usage Stream
          </h2>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-slate-500">User</th>
                  <th className="px-6 py-3 font-semibold text-slate-500">Model</th>
                  <th className="px-6 py-3 font-semibold text-slate-500">Provider</th>
                  <th className="px-6 py-3 font-semibold text-slate-500">Tokens</th>
                  <th className="px-6 py-3 font-semibold text-slate-500 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{log.users?.email}</td>
                    <td className="px-6 py-4 text-slate-500">{log.model}</td>
                    <td className="px-6 py-4 text-slate-500">{log.provider}</td>
                    <td className="px-6 py-4 font-mono text-xs">{log.tokens_in + log.tokens_out}</td>
                    <td className="px-6 py-4 text-right text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
