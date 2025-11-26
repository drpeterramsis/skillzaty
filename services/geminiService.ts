import { GoogleGenAI } from "@google/genai";
import { Course } from '../types';

let genAI: GoogleGenAI | null = null;

export const initializeGemini = () => {
  // Safely check for process.env to avoid ReferenceErrors in browser environments
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : null;
  
  if (apiKey) {
    genAI = new GoogleGenAI({ apiKey });
  }
};

export const getCourseRecommendations = async (
  query: string,
  courses: Course[]
): Promise<string> => {
  if (!genAI) {
    initializeGemini();
    if (!genAI) return "Gemini API Key is missing. Please configure it to use the AI assistant.";
  }

  // Minimize context size by sending only essential fields
  const coursesContext = courses.map(c => ({
    id: c.id,
    name: c.name,
    category: c.category,
    lecturer: c.lecturer,
    topics: c.topics,
    duration: c.duration,
    description: c.description
  }));

  try {
    const ai = genAI!;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        You are SkillZaty AI, a helpful course counselor.
        Here is the database of available courses in JSON format:
        ${JSON.stringify(coursesContext)}

        User Query: "${query}"

        Instructions:
        1. Analyze the user's query and the course list.
        2. Recommend the best matching courses from the list provided.
        3. Explain why you chose them.
        4. If no course perfectly matches, suggest the closest ones or explain what is missing.
        5. Keep your response concise, friendly, and formatted in Markdown.
        6. Do not invent courses not in the list.
      `,
      config: {
        systemInstruction: "You are an expert educational consultant helping users find the perfect online course from a provided database.",
      }
    });

    return response.text || "I couldn't generate a recommendation at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while communicating with the AI service.";
  }
};