export class MessageError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "MessageError";
  }
}

export class NetworkError extends MessageError {
  constructor(message: string = "Network error") {
    super(message, 0, "NETWORK_ERROR");
    this.name = "NetworkError";
  }
}

export class AuthenticationError extends MessageError {
  constructor(message: string = "Authentication error") {
    super(message, 401, "AUTH_ERROR");
    this.name = "AuthenticationError";
  }
}

export class ServerError extends MessageError {
  constructor(message: string = "Server error") {
    super(message, 500, "SERVER_ERROR");
    this.name = "ServerError";
  }
}

export const handleApiError = (
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorData: any
): MessageError => {
  const status = response.status;
  const message = errorData?.message || `HTTP ${status}`;
  const code = errorData?.code || `HTTP_${status}`;

  switch (status) {
    case 401:
    case 403:
      return new AuthenticationError(message);
    case 404:
      return new MessageError("Resource not found", status, "NOT_FOUND");
    case 429:
      return new MessageError("Too many requests", status, "RATE_LIMIT");
    case 500:
    case 502:
    case 503:
    case 504:
      return new ServerError(message);
    default:
      return new MessageError(message, status, code);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleNetworkError = (error: any): MessageError => {
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return new NetworkError("Network error. Check your internet connection.");
  }

  if (error.name === "AbortError") {
    return new NetworkError("Request cancelled");
  }

  if (error.code === "ECONNREFUSED") {
    return new NetworkError("Server not available");
  }

  return new NetworkError("Unexpected network error");
};
