import { Stream } from "stream";
import axios from "axios";

type Params = {
  readonly jotformApiKey: string;
  readonly jotformBaseUrl: string;
};

export function makeJotformPdfApiClient({ jotformApiKey, jotformBaseUrl }: Params) {
  const httpClient = axios.create({
    baseURL: jotformBaseUrl,
  });

  const downloadGenericPdf = async (jotformFormId: string, submissionId: string) => {
    const params = {
      apiKey: jotformApiKey,
      download: "1",
      formid: jotformFormId,
      submissionid: submissionId,
    };
    const urlToUse = `API/generatePDF?${new URLSearchParams(params).toString()}`;

    const response = await httpClient.get<Stream>(urlToUse, { responseType: "stream" });

    return response.data;
  };

  const downloadSmartPdf = async (jotformFormId: string, submissionID: string) => {
    const params = {
      apikey: jotformApiKey,
      download: "1",
      submissionID,
    };
    const urlToUse = `API/pdf-converter/${jotformFormId}/fill-pdf?${new URLSearchParams(params).toString()}`;

    const response = await httpClient.get<Stream>(urlToUse, { responseType: "stream" });

    return response.data;
  };

  return {
    downloadGenericPdf,
    downloadSmartPdf,
  };
}

export type JotformPdfApiClient = ReturnType<typeof makeJotformPdfApiClient>;
