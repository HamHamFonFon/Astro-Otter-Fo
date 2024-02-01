import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.VUE_APP_OPENAI,
  dangerouslyAllowBrowser: true
})

export const main = async (searchTerm) => {
  const completions = await openai.chat.completions.create({
    // max_tokens: 100,
    // n: 2,
    messages: [
      {
        "role": "system",
        "content": "You will be provided with unstructured data, and your task is to parse it into list using only astronomical identifier, not casual name. If you don't know the answer, just say that you don't know, don't try to make up an answer"
      },
      {
        role: 'user',
        content: searchTerm
      }
    ],
    model: 'gpt-3.5-turbo'
  })
    .catch((err) => {
      throw err;
    });

  return completions.choices[0]?.message?.content;
}
