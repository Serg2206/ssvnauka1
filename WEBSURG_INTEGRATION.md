# 🎬 WebSurg Video Integration

## Overview

Your SSV Nauka platform now includes **16 professional surgical videos** from WebSurg (IRCAD - International Research Center on Surgical Robotics).

## What is WebSurg?

WebSurg is a premium educational platform providing high-quality surgical videos for medical professionals. Access requires a **WebSurg subscription**.

---

## 📊 Videos Added (16 Total)

### Esophagogastric Surgery Videos:

1. **Minimally Invasive Ivor Lewis Esophagectomy** (9:39)
2. **Robotic Esophagojejunostomy in Total Gastrectomy** (9:54)
3. **Laparoscopic Distal Gastrectomy with Billroth I** (13:30)
4. **Totally Laparoscopic Pylorus-Preserving Gastrectomy** (11:37)
5. **Mucosal Injury During Laparoscopic Heller Cardiomyotomy** (11:44)
6. **Robotic Single Port Toupet Fundoplication** (9:39)
7. **Transthoracic Robotic Esophagectomy** (57:04)
8. **Totally Laparoscopic Gastrectomy with D2 Lymphadenectomy** (17:03)
9. **Lymphadenectomy in Esophageal Resection** (33:31)
10. **Salvage Endoscopic Submucosal Resection (ESR)** (16:53)
11. **Minimally Invasive Ivor Lewis for Caustic Stricture** (13:36)
12. **Robotic-Assisted Enucleation of Esophageal Leiomyoma** (9:40)
13. **Laparoscopic Management of Post-Esophagectomy Hernia** (8:17)
14. **Epiphrenic Diverticula Surgery** (17:03)
15. **EUS-Guided Radiofrequency Ablation of Pancreatic NET** (9:54)
16. **EUS-Guided Biliary Drainage for Pancreatic Cancer** (13:29)

---

## 🎯 How It Works

### For Users:

1. Navigate to **Video Library** on your platform
2. Click on any WebSurg video thumbnail
3. See a professional **"Open on WebSurg"** button
4. Click to open the video on WebSurg platform (new tab)
5. **WebSurg subscription required** to view

### Visual Display:

WebSurg videos show:
- 🔒 Lock icon indicating premium content
- Clear message: "Professional WebSurg Video"
- Direct link button: "Open on WebSurg"
- Notice about subscription requirement

---

## ⚙️ Technical Implementation

### Video Player Logic:

```typescript
// Detects WebSurg URLs
if (videoUrl.includes('websurg.com')) {
  // Show external link interface
  // Display: Lock icon + "Open on WebSurg" button
} else {
  // Show embedded iframe player (YouTube/Vimeo)
}
```

### Database Structure:

All WebSurg videos stored with:
- `videoUrl`: Direct WebSurg link (e.g., `https://websurg.com/en/doi/vd01en7154`)
- `author`: "WebSurg Specialists"
- `clinic`: "IRCAD WebSurg"
- Complete metadata (title, description, duration, etc.)

---

## 📝 User Credentials

Your platform includes **4 test users**:

| Email | Password | Role |
|-------|----------|------|
| `test@ssvnauka.com` | `test123456` | Student |
| `admin@ssvnauka.com` | `admin123` | Administrator |
| `surgeon@hospital.com` | `surgeon123` | Surgeon |
| `student@meduni.com` | `student123` | Student |

---

## 🔗 WebSurg Subscription

To view WebSurg videos, users need:

1. **WebSurg Account**: Register at [websurg.com](https://websurg.com)
2. **Active Subscription**: Choose appropriate plan
3. **Access**: Click "Open on WebSurg" buttons in your platform

### WebSurg Plans:

- Individual Subscription
- Institutional Subscription
- Academic Subscription

Visit: [websurg.com/en/subscriptions](https://websurg.com/en/subscriptions)

---

## ✅ Benefits

### Professional Content:
- High-quality surgical videos
- Expert commentary
- Step-by-step demonstrations
- Multiple camera angles

### Legal Compliance:
- Proper attribution to WebSurg/IRCAD
- Links to original content
- Respects copyright and licensing
- No unauthorized downloads

### User Experience:
- Clear visual indicators
- Smooth navigation to WebSurg
- Professional presentation
- Consistent with your platform design

---

## 📌 Important Notes

1. **External Links**: WebSurg URLs open in new tabs
2. **Subscription Required**: Users need WebSurg access
3. **No Embedding**: Videos can't be embedded (WebSurg policy)
4. **Attribution**: All videos credited to "WebSurg Specialists"
5. **Legal**: Integration respects copyright and licensing terms

---

## 🛠️ Future Enhancements

Possible improvements:

1. **WebSurg API Integration**: Automatic sync of new videos
2. **SSO Integration**: Single sign-on with WebSurg
3. **Subscription Check**: Verify user's WebSurg access
4. **Playlist Creation**: Organize videos by specialty
5. **Progress Tracking**: Track completion within your platform

---

## 📧 Support

For WebSurg-related questions:
- **Technical**: Your platform admin
- **Subscription**: WebSurg support team
- **Content**: contact@websurg.com

---

## 🎓 Platform Stats

**Total Videos**: 46 videos
- WebSurg Professional: 16 videos
- Other Sources: 30 videos

**Categories**:
- Laparoscopic: Multiple
- Robotic: Multiple  
- Open Surgery: Multiple
- Hybrid Techniques: Multiple

**All videos** include:
- Detailed descriptions
- Author information
- Clinic/hospital details
- Duration and difficulty level
- High-quality thumbnails

---

**Integration completed successfully! 🎉**

Your platform now offers premium educational content through WebSurg partnership.
