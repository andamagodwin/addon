'use client';

import { useEffect, useState } from 'react';
import {
    meet,
    MeetSidePanelClient,
} from '@googleworkspace/meet-addons/meet.addons';
import { CLOUD_PROJECT_NUMBER, MAIN_STAGE_URL } from '../../constants';
import { useAuth } from '@/Context/AuthContext';
import { useRouter } from 'next/navigation';




export default function Page() {
    const router = useRouter();
    const { user,signIn,loading } = useAuth() as { user: { displayName: string; email: string } | null; logOut: () => void; signIn: () => void; loading: boolean; };
    const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();

    // Launches the main stage when the main button is clicked.
    async function startActivity() {
        if (!sidePanelClient) {
            throw new Error('Side Panel is not yet initialized!');
        }
        await sidePanelClient.startActivity({
            mainStageUrl: MAIN_STAGE_URL
        });
    }

    /**
     * Prepares the add-on Side Panel Client.
     */
    useEffect(() => {
        (async () => {
            const session = await meet.addon.createAddonSession({
                cloudProjectNumber: CLOUD_PROJECT_NUMBER,
            });
            setSidePanelClient(await session.createSidePanelClient());
        })();
    }, []);

    // Redirect to home page after sign-in
    useEffect(() => {
        if (user) {
            router.push('/sidepanel/home'); // Redirect to the home page
        }
    }, [user, router]);


    if (loading) {
        return <p>Loading...</p>;
    }



    return (
        <div>
            <div>
                
                  <button onClick={signIn} className='bg-green-500 cursor-pointer'>Sign In with Google</button>
        
            </div>
            <button onClick={startActivity}>
                Launch Activity in Main Stage.
            </button>

        </div>
    );
}