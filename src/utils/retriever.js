import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv";

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const embeddings = new OpenAIEmbeddings({ openaiApiKey });
const supabase = createClient(process.env.SB_API_URL, process.env.SB_API_KEY);

const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: "documents",
    queryName: "match_documents",
});

const retriever = vectorStore.asRetriever(); /// you can assign a number of documents to retrieve as an argument to the asRetriever method.

export { retriever };
