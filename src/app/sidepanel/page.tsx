'use client';

import { useEffect, useState } from 'react';
import {
    meet,
    MeetSidePanelClient,
} from '@googleworkspace/meet-addons/meet.addons';
import { CLOUD_PROJECT_NUMBER, MAIN_STAGE_URL } from '../../constants';
import { useAuthContext } from '@/Context/AuthContext';
import { useRouter } from 'next/navigation';
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from 'axios';
import { CredentialResponse } from '@react-oauth/google';






export default function Page() {
    const router = useRouter();
    const {setAuth,loading,user} = useAuthContext();
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




    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            const response = await axios.post('https://api.lingomeet.space/api/auth/google', {
                credential: credentialResponse.credential
            }, {
                withCredentials: true
            });

            setAuth({
                user: response.data.user,
                accessToken: response.data.accessToken
            });
            
            console.log('Google login successful:', response.data);
            // Redirect to the home page or perform any other action
            router.push('/sidepanel/home'); // Redirect to the home page
        } catch (err) {
            console.error('Google login failed:', err);
            // Handle error (show toast, etc.)
        }
    };





    const CLIENT_ID = "275545075771-fddi7eh53isj09v22g39403e89sf9oa5.apps.googleusercontent.com"



    return (
        <div>
            <GoogleOAuthProvider 
                clientId={CLIENT_ID}>

                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    auto_select={true}
                    useOneTap
                    theme="filled_blue"
                    size="large"
                    text="continue_with"
                    shape="rectangular"
                />

            </GoogleOAuthProvider>
            
            
            <button onClick={startActivity}>
                Launch Activity in Main Stage.
            </button>

        </div>
    );
}