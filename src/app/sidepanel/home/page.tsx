'use client';
import { useAuth } from '@/Context/AuthContext';

export default function Page (){
    const { user,loading } = useAuth() as { user: { displayName: string; email: string } | null; logOut: () => void; signIn: () => void; loading: boolean; };
    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <h1>Welcome to the Add-on</h1>
            <h1>Welcome {user?.displayName}</h1>
            <h1>Home</h1>
            <h1>This is the home page of the application</h1>
        </div>
    )
}