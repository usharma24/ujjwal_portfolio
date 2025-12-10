from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import EmailMultiAlternatives
from django.conf import settings



def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def skills(request):
    return render(request, 'skills.html')

def projects(request):
    return render(request, 'projects.html')



def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        message = request.POST.get('message', '').strip()

        if not (name and email and message):
            messages.error(request, "All fields are required.")
            return redirect('contact')

        # Email to YOU
        subject_admin = f"📬  {name} Wants To Connect You..."
        body_admin = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

        try:
            # Email sent to recipient (your email)
            admin_email = EmailMultiAlternatives(
                subject_admin,
                body_admin,
                settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_EMAIL],
            )
            admin_email.send()

            # Auto-reply to user
            subject_user = "🌟 Thanks for Reaching Out, " + name + "!"
            html_reply = f"""
            <html>
            <body style="font-family: Arial, sans-serif; padding: 10px;">
                <h2 style="color:#4f46e5;">Thank You for Contacting Me!</h2>
                <p>Hi <strong>{name}</strong>,</p>
                <p>Thank you for reaching out through my portfolio website.</p>
                <p>I truly appreciate your interest and I’ll get back to you as soon as possible!</p>
                
                <div style="margin-top:10px; padding:10px; border-left:4px solid #4f46e5;">
                    <strong>Your Message:</strong><br>
                    {message}
                </div>

                <p style="margin-top:15px;">Best regards,<br>
                <strong>Ujjwal Sharma</strong><br>
                Python Developer — iMSc(IT)<br>
                Ahmedabad, Gujarat</p>
                <hr>
                <small>This email is auto-generated. Please do not reply.</small>
            </body>
            </html>
            """

            reply_email = EmailMultiAlternatives(
                subject_user,
                "Thank you for contacting me!",  # fallback plain text
                settings.DEFAULT_FROM_EMAIL,
                [email],
            )
            reply_email.attach_alternative(html_reply, "text/html")
            reply_email.send()

            messages.success(request, "Message Sent Successfully! Please check your email 📩")
            return redirect('contact')

        except Exception as e:
            print("EMAIL ERROR:", e)  # <-- Add this line
            messages.error(request, f"Mail Error ❌: {e}")
            return redirect('contact')


    return render(request, 'contact.html')
