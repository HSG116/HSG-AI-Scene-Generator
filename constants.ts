import { Language, Option } from './types';

export const CAMERA_ANGLES: Option[] = [
  { value: 'eye-level', label: { en: 'Eye Level', ar: 'مستوى العين' } },
  { value: 'high-angle', label: { en: 'High Angle', ar: 'زاوية مرتفعة' } },
  { value: 'low-angle', label: { en: 'Low Angle', ar: 'زاوية منخفضة' } },
  { value: 'overhead-shot', label: { en: 'Overhead Shot', ar: 'لقطة علوية' } },
  { value: 'dutch-tilt', label: { en: 'Dutch Tilt', ar: 'ميل هولندي' } },
  { value: 'close-up', label: { en: 'Close-up', ar: 'لقطة مقربة' } },
  { value: 'medium-shot', label: { en: 'Medium Shot', ar: 'لقطة متوسطة' } },
  { value: 'wide-shot', label: { en: 'Wide Shot', ar: 'لقطة واسعة' } },
];

export const LIGHTING_STYLES: Option[] = [
  { value: 'natural-daylight', label: { en: 'Natural Daylight', ar: 'ضوء النهار الطبيعي' } },
  { value: 'golden-hour', label: { en: 'Golden Hour', ar: 'الساعة الذهبية' } },
  { value: 'neon-night', label: { en: 'Neon Night', ar: 'ليلة نيون' } },
  { value: 'moody-low-key', label: { en: 'Moody Low-key', ar: 'إضاءة منخفضة مزاجية' } },
  { value: 'high-key-bright', label: { en: 'High-key Bright', ar: 'إضاءة عالية ساطعة' } },
  { value: 'backlit', label: { en: 'Backlit', ar: 'إضاءة خلفية' } },
  { value: 'candlelit', label: { en: 'Candlelit', ar: 'ضوء الشموع' } },
];

export const LENS_PERSPECTIVES: Option[] = [
  { value: '35mm', label: { en: '35mm', ar: '35 مم' } },
  { value: '50mm', label: { en: '50mm', ar: '50 مم' } },
  { value: '85mm', label: { en: '85mm', ar: '85 مم' } },
  { value: 'wide-angle', label: { en: 'Wide-angle', ar: 'زاوية واسعة' } },
  { value: 'telephoto', label: { en: 'Telephoto', ar: 'عدسة مقربة' } },
  { value: 'shallow-depth-of-field', label: { en: 'Shallow Depth of Field', ar: 'عمق ميدان ضحل' } },
  { value: 'deep-focus', label: { en: 'Deep Focus', ar: 'تركيز عميق' } },
];

export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  headerTitle: { en: 'HSG AI Scene Generator', ar: 'HSG AI مولد المشاهد' },
  headerSubtitle: { en: 'Bring Your Cinematic Vision to Life', ar: 'أطلق العنان لرؤيتك السينمائية' },
  uploadCharacters: { en: 'Upload Character(s)', ar: 'تحميل الشخصية (الشخصيات)' },
  characterName: { en: 'Character Name', ar: 'اسم الشخصية' },
  sceneDescription: { en: 'Describe the Scene', ar: 'صف المشهد' },
  sceneDescriptionPlaceholder: { en: 'e.g., A detective looking at clues in a rainy alley at night.', ar: 'مثال: محقق ينظر إلى الأدلة في زقاق ممطر ليلاً.' },
  uploadRefImages: { en: 'Upload Reference Images (Optional)', ar: 'تحميل صور مرجعية (اختياري)' },
  uploadLocation: { en: 'Location Image', ar: 'صورة الموقع' },
  locationName: { en: 'Location Name', ar: 'اسم الموقع' },
  uploadStyle: { en: 'Style Reference', ar: 'مرجع النمط' },
  styleName: { en: 'Style Name', ar: 'اسم النمط' },
  technicalDetails: { en: 'Set Technical Details', ar: 'تحديد التفاصيل الفنية' },
  selectCamera: { en: 'Camera Angle', ar: 'زاوية الكاميرا' },
  selectLighting: { en: 'Lighting Style', ar: 'نمط الإضاءة' },
  selectLens: { en: 'Lens / Perspective', ar: 'العدسة / المنظور' },
  combinedPrompt: { en: 'Final Generated Prompt', ar: 'المطالبة النهائية المولدة' },
  generateScene: { en: 'Generate Scene', ar: 'إنشاء المشهد' },
  generating: { en: 'Generating...', ar: 'جاري الإنشاء...' },
  results: { en: 'Results', ar: 'النتائج' },
  yourVisionAwaits: { en: 'Your cinematic vision awaits...', ar: 'رؤيتك السينمائية تنتظر...' },
  errorOccurred: { en: 'An error occurred', ar: 'حدث خطأ' },
  delete: { en: 'Delete', ar: 'حذف' },
  selectFiles: { en: 'Select File(s)', ar: 'اختر ملف / ملفات' },
  selectFile: { en: 'Select File', ar: 'اختر ملف' },
  uploadCharacterTooltip: { en: 'Please upload at least one character image to continue.', ar: 'يرجى تحميل صورة شخصية واحدة على الأقل للمتابعة.' },
  describeSceneTooltip: { en: 'Please describe the scene to continue.', ar: 'يرجى وصف المشهد للمتابعة.' },
  apiKeyMissingTooltip: { en: 'API Key is not configured. Generation is disabled.', ar: 'مفتاح API غير مُكوَّن. تم تعطيل الإنشاء.' },
};