import OpenAI from "openai";

class OpenAi {
  public openai: OpenAI;
  public constructor() {
    this.openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true,
    });
  }

  public async getEmbeddings(input: string) {
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
