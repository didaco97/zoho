import { API_KEY, SYSTEM_PROMPT } from '../config/constants';
import { Message } from '../types/chat';

interface ApiResponse {
  content: string;
  references?: {
    title: string;
    url: string;
    snippet: string;
  }[];
  images?: {
    url: string;
    alt: string;
  }[];
}

export async function sendChatMessage(messages: Message[]): Promise<ApiResponse> {
  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          }))
        ],
        max_tokens: 4000,
        temperature: 0.7,
        functions: [
          {
            name: 'get_groundwater_data',
            description: 'Retrieve specific groundwater data for a given location or aquifer',
            parameters: {
              type: 'object',
              properties: {
                location: { type: 'string' },
                dataType: {
                  type: 'string',
                  enum: ['water_level', 'quality', 'recharge_rate']
                }
              },
              required: ['location', 'dataType']
            }
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      references: data.choices[0].message.references,
      images: data.choices[0].message.images
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}