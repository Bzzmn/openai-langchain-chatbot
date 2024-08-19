import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";

import dotenv from "dotenv";

import { retriever } from "./utils/retriever.js";
import { pageContentCombinator } from "./utils/filecombiner.js";

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const llm = new ChatOpenAI({ openaiApiKey, temperature: 0.3 });

const standloneQuestionTemplate = `Given some conversation history (if any) and a question, convert the question into a standalone 
conversation history: {history}
question: {question}
standalone question:
`;
const standaloneQuestionPrompt = ChatPromptTemplate.fromTemplate(standloneQuestionTemplate)
const standaloneQuestionChain = standaloneQuestionPrompt.pipe(llm).pipe(new StringOutputParser())

const retrieverChain = RunnableSequence.from([
    prevResult => prevResult.standalone_question, 
    retriever,
    pageContentCombinator,
])

const answerTemplate = `You are a helpful, friendly and enthusiastic support agent who can answer a given user question based on the context provided and the conversation history. Try to find the answer in the context. If the answer is not given in the context, find the answer in the conversation history if possible. If you really don't know the answer, say: "I'm sorry, I don't know the answer to that." and direct the questioner to email lala@chatbot.com. Always speak as if you were a friend and never try to make up an answer that is not either in the context or the conversation history.
question: {user_question}
context: {context}
conversation history: {history}
answer:
`;
const answerPrompt = ChatPromptTemplate.fromTemplate(answerTemplate);
const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser())


const chain = RunnableSequence.from([
    {
        standalone_question: standaloneQuestionChain,
        original_input: new RunnablePassthrough(),
    },
    {
        context: retrieverChain,
        user_question: ({original_input}) => original_input.question ,
        history: ({original_input}) => original_input.history ,
    },
    answerChain,
])

export async function chatAgent({ question, history }) {
    try {
        const response = await chain.invoke({ question, history });
        return response;
    } catch (error) {
        console.error("error al obtener respuesta", error);
        throw error;
    }
}




/**
 * IMPROVING PERFORMANCE
 * 
 * 1. Chunk size
 * 2. Overlapping size
 * 3. Number of chunks retrieved
 * 4. Promp engineering
 * 5. Open AI settings
 * 
 */



