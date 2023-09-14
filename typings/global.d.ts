export declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: string;
        REACT_APP_GRAPHQL_ENDPOINT: string;
      }
    }
  }
  