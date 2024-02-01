import OpenAI from "openai";

class OpenAi {
  openai: OpenAI;
  constructor() {
    this.openai = new OpenAI();
  }

  async getEmbeddings(input: string) {
    try {
      const result = await this.openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: input.replace(/\n/g, " "),
      });

      return result.data[0].embedding as number[];
    } catch (e) {
      throw new Error(`Error calling OpenAI embedding API: ${e}`);
    }
  }
}

const openai = new OpenAi();

export default openai;
