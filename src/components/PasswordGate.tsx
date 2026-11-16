import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { SCENE_ASSETS } from '../data/siteContent';

interface PasswordGateProps {
  hint: string;
  onUnlocked: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ hint, onUnlocked }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your passphrase.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || 'Unable to unlock with that passphrase.');
        setSubmitting(false);
        return;
      }
      onUnlocked();
    } catch {
      setError('Connection error while verifying passphrase.');
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#091521] text-[#F8F3E9] flex items-center justify-center px-6 py-12">
      <img
        src={SCENE_ASSETS.beachGoldenHour}
        alt="Golden hour shoreline background"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover opacity-30 scale-105 blur-sm"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#091521]/85 via-[#102D3A]/75 to-[#091521]/95"
      />

      <section className="relative z-10 w-full max-w-md border border-[#E8D6B8]/20 bg-[#091521]/80 p-8 sm:p-10 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs tracking-widest text-[#D8A45B] font-mono-meta mb-6">
          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Private Entrance</span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl font-normal leading-tight text-[#F8F3E9]">
          A Little Place in the Internet
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#AEBCC5]">
          This space holds private photographs, voices, and letters made just for you. Enter the passphrase to step inside.
        </p>

        {hint ? (
          <p className="mt-4 font-hand text-xl text-[#E8D6B8]">
            Clue: {hint}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="universe-passphrase" className="block text-xs text-[#AEBCC5] mb-2">
              Passphrase
            </label>
            <div className="relative">
              <input
                id="universe-passphrase"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter passphrase"
                className="w-full border border-[#E8D6B8]/25 bg-[#102D3A]/60 px-4 py-3 pr-11 text-sm text-[#F8F3E9] placeholder:text-[#AEBCC5]/50 focus:border-[#D8A45B] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide passphrase' : 'Show passphrase'}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#AEBCC5] hover:text-[#F8F3E9]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error ? (
            <p role="alert" className="text-xs text-[#C98F89]">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#D8A45B] text-[#091521] font-medium text-sm py-3 px-6 transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? 'Verifying...' : 'Unlock This Place'}
          </button>
        </form>
      </section>
    </main>
  );
};
