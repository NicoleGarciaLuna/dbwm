export class FetchError extends Error {
  constructor(message: string, public details: any) {
    super(message);
    this.name = "FetchError";
  }
}

export const logger = {
  error: (message: string, details?: any) => {
    console.error(`[ERROR] ${message}`, details);
  },
  info: (message: string, details?: any) => {
    console.info(`[INFO] ${message}`, details);
  },
};
