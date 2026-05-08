import axios from 'axios';
import { config } from 'dotenv';

config();

const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
const stream = false;

const apiKey = process.env.NVIDIA_API_KEY;

if (!apiKey) {
  console.error("Error: NVIDIA_API_KEY environment variable not set");
  console.error("Please add your API key to .env file");
  process.exit(1);
}

const headers = {
  "Authorization": `Bearer ${apiKey}`,
  "Accept": stream ? "text/event-stream" : "application/json"
};

// Get user message from command line or use default
const userMessage = process.argv[2] || "Hello! What can you help me with?";

const payload = {
  "model": "meta/llama-4-maverick-17b-128e-instruct",
  "messages": [{"role":"user","content": userMessage}],
  "max_tokens": 512,
  "temperature": 1.00,
  "top_p": 1.00,
  "frequency_penalty": 0.00,
  "presence_penalty": 0.00,
  "stream": stream
};

console.log(`📤 Sending request to NVIDIA NIM API...`);
console.log(`📝 Message: "${userMessage}"`);
console.log();

Promise.resolve(
  axios.post(invokeUrl, payload, {
    headers: headers,
    responseType: stream ? 'stream' : 'json'
  })
)
  .then(response => {
    if (stream) {
      response.data.on('data', (chunk) => {
        console.log(chunk.toString());
      });
    } else {
      const result = response.data;
      console.log("✅ Response from Llama-4-Maverick:");
      console.log("-".repeat(50));
      console.log(result.choices[0].message.content);
      console.log("-".repeat(50));
      console.log(`\n📊 Tokens used: ${result.usage.total_tokens}`);
    }
  })
  .catch(error => {
    if (error.response) {
      console.error("❌ API Error:");
      console.error(`Status: ${error.response.status}`);
      console.error(`Message: ${error.response.data?.error?.message || error.response.statusText}`);
    } else if (error.request) {
      console.error("❌ No response from API. Check your internet connection.");
    } else {
      console.error("❌ Error:", error.message);
    }
    process.exit(1);
  });
