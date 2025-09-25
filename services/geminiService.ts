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

export const generateScene = async (prompt: string, images: UploadedFile[]): Promise<string[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is not configured. Please set the API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

    let finalErrorMessage = `Failed to generate scene: ${error instanceof Error ? error.message : String(error)}`;

    if (error instanceof Error && error.message) {
      try {
        const errorJson = JSON.parse(error.message);
        if (errorJson.error) {
          const { message, status, details } = errorJson.error;
          if (status === 'RESOURCE_EXHAUSTED') {
            const retryDetail = details?.find((d: any) => d['@type'] === 'type.googleapis.com/google.rpc.RetryInfo');
            const retryDelay = retryDetail?.retryDelay;
            finalErrorMessage = 'API quota exceeded. Please check your plan and billing details.';
            if (retryDelay) {
              finalErrorMessage += ` You can try again in about ${retryDelay.replace('s', ' seconds')}.`;
            }
          } else {
            finalErrorMessage = message || 'An unknown API error occurred.';
          }
        }
      } catch (e) {
        // It wasn't a JSON error message, so the default message is fine.
      }
    }
    
    throw new Error(finalErrorMessage);
  }
};