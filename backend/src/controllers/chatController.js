const Groq = require('groq-sdk');
const Chat = require('../models/Chat');

const chat = async (req, res) => {
    try{
        const {messages, chatId} = req.body;

        const groq = new Groq({apiKey: process.env.GROQ_API_KEY});   //groq initialisation


        //get reply through AI
        const completion =await groq.chat.completions.create({
            messages: [
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
        })

        const reply = completion.choices[0].message.content;

        const title = messages[0]?.content?.slice(0,40) || 'New Chat';

        let savedChat;

        if(chatId) {
            savedChat = await Chat.findByIdAndUpdate(
            chatId,
            {messages : [...messages, {role: 'assistant', content : reply}]},
            {new: true}
        );
        } else {
            savedChat = await Chat.create({
                user: req.user._id,
                title,
                messages: [...messages, {role: 'assistant' , content: reply }]
            })
        }
        res.json({reply , chatId: savedChat._id});

    } catch (err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}


const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('-messages');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getChatById = async (req, res) => {
    try{
        const chat = await Chat.findById(req.params.id);

        if(!chat){
            return res.status(404).json({message: 'Chat not found'});
        }
        res.json(chat);
    } catch (err){
        res.status(500).json({message : err.message });
    }
};


const deleteChat = async (req,res) => {
    try{
        const chat = await Chat.findById(req.params.id)

        if(chat.user.toString() !== req.user._id.toString()){
            return res.status(401).json({message: 'Not authorized'});
        }
        await Chat.findByIdAndDelete(req.params.id);
        res.json({message: 'Chat deleted'})

    } catch(err){
        res.status(500).json({message: err.message});
    }
}





module.exports = {chat , getChats , getChatById, deleteChat} ; 
