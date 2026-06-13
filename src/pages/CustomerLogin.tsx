import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../lib/firebase';
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Mail, Loader2, Check, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

const ACTION_CODE_SETTINGS = {
  url: `${window.location.origin}/customer-login`,
  handleCodeInApp: true,
};

type Phase = 'enter_email' | 'link_sent' | 'verifying' | 'error';

export default function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [phase, setPhase] = useState<Phase>('enter_email');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // If the URL is a sign-in link, complete the sign-in
  useEffect(() => {
    const href = window.location.href;
    if (isSignInWithEmailLink(auth, href)) {
      setPhase('verifying');
      let storedEmail = window.localStorage.getItem('emailForSignIn');
      const urlEmail = searchParams.get('email');
      if (urlEmail) storedEmail = urlEmail;

      if (!storedEmail) {
        // Ask user for email if not stored
        setPhase('enter_email');
        return;
      }

      signInWithEmailLink(auth, storedEmail, href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn');
          const projectId = searchParams.get('project');
          navigate(projectId ? `/customer-dashboard?project=${projectId}` : '/customer-dashboard');
        })
        .catch(e => {
          console.error(e);
          setError('Link ungültig oder abgelaufen. Bitte neuen Link anfordern.');
          setPhase('error');
        });
    }
  }, []);

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError('');

    try {
      await sendSignInLinkToEmail(auth, email.trim(), ACTION_CODE_SETTINGS);
      window.localStorage.setItem('emailForSignIn', email.trim());
      setPhase('link_sent');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-email') setError('Ungültige E-Mail-Adresse.');
      else setError('Fehler beim Senden. Bitte versuche es erneut.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6">
      <Helmet>
        <title>Kunden-Login | Rezai Vision</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#E8B84B]/20 mb-4">
            <Sparkles className="w-8 h-8 text-[#E8B84B]" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            REZAI<span className="text-[#E8B84B]">.</span>VISION
          </h1>
          <p className="text-gray-500 mt-1">Kunden-Portal</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8"
        >
          {/* Phase: Enter Email */}
          {phase === 'enter_email' && (
            <form onSubmit={sendMagicLink} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Einloggen</h2>
                <p className="text-gray-400 text-sm">
                  Gib deine E-Mail-Adresse ein. Du erhältst einen magischen Login-Link — kein Passwort nötig.
                </p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">E-Mail-Adresse</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="deine@email.de"
                    required
                    autoFocus
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-[#E8B84B] focus:outline-none"
                  />
                </div>
              </div>
              {error && (
                <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-[#E8B84B] text-black py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all"
              >
                Login-Link senden <ArrowRight size={20} />
              </button>
            </form>
          )}

          {/* Phase: Link Sent */}
          {phase === 'link_sent' && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Link gesendet!</h2>
                <p className="text-gray-400 text-sm">
                  Wir haben einen Login-Link an <span className="text-white font-bold">{email}</span> gesendet. Klicke auf den Link in der E-Mail.
                </p>
              </div>
              <div className="bg-[#E8B84B]/10 border border-[#E8B84B]/20 rounded-xl p-4">
                <p className="text-[#E8B84B] text-sm font-medium">
                  📧 Bitte prüfe auch deinen Spam-Ordner, falls die E-Mail nicht angekommen ist.
                </p>
              </div>
              <button
                onClick={() => { setPhase('enter_email'); setEmail(''); }}
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Andere E-Mail verwenden
              </button>
            </div>
          )}

          {/* Phase: Verifying */}
          {phase === 'verifying' && (
            <div className="text-center space-y-4 py-6">
              <Loader2 className="w-12 h-12 text-[#E8B84B] animate-spin mx-auto" />
              <p className="text-white font-bold">Einloggen...</p>
              <p className="text-gray-400 text-sm">Du wirst gleich weitergeleitet.</p>
            </div>
          )}

          {/* Phase: Error */}
          {phase === 'error' && (
            <div className="text-center space-y-5">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Link ungültig</h2>
                <p className="text-gray-400 text-sm">{error}</p>
              </div>
              <button
                onClick={() => { setPhase('enter_email'); setError(''); }}
                className="bg-[#E8B84B] text-black px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all"
              >
                Neuen Link anfordern
              </button>
            </div>
          )}
        </motion.div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Dein persönliches Kunden-Portal von Rezai Vision · <a href="https://rezaivision.de" className="hover:text-[#E8B84B] transition-colors">rezaivision.de</a>
        </p>
      </div>
    </div>
  );
}
