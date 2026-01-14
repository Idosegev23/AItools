// src/components/AItoolsPage.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import 'tailwindcss/tailwind.css';

// מערך הכלים (aiTools)
const aiTools = [
  // --- כלים חדשים ומומלצים (עדכון ינואר 2026) ---
  // עריכת וידאו ורשתות חברתיות
  { category: 'עריכת וידאו / שיווק', name: 'Opus Clip', usage: 'לוקח סרטון ארוך (יוטיוב/זום) וחותך אותו אוטומטית לסרטונים קצרים (Shorts/Reels) עם כתוביות ויראליות', link: 'https://www.opus.pro', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'עריכת וידאו / שיווק', name: 'Munch', usage: 'הופך תכנים ארוכים לקליפים קצרים ומזהה את הטרנדים החמים ברשת להתאמה מקסימלית', link: 'https://www.getmunch.com', price: 'בתשלום', difficulty: 'מתחילים' },
  
  // יצירת וידאו מתקדמת
  { category: 'וידאו', name: 'Luma Dream Machine', usage: 'יצירת סרטוני וידאו ריאליסטיים ואיכותיים מאוד מטקסט או תמונה', link: 'https://lumalabs.ai/dream-machine', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'Hailuo AI (MiniMax)', usage: 'מודל יצירת וידאו מהטובים בעולם כרגע, מייצר תנועה חלקה וריאליסטית להפליא', link: 'https://www.hailuo.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'Runway Gen-3', usage: 'כלי מקצועי ליצירת וידאו, עריכת וידאו עם AI, מחיקת אובייקטים מוידאו ועוד', link: 'https://runwayml.com', price: 'חינם / בתשלום', difficulty: 'בינוני' },
  { category: 'וידאו', name: 'Kling AI', usage: 'יצירת וידאו ברמה קולנועית (עד 5 שניות בחינם), ריאליזם גבוה', link: 'https://klingai.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },

  // עיצוב וגרפיקה לאנשים פשוטים
  { category: 'עיצוב גרפי', name: 'Canva Magic Studio', usage: 'חליפת ה-AI של קנבה: יצירת תמונות, עריכה קסומה, הרחבת תמונות וכתיבת טקסטים', link: 'https://www.canva.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'עיצוב גרפי', name: 'Microsoft Designer', usage: 'הכלי החינמי של מיקרוסופט ליצירת הזמנות, פוסטים ועיצובים מטקסט', link: 'https://designer.microsoft.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'עיצוב גרפי / איקומרס', name: 'Photoroom', usage: 'הכלי הטוב ביותר לצילום מוצרים: מסיר רקע ויוצר רקע סטודיו מקצועי בשניות', link: 'https://www.photoroom.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'עיצוב גרפי / לוגו', name: 'Recraft', usage: 'יצירת גרפיקה וקטורית (SVG), לוגואים ואייקונים לעיצוב מקצועי שאפשר להגדיל', link: 'https://www.recraft.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות', name: 'Freepik Pikaso', usage: 'יצירת תמונות בזמן אמת (מציירים וזה משתנה), שימוש במודל Flux האיכותי בצורה פשוטה', link: 'https://www.freepik.com/pikaso', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'עריכת תמונות', name: 'Magic Studio', usage: 'מחיקת אנשים מתמונות, הסרת רקעים והחלפת פרטים בקלות', link: 'https://magicstudio.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },

  // אודיו ומוזיקה
  { category: 'מוזיקה', name: 'Udio', usage: 'יצירת שירים מלאים ברמה רדיופונית, מתחרה ישיר ל-Suno', link: 'https://www.udio.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'עריכת אודיו', name: 'Adobe Podcast', usage: 'מנקה רעשי רקע מהקלטות והופך הקלטה ביתית לאיכות אולפן בלחיצה', link: 'https://podcast.adobe.com/enhance', price: 'חינם', difficulty: 'מתחילים' },
  
  // פרודוקטיביות, מחקר וניהול
  { category: 'מחקר / למידה', name: 'NotebookLM', usage: 'הפוך מסמכים לפודקאסט שמע (Audio Overview), סיכום וצ\'אט עם מסמכים בעברית', link: 'https://notebooklm.google.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'ניהול פגישות', name: 'Otter.ai', usage: 'מקליט פגישות (באנגלית), מתמלל אוטומטית ומסכם את הנקודות החשובות', link: 'https://otter.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'ניהול פגישות', name: 'tldv', usage: 'מקליט פגישות זום/Teams/Meet, מתמלל ומאפשר לחתוך קטעים חשובים מהוידאו', link: 'https://tldv.io', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'צ\'אט עם מסמכים', name: 'ChatPDF', usage: 'מעלים קובץ PDF ומדברים איתו כמו בווטסאפ. מעולה לסטודנטים ולחוזים', link: 'https://www.chatpdf.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'כתיבה שיווקית', name: 'Copy.ai', usage: 'כתיבת פוסטים, מיילים ותוכן שיווקי בצורה מהירה ומותאמת לעסקים', link: 'https://www.copy.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'כתיבה ותיקון', name: 'Grammarly', usage: 'תיקון שגיאות כתיב וניסוח באנגלית, כעת עם יכולות AI לכתיבה מחדש', link: 'https://www.grammarly.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },

  // מצגות ותלת מימד
  { category: 'מצגות / ויזואליזציה', name: 'Napkin AI', usage: 'הופך טקסט לתרשימים, איורים וגרפיקה עסקית למצגות אוטומטית', link: 'https://www.napkin.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מצגות', name: 'Beautiful.ai', usage: 'יצירת שקפים מעוצבים אוטומטית, שומר על קו עיצובי אחיד בלי מאמץ', link: 'https://www.beautiful.ai', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'תלת מימד', name: 'Skybox AI', usage: 'יצירת עולמות 360 מעלות מטקסט פשוט. מדהים למשחקים או סתם לכיף', link: 'https://skybox.blockadelabs.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תלת מימד', name: 'Tripo 3D', usage: 'הופך תמונה או טקסט למודל תלת מימדי מלא בתוך שניות', link: 'https://www.tripo3d.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },

  // פאן וצ'אט
  { category: 'אוואטרים / ליפסינק', name: 'Hedra', usage: 'יצירת דמויות מדברות עם הבעות פנים דרמטיות ותנועה חופשית', link: 'https://www.hedra.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'צ\'אט בוטים', name: 'Character.ai', usage: 'שיחות עם דמויות מפורסמות, היסטוריות או בדיוניות. חוויה מהנה מאוד', link: 'https://character.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'חיפוש ומידע בזמן אמת', name: 'Grok (xAI)', usage: 'המודל של טוויטר/X, מצטיין במידע עדכני מאוד וחדשות בזמן אמת', link: 'https://x.com/i/grok', price: 'בתשלום (למשתמשי X)', difficulty: 'מתחילים' },
  
  // --- הכלים הקיימים (רשימה מקורית) ---
  { category: 'תמונות / ליפסינק', name: 'Artflow', usage: 'יצירת תמונות, אימון מודל על תמונות שלנו, ליפסינק לאוואטרים, יצירת סרטונים', link: 'https://artflow.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'ChatGPT', usage: 'מענה על שאלות בכל הנושאים, יכולת ליצור ולערוך תמונות', link: 'https://chat.openai.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'Claude', usage: 'מענה על שאלות בכל הנושאים, כתיבה יצירתית וניתוח קבצים', link: 'https://claude.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'Cohere', usage: 'מענה על שאלות בכל הנושאים', link: 'https://cohere.ai', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'תמונות / וידאו', name: 'FaceFusion', usage: 'החלפת פנים בתמונות או בווידאו', link: 'https://facefusion.io', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'אוואטרים / ליפסינק', name: 'HeyGen', usage: 'יצירת אוואטרים, סוכנים וליפסינק', link: 'https://heygen.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'אוואטרים / ליפסינק', name: 'D-ID', usage: 'יצירת אוואטרים, סוכנים וליפסינק', link: 'https://d-id.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות / עריכה גרפית', name: 'ClipDrop', usage: 'יצירת תמונות, עריכת תמונות, החלפת פנים, תאורה מחדש', link: 'https://clipdrop.co', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות / עריכה גרפית', name: 'Fooocus', usage: 'יצירת תמונות בצורה פשוטה או מתקדמת עם סטייבל דיפיוז\'ן', link: 'https://github.com/lllyasviel/Fooocus', price: 'חינם', difficulty: 'בינוני' },
  { category: 'תמונות / עריכה גרפית / וידאו', name: 'Leonardo', usage: 'יצירת תמונות, אימון מודלים, יצירת קטעי וידאו קצרים', link: 'https://leonardo.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מוזיקה', name: 'Suno', usage: 'יצירת מוזיקה ושירים', link: 'https://suno.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'אוואטרים / ליפסינק', name: 'Yepic', usage: 'ליפסינק', link: 'https://www.yepic.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי / סוכני AI קוליים', name: 'Play.ht', usage: '', link: 'https://play.ht', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Elevenlabs', usage: 'הכלי המוביל לחיקוי קולות והקראת טקסט (TTS)', link: 'https://elevenlabs.io', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
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
  { category: 'תמונות', name: 'Midjourney', usage: 'מחולל התמונות האיכותי ביותר, פועל דרך דיסקורד או אתר', link: 'https://www.midjourney.com/home', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'יצירת תמונות / הגדלת איכות תמונה', name: 'Krea.ai', usage: 'יצירה בזמן אמת ושיפור איכות תמונות (Upscale)', link: 'https://www.krea.ai/home', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות', name: 'glif.ai', usage: 'יצירת מימים, קומיקסים ויצירות ויראליות', link: 'https://glif.app/glifs', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'המרת תמונות לתלת מימד עם עומק', name: 'LeiaPix', usage: '', link: 'https://convert.leiapix.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'תמונות / גרפיקה', name: 'Adobe Firefly', usage: '', link: 'https://firefly.adobe.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'תמונות / גרפיקה', name: 'Ideogram.ai', usage: 'מצטיין ביצירת תמונות שמשולב בהן טקסט מדויק', link: 'https://ideogram.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'החלפת פנים בתמונות / וידאו', name: 'miocreate', usage: '', link: 'https://www.miocreate.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'ללא קוד - פיתוח אתרים', name: 'mobirise', usage: '', link: 'https://mobirise.com', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'וידאו', name: 'PIKA', usage: '', link: 'https://pika.art', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'PixVerse', usage: '', link: 'https://pixverse.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'Viggle', usage: 'הנפשת דמויות לרקוד או לזוז לפי וידאו אחר', link: 'https://viggle.ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'אופנה', name: 'IDM VTON', usage: '', link: 'https://huggingface.co/spaces/yisol/IDM-VTON', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מודלים של שפה', name: 'OOGA-BOOGA', usage: '', link: 'https://github.com/oobabooga/text-generation-webui', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מודלים של שפה', name: 'LM Studio', usage: '', link: 'https://lmstudio.ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מודלים של שפה', name: 'Ollama', usage: '', link: 'https://ollama.com', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'סוכני AI קוליים', name: 'Hume.ai', usage: 'בינה מלאכותית שמזהה רגשות בקול', link: 'https://www.hume.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'חיפוש מידע', name: 'Mendable', usage: '', link: 'https://www.mendable.ai', price: 'בתשלום', difficulty: 'מתקדמים' },
  { category: 'חיפוש מידע', name: 'Gitbook Lens', usage: '', link: 'https://docs.gitbook.com/content-editor/searching-your-content/gitbook-ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מידול קולי', name: 'רובו-שאול', usage: '', link: 'https://github.com/maxmelichov/Text-To-speech', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מודל של שפה', name: 'Groq', usage: '', link: 'https://groq.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'תמלול ויצירת כתוביות', name: 'Captions', usage: '', link: 'https://www.captions.ai', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'תמלול ויצירת כתוביות / עריכת וידאו', name: 'Kapwing', usage: '', link: 'https://www.kapwing.com', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'וידאו', name: 'CapCut', usage: 'עריכת וידאו קלה ופופולרית מאוד', link: 'https://www.capcut.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'כתיבת קוד', name: 'Github Co-Pilot', usage: '', link: 'https://github.com/features/copilot', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'פיתוח', name: 'Devin', usage: '', link: 'https://preview.devin.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מחקר', name: 'Perplexity', usage: 'מנוע חיפוש מבוסס בינה מלאכותית - נותן תשובות עם מקורות', link: 'https://www.perplexity.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'Microsoft Co-Pilot', usage: '', link: 'https://copilot.microsoft.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מצגות / דוחות / מאמרים', name: 'Office Co-Pilot', usage: '', link: 'https://copilot.cloud.microsoft/en-us/prompts', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'ניתוח נתונים', name: 'Julius AI', usage: '', link: 'https://julius.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות / גרפיקה', name: 'Reve.art', usage: 'יצירת תמונות אומנותיות מטקסט, העברת סגנונות', link: 'https://reve-art.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מצגות / דוחות / מאמרים', name: 'gamma.app', usage: 'יצירת מצגות ודוחות אוטומטית', link: 'https://gamma.app', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'Revid.ai', usage: 'הפיכת טקסט לסרטונים באיכות מקצועית', link: 'https://www.revid.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
];

// קטגוריות מעודכנות
const categories = [
  "תמונות / ליפסינק",
  "מודל שפה גדול",
  "תמונות / וידאו",
  "אוואטרים / ליפסינק",
  "תמונות / עריכה גרפית",
  "עיצוב גרפי",
  "עיצוב גרפי / איקומרס",
  "עריכת וידאו / שיווק",
  "ניהול פגישות",
  "כתיבה שיווקית",
  "כתיבה ותיקון",
  "צ'אט עם מסמכים",
  "תלת מימד",
  "צ'אט בוטים",
  "חיפוש ומידע בזמן אמת",
  "תמונות / עריכה גרפית / וידאו",
  "עיצוב גרפי / לוגו",
  "מוזיקה",
  "עריכת אודיו",
  "וידאו",
  "אופנה",
  "מחקר / למידה",
  "מצגות / ויזואליזציה",
  "מצגות",
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
  "עריכת תמונות",
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
      className="relative group" 
      onMouseEnter={() => !isTouchDevice && setIsDescriptionVisible(true)} 
      onMouseLeave={() => !isTouchDevice && setIsDescriptionVisible(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={(e) => e.preventDefault()}
    >
      <a 
        href={isTouchDevice && !isDescriptionVisible ? '#' : href} 
        className={`${bgColor} text-white p-3.5 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-2xl border-2 border-white/50`}
        style={{ width: '56px', height: '56px' }}
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
        <motion.div 
          className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl shadow-2xl whitespace-nowrap z-50 border border-white/10"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm font-medium">{description}</div>
          <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900/95"></div>
        </motion.div>
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 p-3 sm:p-4 md:p-6" dir="rtl">
      {/* גלים דקורטיביים בראש העמוד */}
      <div className="absolute top-0 left-0 right-0 h-64 sm:h-80 overflow-hidden z-0 pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full" 
             xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 1440 320"
             preserveAspectRatio="none">
          <path fill="rgba(251, 191, 36, 0.08)" 
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,229.3C672,256,768,288,864,277.3C960,267,1056,213,1152,176C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
          </path>
        </svg>
        <svg className="absolute bottom-0 left-0 w-full" 
             xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 1440 320"
             preserveAspectRatio="none">
          <path fill="rgba(217, 179, 102, 0.06)" 
                d="M0,192L48,176C96,160,192,128,288,117.3C384,107,480,117,576,149.3C672,181,768,235,864,224C960,213,1056,139,1152,128C1248,117,1344,171,1392,197.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
          </path>
        </svg>
      </div>

      <header className="relative text-center mb-8 sm:mb-12 z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img 
            src="https://res.cloudinary.com/dsoh3yteb/image/upload/v1742806446/Logo2025_xbrzm3.png"
            alt="KA Logo"
            className="h-24 sm:h-32 md:h-48 lg:h-56 mx-auto mb-4 sm:mb-6 drop-shadow-xl filter brightness-105"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            כלי <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 drop-shadow-md">AI</span> מובילים
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-3 sm:mb-4 font-medium max-w-2xl mx-auto leading-relaxed">
            גלה את הכלים החדשניים ביותר בתחום הבינה המלאכותית
          </p>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-yellow-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">עודכן לאחרונה: 14.1.26</p>
          </div>
        </motion.div>
      </header>

      <div className="container mx-auto relative z-10 max-w-7xl px-2 sm:px-4">
        {/* חיפוש וסינון */}
        <motion.div 
          className="mb-6 sm:mb-8 md:mb-10 p-4 sm:p-6 md:p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-yellow-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* שורה ראשונה - חיפוש */}
            <div className="w-full">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="🔍 חפש כלי לפי שם..." 
                  className="w-full p-3 sm:p-4 pr-12 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 text-base sm:text-lg bg-white"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            
            {/* שורה שנייה - סינונים */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select 
                className="p-3 sm:p-3.5 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 text-sm sm:text-base bg-white cursor-pointer hover:border-gray-300"
                value={difficultyFilter}
                onChange={e => setDifficultyFilter(e.target.value)}
              >
                <option value="">🎯 כל הרמות</option>
                <option value="מתחילים">✅ מתחילים</option>
                <option value="בינוני">⚡ בינוני</option>
                <option value="מתקדמים">🚀 מתקדמים</option>
              </select>
              <select 
                className="p-3 sm:p-3.5 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 text-sm sm:text-base bg-white cursor-pointer hover:border-gray-300"
                value={priceFilter}
                onChange={e => setPriceFilter(e.target.value)}
              >
                <option value="">💰 כל המחירים</option>
                <option value="חינם">🎁 חינם</option>
                <option value="בתשלום">💳 בתשלום</option>
              </select>
              <select 
                className="p-3 sm:p-3.5 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 text-sm sm:text-base bg-white cursor-pointer hover:border-gray-300"
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
              >
                <option value="">📁 כל הקטגוריות</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* תוצאות */}
            <div className="text-center text-sm text-gray-600 pt-2 border-t border-gray-100">
              נמצאו <span className="font-bold text-yellow-600">{filteredTools.length}</span> כלים
            </div>
          </div>
        </motion.div>

        {/* כרטיסי הכלים */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div 
              key={index}
              className="group relative bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-yellow-400 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.6), duration: 0.3 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(251, 191, 36, 0.25)",
                transition: { duration: 0.2 }
              }}
            >
              {/* קו זהב עליון */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500"></div>
              
              {/* אפקט זוהר ברקע */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-200/20 rounded-full blur-3xl group-hover:bg-yellow-300/30 transition-all duration-500"></div>
              
              <div className="relative">
                {/* כותרת */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-700 transition-colors duration-200 line-clamp-1">
                  {tool.name}
                </h2>
                
                {/* תגיות מידע */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    tool.difficulty === 'מתחילים' ? 'bg-green-100 text-green-700' :
                    tool.difficulty === 'בינוני' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {tool.difficulty === 'מתחילים' ? '✅' : tool.difficulty === 'בינוני' ? '⚡' : '🚀'} {tool.difficulty}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    tool.price.includes('חינם') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {tool.price.includes('חינם') ? '🎁' : '💳'} {tool.price}
                  </span>
                </div>
                
                {/* פרטים */}
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-600 text-sm font-bold shrink-0 mt-0.5">📁</span>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{tool.category}</p>
                  </div>
                  {tool.usage && (
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-600 text-sm font-bold shrink-0 mt-0.5">💡</span>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{tool.usage}</p>
                    </div>
                  )}
                </div>
                
                {/* כפתור CTA */}
                <a 
                  href={tool.link} 
                  className="block w-full py-3 px-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-gray-900 font-bold text-center rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group-hover:from-yellow-500 group-hover:to-amber-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="flex items-center justify-center gap-2">
                    עבור לכלי
                    <span className="group-hover:translate-x-[-4px] transition-transform duration-200">←</span>
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <motion.div 
            className="text-center text-gray-500 mt-12 p-8 sm:p-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-yellow-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">לא נמצאו כלים</p>
            <p className="text-base sm:text-lg text-gray-500">נסה לשנות את פרמטרי החיפוש או הסינון</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setDifficultyFilter('');
                setPriceFilter('');
                setCategoryFilter('');
              }}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              אפס את כל הסינונים
            </button>
          </motion.div>
        )}
      </div>

      {/* פוטר */}
      <footer className="mt-12 sm:mt-16 md:mt-20 py-8 sm:py-10 text-center border-t-2 border-yellow-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-700 mb-4 text-sm sm:text-base font-medium">
            <span className="text-yellow-600">✨</span> קרדיט: יובל אבידני <span className="text-yellow-600">✨</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
            <button className="text-yellow-600 hover:text-yellow-700 hover:underline transition-all duration-200 font-medium text-sm sm:text-base">
              תנאי שימוש
            </button>
            <span className="hidden sm:inline text-gray-300">•</span>
            <button className="text-yellow-600 hover:text-yellow-700 hover:underline transition-all duration-200 font-medium text-sm sm:text-base">
              מדיניות פרטיות
            </button>
          </div>
        </div>
      </footer>

      {/* כפתורי יצירת קשר */}
      <div className="fixed bottom-4 sm:bottom-6 left-3 sm:left-6 flex flex-col gap-3 sm:gap-4 z-50">
        <ContactButton 
          href="https://chat.whatsapp.com/HotN7h2MgFz47RYr3pNdR9?mode=ac_c"
          icon={<FaWhatsapp size={24} />}
          description="הצטרף לקבוצת הוואטסאפ השקטה"
          bgColor="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        />
        <ContactButton 
          href="https://wa.me/972529772209?text=היי%20אני%20אשמח%20לשמוע%20עוד%20על%20ההרצאות%20והסדנאות%20שלכם"
          icon={<FaWhatsapp size={24} />}
          description="שלח הודעת וואטסאפ אישית"
          bgColor="bg-gradient-to-br from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
        />
        <ContactButton 
          href="mailto:kochavith.arnon@gmail.com"
          icon={<MdEmail size={24} />}
          description="שלח אימייל"
          bgColor="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        />
        <ContactButton 
          href="tel:+972529772209"
          icon={<FaPhone size={24} />}
          description="התקשר אלינו"
          bgColor="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
        />
      </div>
    </div>
  );
};

export default AItoolsPage;
