import { GoogleGenAI } from '@google/genai';

let aiClient = null;

function getAiClient() {
    if (aiClient) return aiClient;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.warn('⚠️ GEMINI_API_KEY is not set. AI Service will use local heuristic fallback.');
        return null;
    }

    try {
        aiClient = new GoogleGenAI({
            apiKey,
            httpOptions: {
                headers: {
                    'User-Agent': 'aistudio-build'
                }
            }
        });

        return aiClient;
    } catch (err) {
        console.error('❌ Failed to initialize GoogleGenAI client:', err.message);
        return null;
    }
}

// Local rules-based fallback for issue triage if AI is not available
function heuristicTriage(assetContext, complaint) {
    const text = (complaint || '').toLowerCase();
    let priority = 'low';
    let category = assetContext.category || 'General';
    let title = `Reported: ${complaint.slice(0, 40)}${complaint.length > 40 ? '...' : ''}`;


    if (text.includes('smoke') || text.includes('fire') || text.includes('hazard') || text.includes('shock') || text.includes('explode')) {
        priority = 'critical';
    } else if (text.includes('leak') || text.includes('broken') || text.includes('not working') || text.includes('fail') || text.includes('stop')) {
        priority = 'high';
    } else if (text.includes('noise') || text.includes('slow') || text.includes('heat') || text.includes('vibrate')) {
        priority = 'medium';
    }


    const possibleCauses = [
        `Mechanical wear or thermal stress in ${category}`,
        "External power supply, connectivity, or fluid line blockage",
        "Component failure due to age or lack of routine service"
    ];


    const initialChecks = [
        "Safely shut off the main power/inlet valve for the asset",
        "Visually inspect outer housing for physical damage or temperature spikes",
        "Verify supply connections, pressure levels, and control panel status"
    ];


    return {
        title,
        category,
        priority,
        possibleCauses,
        initialChecks,
        recurringPatternWarning: "Heuristic classification active: Please review all parameters before submitting."
    };
}


export async function aiTriage(assetContext, complaint) {
    const client = getAiClient();

    if (!client) {
        return heuristicTriage(assetContext, complaint);
    }

    
    const prompt = `
You are the primary AI triage agent for MaintainIQ, an AI-Powered QR Maintenance & Asset History Platform.
Your task is to analyze an asset's context and a free-text complaint from a user, and return a clean, structured JSON analysis.

Asset Context:
- Name: ${assetContext.name}
- Category: ${assetContext.category}
- Location: ${assetContext.location}
- Condition: ${assetContext.condition}
- Recent History: ${JSON.stringify(assetContext.recentHistory || [])}

Reporter Complaint:
"${complaint}"

Guidelines:
1. Classify the problem and suggest a concise, professional title.
2. Determine the category of issue.
3. Determine the priority: low, medium, high, or critical. Set "critical" if there is an active safety hazard, fire/water risk, electrical hazard, or complete system failure of critical equipment.
4. List 2-4 possible causes.
5. List 3-5 initial troubleshooting/inspections checks.
6. Crucial Safety Rule: Never generate unsafe electrical, mechanical, fire, gas, or medical instructions. Keep checks safe and non-invasive. Always recommend a qualified technician for high-risk or critical tasks.
7. Note any possible recurring patterns based on recent history (e.g., if there was a similar issue recently, mention it, else set null).

Response Format:
Return ONLY a valid JSON object matching this exact structure:
{
  "title": "string",
  "category": "string",
  "priority": "low" | "medium" | "high" | "critical",
  "possibleCauses": ["string"],
  "initialChecks": ["string"],
  "recurringPatternWarning": "string" | null
}

Do not include any markdown fences like \`\`\`json or \`\`\` around the response. Return raw JSON.
`;

    try {
        // Generate content using the correct model gemini-3.5-flash
        const response = await client.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });

        const textResult = response.text || '';
        // Safely parse JSON, removing any potential markdown tags that LLM might include
        const cleanText = textResult.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const result = JSON.parse(cleanText);

        // Validate structure of parsed output
        return {
            title: result.title || `Issue: ${assetContext.name}`,
            category: result.category || assetContext.category || 'General',
            priority: ['low', 'medium', 'high', 'critical'].includes(result.priority) ? result.priority : 'medium',
            possibleCauses: Array.isArray(result.possibleCauses) ? result.possibleCauses : ['Component failure'],
            initialChecks: Array.isArray(result.initialChecks) ? result.initialChecks : ['Perform visual inspection'],
            recurringPatternWarning: result.recurringPatternWarning || null
        };
    } catch (err) {
        console.error('❌ AI Triage Service Error:', err.message);
        // Fallback to rules-based classification on error
        return heuristicTriage(assetContext, complaint);
    }
}
