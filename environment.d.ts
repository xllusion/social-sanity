declare namespace NodeJS {
  interface ProcessEnv {
    SANITY_PROJECT_ID: string;
    NODE_ENV: 'development' | 'production';
  }
}
