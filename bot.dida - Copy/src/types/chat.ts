export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  references?: Reference[];
  images?: Image[];
  timestamp: number;
}

export interface Reference {
  title: string;
  url: string;
  snippet: string;
}

export interface Image {
  url: string;
  alt: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}