import { SupportedLanguage } from '../types';

export interface TranslationStrings {
  appName: string;
  tagline: string;
  subTagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  micListening: string;
  micClickToSpeak: string;
  micStopListening: string;
  orTypeText: string;
  inputPlaceholder: string;
  discoverButton: string;
  tryDemoFarmer: string;
  tryDemoStudent: string;
  tryDemoSenior: string;
  demoPersonasTitle: string;
  profileConfirmedTitle: string;
  profileExtractedSubtitle: string;
  editProfile: string;
  confirmAndFindSchemes: string;
  ageLabel: string;
  occupationLabel: string;
  incomeLabel: string;
  stateLabel: string;
  landLabel: string;
  educationLabel: string;
  familyDetailsLabel: string;
  missingInfoPrompt: string;
  matchesFoundTitle: string;
  likelyEligibleBadge: string;
  potentialEligibleBadge: string;
  readAloud: string;
  stopAudio: string;
  verifyOfficialLink: string;
  openChecklist: string;
  checklistTitle: string;
  requiredDocumentsTitle: string;
  whereToGetDoc: string;
  applicationStepsTitle: string;
  progressLabel: string;
  markDone: string;
  completedBadge: string;
  verifyDocButton: string;
  verifyDocTitle: string;
  verifyDocDesc: string;
  uploadDocPrompt: string;
  privacyGuarantee: string;
  deadlinesTitle: string;
  deadlinesSubtitle: string;
  filterAll: string;
  filterFarmer: string;
  filterStudent: string;
  filterWomen: string;
  filterSenior: string;
  filterHealth: string;
  disclaimerText: string;
  officialHelpline: string;
  loadingAI: string;
}

