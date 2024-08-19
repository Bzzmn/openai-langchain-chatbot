import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { retriever } from "./utils/retriever.js";
import { pageContentCombinator } from "./utils/filecombiner.js";

import dotenv from "dotenv";

dotenv.config();

// document.addEventListener('submit', (e) => {
//     e.preventDefault()
//     progressConversation()
// });

const openaiApiKey = process.env.OPENAI_API_KEY;

const llm = new ChatOpenAI({ 
    openaiApiKey, 
    temperature: 0.3,
});

const standloneQuestionTemplate = 'Turn a user question into a standalone question: {userQuestion}';

const standaloneQuestionPrompt = ChatPromptTemplate.fromTemplate(standloneQuestionTemplate)

/**
 * Challenge:
 * 1. Create a template and a prompt to get an answer to the users original question.
 * Remenber to include the original question in the prompt and the text chunks we got bacj from the retriever as input variables.
 * Call there input variables 'question' and 'context'
 * 
 * We want this chatbot to :
 * -be friendly 
 * -only answer from the context we got from the retriever and never make up information.
 * -apoligize if it can't find the answer and in that case advise the user to email help@chatbot.com
 */

const answerTemplate = `You are a helpful and enthusiastic support agent. You are here to help the user with their question based in the provided context. Try to find the answer in the context. If you can't find the answer, apologize and please advise the questioner to email help@chatbot.com. Always speak as you are a friend and never make up information.
question: {userQuestion}
context: {context}
answer:
`;
const answerPrompt = ChatPromptTemplate.fromTemplate(answerTemplate);

// In order to make this work we need to convert the response from the retriever into a string, so we use the pageContentCombinator to do that.

const chain = standaloneQuestionPrompt.pipe(llm).pipe(new StringOutputParser()).pipe(retriever).pipe(pageContentCombinator)

const response = await chain.invoke({ userQuestion: "cuales son las categorias de impuestos?"});

console.log(response);
S