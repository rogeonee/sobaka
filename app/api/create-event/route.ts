import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { refreshGoogleAccessToken } from '@/utils/googleAuth';

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch stored Google access token
  let { data: tokenData, error: tokenError } = await supabase
    .from('user_tokens')
    .select('access_token')
    .eq('id', user.id)
    .single();

  if (tokenError || !tokenData) {
    return NextResponse.json(
      { error: 'Google token not found' },
      { status: 403 },
    );
  }

  let googleAccessToken = tokenData.access_token;

  // Try using the access token, if it fails, refresh it
  const testResponse = await fetch(
    'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' +
      googleAccessToken,
  );
  if (testResponse.status === 400) {
    console.log('Access token expired, refreshing...');

    const newAccessToken = await refreshGoogleAccessToken(user.id);
    if (!newAccessToken) {
      return NextResponse.json(
        { error: 'Could not refresh token' },
        { status: 500 },
      );
    }

    googleAccessToken = newAccessToken;
  }

  // Event data
  const event = {
    summary: 'Meeting with Friends',
    start: {
      dateTime: '2025-03-05T10:00:00-07:00',
      timeZone: 'America/Vancouver',
    },
    end: {
      dateTime: '2025-03-05T11:00:00-07:00',
      timeZone: 'America/Vancouver',
    },
  };

  // Send request to Google Calendar API
  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    },
  );

  const result = await response.json();
  return NextResponse.json(result);
}
