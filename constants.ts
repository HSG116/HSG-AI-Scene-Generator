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

export const IMAGE_COUNT_OPTIONS: Option[] = [
  { value: '1', label: { en: '1', ar: '١' } },
  { value: '2', label: { en: '2', ar: '٢' } },
  { value: '3', label: { en: '3', ar: '٣' } },
];

export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  headerTitle: { en: 'HSG AI Scene Generator', ar: 'HSG AI مولد المشاهد' },
  headerSubtitle: { en: 'Bring Your Cinematic Vision to Life', ar: 'أطلق العنان لرؤيتك السينمائية' },
  uploadCharacters: { en: '1. Upload Character(s)', ar: '١. تحميل الشخصية (الشخصيات)' },
  characterName: { en: 'Character Name', ar: 'اسم الشخصية' },
  sceneDescription: { en: '2. Describe the Scene', ar: '٢. صف المشهد' },
  sceneDescriptionPlaceholder: { en: 'e.g., A detective looking at clues in a rainy alley at night.', ar: 'مثال: محقق ينظر إلى الأدلة في زقاق ممطر ليلاً.' },
  uploadLocation: { en: '3. Upload Location (Optional)', ar: '٣. تحميل الموقع (اختياري)' },
  locationName: { en: 'Location Name', ar: 'اسم الموقع' },
  uploadStyle: { en: '4. Upload Style Reference (Optional)', ar: '٤. تحميل مرجع النمط (اختياري)' },
  styleName: { en: 'Style Name', ar: 'اسم النمط' },
  selectCamera: { en: '5. Select Camera Angle', ar: '٥. اختر زاوية الكاميرا' },
  selectLighting: { en: '6. Select Lighting Style', ar: '٦. اختر نمط الإضاءة' },
  selectLens: { en: '7. Select Lens / Perspective', ar: '٧. اختر العدسة / المنظور' },
  imageCount: { en: '8. Number of Images', ar: '٨. عدد الصور' },
  combinedPrompt: { en: '9. Your Combined Prompt (Editable)', ar: '٩. مطالبتك المجمعة (قابلة للتعديل)' },
  generateScene: { en: 'Generate Scene', ar: 'إنشاء المشهد' },
  generating: { en: 'Generating...', ar: 'جاري الإنشاء...' },
  results: { en: 'Results', ar: 'النتائج' },
  yourVisionAwaits: { en: 'Your cinematic vision awaits...', ar: 'رؤيتك السينمائية تنتظر...' },
  errorOccurred: { en: 'An error occurred', ar: 'حدث خطأ' },
  delete: { en: 'Delete', ar: 'حذف' },
  selectFiles: { en: 'Select File(s)', ar: 'اختر ملف / ملفات' },
  selectFile: { en: 'Select File', ar: 'اختر ملف' },
  apiKeyLabel: { en: 'Your API Key', ar: 'مفتاح API الخاص بك' },
  apiKeyPlaceholder: { en: 'Your API key', ar: 'مفتاح API الخاص بك' },
  apiKeyMissingShort: { en: 'API Key is not configured.', ar: 'مفتاح API غير مكون.' },
  uploadCharacterTooltip: { en: 'Please upload at least one character image to continue.', ar: 'يرجى تحميل صورة شخصية واحدة على الأقل للمتابعة.' },
  describeSceneTooltip: { en: 'Please describe the scene to continue.', ar: 'يرجى وصف المشهد للمتابعة.' },
  apiKeySetupIncompleteTitle: { en: 'API Key Setup Incomplete', ar: 'إعداد مفتاح API غير مكتمل' },
  apiKeySetupP1: { en: 'This application requires a Google Gemini API key to function. It seems the API key has not been configured in the environment variables.', ar: 'يتطلب هذا التطبيق مفتاح Google Gemini API ليعمل. يبدو أن مفتاح API لم يتم تكوينه في متغيرات البيئة.' },
  apiKeySetupP2: { en: 'Please follow the instructions below to set up your API key.', ar: 'يرجى اتباع التعليمات أدناه لإعداد مفتاح API الخاص بك.' },
  apiKeySetupActionTitle: { en: 'How to set up your API_KEY', ar: 'كيفية إعداد API_KEY الخاص بك' },
  apiKeySetupActionStep1: { en: 'Go to <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:underline">Google AI Studio</a> and click <strong>"Get API key"</strong>.', ar: 'انتقل إلى <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:underline">Google AI Studio</a> وانقر على <strong>"الحصول على مفتاح API"</strong>.' },
  apiKeySetupActionStep2: { en: 'In your development environment, create a <code>.env</code> file in the root directory if it doesn\'t exist.', ar: 'في بيئة التطوير الخاصة بك، قم بإنشاء ملف <code>.env</code> في الدليل الجذر إذا لم يكن موجودًا.' },
  apiKeySetupActionStep3: { en: 'Add the following line to your .env file, replacing "YOUR_API_KEY" with the key you obtained:', ar: 'أضف السطر التالي إلى ملف .env الخاص بك، واستبدل "YOUR_API_KEY" بالمفتاح الذي حصلت عليه:' },
  envVarName: { en: 'Variable Name', ar: 'اسم المتغير' },
  envVarValue: { en: 'Value', ar: 'القيمة' },
  envVarValuePlaceholder: { en: 'YOUR_API_KEY', ar: 'مفتاح_API_الخاص_بك' },
  apiKeySetupActionStep4: { en: 'Restart your development server for the changes to take effect.', ar: 'أعد تشغيل خادم التطوير الخاص بك حتى تدخل التغييرات حيز التنفيذ.' },
  apiKeySetupActionNote: { en: 'Note: Never commit your .env file or expose your API key in public repositories.', ar: 'ملاحظة: لا تقم أبدًا بتثبيت ملف .env الخاص بك أو كشف مفتاح API الخاص بك في المستودعات العامة.' },
};