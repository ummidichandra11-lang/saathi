import { NextResponse } from 'next/server';
import { extractUserProfile } from '@/lib/claude';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { input, language } = body;

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Input text or speech transcript is required.' },
        { status: 400 }
      );
    }

    const profile = await extractUserProfile(input, language || 'en');
    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error: any) {
    console.error('Profile extraction error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to extract profile' },
      { status: 500 }
    );
  }
}
