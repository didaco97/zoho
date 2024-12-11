import React from 'react';
import { Message } from '../../types/chat';
import ReactMarkdown from 'react-markdown';
import { UserCircle2, Bot, ExternalLink } from 'lucide-react';
import { LoadingIndicator } from './LoadingIndicator';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading }: ChatMessageProps) {
  return (
    <div className={`py-6 ${message.role === 'assistant' ? 'bg-gray-50' : ''}`}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            {message.role === 'user' ? (
              <UserCircle2 className="w-6 h-6 text-gray-600" />
            ) : (
              <Bot className="w-6 h-6 text-purple-600" />
            )}
          </div>
          <div className="flex-1">
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <>
                <ReactMarkdown 
                  className="prose prose-purple max-w-none"
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700" />
                    ),
                    code: ({ node, ...props }) => (
                      <code {...props} className="bg-gray-100 rounded px-1 py-0.5 text-sm" />
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
                
                {message.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.alt}
                    className="mt-4 rounded-lg max-w-md"
                  />
                ))}

                {message.references && message.references.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      References
                    </h4>
                    {message.references.map((ref, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors">
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-2"
                        >
                          {ref.title}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <p className="text-sm text-gray-600 mt-1">{ref.snippet}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}