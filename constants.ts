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
  apiKeyMissingShort: { en: 'API Key not configured', ar: 'مفتاح API غير مهيأ' },
  uploadCharacterTooltip: { en: 'Please upload at least one character image to continue.', ar: 'يرجى تحميل صورة شخصية واحدة على الأقل للمتابعة.' },
  describeSceneTooltip: { en: 'Please describe the scene to continue.', ar: 'يرجى وصف المشهد للمتابعة.' },
  
  apiKeySetupIncompleteTitle: { en: 'Deployment Setup Incomplete', ar: 'إعداد النشر غير مكتمل' },
  apiKeySetupP1: { en: 'Your application code is working, but it cannot connect to the Google AI servers.', ar: 'تطبيقك يعمل بشكل صحيح، لكنه غير قادر على الاتصال بخوادم Google AI.' },
  apiKeySetupP2: { en: "The problem is in your GitHub deployment settings. Your workflow file must be updated to securely provide the API_KEY secret to the application during the build process.", ar: "المشكلة تكمن في إعدادات النشر على GitHub. يجب تحديث ملف سير العمل الخاص بك لتوفير مفتاح API السري بشكل آمن للتطبيق أثناء عملية البناء." },
  apiKeySetupActionTitle: { en: 'The Final Step: Replace Your Workflow File', ar: 'الخطوة النهائية: استبدل ملف سير العمل الخاص بك' },
  apiKeySetupActionStep1: { en: '1. On the GitHub website, navigate to the file in your project located at `.github/workflows/deploy.yml` (the name might be slightly different, like `main.yml`).', ar: '١. على موقع GitHub، اذهب إلى الملف الموجود في مشروعك في المسار `.github/workflows/deploy.yml` (قد يكون الاسم مختلفًا قليلاً، مثل `main.yml`).' },
  apiKeySetupActionStep2: { en: '2. Click the "Edit" button, then delete all the existing content in that file.', ar: '٢. اضغط على زر "تعديل"، ثم احذف كل المحتوى الموجود في ذلك الملف.' },
  apiKeySetupActionStep3: { en: '3. Copy the entire code block below and paste it into the empty file, then save your changes ("Commit changes").', ar: '٣. انسخ الكود بالكامل أدناه والصقه في الملف الفارغ، ثم احفظ التغييرات ("Commit changes").' },
  apiKeySetupActionNote: { en: "This updated workflow correctly passes the API_KEY secret to the build process. This will trigger a new deployment. Once it finishes, your app will be correctly configured.", ar: "يقوم سير العمل المحدث هذا بتمرير سر API_KEY بشكل صحيح إلى عملية البناء. سيؤدي هذا إلى بدء عملية نشر جديدة. بمجرد انتهائها، سيتم تكوين تطبيقك بشكل صحيح." },
};