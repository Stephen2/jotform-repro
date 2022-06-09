declare namespace NodeJS {
  // eslint-disable-next-line
  export interface ProcessEnv {
    readonly FORM_ID: string;
    readonly SUBMISSION_ID: string;
    readonly JOTFORM_API_KEY: string;
    readonly JOTFORM_BASE_URL: string;
  }
}
