const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const readline = require('readline');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const path = require('path');

global.processing = '';

class Converter {
  #url; #title; #artist; #metadata; #audioFile; #videoFile; #song; #count=0;
  constructor(url, title, artist, metadata, song) {
    this.#url = url;
    this.#title = title;
    this.#artist = artist
    this.#audioFile = path.join(__dirname, '..', `/media/audios/${this.#title}.mp3`);
    this.#videoFile = path.join(__dirname, '..', `/media/videos/${this.#title}.mp3`);
    this.#metadata = metadata;
    this.#song = song;
  }

  // 네이버 영상 크롤링
  // video는 attributes를 안보여주나?? img는 되는데 video는 안뎀...
  // presentation에서 이미지를 이용해서 비디오를 렌더하고 있다는데?? 뭔말이지??
  naverVideo() {
    axios.get('https://tv.naver.com/v/1376695')
    .then(res => {
      const html = res.data;
      const $ = cheerio.load(html);

      const text = $("#player > div > div.rmc_dummy_container > img").attr('src');
      console.log(text);
    });
  }
        
  async naverVideo2() {
    try {
      const browser = await puppeteer.launch({ headless: false, args: ['--ignore-certificate-errors'] });
      const page = await browser.newPage();
      await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36")
      await page.goto('http://www.pandora.tv/view/uzoglycsoifs/55795344#38964450_new');

      const result = await page.evaluate(() => {
        let video = document.querySelectorAll('#qVideo');

        console.log(video[0].currentSrc);
        return video[0].currentSrc
      })
      console.log(result);
    }
    catch(err) {
      console.error(err);
    }
  }

  async convertMp3Naver() {
    axios.get(this.#url, { responseType: 'arraybuffer' })
    .then(video => {
      // TODO: 비디오를 다운받지 않고 stream을 통해서만 할 수는 없나??..
      fs.writeFile(this.#videoFile, video.data, err => {
        if(err) {
          console.error(err);
          return;
        }
        this.mp4Tomp3(this.#videoFile);
      });
    })
    .catch(err => {
      console.error(err);
    })    
  }

  convertMp3Youtube (req, res) {  
    console.log('downloadYoutube !');
    let stream = ytdl(this.#url);

    this.mp4Tomp3(stream, req, res);      
  }

  mp4Tomp3(stream, req ,res) {
    let start = Date.now();
    ffmpeg(stream)
    .audioBitrate(128)
    .save(this.#audioFile)
    .on('stderr', (stderrLine) => {
      console.log('stderr output: ' + stderrLine);
    })
    .on('progress', p => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${p.targetSize}kb downloaded`);
      global.processing = p.targetSize;
    })     
    .on('error', (err, stdout, stderr) => {
      console.log('Cannot process: '+err.message);
      this.#count+=1;
      console.log(this.#count);
      if(this.#count > 20) res.sendStatus(500);
      else this.convertMp3Youtube(req, res);
    })
    .on('end', async () => {
      console.log(`\ndone, tankes - ${(Date.now() - start) / 1000}s`);
      const status = await this.#metadata.setMetadata(this.#song);
      // const status = 200;
      this.#count = 0;
      console.log('done', status);
      processing = 'COMPLETED!';
      res.send({ status, audioPath: `${this.#title}.mp3` });
    });
  }

  downloadYoutube () {
    ytdl(this.#url).pipe(fs.createWriteStream(this.#videoFile));
  }
  convertMp3Naver_() {
    console.log("succeed naver..");
  }
  convertMp3Youtube_() {
    console.log("succeed youtube..");
  }
  getVideoFile() {
    return this.#videoFile;
  }
  getAudioFile() {
    return `${this.#title}.mp3`
  }
}

module.exports = { Converter };