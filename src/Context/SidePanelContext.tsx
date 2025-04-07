'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { meet, MeetSidePanelClient } from '@googleworkspace/meet-addons/meet.addons';
import { CLOUD_PROJECT_NUMBER, MAIN_STAGE_URL } from '../constants';

interface SidePanelContextType {
  startActivity: () => Promise<void>;
  sidePanelClient: MeetSidePanelClient | null;
}

const SidePanelContext = createContext<SidePanelContextType | null>(null);

export function SidePanelProvider({ children }: { children: ReactNode }) {
  const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient | null>(null);

  useEffect(() => {
    (async () => {
      const session = await meet.addon.createAddonSession({
        cloudProjectNumber: CLOUD_PROJECT_NUMBER,
      });
      setSidePanelClient(await session.createSidePanelClient());
    })();
  }, []);

  const startActivity = async () => {
    if (!sidePanelClient) {
      throw new Error('Side Panel is not yet initialized!');
    }
    await sidePanelClient.startActivity({
      mainStageUrl: MAIN_STAGE_URL,
    });
  };

  return (
    <SidePanelContext.Provider value={{ startActivity, sidePanelClient }}>
      {children}
    </SidePanelContext.Provider>
  );
}

export function useSidePanel() {
  const context = useContext(SidePanelContext);
  if (!context) {
    throw new Error('useSidePanel must be used within a SidePanelProvider');
  }
  return context;
}