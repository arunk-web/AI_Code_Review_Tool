const Groq = require('groq-sdk');

const chat = async(req , res) => {
    try {
        const {message} = req.body;

        const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

        const completion = await groq.chat.completions.create({
            message : [
                {
                    role: 'system',
                    content: `You are an expert code assistant. You can:
- Review code and find bugs, errors, improvements
- Fix code and return corrected version  
- Explain code line by line
- Answer any programming questions

When reviewing code:
- Mention exact line number
- Explain what the bug is
- Give the fix

Be helpful, clear and concise.`
                },
                ...messages
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.3,
        });

        const reply = completion.choices[0].message.content;
        res.json({reply});
    } catch (err) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};


module.exports = {chat};