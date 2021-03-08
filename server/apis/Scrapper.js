// const puppeteer = require('puppeteer-core');

class Scrapper {
  // #title; #artist; 
  // constructor(title, artist) {
  //   this.#title = title;
  //   this.#artist = artist;
  // }
  // // 네이버에서 이미지 해줄까??..
  // async scrapNaver() {
  //   try {

  //   }
  //   catch(err) {
  //     console.error(err);
  //   }
  // }
  // async scrapGoogle() {
  //   try {
  //     const browser = await puppeteer.launch({ 
  //       headless: true,   
  //       // executablePath: process.env.CHROMIUM_PATH,
  //       // args: ['--no-sandbox'], 
  //     });
  //     const page = await browser.newPage();
  //     await page.goto('https://google.com');
  //     await page.click('input[title="검색"]');
  //     await page.type('input[title="검색"]', `${this.#title} ${this.#artist}`);
  //     // await page.type('input[title="검색"]', `케이윌 이러지마 제발`);
  //     // await page.type('input[title="검색"]', `i feel serene`);
  //     // await page.click('input[Google 검색"]');
  //     await page.waitFor(1000);
  //     await page.click('input[value="Google 검색"]');
  //     // await page.type(String.fromCharCode(13));
  //     await page.waitForNavigation({
  //         waitUntil: 'networkidle2'
  //     });
  
  //     await page.evaluate(() => { if(document.querySelector('.ujudUb.WRZytc a')) document.querySelector('.ujudUb.WRZytc a').click();})   // 더보기
  //     const ans = await page.evaluate(() => {
  //       let url, album, genre, lyrics='', lyricsArray;
  //       if(document.querySelector('.twQ0Be a')) url = document.querySelector('.twQ0Be a').href || "Do not find";
  //       else url = '';
  //       if(document.querySelector('div[data-attrid="kc:/music/recording_cluster:first album"]')) album = document.querySelector('div[data-attrid="kc:/music/recording_cluster:first album"]').textContent.split(':')[1] || "Do not find";
  //       else album='';
  //       if(document.querySelector('div[data-attrid="kc:/music/recording_cluster:skos_genre"]')) genre = document.querySelector('div[data-attrid="kc:/music/recording_cluster:skos_genre"]').textContent.split(':')[1] || "Do not find";
  //       else genre='';
  //       if(document.querySelectorAll('div.ujudUb')) {
  //         lyricsArray = Array.from(document.querySelectorAll('div.ujudUb')).slice(1) || "Do not find";
  //         // textContent로 하면 span 사이에 줄바꿈이 안되는데 innerText는 되네??
  //         if(lyricsArray) {
  //           lyricsArray.forEach((lyric, i) => {
  //             console.log(lyric.innerText);                            
  //             lyric.innerText = lyric.innerText+'\n'+'\n';
  //             lyrics += lyric.innerText;
  //           });
  //         }
  //       }
  //       else lyrics='';
  //       // this.url은 나오면 없어진다.. 왜일까??..
  //       return {url, album, genre, lyrics};
  //     });
  //     console.log(ans);
  //     if(ans.lyrics.length) ans.lyrics = ans.lyrics.replace('undefined', '');  
  //     return ans;
  //   }
  //   catch(err) {
  //       console.error(err);
  //   }
  // }
}

module.exports = Scrapper;