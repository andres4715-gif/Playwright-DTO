import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,

  // Configuración para ejecución paralela
  workers: process.env.CI ? 2 : undefined, // Undefined usará el número automático según tu CPU
  fullyParallel: true, // Ejecuta todas las pruebas en paralelo

  // Reintentos para pruebas inestables (opcional pero recomendado)
  retries: process.env.CI ? 2 : 0,

  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // Traza solo en fallas, más eficiente para pruebas paralelas
    trace: 'on-first-retry',
  },
  reporter: [['html', { open: 'never' }], ['list']],
  projects: [
    {
      name: 'API Tests',
      testMatch: /.*\.spec\.ts/,
    },
  ],
};

export default config;
