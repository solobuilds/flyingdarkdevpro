import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Shield, Mail, Lock, Rocket } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Success! Check your email to confirm.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-md w-full glass-card bg-slate-900/50 border-slate-800 p-8 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4">
            <Rocket className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">FlyingDarkDev<span className="text-indigo-500">Pro</span></h1>
          <p className="text-slate-400 mt-2 text-sm">Elevate your AI development workflow</p>
        </div>

        <form className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="email" 
              placeholder="Email address"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button 
              onClick={handleLogin}
              disabled={loading}
              className="w-full btn-primary py-3 shadow-lg shadow-indigo-600/20"
            >
              {loading ? 'Processing...' : 'Sign In'}
            </button>
            <button 
              onClick={handleSignUp}
              disabled={loading}
              className="w-full text-slate-400 hover:text-white text-sm transition-colors"
            >
              Don't have an account? <span className="text-indigo-400 font-medium">Create one</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
