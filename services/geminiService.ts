import { GoogleGenAI, Modality } from "@google/genai";
import { UploadedFile } from '../types';

const fileToGenerativePart = (file: UploadedFile) => {
  return {
    inlineData: {
      data: file.base64,
      mimeType: file.mimeType,
    },
  };
};

export const generateScene = async (prompt: string, images: UploadedFile[], apiKey: string): Promise<string[]> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please provide your API key to generate scenes.");
  }
  const ai = new GoogleGenAI({ apiKey });

  try {
    const imageParts = images.map(fileToGenerativePart);
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [...imageParts, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const generatedImages: string[] = [];
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          const imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
          generatedImages.push(imageUrl);
        }
      }
    }
    
    if (generatedImages.length === 0) {
      throw new Error("No images were generated. The model might have returned only text.");
    }
    
    return generatedImages;
  } catch (error) {
    console.error("Error generating scene with Gemini API:", error);
    throw new Error(`Failed to generate scene: ${error instanceof Error ? error.message : String(error)}`);
  }
};