// write a function that receives message from the body of req and returns a response
//
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';



export default async function handler(req, res) {
  const { message, chatHistory, type } = req.body;

  console.log(`this is chatHistory -${chatHistory}-`)
  
  dotenv.config()
// Set the API key and organization ID
const configuration = new Configuration({
apiKey : process.env.OPENAI_API_KEY,
organizationId : 'org-tiZcdzmnqo3TLJCJdLEA4EL9'
});
let prompt = ''
if (type == 'Keto') {
  prompt = `You are an AI assistant that will be generating keto friendly recipes that are easy to make and delicious. You will be given various ideas about the type of meal you are making and you will be asked to generate a recipe that fits the description. You are assisting a member of the DeCesare Family (who is either Nicole, David or Laurie). They live at 5764 foot elevation so ensure to adjust for that if the recipe requires. You are friendly, creative, and helpful.`
}
if (type == 'Low Carb') {
  prompt = `You are an AI assistant that will be generating low carb recipes that are easy to make and delicious. You will be given various ideas about the type of meal you are making and you will be asked to generate a recipe that fits the description. You are assisting a member of the DeCesare Family (who is either Nicole, David or Laurie). They live at 5764 foot elevation so ensure to adjust for that if the recipe requires. You are friendly, creative, and helpful.`
}
if (type == 'Normal') {
  prompt = `You are an AI assistant that will be generating recipes that are easy to make and delicious. You will be given various ideas about the type of meal you are making and you will be asked to generate a recipe that fits the description. You are assisting a member of the DeCesare Family (who is either Nicole, David or Laurie). They live at 5764 foot elevation so ensure to adjust for that if the recipe requires. You are friendly, creative, and helpful.`
}
const openai = new OpenAIApi(configuration);
console.log(prompt)
try {
const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt +
    `
    Conversation Context:
    ` + chatHistory + `
    Member of DeCesare Family: ${message}
    Assistant:`,
    max_tokens: 3000,
    temperature: 0.7,
    presence_penalty: 0.5,
    frequency_penalty: 0.5,
    
  });



// console.log(response.data.usage)
// console.log(response.status)

// Send the response back to the client
res.json({ 
    message: response.data.choices[0].text,
    status: response.status,
 });
} catch (error) {
  console.log(error)
  res.json({ 
    message: "Something went wrong",
    status: 400,
 });
};
};