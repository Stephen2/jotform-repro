/* eslint-disable no-console */
import "dotenv/config";
import { makeJotformPdfApiClient } from "./jotformPdfApiClient";

const formId = process.env.FORM_ID;
const submissionId = process.env.SUBMISSION_ID;

const jotformApiKey = process.env.JOTFORM_API_KEY;
const jotformBaseUrl = process.env.JOTFORM_BASE_URL;

const jotformPdfApiClient = makeJotformPdfApiClient({
  jotformApiKey,
  jotformBaseUrl,
});

console.log(formId, submissionId, jotformPdfApiClient);
