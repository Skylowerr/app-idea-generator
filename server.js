import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config(); //.env dosyasını okuyup değişkenleri process.env'e yükler

const __filename = fileURLToPath(import.meta.url); // Bu dosyanın tam yolu
const __dirname = path.dirname(__filename);  //__dirname → Bu dosyanın bulunduğu klasörün yolu


const app = express();

//PORT 
const PORT = process.env.PORT || 3000 //env'de tanımlıysa onu kullanır, yoksa 3000'i kullanır

//Authenticate with OpenAI
const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
})

//Pass incoming data
app.use(express.json())

// Static frontend (vibrant UI in /public)
app.use(express.static(path.join(__dirname, "public")))

//Routes

//Route : Generate app idea
app.post('/generate', async(req,res)=>{
    try {
        //Extract the custom prompt from the request body
        const {customPrompt} = req.body //! Kullanıcının gönderdiği customPrompt'u body'den çeker
        //Validations -> (Boşsa veya sadece boşluk girildiyse hata dönder)
        if(!customPrompt || !customPrompt.trim()){
            //return 400
            return res.status(400).json({
                success : false,
                error: 'Please provide a prompt'
            })
        }
        //Build the complete prompt by adding structure instructions
        const prompt = `${customPrompt}
        Please provide a comprehensive app idea with the following detail
        1. App Name
        2. One-line Description
        3. Target Audience
        4. Core Features (list 3-5 key features)
        5. Unique Value Proposition
        6. Monetization Strategy
        7. Technology Stack Suggestions

        Format the response in a clear, structured way.
        `

        //Call OpenAI API to generate the app idea[It is written on it's website]
        const response = await openai.chat.completions.create({
            model : 'gpt-4o-mini',
            messages : [
                {
                    role: 'system',
                    content : 'You are creative product manager who generates innovative, practical and unique app ideas.'
                },
                {
                    role: 'user',
                    content : prompt
                }
            ],
            temperature: 0.9, //Doğruluk oranı gibi
            max_completion_tokens : 1000

        })
        //OpenAI'dan gelen cevabı alıp kullanıcıya JSON olarak gönderir.
        const idea = response.choices[0].message.content; 
        res.json({
            success : true,
            idea // Actual Response
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            error: error.message
        })
    }
})

//start the server
app.listen(PORT,()=>{
    console.log(`App idea generator is running at http://localhost:${PORT}`);
    
})