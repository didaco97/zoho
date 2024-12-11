import { Message } from '../../types/chat';
import { ApiResponse } from '../../types/api';
import { API_ENDPOINTS } from './config';
import { API_FUNCTIONS } from './functions';
import { SYSTEM_PROMPT, MAX_TOKENS, TEMPERATURE } from '../../config/constants';
import { apiRequest } from './client';
import type { ChatMessages } from './types';

function formatMessages(messages: Message[]): ChatMessages {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }))
  ];
}

export async function sendChatMessage(messages: Message[]): Promise<ApiResponse> {
  return apiRequest(API_ENDPOINTS.chat, {
    model: 'llama-3.1-sonar-small-128k-online',
    messages: formatMessages(messages),
    max_tokens: MAX_TOKENS,
    temperature: TEMPERATURE,
    functions: API_FUNCTIONS,
  });
}