
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { RecoverPass } from '@/app/components/recoverPass';
import { EmailTemplate } from '@/components/prueba';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    const verificationCode = Math.random().toString(36).slice(2, 8).toUpperCase();

  try {
    const { email } = await request.json();
    console.log(email);
    const data = await resend.emails.send({
      from: 'Support <onboarding@resend.dev>',
      to: [email], 
      subject: 'Código de Verificación',
      react: EmailTemplate({ firstName: 'a soporte Eligam',codigo: verificationCode  }), 
    });

    return NextResponse.json({success: true, message: 'Correo enviado', verificationCode },{ status: 200});
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 },
        console.log(error));
    
  }
}
