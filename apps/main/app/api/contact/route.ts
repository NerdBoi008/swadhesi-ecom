import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();

    // Validate submission wasn't too fast
    if (Date.now() - data.submissionTime < 3000) {
        return NextResponse.json({ success: true }) // Silent fail for bots
    }

    // Validate form data
    if (!name || !email.includes('@') || !message) {
        return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // Validate reCAPTCHA
    const isHuman = await varifyReCaptcha(data.recaptchaToken);
    if (!isHuman) return NextResponse.json({ success: true }) // Silent fail
    
    // Validate trapInput
    if (data.trapInput) return NextResponse.json({ success: true }); // Silent fail

    // Process valid submission
    // Code goes here

    return NextResponse.json({ success: true });
}