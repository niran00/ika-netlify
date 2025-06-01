// app/api/chat/route.js

import { OpenAI } from 'openai';
import allProducts from './all-model-data';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    // Build context from all product fields
    const context = allProducts.map(p => {
      return [
        `Name: ${p.name}`,
        p.product_type ? `Type: ${p.product_type}` : '',
        p.category ? `Category: ${p.category}` : '',
        p.description ? `Description: ${p.description}` : '',
        p.technical_data ? `Technical Data: ${p.technical_data}` : '',
        p.features ? `Features: ${p.features}` : '',
        p.price ? `Price: ${p.price}` : '',
        p.image ? `Image: ${p.image}` : '',
      ].filter(Boolean).join('\n');
    }).join('\n\n');

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant suggesting lab and industrial products. Always include an image URL (labeled "Image:" or "image") if one is available for each product mentioned. Here are the available products:\n\n${context}`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    return new Response(
      JSON.stringify({ reply: response.choices[0].message.content }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('API error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
