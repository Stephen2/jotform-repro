/* eslint-disable no-console */
import "dotenv/config";
import * as tmp from "tmp";
import { Stream } from "stream";
import { makeJotformPdfApiClient } from "./jotformPdfApiClient";
import fs from "fs";

const formId = process.env.FORM_ID;
const submissionId = process.env.SUBMISSION_ID;

const jotformApiKey = process.env.JOTFORM_API_KEY;
const jotformBaseUrl = process.env.JOTFORM_BASE_URL;

const writeStreamToDisk = async (stream: Stream) => {
  const { name: filePath } = tmp.fileSync();
  const writableStream = fs.createWriteStream(filePath);
  stream.pipe(writableStream);
  await new Promise((resolve) => {
    writableStream.on("finish", resolve);
  });

  return filePath;
};

const testPdfDownloadUsingApiKeyAuth = async (downloadPdf: () => Promise<Stream>, testType: string) => {
  const stream = await downloadPdf();
  const filePath = await writeStreamToDisk(stream);
  const fileSize = fs.statSync(filePath).size;
  console.log("Test type: ", testType, "File:", filePath, "size: ", fileSize, "PASS: ", fileSize > 0);
};

const repro = async () => {
  const jotformPdfApiClient = makeJotformPdfApiClient({
    jotformApiKey,
    jotformBaseUrl,
  });

  await Promise.all([
    testPdfDownloadUsingApiKeyAuth(
      () => jotformPdfApiClient.downloadGenericPdf(formId, submissionId),
      "API: Generic PDF (API Key auth)"
    ),

    testPdfDownloadUsingApiKeyAuth(
      () => jotformPdfApiClient.downloadSmartPdf(formId, submissionId),
      "API: Smart PDF (API Key auth)"
    ),
  ]);
};

repro();

// GENERIC: https://gomerits2.jotform.com/API/sheets/221096868557167/generatePDF?formid=221096868557167&submissionid=5299116023911919160&reportid=10221208620054039
// SMART: https://gomerits2.jotform.com/API/sheets/221096868557167/pdf-converter/221096868557167/fill-pdf?submissionID=5299116023911919160

// Test results here:
// https://docs.google.com/spreadsheets/d/1wWfsX7xenWgcEbyRnxsMrmIk8YnjrVPECEB2XQ1LwOk/edit#gid=0
