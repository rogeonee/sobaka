import { createClient } from '@/utils/supabase/server';

export async function refreshGoogleAccessToken(userId: string) {
  const supabase = await createClient();

  // Fetch user's stored refresh token
  const { data: tokenData, error: fetchError } = await supabase
    .from('user_tokens')
    .select('refresh_token')
    .eq('id', userId)
    .single();

  if (fetchError || !tokenData?.refresh_token) {
    console.error('Refresh Token not found:', fetchError?.message);
    return null;
  }

  const refreshToken = tokenData.refresh_token;

  // Request new access token from Google
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.SUPABASE_GOOGLE_CLIENT_ID!,
      client_secret: process.env.SUPABASE_GOOGLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }).toString(),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('Error refreshing token:', result);
    return null;
  }

  const newAccessToken = result.access_token;

  // Save the new access token in Supabase
  const { error: updateError } = await supabase
    .from('user_tokens')
    .update({ access_token: newAccessToken })
    .eq('id', userId);

  if (updateError) {
    console.error(
      'Error updating access token in Supabase:',
      updateError.message,
    );
    return null;
  }

  return newAccessToken; // Return the refreshed access token
}
