import { EnvironmentConfig } from "./environment.model";

export const environment: EnvironmentConfig = {
    production: false,
    apiUrl: '/api/v1',

    useMock: true,
    mockDelay: 3000,
};