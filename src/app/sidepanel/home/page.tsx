'use client';
import SidePanel from '@/components/sidepanel/SidePanel';
import { useAuth } from '@/Context/AuthContext';


export default function Page (){
    const { user,loading } = useAuth() as { user: { displayName: string; email: string } | null; logOut: () => void; signIn: () => void; loading: boolean; };
    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <h1>Hi {user?.displayName}</h1>
            <SidePanel/>
        </div>
    )
}