export const translations: Record<SupportedLanguage, TranslationStrings> = {
  en: {
    appName: 'Saathi',
    tagline: 'Your AI Guide to Indian Government Schemes',
    subTagline: 'Voice-First • Multilingual • Actionable Steps & Checklists',
    heroHeadline: 'What scheme are you looking for?',
    heroSubheadline: 'Speak or type naturally in your own language. We will tell you what you qualify for and exactly what documents you need.',
    micListening: 'Listening... Speak now',
    micClickToSpeak: 'Tap to Speak',
    micStopListening: 'Tap to Stop',
    orTypeText: 'Or type your details in plain words',
    inputPlaceholder: 'e.g., I am a 45-year-old farmer with 2 acres in Telangana, my daughter is in 11th grade...',
    discoverButton: 'Discover My Schemes',
    tryDemoFarmer: '🌾 Try Farmer Demo',
    tryDemoStudent: '🎓 Try Student Demo',
    tryDemoSenior: '👴 Try Senior Citizen Demo',
    demoPersonasTitle: 'Quick Demo Personas:',
    profileConfirmedTitle: 'Your Confirmed Profile',
    profileExtractedSubtitle: 'Review the details extracted by AI before searching schemes:',
    editProfile: 'Edit Details',
    confirmAndFindSchemes: 'Confirm & Match Schemes',
    ageLabel: 'Age',
    occupationLabel: 'Occupation',
    incomeLabel: 'Annual Income',
    stateLabel: 'State',
    landLabel: 'Land Holding',
    educationLabel: 'Education / Family',
    familyDetailsLabel: 'Family Context',
    missingInfoPrompt: 'Please clarify a few details to get more accurate matches:',
    matchesFoundTitle: 'Schemes Recommended for You',
    likelyEligibleBadge: 'Likely Eligible',
    potentialEligibleBadge: 'May Be Eligible • Check Conditions',
    readAloud: 'Read Aloud',
    stopAudio: 'Stop Audio',
    verifyOfficialLink: 'Verify on Official Website',
    openChecklist: 'View Documents & Steps',
    checklistTitle: 'Application Checklist & Steps',
    requiredDocumentsTitle: 'Required Documents & Where to Get Them',
    whereToGetDoc: 'Where to obtain:',
    applicationStepsTitle: 'Step-by-Step Application Roadmap',
    progressLabel: 'Checklist Progress',
    markDone: 'Mark as collected',
    completedBadge: 'Completed',
    verifyDocButton: 'Check My Document Photo',
    verifyDocTitle: 'Instant AI Document Verification',
    verifyDocDesc: 'Upload a photo of your Aadhaar, Income certificate, or Land passbook. We check legibility and match it to your profile.',
    uploadDocPrompt: 'Click or drop document photo (JPG/PNG)',
    privacyGuarantee: 'Responsible AI Guarantee: Images are inspected in-memory and immediately destroyed. We never save Aadhaar numbers or personal documents.',
    deadlinesTitle: 'Upcoming Scheme Deadlines & Cycles',
    deadlinesSubtitle: 'Never miss an enrollment date or DBT disbursement window.',
    filterAll: 'All Categories',
    filterFarmer: 'Farmers 🌾',
    filterStudent: 'Students 🎓',
    filterWomen: 'Women 👩',
    filterSenior: 'Senior Citizens 👴',
    filterHealth: 'Health & Housing 🏥',
    disclaimerText: 'Saathi provides informational guidance based on public government guidelines. It does not constitute official approval. Always verify at your nearest CSC/MeeSeva centre or official government portals.',
    officialHelpline: 'National Government Services Toll-Free: 1800-11-0031 | Kisan Call Centre: 1800-180-1551',
    loadingAI: 'Analyzing with Saathi AI...',
  },
  hi: {
    appName: 'साथी (Saathi)',
    tagline: 'सरकारी योजनाओं के लिए आपका AI मार्गदर्शक',
    subTagline: 'आवाज़ द्वारा संचालित • बहुभाषी • स्पष्ट दस्तावेज़ सूची और चरण',
    heroHeadline: 'आप किस सरकारी योजना की जानकारी चाहते हैं?',
    heroSubheadline: 'अपनी मातृभाषा में बोलें या लिखें। हम आपको बताएंगे कि आप किन योजनाओं के पात्र हैं और कौन-से दस्तावेज़ चाहिए।',
    micListening: 'सुन रहे हैं... कृपया बोलें',
    micClickToSpeak: 'बोलने के लिए दबाएं',
    micStopListening: 'रोकने के लिए दबाएं',
    orTypeText: 'या अपनी जानकारी यहाँ लिखें',
    inputPlaceholder: 'उदाहरण: मैं 45 वर्ष का किसान हूँ, 2 एकड़ ज़मीन है, बेटी 11वीं कक्षा में पढ़ती है...',
    discoverButton: 'मेरी योजनाएं खोजें',
    tryDemoFarmer: '🌾 किसान का उदाहरण',
    tryDemoStudent: '🎓 छात्र का उदाहरण',
    tryDemoSenior: '👴 वरिष्ठ नागरिक का उदाहरण',
    demoPersonasTitle: 'त्वरित डेमो प्रोफाइल्स:',
    profileConfirmedTitle: 'आपकी पुष्ट प्रोफ़ाइल',
    profileExtractedSubtitle: 'योजनाएं खोजने से पहले AI द्वारा पहचानी गई जानकारी जांच लें:',
    editProfile: 'बदलाव करें',
    confirmAndFindSchemes: 'पुष्टि करें और योजनाएं देखें',
    ageLabel: 'उम्र',
    occupationLabel: 'व्यवसाय',
    incomeLabel: 'वार्षिक आय',
    stateLabel: 'राज्य',
    landLabel: 'ज़मीन का क्षेत्रफल',
    educationLabel: 'शिक्षा / परिवार',
    familyDetailsLabel: 'परिवार की जानकारी',
    missingInfoPrompt: 'सटीक परिणाम के लिए कृपया कुछ और जानकारी दें:',
    matchesFoundTitle: 'आपके लिए अनुशंसित सरकारी योजनाएं',
    likelyEligibleBadge: 'पात्र होने की प्रबल संभावना',
    potentialEligibleBadge: 'पात्र हो सकते हैं • शर्तें देखें',
    readAloud: 'सुनें (आवाज़ में)',
    stopAudio: 'आवाज़ बंद करें',
    verifyOfficialLink: 'आधिकारिक सरकारी पोर्टल पर पुष्टि करें',
    openChecklist: 'दस्तावेज़ और आवेदन चरण देखें',
    checklistTitle: 'आवेदन चेकलिस्ट एवं चरण',
    requiredDocumentsTitle: 'ज़रूरी दस्तावेज़ और वे कहाँ से मिलेंगे',
    whereToGetDoc: 'प्राप्ति स्थान:',
    applicationStepsTitle: 'आवेदन के क्रमिक चरण',
    progressLabel: 'चेकलिस्ट प्रगति',
    markDone: 'प्राप्त हो गया',
    completedBadge: 'पूर्ण',
    verifyDocButton: 'दस्तावेज़ की फ़ोटो जांचें',
    verifyDocTitle: 'दस्तावेज़ की त्वरित AI जांच',
    verifyDocDesc: 'आधार, आय प्रमाण पत्र या खतौनी की फ़ोटो अपलोड करें। हम स्पष्टता और प्रोफ़ाइल मिलान की जांच करेंगे।',
    uploadDocPrompt: 'दस्तावेज़ की फ़ोटो चुनें या यहाँ खींचें',
    privacyGuarantee: 'ज़िम्मेदार AI गारंटी: फ़ोटो केवल क्षणिक जांच के लिए उपयोग होती है और तुरंत हटा दी जाती है। आधार नंबर कभी सुरक्षित नहीं किए जाते।',
    deadlinesTitle: 'महत्वपूर्ण समय सीमाएं व चक्र',
    deadlinesSubtitle: 'किसी भी छात्रवृत्ति या डीबीटी योजना की अंतिम तिथि न चूकें।',
    filterAll: 'सभी श्रेणियां',
    filterFarmer: 'किसान 🌾',
    filterStudent: 'विद्यार्थी 🎓',
    filterWomen: 'महिलाएं 👩',
    filterSenior: 'वरिष्ठ नागरिक 👴',
    filterHealth: 'स्वास्थ्य व आवास 🏥',
    disclaimerText: 'साथी केवल सहायता व मार्गदर्शन प्रदान करता है, यह आधिकारिक सरकारी निर्णय नहीं है। कृपया संबंधित सीएससी केंद्र या आधिकारिक पोर्टल पर अवश्य सत्यापन करें।',
    officialHelpline: 'राष्ट्रीय सेवा टोल-फ्री: 1800-11-0031 | किसान कॉल सेंटर: 1800-180-1551',
    loadingAI: 'साथी AI विश्लेषण कर रहा है...',
  },
  te: {
    appName: 'సాథి (Saathi)',
    tagline: 'ప్రభుత్వ పథకాల కోసం మీ AI మార్గదర్శి',
    subTagline: 'వాయిస్-ఫస్ట్ • బహుభాషా • స్పష్టమైన పత్రాల చెక్‌లిస్ట్ మరియు దశలు',
    heroHeadline: 'మీరు ఏ ప్రభుత్వ పథకం కోసం చూస్తున్నారు?',
    heroSubheadline: 'మీ సొంత భాషలో మాట్లాడండి లేదా టైప్ చేయండి. మీరు ఏ పథకాలకు అర్హులో, ఏ పత్రాలు కావాలో మేము చెబుతాము.',
    micListening: 'వింటున్నాము... మాట్లాడండి',
    micClickToSpeak: 'మాట్లాడటానికి నొక్కండి',
    micStopListening: 'ఆపడానికి నొక్కండి',
    orTypeText: 'లేదా మీ వివరాలను ఇక్కడ రాయండి',
    inputPlaceholder: 'ఉదాహరణ: నేను 45 ఏళ్ల రైతును, 2 ఎకరాల పొలం ఉంది, కూతురు 11వ తరగతి చదువుతోంది...',
    discoverButton: 'నా పథకాలను కనుగొనండి',
    tryDemoFarmer: '🌾 రైతు డెమో',
    tryDemoStudent: '🎓 విద్యార్థి డెమో',
    tryDemoSenior: '👴 వృద్ధుల డెమో',
    demoPersonasTitle: 'త్వరిత డెమో ప్రొఫైల్స్:',
    profileConfirmedTitle: 'మీ నిర్ధారిత ప్రొఫైల్',
    profileExtractedSubtitle: 'పథకాలను శోధించే ముందు AI ద్వారా సేకరించిన వివరాలను సమీక్షించండి:',
    editProfile: 'సవరించండి',
    confirmAndFindSchemes: 'ధృవీకరించి పథకాలను చూడండి',
    ageLabel: 'వయస్సు',
    occupationLabel: 'వృత్తి',
    incomeLabel: 'వార్షిక ఆదాయం',
    stateLabel: 'రాష్ట్రం',
    landLabel: 'భూమి వివరాలు',
    educationLabel: 'చదువు / కుటుంబం',
    familyDetailsLabel: 'కుటుంబ వివరాలు',
    missingInfoPrompt: 'మరింత కచ్చితమైన ఫలితాల కోసం దయచేసి వివరాలు అందించండి:',
    matchesFoundTitle: 'మీ కోసం సిఫార్సు చేయబడిన పథకాలు',
    likelyEligibleBadge: 'ఖచ్చితంగా అర్హులు',
    potentialEligibleBadge: 'అర్హత పొందే అవకాశం ఉంది • షరతులు చూడండి',
    readAloud: 'వినండి (వాయిస్)',
    stopAudio: 'ఆపండి',
    verifyOfficialLink: 'అధికారిక వెబ్‌సైట్‌లో ధృవీకరించుకోండి',
    openChecklist: 'పత్రాలు & దరఖాస్తు దశలు చూడండి',
    checklistTitle: 'దరఖాస్తు చెక్‌లిస్ట్ & దశలు',
    requiredDocumentsTitle: 'కావలసిన పత్రాలు & అవి ఎక్కడ లభిస్తాయి',
    whereToGetDoc: 'లభించే స్థలం:',
    applicationStepsTitle: 'దరఖాస్తు విధానం (దశలవారీగా)',
    progressLabel: 'చెక్‌లిస్ట్ పురోగతి',
    markDone: 'సేకరించబడిందిగా గుర్తించు',
    completedBadge: 'పూర్తయింది',
    verifyDocButton: 'పత్రం ఫోటోను తనిఖీ చేయండి',
    verifyDocTitle: 'త్వరిత AI పత్రాల ధృవీకరణ',
    verifyDocDesc: 'ఆధార్, ఆదాయ ధృవీకరణ లేదా పట్టాదారు పాస్‌బుక్ ఫోటో అప్‌లోడ్ చేయండి. స్పష్టత మరియు ప్రొఫైల్ సరిపోలికను తనిఖీ చేస్తాము.',
    uploadDocPrompt: 'పత్రం ఫోటోను ఎంచుకోండి లేదా ఇక్కడ లాగండి',
    privacyGuarantee: 'బాధ్యతాయుతమైన AI హామీ: ఫోటోను తాత్కాలికంగా మాత్రమే విశ్లేషించి వెంటనే తొలగిస్తాము. ఆధార్ నంబర్లు ఎప్పటికీ నిల్వ చేయబడవు.',
    deadlinesTitle: 'రాబోయే పథకాల గడువులు & చక్రాలు',
    deadlinesSubtitle: 'ఏ స్కాలర్‌షిప్ లేదా సబ్సిడీ ఆఖరి తేదీని కోల్పోకండి.',
    filterAll: 'అన్ని రకాలు',
    filterFarmer: 'రైతులు 🌾',
    filterStudent: 'విద్యార్థులు 🎓',
    filterWomen: 'మహిళలు 👩',
    filterSenior: 'వృద్ధులు 👴',
    filterHealth: 'ఆరోగ్యం & ఇళ్లు 🏥',
    disclaimerText: 'సాథి ప్రభుత్వ మార్గదర్శకాల ఆధారంగా సమాచారాన్ని అందిస్తుంది. ఇది అధికారిక నిర్ణయం కాదు. దయచేసి సమీప మీసేవా లేదా అధికారిక పోర్టల్‌లో ధృవీకరించుకోండి.',
    officialHelpline: 'జాతీయ సేవల టోల్-ఫ్రీ: 1800-11-0031 | కిసాన్ కాల్ సెంటర్: 1800-180-1551',
    loadingAI: 'సాథి AI విశ్లేషిస్తోంది...',
  },
};
