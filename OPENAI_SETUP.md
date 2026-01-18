# OpenAI API Setup

This project uses OpenAI's API directly via HTTP fetch for the AI chat widget. Follow these steps to configure it:

## 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **"Create new secret key"**
5. Copy the API key (starts with `sk-...`)

## 2. Add API Key to Environment Variables

In v0:
1. Click on **"Vars"** in the left sidebar
2. Add a new environment variable:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** Your API key (e.g., `sk-proj-...`)

## 3. Rate Limiting

The chat API includes built-in rate limiting to prevent abuse:
- **Limit:** 20 requests per hour per IP address
- **Purpose:** Prevents excessive API costs from abuse
- **Behavior:** Users exceeding the limit will see a message to call directly

### Adjusting Rate Limits

To modify the rate limit, edit `app/api/chat/route.ts`:

\`\`\`typescript
const MAX_REQUESTS_PER_HOUR = 20 // Change this number
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
\`\`\`

## 4. Cost Estimation

Using GPT-4o-mini:
- **Cost:** ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **Average chat:** ~500 tokens total = ~$0.0004 per conversation
- **20 chats/hour:** ~$0.008/hour = ~$0.19/day = ~$5.70/month

With rate limiting at 20 requests/hour, your maximum monthly cost is approximately **$6-10**.

## 5. Monitoring Usage

Monitor your OpenAI usage at:
- [OpenAI Usage Dashboard](https://platform.openai.com/usage)

Set up billing alerts to avoid surprises:
1. Go to **Settings** → **Billing**
2. Set a **monthly budget limit**
3. Enable **email notifications**

## 6. Testing

After adding the API key:
1. Open your website
2. Click the chat bubble
3. Send a test message
4. The AI should respond naturally

If you see errors, check:
- API key is correct in environment variables
- You have credits in your OpenAI account
- Rate limits haven't been exceeded

## Security Notes

- Never commit API keys to version control
- Keep your API key secure
- Rotate keys periodically
- Monitor usage regularly
- The API key is only used server-side (in API routes), never exposed to the client
