export interface EnvironmentConfig {
  production: boolean;
  apiUrl: string;

  useMock: boolean;
  mockDelay: number;
}