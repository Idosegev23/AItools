// src/components/AItoolsPage.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import 'tailwindcss/tailwind.css';

// מערך הכלים (aiTools)
const aiTools = [
  { category: 'תמונות / ליפסינק', name: 'Artflow', usage: 'יצירת תמונות, אימון מודל על תמונות שלנו, ליפסינק לאוואטרים, יצירת סרטונים', link: 'https://artflow.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'ChatGPT', usage: 'מענה על שאלות בכל הנושאים, יכולת ליצור ולערוך תמונות', link: 'https://chat.openai.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'Claude', usage: 'מענה על שאלות בכל הנושאים', link: 'https://claude.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'Cohere', usage: 'מענה על שאלות בכל הנושאים', link: 'https://cohere.ai', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'תמונות / וידאו', name: 'FaceFusion', usage: 'החלפת פנים בתמונות או בווידאו', link: 'https://facefusion.io', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'אוואטרים / ליפסינק', name: 'HeyGen', usage: 'יצירת אוואטרים, סוכנים וליפסינק', link: 'https://heygen.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'אוואטרים / ליפסינק', name: 'D-ID', usage: 'יצירת אוואטרים, סוכנים וליפסינק', link: 'https://d-id.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות / עריכה גרפית', name: 'ClipDrop', usage: 'יצירת תמונות, עריכת תמונות, החלפת פנים', link: 'https://clipdrop.co', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות / עריכה גרפית', name: 'Fooocus', usage: 'יצירת תמונות בצורה פשוטה או מתקדמת עם סטייבל דיפיוז\'ן בממשק ידידותי יחסית למשתמש', link: 'https://github.com/lllyasviel/Fooocus', price: 'חינם', difficulty: 'בינוני' },
  { category: 'תמונות / עריכה גרפית / וידאו', name: 'Leonardo', usage: 'יצירת תמונות, אימון מודלים, יצירת קטעי וידאו קצרים', link: 'https://leonardo.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מוזיקה', name: 'Suno', usage: 'יצירת מוזיקה', link: 'https://suno.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'אוואטרים / ליפסינק', name: 'Yepic', usage: 'ליפסינק', link: 'https://www.yepic.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי / סוכני AI קוליים', name: 'Play.ht', usage: '', link: 'https://play.ht', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Elevenlabs', usage: '', link: 'https://elevenlabs.io', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Kits.AI', usage: '', link: 'https://www.kits.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Weights.gg', usage: '', link: 'https://weights.gg', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Replay AI', usage: '', link: 'https://www.tryreplay.io', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'RVC Training', usage: '', link: 'https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/releases', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'קוד פתוח', name: 'HuggingFace', usage: '', link: 'https://huggingface.co', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'קורסים - למידת מכונה', name: 'deeplearning.ai', usage: '', link: 'https://deeplearning.ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'אוטומציה', name: 'Zapier Central', usage: '', link: 'https://zapier.com/central', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'אוטומציה', name: 'make.com', usage: '', link: 'https://www.make.com/en', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'ללא קוד - קריאות API', name: 'Bubble', usage: '', link: 'https://bubble.io', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'ללא קוד - יצירת סוכנים', name: 'officely.ai', usage: '', link: 'https://www.officely.ai', price: 'בתשלום', difficulty: 'בינוני' },
  { category: 'ללא קוד - יצירת סוכנים', name: 'fastbots.ai', usage: '', link: 'https://fastbots.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'ללא קוד - יצירת סוכנים', name: 'uchat', usage: '', link: 'https://www.uchat.com.au', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'ללא קוד - יצירת סוכנים', name: 'Flowise ai', usage: '', link: 'https://flowiseai.com', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'תמונות / גרפיקה / וידאו', name: 'Automatic1111', usage: '', link: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'תמונות / גרפיקה / וידאו', name: 'ComfyUI', usage: '', link: 'https://github.com/comfyanonymous/ComfyUI', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'שירותי ענן ליצירת תמונות', name: 'RunDiffusion', usage: '', link: 'https://rundiffusion.com', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'שירותי ענן ליצירת תמונות', name: 'DiffusionHub', usage: '', link: 'https://diffusionhub.io', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'קורסים - למידת מכונה בפייתון', name: 'nnfs.io', usage: '', link: 'https://nnfs.io', price: 'בתשלום', difficulty: 'מתקדמים' },
  { category: 'תמונות', name: 'Midjourney', usage: '', link: 'https://www.midjourney.com/home', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'יצירת תמונות / הגדלת איכות תמונה', name: 'Krea.ai', usage: '', link: 'https://www.krea.ai/home', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות', name: 'glif.ai', usage: '', link: 'https://glif.app/glifs', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'המרת תמונות לתלת מימד עם עומק', name: 'LeiaPix', usage: '', link: 'https://convert.leiapix.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'תמונות / גרפיקה', name: 'Adobe Firefly', usage: '', link: 'https://firefly.adobe.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'תמונות / גרפיקה', name: 'Ideogram.ai', usage: '', link: 'https://ideogram.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'החלפת פנים בתמונות / וידאו', name: 'miocreate', usage: '', link: 'https://www.miocreate.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'ללא קוד - פיתוח אתרים', name: 'mobirise', usage: '', link: 'https://mobirise.com', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'וידאו', name: 'PIKA', usage: '', link: 'https://pika.art', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'PixVerse', usage: '', link: 'https://pixverse.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'Viggle', usage: '', link: 'https://viggle.ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'אופנה', name: 'IDM VTON', usage: '', link: 'https://huggingface.co/spaces/yisol/IDM-VTON', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מודלים של שפה', name: 'OOGA-BOOGA', usage: '', link: 'https://github.com/oobabooga/text-generation-webui', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מודלים של שפה', name: 'LM Studio', usage: '', link: 'https://lmstudio.ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מודלים של שפה', name: 'Ollama', usage: '', link: 'https://ollama.com', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'סוכני AI קוליים', name: 'Hume.ai', usage: '', link: 'https://www.hume.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'חיפוש מידע', name: 'Mendable', usage: '', link: 'https://www.mendable.ai', price: 'בתשלום', difficulty: 'מתקדמים' },
  { category: 'חיפוש מידע', name: 'Gitbook Lens', usage: '', link: 'https://docs.gitbook.com/content-editor/searching-your-content/gitbook-ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מידול קולי', name: 'רובו-שאול', usage: '', link: 'https://github.com/maxmelichov/Text-To-speech', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מודל של שפה', name: 'Groq', usage: '', link: 'https://groq.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'תמלול ויצירת כתוביות', name: 'Captions', usage: '', link: 'https://www.captions.ai', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'תמלול ויצירת כתוביות / עריכת וידאו', name: 'Kapwing', usage: '', link: 'https://www.kapwing.com', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'וידאו', name: 'CapCut', usage: '', link: 'https://www.capcut.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'כתיבת קוד', name: 'Github Co-Pilot', usage: '', link: 'https://github.com/features/copilot', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'פיתוח', name: 'Devin', usage: '', link: 'https://preview.devin.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מחקר', name: 'Perplexity', usage: '', link: 'https://www.perplexity.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'Microsoft Co-Pilot', usage: '', link: 'https://copilot.microsoft.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מצגות / דוחות / מאמרים', name: 'Office Co-Pilot', usage: '', link: 'https://copilot.cloud.microsoft/en-us/prompts', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'ניתוח נתונים', name: 'Julius AI', usage: '', link: 'https://julius.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  // הוספת הכלים החדשים
  { category: 'תמונות / גרפיקה', name: 'Reve.art', usage: 'יצירת תמונות אומנותיות מטקסט, העברת סגנונות, ותמונות באיכות גבוהה', link: 'https://reve-art.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מצגות / דוחות / מאמרים', name: 'gamma.app', usage: 'יצירת מצגות ודוחות אוטומטית', link: 'https://gamma.app', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'Revid.ai', usage: 'הפיכת טקסט לסרטונים באיכות מקצועית', link: 'https://www.revid.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
];

// קטגוריות
const categories = [
  "תמונות / ליפסינק",
  "מודל שפה גדול",
  "תמונות / וידאו",
  "אוואטרים / ליפסינק",
  "תמונות / עריכה גרפית",
  "תמונות / עריכה גרפית / וידאו",
  "מוזיקה",
  "וידאו",
  "אופנה",
  "ללא קוד - פיתוח אתרים",
  "ללא קוד - קריאות API",
  "ללא קוד - יצירת סוכנים",
  "קוד פתוח",
  "קורסים - למידת מכונה",
  "אוטומציה",
  "שירותי ענן ליצירת תמונות",
  "קורסים - למידת מכונה בפייתון",
  "יצירת תמונות / הגדלת איכות תמונה",
  "תמונות / גרפיקה / וידאו",
  "מצגות / דוחות / מאמרים",
  "ניתוח נתונים",
  "כתיבת קוד",
  "פיתוח",
  "מחקר",
  "תמלול ויצירת כתוביות",
  "תמלול ויצירת כתוביות / עריכת וידאו",
  "מודלים של שפה",
  "מידול קולי",
  "מידול קולי / סוכני AI קוליים",
  "סוכני AI קוליים",
  "חיפוש מידע",
  "המרת תמונות לתלת מימד עם עומק",
  "החלפת פנים בתמונות / וידאו",
  "ניהול זמן ופגישות",
  "יצירת ויזואליזציות מטקסט"
];

// צבעים לפי התמה החדשה
const colors = {
  yellow: '#F2E205',
  gold: '#D9B366',
  white: '#FFFFFF',
  black: '#0D0D0D',
};

// קומפוננטת כפתור יצירת קשר
const ContactButton = ({ href, icon, description, bgColor }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleTouchStart = (e) => {
    if (!isDescriptionVisible) {
      e.preventDefault();
      setIsDescriptionVisible(true);
    } else {
      window.location.href = href;
    }
  };

  return (
    <div 
      className="relative" 
      onMouseEnter={() => !isTouchDevice && setIsDescriptionVisible(true)} 
      onMouseLeave={() => !isTouchDevice && setIsDescriptionVisible(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={(e) => e.preventDefault()}
    >
      <a 
        href={isTouchDevice && !isDescriptionVisible ? '#' : href} 
        className={`${bgColor} text-white p-2 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300`}
        style={{ width: '48px', height: '48px' }}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (isTouchDevice && !isDescriptionVisible) {
            e.preventDefault();
            setIsDescriptionVisible(true);
          }
        }}
      >
        {icon}
      </a>
      {isDescriptionVisible && (
        <div className="absolute left-14 top-0 bg-black text-white p-2 rounded-md shadow-lg whitespace-nowrap z-50">
          {description}
        </div>
      )}
    </div>
  );
};

// הקומפוננטה הראשית
const AItoolsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredTools = React.useMemo(() => {
    if (!searchTerm && !difficultyFilter && !priceFilter && !categoryFilter) {
      return aiTools;
    }

    return aiTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = !difficultyFilter || tool.difficulty === difficultyFilter;
      const matchesPrice = !priceFilter || tool.price.includes(priceFilter);
      const matchesCategory = !categoryFilter || tool.category === categoryFilter;
      return matchesSearch && matchesDifficulty && matchesPrice && matchesCategory;
    });
  }, [searchTerm, difficultyFilter, priceFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-4" dir="rtl">
      {/* גלים דקורטיביים בראש העמוד */}
      <div className="absolute top-0 left-0 right-0 h-72 overflow-hidden z-0">
        <svg className="absolute bottom-0 left-0 w-full" 
             xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 1440 320">
          <path fill="rgba(242, 226, 5, 0.1)" 
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,229.3C672,256,768,288,864,277.3C960,267,1056,213,1152,176C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
          </path>
        </svg>
        <svg className="absolute bottom-0 left-0 w-full" 
             xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 1440 320">
          <path fill="rgba(217, 179, 102, 0.1)" 
                d="M0,192L48,176C96,160,192,128,288,117.3C384,107,480,117,576,149.3C672,181,768,235,864,224C960,213,1056,139,1152,128C1248,117,1344,171,1392,197.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
          </path>
        </svg>
      </div>

      <header className="relative text-center mb-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="https://res.cloudinary.com/dsoh3yteb/image/upload/v1742806446/Logo2025_xbrzm3.png"
            alt="KA Logo"
            className="h-32 md:h-56 mx-auto mb-4 drop-shadow-md"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 drop-shadow-sm">
            כלי <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">AI</span> מובילים
          </h1>
          <p className="text-xl text-gray-700 mb-4">גלה את הכלים החדשניים ביותר בתחום הבינה המלאכותית</p>
          <p className="text-gray-500 mt-2">עודכן לאחרונה: 20.5.25</p>
        </motion.div>
      </header>

      <div className="container mx-auto relative z-10">
        {/* חיפוש וסינון */}
        <motion.div 
          className="mb-8 p-6 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <input 
              type="text" 
              placeholder="חפש כלי..." 
              className="p-3 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent w-full md:w-auto"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <select 
              className="p-3 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent w-full md:w-auto"
              value={difficultyFilter}
              onChange={e => setDifficultyFilter(e.target.value)}
            >
              <option value="">רמת קושי</option>
              <option value="מתחילים">מתחילים</option>
              <option value="בינוני">בינוני</option>
              <option value="מתקדמים">מתקדמים</option>
            </select>
            <select 
              className="p-3 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent w-full md:w-auto"
              value={priceFilter}
              onChange={e => setPriceFilter(e.target.value)}
            >
              <option value="">עלות</option>
              <option value="חינם">חינם</option>
              <option value="בתשלום">בתשלום</option>
            </select>
            <select 
              className="p-3 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent w-full md:w-auto"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="">קטגוריה</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* כרטיסי הכלים */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div 
              key={index}
              className="relative bg-white p-6 rounded-xl shadow-md border-b-4 border-yellow-400 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
              <h2 className="text-2xl font-bold text-black mb-3">{tool.name}</h2>
              <div className="space-y-2 mb-4">
                <p className="text-gray-700"><span className="font-bold text-yellow-700">קטגוריה:</span> {tool.category}</p>
                <p className="text-gray-700"><span className="font-bold text-yellow-700">שימוש:</span> {tool.usage || 'לא צוין'}</p>
                <p className="text-gray-700"><span className="font-bold text-yellow-700">מחיר:</span> {tool.price}</p>
                <p className="text-gray-700"><span className="font-bold text-yellow-700">דרגת קושי:</span> {tool.difficulty}</p>
              </div>
              <a 
                href={tool.link} 
                className="mt-3 inline-block py-2 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                target="_blank"
                rel="noreferrer"
              >
                קח אותי לשם
              </a>
            </motion.div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center text-gray-500 mt-8 p-10 bg-white rounded-lg shadow-md">
            <p className="text-xl">לא נמצאו כלים התואמים את החיפוש</p>
            <p className="mt-2">נסה לשנות את פרמטרי החיפוש</p>
          </div>
        )}
      </div>

      {/* פוטר */}
      <div className="mt-16 py-8 text-center">
        <p className="text-gray-600 mb-4">קרדיט: יובל אבידני</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200">תנאי שימוש</a>
          <a href="#" className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200">מדיניות פרטיות</a>
        </div>
      </div>

      {/* כפתורי יצירת קשר */}
      <div className="fixed bottom-6 left-6 flex flex-col space-y-4 z-50">
        <ContactButton 
          href="https://chat.whatsapp.com/F4eKksEsU4n1LKVSwiXo82"
          icon={<FaWhatsapp size={24} />}
          description="הצטרף לקבוצת הוואטסאפ השקטה"
          bgColor="bg-green-500"
        />
        <ContactButton 
          href="https://wa.me/972529772209?text=היי%20אני%20אשמח%20לשמוע%20עוד%20על%20ההרצאות%20והסדנאות%20שלכם"
          icon={<FaWhatsapp size={24} />}
          description="שלח הודעת וואטסאפ אישית"
          bgColor="bg-yellow-500"
        />
        <ContactButton 
          href="mailto:kochavith.arnon@gmail.com"
          icon={<MdEmail size={24} />}
          description="שלח אימייל"
          bgColor="bg-blue-500"
        />
        <ContactButton 
          href="tel:+972529772209"
          icon={<FaPhone size={24} />}
          description="התקשר אלינו"
          bgColor="bg-red-500"
        />
      </div>
    </div>
  );
};

export default AItoolsPage;
