import { Message } from '../../types/chat';

export interface ApiRequestConfig {
  model: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  max_tokens: number;
  temperature: number;
  functions?: Array<{
    name: string;
    description: string;
    parameters: Record<string, any>;
  }>;
}

export interface ApiErrorResponse {
  error: {
    message: string;
    type?: string;
    code?: string;
  };
}

export interface ApiSuccessResponse {
  choices: Array<{
    message: {
      content: string;
      references?: Array<{
        title: string;
        url: string;
        snippet: string;
      }>;
      images?: Array<{
        url: string;
        alt: string;
      }>;
      function_call?: {
        name: string;
        arguments: string;
      };
    };
  }>;
}

export type ChatMessages = Array<Pick<Message, 'role' | 'content'>>;