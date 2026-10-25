import { NextResponse } from 'next/server';
import { getSchemes } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;

    const schemes = await getSchemes(category);
    return NextResponse.json({
      success: true,
      count: schemes.length,
      schemes,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch schemes' },
      { status: 500 }
    );
  }
}
