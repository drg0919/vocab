const axios = require('axios');
const wordModel = require('../models/wordModel');
const catchError = require('../utils/catchError');

exports.newWord = catchError(async (req,res,next) => {
    let {word} = req.body;
    word = word.toLowerCase();
    const exist = await wordModel.findOne({word: word},{"_id": 1});
    if(exist) {
        return res.status(401).json({
            success: false,
            message: "Word already exists"
        });
    }
    const resp = await axios.get(`https://od-api.oxforddictionaries.com:443/api/v2/entries/en-gb/${word}`, {
        headers: {
            'app_id': `${process.env.API_APP_ID}`,
            'app_key': `${process.env.API_APP_KEY}`
        }
    });
    let lexicalEntries = [];
    resp.data.results.map(el => el.lexicalEntries.map(ele => lexicalEntries.push(ele)));
    const entries = lexicalEntries.map((el,ind) => ({entries:el.entries,index: ind}));
    const definitions = entries.map(el => {
        const x = el.entries.map(ele => { 
            if(ele.senses&&ele.senses[0].definitions)
            return {
                category: lexicalEntries[el.index].lexicalCategory.text,
                meaning: ele.senses[0].definitions[0],
                examples: ele.senses[0].examples?ele.senses[0].examples.map(el => el.text):null
            }}
        );
        return x[0];
    }).filter(el => el!==undefined);
    const newWord = await wordModel.create({
        word,
        etymologies: entries[0].entries[0].etymologies&&(entries[0].entries[0].etymologies.length>0)?entries[0].entries[0].etymologies:null,
        definitions
    });
    res.status(200).json({
        success: true,
        word: newWord
    });
});

exports.getWords = catchError(async (req,res,next) => {
    const words = await wordModel.find();
    res.status(200).json({
        success: true,
        words
    });
});