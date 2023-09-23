# User Profiler

The application user profiler is a prototype project.

## About the application.

The application ask user to recite thier work experince and then response back with 3 bullet points of what has been said in a succinct manner and using resume friendly language. 

## Usage

- Clone project
- Create .env file and add your OpenAI api key in it

```
REACT_APP_OPENAI_API_KEY=your-api-key
```

- Install dependencies using `npm i`
- Run application using `npm start`


## How it works.

The application uses browser based [WebAudio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and [SpeechRecognition] (https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) to collect data from user. This data is then passed the information to [OpenAI ChatGPT model](https://js.langchain.com/docs/modules/model_io/models/llms/integrations/openai) to get 3 bullet points of what has been said in a succinct manner and using resume friendly language. 


## Cons

- [WebAudio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) stuck in between sometimes which require application reloading. ( Can be improved )
- Very basic prompt is used to create the response from OpenAIModel

**prompt used**

```Take the input from user as their previous contribution in the last company and create 3 bullet points of what has been said in a succinct manner and using resume friendly language```