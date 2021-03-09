const puppeteer = require('puppeteer');

class Scrapper {
  #title; #artist; 
  constructor(title, artist) {
    this.#title = title;
    this.#artist = artist;
  }
  // 네이버에서 이미지 해줄까??..
  async scrapNaver() {
    try {

    }
    catch(err) {
      console.error(err);
    }
  }
  async scrapGoogle() {
    try {
      const browser = await puppeteer.launch({ 
        headless: true, ignoreDefaultArgs: ['--disable-extensions'],
        // executablePath: process.env.CHROMIUM_PATH,
        // args: ['--no-sandbox'], 
      });
      const page = await browser.newPage();
      await page.goto('https://google.com');
      await page.click('input[title="검색"]');
      await page.type('input[title="검색"]', `${this.#title} ${this.#artist}`);
      // await page.type('input[title="검색"]', `케이윌 이러지마 제발`);
      // await page.type('input[title="검색"]', `i feel serene`);
      // await page.click('input[Google 검색"]');
      await page.waitFor(1000);
      await page.click('input[value="Google 검색"]');
      // await page.type(String.fromCharCode(13));
      await page.waitForNavigation({
          waitUntil: 'networkidle2'
      });
  
      await page.evaluate(() => { if(document.querySelector('.ujudUb.WRZytc a')) document.querySelector('.ujudUb.WRZytc a').click();})   // 더보기
      const ans = await page.evaluate(() => {
        let V_URL, ALBUM, GENRE, LYRICS='', lyricsArray;
        if(document.querySelector('.twQ0Be a')) V_URL = document.querySelector('.twQ0Be a').href || "Do not find";
        else V_URL = '';
        if(document.querySelector('div[data-attrid="kc:/music/recording_cluster:first album"]')) ALBUM = document.querySelector('div[data-attrid="kc:/music/recording_cluster:first album"]').textContent.split(':')[1] || "Do not find";
        else ALBUM='';
        if(document.querySelector('div[data-attrid="kc:/music/recording_cluster:skos_genre"]')) GENRE = document.querySelector('div[data-attrid="kc:/music/recording_cluster:skos_genre"]').textContent.split(':')[1] || "Do not find";
        else GENRE='';
        if(document.querySelectorAll('div.ujudUb')) {
          lyricsArray = Array.from(document.querySelectorAll('div.ujudUb')).slice(1) || "Do not find";
          // textContent로 하면 span 사이에 줄바꿈이 안되는데 innerText는 되네??
          if(lyricsArray) {
            lyricsArray.forEach((lyric, i) => {
              console.log(lyric.innerText);                            
              lyric.innerText = lyric.innerText+'\n'+'\n';
              LYRICS += lyric.innerText;
            });
          }
        }
        else LYRICS='';
        // this.V_URL은 나오면 없어진다.. 왜일까??..
        return { V_URL, ALBUM, GENRE, LYRICS };
      });
      if(ans.LYRICS.length) ans.LYRICS = ans.LYRICS.replace('undefined', '');  
      ans.TITLE = this.#title;
      ans.ARTIST = this.#artist;
      return ans;
    }
    catch(err) {
      console.error(err);
      return { message: 'Scrap error' };
    }
  }
}

module.exports = Scrapper;