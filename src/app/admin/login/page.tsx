'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { 
  GraduationCap, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  Home
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, demoLogin, isAdmin } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/admin');
      } else {
        setError('Invalid credentials. You can also click "Quick Demo Login" below.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    demoLogin();
    router.push('/admin');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-school-950 via-school-900 to-slate-900 p-4 sm:p-8 relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-school-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Back to website button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all border border-white/10"
        >
          <Home className="w-3.5 h-3.5 text-gold-400" />
          <span>Back to School Website</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden flex items-center justify-center border-2 border-gold-400/40 bg-white p-1 shadow-xl">
            <img
              src="/images/iqra-logo.png"
              alt="Iqra Public School Permoli Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            IPS Admin Portal
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Iqra Public School Permoli (Swabi, KPK)
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="admin@ips.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-school-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Security Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-school-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-school-900 to-school-800 hover:from-school-800 hover:to-school-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-school-900/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span>Access Management Portal</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Fast Login Button */}
        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 font-semibold mb-3">
            Quick 1-Click Evaluation Access
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-gold-50 border border-gold-300/80 text-gold-800 hover:bg-gold-100 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Instant Demo Admin Login</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
          </button>
          <p className="text-[10px] text-slate-400 mt-2">
            Demo Credentials: <span className="font-mono text-slate-600">admin@ips.edu</span> / <span className="font-mono text-slate-600">admin123</span>
          </p>
        </div>

      </div>
    </div>
  );
}
