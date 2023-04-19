import { NextRequest } from "next/server";

const OPENAI_URL = "api.openai.com";
const DEFAULT_PROTOCOL = "https";
const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;

export async function requestOpenai(req: NextRequest) {

  let apiKey: string="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";
  const tryCount = parseInt(process.env.TRY_COUNT || '0'); 
  if (tryCount >= 3){apiKey = "sk-"+req.headers.get("token");}
else
  {apiKey = "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";process.env.TRY_COUNT = (tryCount + 1).toString();}
  
  
  const apiKey = req.headers.get("token");
  const openaiPath = req.headers.get("path");

  console.log("[Proxy] ", openaiPath);

  return fetch(`${PROTOCOL}://${BASE_URL}/${openaiPath}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: req.method,
    body: req.body,
  });
}
