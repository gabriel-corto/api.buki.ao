import type { Config } from 'jest';

const config: Config = {
  projects: [
    {
      displayName: 'unit',
      preset: 'ts-jest',
      testEnvironment: 'node',
      rootDir: '.',
      testMatch: ['<rootDir>/test/**/*.spec.ts'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
        '^@modules/(.*)$': '<rootDir>/src/modules/$1',
      },
      transform: {
        '^.+\\.ts$': [
          'ts-jest',
          {
            tsconfig: 'tsconfig.json',
          },
        ],
      },
    },
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.module.ts',
    '!src/main.ts',
    '!src/**/*.dto.ts',
    '!src/**/*.enum.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};

export default config;
