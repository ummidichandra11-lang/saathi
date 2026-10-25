import { NextResponse } from 'next/server';
import { verifyDocumentWithVision } from '@/lib/claude';
import { UserProfile } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageBase64, mimeType, profile } = body as {
      imageBase64: string;
      mimeType?: string;
      profile?: UserProfile;
    };

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: 'Document image data is required.' },
        { status: 400 }
      );
    }

    // Clean base64 header if included (e.g. data:image/jpeg;base64,...)
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    const detectedMime = mimeType || 'image/jpeg';

    const verificationResult = await verifyDocumentWithVision(
      cleanBase64,
      detectedMime,
      profile
    );

    return NextResponse.json({
      success: true,
      verification: verificationResult,
    });
  } catch (error: any) {
    console.error('Document verification error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to verify document' },
      { status: 500 }
    );
  }
}
