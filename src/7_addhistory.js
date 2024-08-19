import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { convHistory } from "./index.js";
import { formatConvHistory } from './utils/formatConvHistory.js';


import dotenv from "dotenv";

import { retriever } from "./utils/retriever.js";
import { pageContentCombinator } from "./utils/filecombiner.js";

dotenv.config();


const openaiApiKey = process.env.OPENAI_API_KEY;
const llm = new ChatOpenAI({ openaiApiKey, temperature: 0.1 });

const standloneQuestionTemplate = 'Turn a user question into a standalone question: {question}';
const standaloneQuestionPrompt = ChatPromptTemplate.fromTemplate(standloneQuestionTemplate)
const standaloneQuestionChain = standaloneQuestionPrompt.pipe(llm).pipe(new StringOutputParser())

const retrieverChain = RunnableSequence.from([
    prevResult => prevResult.standalone_question, 
    retriever,
    pageContentCombinator,
])

const answerTemplate = `You are a helpful and enthusiastic support agent. You are here to help the user with their question based in the provided context. Try to find the answer in the context. If you can't find the answer, briefly apologize and please advise the questioner to email help@chatbot.com. Always speak as you are a friend and never make up information outside the context provided.
question: {original_question}
context: {context}
answer:
`;
const answerPrompt = ChatPromptTemplate.fromTemplate(answerTemplate);
const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser())

/**
 * Challenge:
 * 1. Pass convHistory into the chain as conv_history at the point where we invoke it. 
 * Remember to make use of our formatConvHistory function to format the conversation history.
 * 2. Update the standaloneQuestionTemplate to make use of the conversation history.
 * 3. Make sure the answerChain has access to the conversation history and edit answerTemplate to include the conversation history.
 * 4. Test by giving the chatbot some information and checking in the next question to see if it uses the information.
 */

const chain = RunnableSequence.from([
    {
        standalone_question: standaloneQuestionChain,
        original_input: new RunnablePassthrough(),
    },
    {
        context: retrieverChain,
        original_question: ({original_input}) => original_input.question ,
    },
    answerChain,
])

const response = await chain.invoke({ question: "cuales son las categorias de impuestos?"});

console.log(response);


