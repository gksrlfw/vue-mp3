
const Converter = require('./Converter');
const Metadata = require('./Metadata');
const Scrapper = require('./Scrapper');
const db = require('../config/db');


const testYoutube = () => {
  let title = 'MORNING BREEZE';
  let artist = 'JUKE ROSS';
  let album = 'GREY';
  let url = 'https://www.youtube.com/watch?v=voES-Cqee2A';
  let imgPath = 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA3MTZfMjI4%2FMDAxNTYzMjA3MTY3OTk1.T7hKSppX9kGIBWtCwUsVhRi-SKIlh9Jglopy1eHItNMg.omm5Gke6M8uYs1l5hawDpGnFuJQDdRQnsL10nEZcbGcg.JPEG.jooinassiya%2F809a3ab99f96e6d532d5ee0d5b4ba58a.500x500x1.jpg&type=sc960_832'
  let genre = 'pop';
  let lyrics = 'Don\'t even try';
  let metadata = new Metadata(title, artist, album, lyrics, imgPath, genre);
  let converter = new Converter(url, title, metadata);
  converter.convertMp3Youtube();
}

const testNaver = () => {
  let title = '그립고 그립고 그립다';
  let artist = '김연지';
  let album = '복면가왕';
  let url = 'https://naver-mbc-c.smartmediarep.com/smc/naver/multi/eng/M01_T9201701150029/2f6d62632f4154544143484d454e542f534d522f4d454449412f323031372f30312f31352f54393230313730313135303032395f7433352e6d7034/0-0-0/content.mp4?solexpire=1605481412&solpathlen=164&soltoken=c203020abb77ecd641cae1e2680070ee&soltokenrule=c29sZXhwaXJlfHNvbHBhdGhsZW58c29sdXVpZA==&soluriver=2&soluuid=03ce2507-c94f-4fc7-832a-347484a263d8&itemtypeid=35&tid=6ae15e45-052a-4feb-be7b-8e90d30e9ce0';
  let imgPath = 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160814_225%2Ftaelove79_1471181205276HzpKN_JPEG%2F%25C8%25D62.jpg&type=sc960_832'
  let genre = 'kpop';
  let lyrics = '널 사랑한다~';


  let metadata = new Metadata(title, artist, album, lyrics, imgPath, genre);
  let converter = new Converter(url, title, metadata);
  converter.convertMp3Naver();
}

const testVideo = () => {
  let title = '그립고 그립고 그립다';
  let artist = '김연지';
  let album = '복면가왕';
  let url = 'https://naver-mbc-c.smartmediarep.com/smc/naver/multi/eng/M01_T9201701150029/2f6d62632f4154544143484d454e542f534d522f4d454449412f323031372f30312f31352f54393230313730313135303032395f7433352e6d7034/0-0-0/content.mp4?solexpire=1605481412&solpathlen=164&soltoken=c203020abb77ecd641cae1e2680070ee&soltokenrule=c29sZXhwaXJlfHNvbHBhdGhsZW58c29sdXVpZA==&soluriver=2&soluuid=03ce2507-c94f-4fc7-832a-347484a263d8&itemtypeid=35&tid=6ae15e45-052a-4feb-be7b-8e90d30e9ce0';
  let imgPath = 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160814_225%2Ftaelove79_1471181205276HzpKN_JPEG%2F%25C8%25D62.jpg&type=sc960_832'
  let genre = 'kpop';
  let lyrics = '널 사랑한다~';


  let metadata = new Metadata(title, artist, album, lyrics, imgPath, genre);
  let converter = new Converter(url, title, metadata);
  converter.naverVideo();
}

const testScrap = async () => {
  let title = 'real';
  let artist = 'eli noir';
  let scrapper = new Scrapper(title, artist);
  let ans = await scrapper.scrapGoogle();
  console.log(ans);
}


testYoutube();
// testNaver();
// testVideo();
// testScrap();
// testSong();
