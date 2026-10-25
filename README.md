# Saathi (साथी / సాథి) 🇮🇳
### Voice-First, Multilingual AI Assistant for Indian Government Welfare Schemes

[![Live Demo on Vercel](https://img.shields.io/badge/Live_Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://saathi.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/ummidichandra11-lang/saathi)

> **Live Web App:** [https://saathi.vercel.app](https://saathi.vercel.app)  
> **Empowering 1.4 Billion Citizens**: Discover eligible scholarships, pensions, farmer subsidies, and health schemes by speaking freely in **English, हिन्दी (Hindi), or తెలుగు (Telugu)**. Receive instant document roadmaps, where to obtain each paper, and privacy-first document verification.

---

## 🌟 The Problem Saathi Solves
Millions of eligible Indian citizens miss out on life-changing welfare schemes (like PM-KISAN, Ayushman Bharat, Sukanya Samriddhi, and Higher Education Scholarships) because information is scattered, written in complex bureaucratic English, and leaves citizens confused about which specific documents to collect or offices to visit.

**Saathi bridges this civic gap** by providing:
1. **Zero-Friction Voice Intake**: Speak naturally in your native dialect (e.g., *"I am a 45-year-old farmer with 2 acres in Telangana, my daughter is in 11th grade"*).
2. **Structured Profile Extraction**: Automatically parses unstructured speech into a verified citizen profile.
3. **Multilingual Explanations**: Uses Anthropic's **Claude model (`claude-sonnet-5-5`)** to explain eligibility in 2–3 plain sentences in Hindi, Telugu, or English.
4. **Actionable Document Roadmaps**: Tells citizens *where* to get each document (MeeSeva, CSC, Tehsildar, Bank) with an interactive checklist and progress tracker.
5. **Responsible AI Document Verification**: Upload an Aadhaar or Income certificate photo for an in-memory legibility and name/DOB cross-match. **Never stores Aadhaar numbers or files.**

---

## 🏗️ Architecture & Tech Stack

```
                          ┌────────────────────────────────┐
                          │   Citizen Browser / Mobile     │
                          │ Web Speech API (Input & Speak) │
                          └───────────────┬────────────────┘
                                          │
                                          ▼
                       ┌──────────────────────────────────────┐
                       │   Next.js 14 App Router (Frontend)   │
                       │   TypeScript + Tailwind CSS + Lucide │
                       └──────────────────┬───────────────────┘
                                          │ Server Actions / API Routes
                                          ▼
      ┌────────────────────────────────────────────────────────────────────────┐
      │                        Server-Side AI Engine                           │
      │ 1. /api/extract-profile (Conversational Profile Extraction)            │
      │ 2. /api/match-schemes   (Eligibility Filter & Multilingual Reasoner)   │
      │ 3. /api/verify-document (Claude Vision Multimodal Document Verifier)   │
      │ 4. /api/schemes         (18 Scheme Database with Supabase Fallback)    │
      └──────────────────┬─────────────────────────────────┬───────────────────┘
                         │                                 │
                         ▼                                 ▼
         ┌───────────────────────────────┐ ┌───────────────────────────────────┐
         │     Anthropic Claude API      │ │         Supabase Postgres         │
         │ Model: claude-sonnet-5-5      │ │ `schemes` table (18 Seeded)       │
         │ (via ANTHROPIC_MODEL env var) │ │ JSONB rules, arrays, RLS policies │
         └───────────────────────────────┘ └───────────────────────────────────┘
```

- **Frontend & Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS (Accessible high-contrast Indian civic palette: Saffron, Ashoka Navy, Emerald Green)
- **Voice Capabilities:** Native Browser Web Speech API (`webkitSpeechRecognition` & `SpeechSynthesis`)
- **LLM & Vision Engine:** Anthropic Claude API using model `claude-sonnet-5-5` (configured via `ANTHROPIC_MODEL`)
- **Database & Storage:** Supabase Postgres (`schemes` table) with zero-downtime offline dataset fallback

---

## 🗄️ Database & Seed Schemes (18 Real Schemes)
Saathi includes 18 real, verified Indian schemes across 5 categories with official government portal links:

| Category | Schemes Included |
|---|---|
| **🌾 Farmers** | • PM-KISAN (`pmkisan.gov.in`)<br>• PM Kisan Maandhan Yojana (`maandhan.in`)<br>• PM Fasal Bima Yojana (`pmfby.gov.in`) |
| **🎓 Students** | • National Means-cum-Merit Scholarship (`scholarships.gov.in`)<br>• Post Matric Scholarship for SC/ST (`scholarships.gov.in`)<br>• Central Sector Scheme for College & University Students (`scholarships.gov.in`)<br>• PM-YASASVI (`yet.nta.ac.in`) |
| **👩 Women** | • Sukanya Samriddhi Yojana (`indiapost.gov.in`)<br>• PM Matru Vandana Yojana (`pmmvy.wcd.gov.in`)<br>• Janani Suraksha Yojana (`nhm.gov.in`)<br>• PM Ujjwala Yojana 2.0 (`pmuy.gov.in`)<br>• Stand-Up India (`standupmitra.in`) |
| **👴 Senior Citizens** | • Indira Gandhi National Old Age Pension Scheme (`nsap.nic.in`)<br>• Rashtriya Vayoshri Yojana (`alimco.in`)<br>• Atal Pension Yojana (`npscra.nsdl.co.in`) |
| **🏥 Health & Housing** | • Ayushman Bharat - PM-JAY (`beneficiary.nha.gov.in`)<br>• PM Surakshit Matritva Abhiyan (`pmsma.nhp.gov.in`)<br>• PM Awas Yojana - Gramin (`pmayg.nic.in`) |

---

## 🚀 Quick Setup & Installation

### 1. Clone or Open Project
```bash
cd "c:\Users\Chandra Sekhar\OneDrive\Desktop\SRM"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create or edit `.env.local`:
```env
# Anthropic API Key (Required for live Claude calls)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Model identifier (Configurable to any Claude model)
ANTHROPIC_MODEL=claude-sonnet-5-5

# Supabase Postgres Configuration (Optional - embedded full dataset fallback is active)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> **Note on Offline Resilience:** If `ANTHROPIC_API_KEY` is temporarily not provided, Saathi automatically activates its built-in high-fidelity civic simulation engine, ensuring that hackathon demonstrations and judge evaluations **never crash or timeout**.

### 4. Supabase Setup (Optional)
If connecting your live Supabase database:
1. Open your Supabase project dashboard -> **SQL Editor**.
2. Run the SQL script located in [`supabase/schema.sql`](supabase/schema.sql) to create the `schemes` table and RLS policies.
3. Run [`supabase/seed.sql`](supabase/seed.sql) to seed the 18 government schemes.
4. Test connectivity: `node scripts/seed-supabase.js`.

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎤 2-Minute Hackathon Demo Script (For Judges)

### **[0:00 - 0:25] The Problem & The Hook**
1. **Show the Landing Page**: Point out the clean mobile-friendly interface and the prominent microphone button.
2. **Switch Languages**: Click **हिन्दी** or **తెలుగు** in the header. Notice the entire interface, badges, and prompts adapt instantly.
3. **Speak or Click Demo**:
   - Tap the **Microphone** and say: *"I am a 45-year-old farmer with 2 acres in Telangana, my daughter is in 11th grade"*
   - Or click the **"🌾 Try Farmer Demo"** button.

### **[0:25 - 0:50] Intelligent Intake & Multilingual Matching**
1. **Profile Confirmation**: Show how Saathi automatically structured the user's voice into:
   - *Age: 45 | Occupation: Farmer | Land: 2 Acres | Family: Daughter in 11th Grade*.
2. **Click "Confirm & Match Schemes"**:
   - Claude evaluates the rules and categorizes schemes with **"Likely Eligible"** (Green) and **"May Be Eligible"** (Yellow) badges.
   - Show the 2–3 sentence explanation generated in Hindi/Telugu/English.
3. **Click "Read Aloud"**: Let the judges hear the browser read the explanation aloud in clear speech.

### **[0:50 - 1:25] Action Roadmap & Where to Get Documents**
1. Click **"View Documents & Steps"** on **PM-KISAN**:
   - Show the **Required Documents**: Notice how Saathi explicitly tells the citizen **where to obtain each document** (e.g. *Pattadar passbook from Dharani portal / VRO office*).
   - Check off a document to demonstrate the **interactive progress bar** updating in real time.
2. Click **"Verify on Official Website"** to prove every result connects to authentic `.gov.in` portals.

### **[1:25 - 1:50] Responsible AI Document Verification**
1. Click **"Check My Document Photo"**.
2. Upload any sample Aadhaar or certificate photo.
3. Highlight the **Responsible AI Guarantee**:
   - Zero storage of files or Aadhaar numbers.
   - Claude Vision verifies legibility and cross-checks the name and birth year with the user's profile.

### **[1:50 - 2:00] Closing & Deadlines Hub**
1. Click **"Deadlines"** in the header to show the upcoming DBT cycles and scholarship cutoffs.
2. Point out the statutory civic disclaimer: *Saathi provides transparent guidance, not official decisions.*

---

## 🛡️ Responsible AI & Privacy Principles
1. **Zero Data Retention:** Uploaded document images are analyzed strictly in volatile RAM and immediately discarded.
2. **No ID Scraping:** Full 12-digit Aadhaar numbers or government identity codes are never extracted, saved, or logged.
3. **No Halucination / Guessing:** If critical eligibility criteria (such as income or age) are absent, Saathi explicitly asks follow-up clarifying questions.
4. **Transparent Verification:** Every scheme card includes a direct link to the official `.gov.in` portal for independent citizen verification.

---

## ☁️ Deploying to Vercel

### Option 1: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: Via GitHub & Vercel Dashboard
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: Saathi voice-first government scheme AI"
   ```
2. Push to GitHub.
3. In [vercel.com](https://vercel.com):
   - Click **Add New Project** -> Import your GitHub repository.
   - Under **Environment Variables**, add:
     - `ANTHROPIC_API_KEY`
     - `ANTHROPIC_MODEL` = `claude-sonnet-5-5`
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click **Deploy**.

---

## 📜 License
Developed for Hackathon & Civic Tech Public Good under the MIT License.
