const Groq = require('groq-sdk');
const Chat = require('../models/Chat');
const User = require('../models/User');

const chat = async (req, res) => {
    try{
        const {messages, chatId} = req.body;
//         1. req.user._id se User fetch karo MongoDB se
// 2. Check karo — kya 4 ghante ho gaye lastResetTime se?
//    Haan → messageCount = 0 reset karo, lastResetTime update karo
// 3. Check karo — messageCount >= 50?
//    Haan → error do "Limit reached"
//    Nahi → aage jao
// 4. AI reply aane ke baad — messageCount++ karo, save karo

        const user = await User.findById(req.user._id);
        const FOUR_HOURS = 4 * 60 * 60 * 1000;   //IN MS
        const now = Date.now();

        if(now - new Date(user.lastResetTime).getTime() > FOUR_HOURS) {
            user.messageCount = 0;
            user.lastResetTime = now;
            await user.save();
        }

        //if 50 msg limit reached
        if(user.messageCount >= 50) {
            const timeLeft = FOUR_HOURS - (now - new Date(user.lastResetTime).getTime());
            const hoursLeft = Math.ceil(timeLeft / (1000 * 60 * 60));
            return res.status(429).json({
                message : `Message limit reached. Try again in ${hoursLeft} hours.`
            })
        }

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

        //after getting reply from AI just increase the msgcount 
        user.messageCount += 1;
        await user.save();

        const title = messages[0]?.content?.slice(0,40) || 'New Chat';

        let savedChat;

        if(chatId) {
            savedChat = await Chat.findByIdAndUpdate(
            chatId,    //wo id usi user ki honi chahiye wrna dusre user ki chat update ho jayegi
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
