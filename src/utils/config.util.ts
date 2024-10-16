import * as dotenv from 'dotenv';

// Load .env file if it exists (for local development)
dotenv.config();

export class ConfigService {
  private static instance: ConfigService;

  private constructor() {}

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  public getBoolean(key: string): boolean {
    return this.get(key).toLowerCase() === 'true';
  }

  public getDatabaseUrl(): string {
    return this.get('DATABASE_URL');
  }

  public getApiKey(): string {
    return this.get('API_KEY');
  }

  // Add the getPort method
  public getPort(): number {
    return this.getNumber('PORT') || 3000; // Default to 3000 if PORT is not set
  }

  // Add more getters as needed
}

export const configService = ConfigService.getInstance();
