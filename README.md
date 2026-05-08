# NVIDIA Llama AI Chat

Simple Node.js client for NVIDIA's cloud-hosted Llama-4-Maverick LLM.

## Setup

### 1. Get API Key
Visit https://build.nvidia.com and get your free API key.

### 2. Configure
Add your API key to `.env`:
```
NVIDIA_API_KEY=your_key_here
```

### 3. Install Dependencies
```bash
npm install
```

## Usage

```bash
# Start with default message
npm start

# Send a custom message
node chat.js "Your question here"

# Examples
node chat.js "What is 9.11 vs 9.8?"
node chat.js "Write a haiku about AI"
node chat.js "Explain quantum computing"
```

## Features

- Uses Llama-4-Maverick-17B (state-of-the-art)
- Free API tier available
- No local GPU required
- No Docker needed
- Lightning fast cloud inference

## Files

- `chat.js` - Main chat client
- `package.json` - Node dependencies
- `.env` - Your API key

## Resources

- [NVIDIA Build](https://build.nvidia.com)
- [API Docs](https://docs.nvidia.com/build/nvidia-api/)
- [Llama Models](https://llama.meta.com/)
