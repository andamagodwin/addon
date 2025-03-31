'use client';


import Transcription from '@/components/Transcription';
import { useAuth } from '@/Context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { user, logOut,signIn,loading } = useAuth() as { user: { displayName: string; email: string } | null; logOut: () => void; signIn: () => void; loading: boolean; };
  const router = useRouter();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    // If the user is authenticated, redirect to another page or render something
    return (
      <div>
        <h1>Welcome, {user.displayName || 'User'}!</h1>
        <button onClick={() => logOut()}>Log Out</button>
        <button onClick={() => router.push('/dashboard')}>Go to Dashboard </button>
        <Transcription/>
      </div>
    );
  }else{
    // If the user is not authenticated, render a sign-in button
    return (
      <div>
        <h1>Lingomeet-addon</h1>
        <button onClick={() => signIn()}>Sign in with Google</button>
        <Transcription/>
      </div>
    );
  }


}