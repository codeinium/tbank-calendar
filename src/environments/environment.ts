import { EnvironmentConfig } from "./environment.model";

export const environment: EnvironmentConfig = {
    production: true,
    apiUrl: '/api/v1',

    useMock: false,
    mockDelay: 0,
};