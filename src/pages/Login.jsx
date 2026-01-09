import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Mail, Lock, Zap, ArrowLeft, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex overflow-hidden relative bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-2xl rounded-3xl p-10">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 mb-6">
                <Zap className="text-white w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-600 text-center">
                Sign in to access your dashboard
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-3">
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-3 text-slate-500 font-medium">
                      Don't have an account?
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSignUp}
                  disabled={loading}
                  type="button"
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-3.5 rounded-xl border-2 border-slate-200 transition-all hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Protected by enterprise-grade security</span>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative">
        <div className="max-w-xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 px-4 py-2 rounded-full text-sm font-semibold text-blue-700 mb-6">
              <Sparkles className="w-4 h-4" />
              Trusted by 10,000+ developers
            </div>
            <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Build faster with powerful API management
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Monitor usage, manage keys, and scale your AI applications with confidence.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Lightning Fast</h3>
                  <p className="text-sm text-slate-600">
                    Sub-millisecond API response times with global CDN distribution
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Enterprise Security</h3>
                  <p className="text-sm text-slate-600">
                    Bank-grade encryption and compliance with industry standards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
