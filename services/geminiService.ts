import { GoogleGenAI } from "@google/genai";
import { ElementData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getElementExplanation = async (element: ElementData): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Explain the element ${element.name} (Symbol: ${element.symbol}, Atomic Number: ${element.atomicNumber}) to a high school student. 
    Focus on its electron configuration and why it behaves the way it does chemically based on its valence electrons. 
    Keep it under 3 sentences. Use emojis to make it fun.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Could not generate explanation.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, our AI tutor is taking a nap. Try again later!";
  }
};

export const getFunFact = async (element: ElementData): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Tell me one mind-blowing, weird, or funny fact about the element ${element.name}. Keep it very short.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Could not generate fact.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Fact machine broken!";
  }
};

export const chatWithTutor = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  try {
     const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are Bohr-Bot, a friendly and enthusiastic chemistry tutor for high school students. You love talking about atoms, electrons, and the periodic table. Keep answers concise, encouraging, and easy to understand. Avoid jargon where possible, or explain it simply.",
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm not sure how to answer that.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to the quantum realm right now.";
  }
}
