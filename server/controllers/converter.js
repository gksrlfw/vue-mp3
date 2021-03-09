const { Converter } = require('../apis/Converter');
const Metadata = require('../apis/Metadata');
const Scrapper = require('../apis/Scrapper');
const songServiceInstance = require('../services/SongService');

exports.convertNaver = async (req, res, next) => {
  try {
    const { title, artist, album, lyrics, imageUrl, genre, videoUrl } = req.body;
    const converter = new Converter(videoUrl, title, new Metadata(title, artist, album, lyrics, imageUrl, genre));
    await converter.convertMp3Naver();
    const audioPath = converter.getAudioFile();
    res.json({ audioPath: audioPath });
  }
  catch(err) {
    next(err);
  }
}

exports.convertYoutube = async (req, res, next) => {
  try {
    console.log('youtube!');
    const { title, artist, album, lyrics, imageUrl, genre, videoUrl } = req.body;
    console.log(title, artist, videoUrl);
    if(!title) res.send({ message: 'Fill out title' });
    const converter = new Converter(videoUrl, title, artist, new Metadata(title, artist, album, lyrics, imageUrl, genre, videoUrl), songServiceInstance);
    
    // TODO: Syncro!!!! Do not send req, res
    converter.convertMp3Youtube(req, res);
  }
  catch(err) {
    next(err);
  }
}

exports.scrap = async (req, res, next) => {
  try {
    console.log('scrap!');
    const { videoUrl, title, artist } = req.body;
    if(videoUrl) {
      const data = await songServiceInstance.searchSongByUrl(videoUrl);
      if(data?.TITLE) {
        return res.send(data);
      }
    }
    // if(title && artist) {
    //   const scrapper = new Scrapper(title, artist);
    //   const data = await scrapper.scrapGoogle();
    //   if(data?.V_URL?.length) return res.send(data);
    // }
    res.send({ message: `Can't not find any data. Check typo` });
  }
  catch(err) {
    next(err);
  }
}
