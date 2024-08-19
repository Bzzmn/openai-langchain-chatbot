import { ChatOpenAI } from 	"@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;

const llm = new ChatOpenAI({ 
    openaiApiKey, 
    temperature: 0.3,
});


// Tweet Prompt example

// const tweetTemplate = 'Generate a promotional tweet for a new product launch, from this product description: {productDescription}';

// const tweetPrompt = ChatPromptTemplate.fromTemplate(tweetTemplate)

// const tweetChain = tweetPrompt.pipe(llm);

// const response = await tweetChain.invoke({ productDescription: "inflatable house" });

// console.log(response.content);


/**
 * Challenge:
 * 1. Create a prompt to turn a user question into a standalone question.
 * 2. Create a chain with the prompt and the language model.
 * 3. Invoke the chain with a user question.
 * 4. Log the response.
 */

const questionTemplate = 'Turn a user question into a standalone question: {userQuestion}';

const questionPrompt = ChatPromptTemplate.fromTemplate(questionTemplate)

const questionChain = questionPrompt.pipe(llm);

const response = await questionChain.invoke({ userQuestion: "I want to avoid long waits and bad shopping experiences, cause I dont have time to be following my buys so is better to know the return policy at the beggining..." });

console.log(response.content);



