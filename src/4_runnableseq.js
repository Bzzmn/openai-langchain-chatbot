import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import dotenv from "dotenv";

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const llm = new ChatOpenAI({ openaiApiKey, temperature: 0.3 });

const punctuationTemplate = `Given a sentence, add punctuation where needed, just puntuation, no grammar corrections:
sentence: {sentence}
sentence with punctuation:`;

const punctuationPrompt = ChatPromptTemplate.fromTemplate(punctuationTemplate);

const grammarTemplate = `Given a sentence, correct the grammar:
sentence: {punctuated_sentence}
corrected sentence:`;

const grammarPrompt = ChatPromptTemplate.fromTemplate(grammarTemplate);

const translationTemplate = `Translate a sentence from english to {language} language:
sentence: {gramatically_corrected_sentence}
translated sentence:`;

const translationPrompt = ChatPromptTemplate.fromTemplate(translationTemplate);

// This is the first way to create a chain, effective but not that elegant
// const chain = RunnableSequence.from([
//     punctuationPrompt, 
//     llm,
//     new StringOutputParser(),
//     {punctuated_sentence: prevResult => prevResult}, // This is the effective but not that elegant part
//     grammarPrompt,
//     llm,
//     new StringOutputParser(),
// ]);


/**
 * This is the second way to create a chain, more elegant, here we factorize the common parts of the chain. The parts could be a sequence of pipes or a runnable sequence.
 * We also need to use the RunnablePassthrough to pass the original input variable "language" to the next step of the chain.
 *  */ 

const punctuationChain = RunnableSequence.from([
    punctuationPrompt, 
    llm,
    new StringOutputParser(),
]);

const grammarChain = RunnableSequence.from([
    grammarPrompt,
    llm,
    new StringOutputParser(),
]);

const translationChain = RunnableSequence.from([
    translationPrompt,
    llm,
    new StringOutputParser(),
]);

const chain = RunnableSequence.from([
    {
        punctuated_sentence: punctuationChain,
        original_input: new RunnablePassthrough()
    }, 
    {
        gramatically_corrected_sentence: grammarChain,
        language: ({original_input }) => original_input.language
    },
    translationChain,
])

const response = await chain.invoke({
    sentence: "i dont liked mondais but i like sundais", 
    language: "french"
});

console.log(response);
