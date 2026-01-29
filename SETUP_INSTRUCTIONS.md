# EVEREST Contact Form - Email Setup Instructions

## ✅ Kya Setup Kiya Gaya Hai

1. **thankyou.html** - Ek beautiful thank you page banaya gaya hai
2. **Form Email Integration** - Form data ab kartikpaul366@gmail.com pe jayega
3. **Auto Redirect** - Form submit hone ke baad automatically thankyou.html page khulega

## 🚀 Kaise Use Karein

### First Time Setup (IMPORTANT)

Jab aap **pehli baar** form submit karenge:

1. FormSubmit ek confirmation email bhejega **kartikpaul366@gmail.com** pe
2. Us email mein ek activation link hoga
3. Us link pe click karo to activate form
4. Activation ke baad, sare future form submissions directly aapke email mein aayenge

### Form Features

- **Name** (Required) - Customer ka naam
- **Phone** (Required) - Customer ka phone number
- **Size of Bucket** (Optional) - Bucket ka size
- **Material** (Optional) - Material type (MS/SS)
- **Quantity** (Optional) - Kitne buckets chahiye
- **Type of Bucket** (Optional) - Bucket ka type

### Email Format

Aapko email mein ek table format mein sari details milegi:

```
Subject: New Enquiry from EVEREST Website

Name: [Customer Name]
Phone: [Phone Number]
Size: [Size]
Material: [Material]
Quantity: [Quantity]
Type: [Type]
```

## 📝 Testing

### Local Testing

```bash
# Simply open index.html in browser
# Fill the form
# Click "Send Enquiry"
# Pehli baar confirm karna hoga email se
# Uske baad automatically emails aayenge
```

### Live Website

Jab website live ho jaye, tab `_next` parameter ko update karna hai:

```html
<input
  type="hidden"
  name="_next"
  value="https://yourdomain.com/thankyou.html"
/>
```

## 🎨 Thank You Page Features

- ✅ Animated checkmark
- ✅ Success message
- ✅ WhatsApp quick contact button
- ✅ Back to home button
- ✅ Beautiful gradient design

## 🔧 Customization Options

### Change Email Subject

```html
<input type="hidden" name="_subject" value="Your Custom Subject" />
```

### Add CC Email

```html
<input type="hidden" name="_cc" value="anotheremail@gmail.com" />
```

### Enable Captcha

```html
<input type="hidden" name="_captcha" value="true" />
```

## ⚠️ Important Notes

1. **FormSubmit** ek free service hai, koi payment nahi lagta
2. Pehli submission ke baad email confirm karna **MANDATORY** hai
3. Spam folder check karein agar confirmation email nahi aaye
4. Har form submission instant aapke email mein aayegi

## 🆘 Troubleshooting

**Problem**: Email nahi aa raha

- **Solution**: Spam folder check karein, confirmation email verify karein

**Problem**: Thank you page nahi khul raha

- **Solution**: Ensure both index.html and thankyou.html same folder mein hain

**Problem**: Form submit nahi ho raha

- **Solution**: Internet connection check karein, browser console check karein

## 📞 Support

Koi problem ho to:

- WhatsApp button click karke direct contact karein
- Form data manually email karein

---

**Created for EVEREST Elevator Buckets** 🚀
