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
      content: `
You are a helpful product assistant that recommends laboratory and industrial products.

You must respond ONLY using the products in the list provided.

When mentioning products, ALWAYS include:
- The **product name** in bold
- A brief description
- A line with **"Price: $XXXX"**
- A **Markdown image** in this format: ![Product Name](image-url)

Example of correct formatting:

1. **IKA Plate (RCT digital)**  
A magnetic stirrer with a round top made of aluminum alloy.  
Price: $4500  
![IKA Plate (RCT digital)](https://example.com/image1.webp)

2. **DBI (recirculation)**  
A high shear mixing machine for batch operations.  
Price: $7600  
![DBI (recirculation)](https://example.com/image2.webp)

Only include products relevant to the user's message. Do not make up product names. If none apply, respond politely with "No matching products found.".
      
Here are the available products:

${context}
      `.trim(),
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
