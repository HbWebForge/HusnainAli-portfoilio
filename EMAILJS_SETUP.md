# 📧 EmailJS Setup Guide

## How to Enable Email & WhatsApp Form Submissions

Your portfolio contact form is now ready to send emails directly to you! Follow these steps to set it up:

---

## Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com** (completely FREE)
2. Click **"Sign Up"** and create an account (or login if you have one)
3. Verify your email

---

## Step 2: Get Your Credentials

### A. Get Your Public Key:
1. After login, go to **Admin Panel** (Dashboard)
2. Click **"Account"** in the top menu
3. Copy your **Public Key** (it looks like: `YOUR_PUBLIC_KEY_HERE`)
4. Replace `YOUR_PUBLIC_KEY` in `home_script.js` (line 57) with your actual public key

### B. Add Email Service:
1. In the Admin Panel, click **"Email Services"** or **"Add Service"**
2. Select **"Gmail"** or any email provider
3. Follow the setup steps (you'll need to allow EmailJS to access your email)
4. After setup, you'll get a **SERVICE ID** (looks like: `service_xxxxx`)

### C. Create Email Template:
1. Go to **"Email Templates"** in the Admin Panel
2. Click **"Create New Template"**
3. Use this template:

**Template Variables:**
```
from_name: {{from_name}}
from_email: {{from_email}}
subject: {{subject}}
message: {{message}}
```

**Email Template Example:**
```
New Contact Form Submission!

From: {{from_name}} ({{from_email}})
Subject: {{subject}}
Message: {{message}}
```

4. After creating, you'll get a **TEMPLATE ID** (looks like: `template_xxxxx`)

---

## Step 3: Update Your Code

Edit `js/home_script.js` and replace these values (around line 57):

```javascript
// Line 57: Replace YOUR_PUBLIC_KEY
emailjs.init("your_actual_public_key_here");

// Line 175 & 176: Replace SERVICE_ID and TEMPLATE_ID
emailjs.send(
  "your_service_id_here",      // e.g., service_abc123xyz
  "your_template_id_here",     // e.g., template_def456abc
  {
    // ... rest of the code
  }
);
```

**Example:**
```javascript
emailjs.init("a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5");

emailjs.send(
  "service_qwerty123",
  "template_asdf456",
  {
    to_email: "hbwebcraft@gmail.com",
    from_name: name,
    from_email: email,
    subject: subject,
    message: message
  }
);
```

---

## Step 4: Test Your Form

1. Go to your portfolio
2. Fill in the contact form
3. Click **"Send Message"**
4. You should receive an email in your inbox within seconds!
5. After success, a **"Chat on WhatsApp"** button appears

---

## What Happens Now?

✅ **Form Submission Flow:**
1. User fills & validates form
2. Message sent to your email (hbwebcraft@gmail.com)
3. Success message shows on the page
4. WhatsApp button appears for quick contact
5. User can click WhatsApp to message you directly

---

## Troubleshooting

### Email Not Received?
- Check your **Spam/Junk folder**
- Verify your **Service ID** and **Template ID** are correct
- Make sure your **email service is active** in EmailJS

### "Invalid Public Key" Error?
- Copy your public key again from Account settings
- Make sure you didn't include extra spaces
- Refresh the page after updating the key

### Form Shows Error?
- Check browser **Console** (F12 → Console tab) for error messages
- Verify all three IDs are correct and properly placed
- Make sure EmailJS script loaded (check Network tab)

---

## WhatsApp Integration

The form also adds a **WhatsApp button** after successful submission.

- WhatsApp Number: **+92 344 200 5467**
- Users can click to chat with you directly
- Pre-filled message for context

---

## Security Notes

✅ **Your credentials are safe:**
- Public Key is meant to be public (client-side)
- Private Key stays on EmailJS servers
- No sensitive data exposed
- EmailJS handles encryption

---

## Support

If you need help:
- EmailJS Docs: https://www.emailjs.com/docs/
- Visit EmailJS Support: https://www.emailjs.com/support/

---

## Summary

| What | Where | Value |
|------|-------|-------|
| Public Key | `home_script.js` line 57 | From EmailJS Account |
| Service ID | `home_script.js` line 175 | From Email Services |
| Template ID | `home_script.js` line 176 | From Email Templates |
| Your Email | `home_script.js` line 185 | Already set to hbwebcraft@gmail.com |

**All set! Your contact form will now send real emails & WhatsApp links.** 🚀
