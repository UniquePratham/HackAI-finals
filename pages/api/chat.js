// pages/api/chat.js
// Lightweight rule-based support assistant. Swap `reply()` for a model call
// (OpenAI, Groq, etc.) by reading the key from process.env.

const RULES = [
  { match: /refund|money back|return/i, reply: "Refunds are processed within 5-7 business days once the return is approved. Share your order ID and I'll check the status." },
  { match: /order|track|delivery|shipping/i, reply: "You can track any order from the Orders page. If the status has not moved in 48 hours, I can raise a courier enquiry for you." },
  { match: /cancel/i, reply: "Orders can be cancelled free of charge until they are packed. After that, please use the return flow once it arrives." },
  { match: /password|login|sign in|account/i, reply: "Use the 'Forgot password' link on the sign-in page. If the reset email does not arrive, check spam and then contact support." },
  { match: /payment|card|upi|failed/i, reply: "Failed payments are usually reversed by your bank within 24 hours. If the amount was debited twice, send me the transaction reference." },
  { match: /hours|contact|human|agent/i, reply: "A human agent is available 9am-9pm IST, seven days a week. I can hand this conversation over at any point." },
  { match: /hi|hello|hey/i, reply: "Hello! I can help with orders, refunds, payments and account issues. What do you need?" },
  { match: /thanks|thank you/i, reply: "Happy to help. Anything else I can look into?" },
];

function reply(text) {
  for (const rule of RULES) {
    if (rule.match.test(text)) return rule.reply;
  }
  return "I don't have a specific answer for that yet. Could you rephrase, or ask about orders, refunds, payments or your account?";
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const last = [...messages].reverse().find((m) => m.role === "user");
  if (!last) {
    return res.status(400).json({ error: "no user message found" });
  }

  return res.status(200).json({ reply: reply(last.content) });
}