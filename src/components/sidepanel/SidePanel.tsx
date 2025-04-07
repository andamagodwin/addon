'use client';


import TabsComponent from './TabsComponent';
import TranscriptTab from './tabs/TranscriptTab';
import NotesTab from './tabs/NotesTab';
import RecapTab from './tabs/RecapTab';
import RecordTab from './tabs/RecordTab';

export default function SidePanel() {
  const tabs = [
    {
      id: 'transcript',
      label: 'Transcript',
      content: <TranscriptTab />,
    },
    {
      id: 'notes',
      label: 'Notes',
      content: <NotesTab />,
    },
    {
      id: 'recap',
      label: 'Recap',
      content: <RecapTab />,
    },
    {
      id: 'record',
      label: 'Record',
      content: <RecordTab />,
    },
  ];

  return (
    <div className="h-[500px] w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <TabsComponent tabs={tabs} defaultTab="transcript" />
      
    </div>
  );
}