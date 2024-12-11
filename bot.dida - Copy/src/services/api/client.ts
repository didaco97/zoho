import { API_CONFIG } from './config';
import { ApiError, NetworkError } from './errors';
import type { ApiRequestConfig, ApiErrorResponse, ApiSuccessResponse } from './types';

async function handleResponse(response: Response): Promise<ApiSuccessResponse> {
  try {
    const data = await response.json();
    
    if (!response.ok) {
      throw ApiError.fromResponse(response, data as ApiErrorResponse);
    }
    
    return data as ApiSuccessResponse;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new NetworkError('Failed to parse API response');
  }
}

export async function apiRequest<T = ApiSuccessResponse>(
  endpoint: string,
  config: ApiRequestConfig
): Promise<T> {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify(config),
    });

    return handleResponse(response) as Promise<T>;
  } catch (error) {
    if (error instanceof ApiError || error instanceof NetworkError) {
      throw error;
    }
    throw new NetworkError(
      error instanceof Error ? error.message : 'Failed to make API request'
    );
  }
}