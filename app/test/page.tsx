'use client';

import { useState } from 'react';
import { InfoIcon } from 'lucide-react';

export default function ProtectedPage({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  async function createTestEvent() {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/create-event', {
        method: 'POST',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create event');

      console.log('Event Created:', data);

      setResponse(
        `✅ Event Created: ${data.summary || 'Check Google Calendar'}`,
      );
    } catch (error: any) {
      setResponse(`❌ Error: ${error.message}`);
    }

    setLoading(false);
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      {/* Test Google Calendar Event Creation */}
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Test Google Calendar Event</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={createTestEvent}
          disabled={loading}
        >
          {loading ? 'Creating Event...' : 'Create Test Event'}
        </button>
        {response && <p className="text-sm">{response}</p>}
      </div>
    </div>
  );
}
