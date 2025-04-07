'use client';

import { useEffect } from 'react';
import { meet } from '@googleworkspace/meet-addons/meet.addons';
import { CLOUD_PROJECT_NUMBER } from '../../constants';
import AttendanceForm from '@/components/mainstage/AttendanceForm';

export default function Page() {
    /**
     * Prepares the add-on Main Stage Client, which signals that the add-on
     * has successfully launched in the main stage.
     */
    useEffect(() => {
        (async () => {
            const session = await meet.addon.createAddonSession({
                cloudProjectNumber: CLOUD_PROJECT_NUMBER,
            });
            await session.createMainStageClient();
        })();
    }, []);

    return (
        <div>
            <AttendanceForm/>
        </div>
    );
}