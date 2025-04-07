'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { meet, MeetSidePanelClient } from '@googleworkspace/meet-addons/meet.addons';
import { CLOUD_PROJECT_NUMBER, MAIN_STAGE_URL } from '../constants';

interface SidePanelContextType {
    startActivity: () => Promise<void>;
    sidePanelClient: MeetSidePanelClient | null;
    isInitialized: boolean; // Add this
}
  
  


const SidePanelContext = createContext<SidePanelContextType | null>(null);

export function SidePanelProvider({ children }: { children: ReactNode }) {
  const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const session = await meet.addon.createAddonSession({
          cloudProjectNumber: CLOUD_PROJECT_NUMBER,
        });
        const client = await session.createSidePanelClient();
        setSidePanelClient(client);
        setIsInitialized(true); // Mark as initialized
      } catch (error) {
        console.error('Failed to initialize side panel:', error);
      }
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
    <SidePanelContext.Provider value={{ startActivity, sidePanelClient, isInitialized }}>
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