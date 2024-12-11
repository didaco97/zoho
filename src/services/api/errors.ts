export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public type?: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(response: Response, data?: any): ApiError {
    const message = data?.error?.message || `API request failed with status ${response.status}`;
    return new ApiError(
      message,
      response.status,
      data?.error?.type,
      data?.error?.code
    );
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network request failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class FunctionCallError extends Error {
  constructor(
    message: string,
    public functionName: string
  ) {
    super(message);
    this.name = 'FunctionCallError';
  }
}