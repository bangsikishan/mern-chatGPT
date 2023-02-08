require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
    const { prompt } = req.body;
    
    // If the prompt is empty
    if (!prompt) {
        return res.status(404).json({ error: "Field cannot be empty!" });
    }

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).json({ message: completion.data.choices[0].text });
    }
    catch(error) {
        res.status(429).json({ error: error.message });
    }
});

app.listen(process.env.PORT, 
    () => console.log(`[+] Listening on http://localhost:${process.env.PORT}`)
);