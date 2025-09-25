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
  const ai = new GoogleGenAI({ apiKey: process.env.AIzaSyCQUbOWuXVuIYN2qWkMnMfjuHczp7GTw2E });

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
      let refusalText = "";
      if (response.candidates && response.candidates.length > 0) {
         refusalText = response.text;
      }
      throw new Error(`No images were generated. ${refusalText ? `Model response: ${refusalText}` : 'The model might have returned only text or refused the request.'}`);
    }
    
    return generatedImages;
  } catch (error) {
    console.error("Error generating scene with Gemini API:", error);

    let errorMessage = error instanceof Error ? error.message : String(error);

    try {
      // Attempt to parse the error message as JSON from the API
      const errorJson = JSON.parse(errorMessage);
      if (errorJson.error) {
        const { message, status, details } = errorJson.error;
        if (status === 'RESOURCE_EXHAUSTED') {
          const retryDetail = details?.find((d: any) => d['@type'] === 'type.googleapis.com/google.rpc.RetryInfo');
          const retryDelay = retryDetail?.retryDelay;
          errorMessage = 'API quota exceeded. Please check your plan and billing details.';
          if (retryDelay) {
            errorMessage += ` You can try again in about ${retryDelay.replace('s', ' seconds')}.`;
          }
        } else {
          errorMessage = message || 'An unknown API error occurred.';
        }
      }
    } catch (e) {
      // Not a JSON error message, the default message is fine.
    }
    
    throw new Error(`Failed to generate scene: ${errorMessage}`);
  }
};
