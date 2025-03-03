import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('OAuth Exchange Error:', error.message);
      return NextResponse.redirect(`${origin}/sign-in?error=${error.message}`);
    }

    // Extract Google OAuth Tokens
    const { session } = data;
    const providerToken = session?.provider_token; // Google Access Token
    const refreshToken = session?.provider_refresh_token; // Google Refresh Token

    if (providerToken) {
      // Save tokens in Supabase (for now, just logging)
      console.log('Google Access Token:', providerToken);
      console.log('Google Refresh Token:', refreshToken);
    }

    if (providerToken && refreshToken) {
      const { error: dbError } = await supabase.from('user_tokens').upsert([
        {
          id: session.user.id,
          access_token: providerToken,
          refresh_token: refreshToken,
        },
      ]);

      if (dbError) {
        console.error('Database Token Save Error:', dbError.message);
      }
    }
  }

  return NextResponse.redirect(`${origin}/protected`);
}
