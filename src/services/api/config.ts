import { API_KEY } from '../../config/constants';

export const API_CONFIG = {
  baseUrl: 'https://api.perplexity.ai',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
} as const;

export const API_ENDPOINTS = {
  chat: '/chat/completions',
} as const;