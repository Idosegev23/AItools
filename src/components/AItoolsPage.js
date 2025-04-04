// src/components/AItoolsPage.js
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
  // ... המשך הרשימה (השאר ללא שינוי)
  { category: 'מצגות / דוחות / מאמרים', name: 'gamma.app', usage: 'יצירת מצגות ודוחות אוטומטית', link: 'https://gamma.app', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'ניתוח נתונים', name: 'Julius AI', usage: '', link: 'https://julius.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
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
        className={`${bgColor} text-white p-2 rounded-full shadow-lg flex items-center justify-center`}
        style={{ width: '40px', height: '40px' }}
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
      {isDescriptionVisible && isTouchDevice && (
        <div className="absolute left-12 top-0 bg-gray-800 text-white p-2 rounded shadow-lg whitespace-nowrap">
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
    <div className="min-h-screen bg-gray-100 p-4" dir="rtl">
      <header className="text-center mb-8">
        <img 
          src="https://res.cloudinary.com/dsoh3yteb/image/upload/v1742806446/Logo2025_xbrzm3.png"
          alt="KA Logo"
          className="h-32 md:h-56 mx-auto mb-4"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-[#D9A25F]">כלי AI מובילים</h1>
        <p className="text-gray-600 mt-2">עודכן לאחרונה: 23.3.25</p>
      </header>

      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <input 
            type="text" 
            placeholder="חפש כלי..." 
            className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring w-full md:w-auto"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select 
            className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring w-full md:w-auto"
            value={difficultyFilter}
            onChange={e => setDifficultyFilter(e.target.value)}
          >
            <option value="">רמת קושי</option>
            <option value="מתחילים">מתחילים</option>
            <option value="בינוני">בינוני</option>
            <option value="מתקדמים">מתקדמים</option>
          </select>
          <select 
            className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring w-full md:w-auto"
            value={priceFilter}
            onChange={e => setPriceFilter(e.target.value)}
          >
            <option value="">עלות</option>
            <option value="חינם">חינם</option>
            <option value="בתשלום">בתשלום</option>
          </select>
          <select 
            className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring w-full md:w-auto"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="">קטגוריה</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <h2 className="text-xl md:text-2xl font-bold text-[#0D0D0D] mb-2">{tool.name}</h2>
              <p className="text-gray-700"><strong>קטגוריה:</strong> {tool.category}</p>
              <p className="text-gray-700"><strong>שימוש:</strong> {tool.usage}</p>
              <p className="text-gray-700"><strong>קישור:</strong> <a href={tool.link} className="text-[#D9A25F]" target="_blank" rel="noreferrer">{tool.link}</a></p>
              <p className="text-gray-700"><strong>מחיר:</strong> {tool.price}</p>
              <p className="text-gray-700"><strong>דרגת קושי:</strong> {tool.difficulty}</p>
            </motion.div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            לא נמצאו כלים התואמים את החיפוש
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">קרדיט: יובל אבידני</p>
      </div>

      <div className="fixed bottom-4 left-4 flex flex-col space-y-4">
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
          bgColor="bg-green-500"
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
