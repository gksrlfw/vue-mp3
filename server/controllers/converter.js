const { Converter } = require('../apis/Converter');
const Metadata = require('../apis/Metadata');
const Scrapper = require('../apis/Scrapper');
const SongService = require('../services/SongService');
const db = require('../config/db');

exports.convertNaver = async (req, res) => {
  try {
    const { title, artist, album, lyrics, imageUrl, genre, videoUrl } = req.body;
    const converter = new Converter(videoUrl, title, new Metadata(title, artist, album, lyrics, imageUrl, genre));
    await converter.convertMp3Naver();
    const audioPath = converter.getAudioFile();
    res.json({ audioPath: audioPath });
  }
  catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}

exports.convertYoutube = async (req, res) => {
  try {
    console.log('youtube!');
    const { title, artist, album, lyrics, imageUrl, genre, videoUrl } = req.body;
    if(!title || !artist) res.send({ message: 'title or artist' });
    const song = new SongService(db);
    const converter = new Converter(videoUrl, title, artist, new Metadata(title, artist, album, lyrics, imageUrl, genre, videoUrl), song);
    
    // TODO: Syncro!!!! Do not send req, res
    converter.convertMp3Youtube(req, res);      
  }
  catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}

exports.scrap = async (req, res) => {
  try {
    console.log('scrap!');
    const { title, artist } = req.body;
    const scrapper = new Scrapper(title, artist);
    const result = await scrapper.scrapGoogle();
    if(!result.url.length) {
      console.log(result, result.url.length);
      res.sendStatus(500);
    }
    else res.send(result);
  }
  catch(err) {
    console.log(err);
    res.senStatus(500);
  }
}
