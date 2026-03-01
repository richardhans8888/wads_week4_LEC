'use client';

import { FormEvent, useState } from 'react';
import { auth } from '@/lib/firebase/client';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (e: unknown) {
      let msg = 'Failed to sign in with Google';
      if (e && typeof e === 'object' && 'message' in e) {
        msg = String((e as { message?: string }).message) || msg;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (e: unknown) {
      let msg = 'Failed to sign in';
      if (e && typeof e === 'object' && 'message' in e) {
        msg = String((e as { message?: string }).message) || msg;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 420, padding: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Sign in</h1>
        <p style={{ color: '#666', marginBottom: 16 }}>
          Use Google or your email and password.
        </p>

        <button
          onClick={handleGoogle}
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            background: '#fff',
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          Continue with Google
        </button>

        <div style={{ fontSize: 12, color: '#888', textAlign: 'center', margin: '8px 0' }}>
          or sign in with email
        </div>

        <form onSubmit={handleEmail} style={{ display: 'grid', gap: 8 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              border: 0,
              background: '#111827',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Sign in
          </button>
        </form>

        {error ? (
          <div style={{ marginTop: 12, color: '#b91c1c', fontSize: 14 }}>{error}</div>
        ) : null}

        <div style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
          Make sure http://localhost:3000 is in your Firebase Auth authorized domains.
        </div>
      </div>
    </main>
  );
}
