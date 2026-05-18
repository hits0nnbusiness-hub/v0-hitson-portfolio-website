import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// This webhook is called by Supabase when a new contact is added
// You can set this up in Supabase: Database > Webhooks > Create webhook
// URL: https://your-domain.vercel.app/api/contact-notification
// Table: contacts, Event: INSERT

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    
    // The payload from Supabase webhook contains the new record
    const newContact = payload.record || payload
    
    if (!newContact?.email) {
      return NextResponse.json({ error: 'No email in payload' }, { status: 400 })
    }

    // Log the new contact (you'll see this in Vercel logs)
    console.log('[v0] New contact received:', newContact.email, 'at', newContact.created_at)

    // Option 1: Send yourself an email notification
    // You can integrate with Resend, SendGrid, or any email service here
    // Example with Resend (uncomment and add RESEND_API_KEY to env):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Portfolio <noreply@yourdomain.com>',
      to: 'hits0nbusiness@outlook.es',
      subject: 'Nuevo contacto en tu portfolio!',
      html: `<p>Nuevo email registrado: <strong>${newContact.email}</strong></p>
             <p>Fecha: ${new Date(newContact.created_at).toLocaleString('es-MX')}</p>`
    })
    */

    return NextResponse.json({ success: true, email: newContact.email })
  } catch (error) {
    console.error('[v0] Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
