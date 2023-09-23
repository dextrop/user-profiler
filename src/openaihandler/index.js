import OpenAI from "openai";

const PROMPT = "Take the input from user as their previous contribution in the last company and create 3 bullet points of what has been said in a succinct manner and using resume friendly language"

function ProfileUser(userInput, callback) {
    console.log(process.env.REACT_APP_OPENAI_API_KEY);
    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });
        
    openai.chat.completions.create({
        messages: [
            { role: "system", content: PROMPT },
            { role: "user", content: userInput },
        ],
        model: "gpt-3.5-turbo",
    }).then(
        (response) => {
            callback(response)
        }
    );
}

export default ProfileUser;