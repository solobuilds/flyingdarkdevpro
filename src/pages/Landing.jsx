import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Shield,
  BarChart3,
  Globe,
  Lock,
  Sparkles,
  ArrowRight,
  Check,
  Code2,
  Gauge,
  Users
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/50 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              FlyingDarkDev<span className="text-blue-600">Pro</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-6">
                <Sparkles className="w-4 h-4" />
                Advanced API Management Platform
              </div>

              <h1 className="text-6xl md:text-7xl font-bold text-slate-900 leading-tight tracking-tight">
                Power Your AI
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Development Workflow
                </span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Enterprise-grade API key management, real-time usage tracking, and intelligent
                resource allocation for modern AI applications.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  to="/login"
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-xl shadow-blue-600/25 transition-all hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#features"
                  className="bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-semibold border-2 border-slate-200 transition-all hover:border-slate-300 flex items-center justify-center gap-2"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="mt-20 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10"></div>
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

                <div className="relative space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-sm text-slate-500 font-mono">dashboard.flyingdarkdevpro.com</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-6">
                      <div className="text-2xl font-bold text-slate-900">47.2K</div>
                      <div className="text-sm text-slate-600 mt-1">API Calls Today</div>
                      <div className="mt-4 h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-6">
                      <div className="text-2xl font-bold text-slate-900">99.9%</div>
                      <div className="text-sm text-slate-600 mt-1">Uptime</div>
                      <div className="mt-4 h-2 bg-emerald-200 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-6">
                      <div className="text-2xl font-bold text-slate-900">2.8M</div>
                      <div className="text-sm text-slate-600 mt-1">Tokens Used</div>
                      <div className="mt-4 h-2 bg-amber-200 rounded-full overflow-hidden">
                        <div className="h-full w-3/5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Everything You Need to Scale
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Built for developers who demand performance, security, and reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
                <p className="text-slate-600 leading-relaxed">
                  Sub-millisecond response times with globally distributed infrastructure.
                  Your APIs run at peak performance, always.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-emerald-500/10 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise Security</h3>
                <p className="text-slate-600 leading-relaxed">
                  Bank-grade encryption, role-based access control, and comprehensive
                  audit logs keep your data protected.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Real-Time Analytics</h3>
                <p className="text-slate-600 leading-relaxed">
                  Monitor every request with detailed metrics, usage patterns, and
                  performance insights in real-time.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Developer First</h3>
                <p className="text-slate-600 leading-relaxed">
                  Intuitive APIs, comprehensive documentation, and SDKs for every
                  major programming language.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-cyan-500/10 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform">
                  <Gauge className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Rate Limiting</h3>
                <p className="text-slate-600 leading-relaxed">
                  Flexible quotas and intelligent throttling protect your resources
                  while maximizing throughput.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-teal-500/10 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Team Collaboration</h3>
                <p className="text-slate-600 leading-relaxed">
                  Invite team members, set permissions, and manage access across
                  your entire organization seamlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-cyan-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join thousands of developers building the future with FlyingDarkDevPro.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 px-10 py-5 rounded-xl font-bold shadow-2xl transition-all hover:scale-105 text-lg"
            >
              Start Building Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <footer className="bg-slate-900 text-slate-400 py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">
                FlyingDarkDev<span className="text-blue-400">Pro</span>
              </span>
            </div>
            <p className="text-sm">
              2024 FlyingDarkDevPro. Built for developers, by developers.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
