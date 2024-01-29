import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.VUE_APP_OPENAI,
  dangerouslyAllowBrowser: true
})

export const main = async (searchTerm) => {
  const chat = await openai.chat.completions.create({
    messages: [
      {
        "role": "system",
        "content": "You will be provided with unstructured data, and your task is to parse it into list using only astronomical identifier, not casual name."
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

  console.log(chat);
}
