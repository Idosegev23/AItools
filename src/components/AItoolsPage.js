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
        className={`${bgColor} p-3.5 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md`}
        style={{ width: '52px', height: '52px', borderRadius: '12px 12px 0 12px' }}
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
          className="absolute left-16 top-1/2 -translate-y-1/2 bg-white border-2 border-[#D4AF37] text-gray-700 px-4 py-2.5 shadow-lg whitespace-nowrap z-50"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{borderRadius: '8px 8px 0 8px'}}
        >
          <div className="text-xs font-light tracking-wide">{description}</div>
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
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8" dir="rtl">

      <header className="relative text-center mb-10 sm:mb-12 z-10 px-4 py-8 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img 
            src="https://res.cloudinary.com/dsoh3yteb/image/upload/v1742806446/Logo2025_xbrzm3.png"
            alt="KA Logo"
            className="h-20 sm:h-24 md:h-32 mx-auto mb-6"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-3 tracking-wide">
            כלי <span className="font-normal" style={{color: '#D4AF37'}}>AI</span> מובילים
          </h1>
          <p className="text-base sm:text-lg text-gray-500 mb-4 max-w-2xl mx-auto font-light tracking-wide">
            מדריך מקצועי לכלים המובילים בתחום הבינה המלאכותית
          </p>
          <div className="w-10 h-[1px] mx-auto mb-3" style={{background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)'}}></div>
          <p className="text-xs text-gray-400 tracking-wider">
            עדכון אחרון · 14.1.26
          </p>
        </motion.div>
      </header>

      <div className="container mx-auto relative z-10 max-w-6xl px-4 sm:px-6 py-6 border border-[#D4AF37]/20" style={{borderRadius: '24px 24px 0 24px'}}>
        {/* חיפוש וסינון */}
        <motion.div 
          className="mb-8 sm:mb-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex flex-col gap-3">
            {/* שורה ראשונה - חיפוש */}
            <div className="w-full">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="חיפוש..." 
                  className="w-full p-3 sm:p-3.5 pr-4 border-b border-gray-200 focus:outline-none focus:border-[#D4AF37] transition-all duration-300 text-sm bg-transparent placeholder-gray-300 font-light tracking-wide"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{borderRadius: 0}}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#D4AF37] transition-colors text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            
            {/* שורה שנייה - סינונים */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select 
                className="p-3 border-b border-gray-200 focus:outline-none focus:border-[#D4AF37] transition-all duration-300 text-xs bg-transparent cursor-pointer font-light tracking-wide text-gray-600"
                value={difficultyFilter}
                onChange={e => setDifficultyFilter(e.target.value)}
                style={{borderRadius: 0}}
              >
                <option value="">רמת קושי</option>
                <option value="מתחילים">מתחילים</option>
                <option value="בינוני">בינוני</option>
                <option value="מתקדמים">מתקדמים</option>
              </select>
              <select 
                className="p-3 border-b border-gray-200 focus:outline-none focus:border-[#D4AF37] transition-all duration-300 text-xs bg-transparent cursor-pointer font-light tracking-wide text-gray-600"
                value={priceFilter}
                onChange={e => setPriceFilter(e.target.value)}
                style={{borderRadius: 0}}
              >
                <option value="">מחיר</option>
                <option value="חינם">חינם</option>
                <option value="בתשלום">בתשלום</option>
              </select>
              <select 
                className="p-3 border-b border-gray-200 focus:outline-none focus:border-[#D4AF37] transition-all duration-300 text-xs bg-transparent cursor-pointer font-light tracking-wide text-gray-600"
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                style={{borderRadius: 0}}
              >
                <option value="">קטגוריה</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* תוצאות */}
            <div className="text-center text-xs text-gray-400 pt-2 tracking-wider">
              {filteredTools.length} כלים
            </div>
          </div>
        </motion.div>

        {/* כרטיסי הכלים */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {filteredTools.map((tool, index) => (
            <motion.div 
              key={index}
              className="group relative bg-white p-5 sm:p-6 border border-gray-200 hover:border-[#D4AF37] transition-all duration-400 hover:shadow-[0_8px_24px_rgb(212,175,55,0.12)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.4), duration: 0.4, ease: "easeOut" }}
              style={{borderRadius: '16px 16px 0 16px'}}
            >
              {/* קו זהב עליון - מופיע בהובר */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-right" style={{borderRadius: '16px 16px 0 0'}}></div>
              
              <div className="relative">
                {/* כותרת */}
                <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-3 tracking-wide">
                  {tool.name}
                </h2>
                
                {/* תגיות מידע */}
                <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b border-gray-100">
                  <span className="text-xs font-light text-gray-500 tracking-wide">
                    {tool.difficulty}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs font-light text-gray-500 tracking-wide">
                    {tool.price}
                  </span>
                </div>
                
                {/* פרטים */}
                <div className="space-y-3 mb-5">
                  <div>
                    <p className="text-xs font-light text-gray-400 mb-1 tracking-wider uppercase">קטגוריה</p>
                    <p className="text-xs text-gray-600 leading-relaxed font-light">{tool.category}</p>
                  </div>
                  {tool.usage && (
                    <div>
                      <p className="text-xs font-light text-gray-400 mb-1 tracking-wider uppercase">תיאור</p>
                      <p className="text-xs text-gray-600 leading-relaxed font-light line-clamp-3">{tool.usage}</p>
                    </div>
                  )}
                </div>
                
                {/* כפתור CTA */}
                <a 
                  href={tool.link} 
                  className="inline-block px-6 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-light text-xs tracking-wider uppercase transition-all duration-300"
                  target="_blank"
                  rel="noreferrer"
                  style={{borderRadius: '8px 8px 0 8px'}}
                >
                  כניסה
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <motion.div 
            className="text-center mt-12 p-10 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{borderRadius: '16px 16px 0 16px'}}
          >
            <div className="w-10 h-[1px] mx-auto mb-4" style={{background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)'}}></div>
            <p className="text-base font-light text-gray-600 mb-2 tracking-wide">לא נמצאו תוצאות</p>
            <p className="text-sm text-gray-400 mb-6 font-light">נסה לשנות את פרמטרי החיפוש</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setDifficultyFilter('');
                setPriceFilter('');
                setCategoryFilter('');
              }}
              className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-light text-xs tracking-wider uppercase transition-all duration-300"
              style={{borderRadius: '8px 8px 0 8px'}}
            >
              נקה סינונים
            </button>
          </motion.div>
        )}
      </div>

      {/* פוטר */}
      <footer className="mt-16 sm:mt-20 py-8 text-center border-t border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="w-10 h-[1px] mx-auto mb-6" style={{background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)'}}></div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-4">
            <button className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 text-xs font-light tracking-wider">
              תנאי שימוש
            </button>
            <span className="hidden sm:inline text-gray-300">·</span>
            <button className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 text-xs font-light tracking-wider">
              מדיניות פרטיות
            </button>
          </div>
          
          <p className="text-xs text-gray-400 tracking-wide">
            © 2026 כל הזכויות שמורות
          </p>
        </div>
      </footer>

      {/* כפתורי יצירת קשר */}
      <div className="fixed bottom-6 sm:bottom-8 left-6 sm:left-8 flex flex-col gap-4 z-50">
        <ContactButton 
          href="https://chat.whatsapp.com/HotN7h2MgFz47RYr3pNdR9?mode=ac_c"
          icon={<FaWhatsapp size={18} />}
          description="הצטרף לקבוצת הוואטסאפ השקטה"
          bgColor="bg-white hover:bg-[#D4AF37] border border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-white"
        />
        <ContactButton 
          href="https://wa.me/972529772209?text=היי%20אני%20אשמח%20לשמוע%20עוד%20על%20ההרצאות%20והסדנאות%20שלכם"
          icon={<FaWhatsapp size={18} />}
          description="שלח הודעת וואטסאפ אישית"
          bgColor="bg-white hover:bg-[#D4AF37] border border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-white"
        />
        <ContactButton 
          href="mailto:kochavith.arnon@gmail.com"
          icon={<MdEmail size={18} />}
          description="שלח אימייל"
          bgColor="bg-white hover:bg-[#D4AF37] border border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-white"
        />
        <ContactButton 
          href="tel:+972529772209"
          icon={<FaPhone size={18} />}
          description="התקשר אלינו"
          bgColor="bg-white hover:bg-[#D4AF37] border border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-white"
        />
      </div>
    </div>
  );
};

export default AItoolsPage;
