import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const generateContentStrategy = async (businessInfo: string) => {
  if (!apiKey) throw new Error("API Key not found");

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a comprehensive social media content strategy for the following business: ${businessInfo}. 
    Return the response in a structured JSON format with:
    - targetAudience (string description)
    - keyPillars (array of 3-4 strings)
    - contentIdeas (array of objects with { title, format, description, potentialReach })
    - weeklyPlan (array of 7 objects with { day, type, hook })`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          targetAudience: { type: Type.STRING },
          keyPillars: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          contentIdeas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                format: { type: Type.STRING },
                description: { type: Type.STRING },
                potentialReach: { type: Type.STRING }
              }
            }
          },
          weeklyPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                type: { type: Type.STRING },
                hook: { type: Type.STRING }
              }
            }
          }
        },
        required: ["targetAudience", "keyPillars", "contentIdeas", "weeklyPlan"]
      }
    }
  });

  return JSON.parse(response.text);
};
