import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Helper to check if API key is present (for UI feedback only, logic handles it gracefully)
export const hasApiKey = (): boolean => !!apiKey;

export const analyzeGas = async (gasLevel: number, clickPower: number): Promise<{ flavor: string; rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'; score: number }> => {
  if (!apiKey) {
    return {
      flavor: "API 키가 없어 냄새를 맡을 수 없습니다. (데모 모드)",
      rarity: "Common",
      score: 10
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      당신은 방구(방귀) 소믈리에입니다. 
      현재 유저는 방귀 게임을 하고 있습니다.
      
      현재 상태:
      - 가스 축적량: ${gasLevel}
      - 방귀 파워(Click Power): ${clickPower}
      
      이 방귀에 대한 짧고 웃긴 평가를 한국어로 작성해주세요.
      냄새, 소리, 주변 사람들의 반응을 상상해서 1문장으로 묘사하세요.
      약간 더럽지만 귀엽고 유머러스하게 작성하세요.
      
      또한, 이 방귀의 희귀도(Common, Rare, Epic, Legendary)와 점수(1-100)를 평가해주세요.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            flavor: { type: Type.STRING },
            rarity: { type: Type.STRING, enum: ["Common", "Rare", "Epic", "Legendary"] },
            score: { type: Type.INTEGER }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Analysis failed:", error);
    return {
      flavor: "AI가 코를 막고 도망갔습니다. (분석 실패)",
      rarity: "Common",
      score: 0
    };
  }
};