import { NextResponse } from 'next/server';
import { getSchemes } from '@/lib/supabase';
import { matchAndExplainSchemes } from '@/lib/claude';
import { UserProfile, SupportedLanguage } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { profile, language, category } = body as {
      profile: UserProfile;
      language?: SupportedLanguage;
      category?: string;
    };

    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'User profile is required for matching' },
        { status: 400 }
      );
    }

    const candidateSchemes = await getSchemes(category);
    const matches = await matchAndExplainSchemes(
      profile,
      candidateSchemes,
      language || 'en'
    );

    return NextResponse.json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error: any) {
    console.error('Scheme matching error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to match schemes' },
      { status: 500 }
    );
  }
}
