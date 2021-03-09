const db = require('../config/db');

class SongService {
  #db;
  constructor(db) {
    this.#db = db;
  }

  async downloadSong(videoUrl) {
    console.log('download song...');
    const SEARCH_SONG = `SELECT * FROM SONG WHERE V_URL = ?`;
    const [results, fields] = await this.#db.promise().execute(SEARCH_SONG, [videoUrl]);
    if(!results.length) return;
  }

  // 유저가 요청한 데이터로 삽입 > 모든 정보가 있을 때만..
  async insertSongData(title, artist, album, lyrics, genre, videoUrl, imgUrl, imgPath) {
    try {
      console.log('insert song...');
      
      const SEARCH_GENRE = `SELECT * FROM GENRE WHERE TITLE = ?`;
      const SEARCH_SONG = `SELECT * FROM SONG WHERE V_URL = ?`;
      const UPDATE_COUNT_SONG = `UPDATE SONG SET COUNT = COUNT+1 WHERE V_URL = ?`;
      const INSERT_SONG = `INSERT INTO SONG(TITLE, ARTIST, ALBUM, LYRICS, V_URL, IMG_URL, IMG_PATH, COUNT, S_GID) VALUES(?,?,?,?,?,?,?,?,?)`;

      // for genre
      genre = genre.toUpperCase();
      if(genre.includes('발라드') || genre.includes('BAL')) genre = 'BALLAD';
      if(genre.includes('R&B') || genre.includes('R AND') || genre.includes('SOUL') || genre.includes('소울')) genre = 'R&B/SOUL';
      if(genre.includes('DANCE') || genre.includes('댄스')) genre = 'DANCE';
      if(genre.includes('RAP') || genre.includes('HIP') || genre.includes('HOP') ) genre = 'RAP/HIPHOP';
      if(genre.includes('INDI') || genre.includes('인디')) genre = 'INDI';
      if(genre.includes('ROCK') || genre.includes('METAL') || genre.includes('R&R') ||genre.includes('락') || genre.includes('록') || genre.includes('메탈')) genre = 'ROCK/METAL';
      if(genre.includes('트로트') || genre.includes('TRO')) genre = 'TROT';
      if(genre.includes('PORK') || genre.includes('BLUES') || genre.includes('블루스') || genre.includes('포크')) genre = 'PORK/BLUES';
      if(genre.includes('SINGER') || genre.includes('SONG') || genre.includes('WRITER') || genre.includes('싱어')) genre = 'SINGER SONGWRITER';
      if(genre.includes('POP') || genre.includes('팝')) genre = 'POP';

      // do not insert if genre not exist
      let [results, fields] = await this.#db.promise().execute(SEARCH_GENRE, [genre]);
      if(!results.length) return 400;

      // ' -> ''
      lyrics = lyrics.replace(/'/g, "''");    
      let genId = results[0].GID;
      
      // count++ if video already exist
      [results, fields] = await this.#db.promise().execute(SEARCH_SONG, [videoUrl]);
      if(results.length) {
        await this.#db.promise().execute(UPDATE_COUNT_SONG, [videoUrl]);
        return 200;
      }

      // insert data
      [results, fields] = await this.#db.promise().execute(INSERT_SONG, [title, artist, album, lyrics, videoUrl, imgUrl, imgPath, 1, genId]);
      return 200;
    }
    catch(err) {
      console.error(err);
    }
  }

  async getGenre() {
    try {
      console.log('getGener....');
      const GET_GENRE = `SELECT * FROM GENRE`;
      const [results, fields] = await this.#db.promise().execute(GET_GENRE);
      return results;
    }
    catch(err) {
      console.error(err);
    }
  }
  // count순으로 정렬해서 10개만 뽑기!!
  async getSongData() {
    try {
      console.log('getSongs...');
      const GET_SONGS = `SELECT TITLE, ARTIST, V_URL, COUNT, SID FROM SONG ORDER BY COUNT DESC`;
      const [results, fields] = await this.#db.promise().execute(GET_SONGS);
      if(results.length>10) results = results.slice(0, 10);
      return results;
    }
    catch(err) {
      console.error(err);
    }
  }

  async searchSongByUrl(url) {
    try {
      console.log('searchSong...');
      const SEARCH_SONG = 'SELECT * FROM SONG WHERE V_URL = ?';
      const SEARCH_GENRE = 'SELECT TITLE FROM GENRE WHERE GID = ?';
      const [results, fields] = await this.#db.promise().execute(SEARCH_SONG, [url]);
      console.log(results);
      if(!results || !results[0]?.TITLE) {
        return { V_URL: url };
      }
      results[0].LYRICS = results[0].LYRICS.replace(/\n/g, "<br>");     // br
      results[0].LYRICS = results[0].LYRICS.replace(/''/g, "'");        // ''
      console.log(results);
      const [genre, fileds] = await this.#db.promise().execute(SEARCH_GENRE, [results[0].S_GID]);
      console.log(genre);
      results[0].GENRE = genre[0].TITLE;
      console.log(results[0]);
      return results[0];
    }
    catch(err) {
      console.error(err);
    }
  }

  async getSongsByGenre(gid) {
      try {
          console.log('getSongsByGenre...', typeof gid);
          if(gid === '0') {
              const GET_SONGS_BY_COUNT = 'SELECT TITLE, ARTIST, ALBUM, COUNT, IMG_URL, SID FROM SONG ORDER BY COUNT DESC';
              const [results, fields] = await this.#db.promise().execute(GET_SONGS_BY_COUNT);
              return results;
          }
          
          const GET_SONGS_BY_COUNT = 'SELECT TITLE, ARTIST, ALBUM, COUNT, IMG_URL, SID FROM SONG WHERE S_GID=? ORDER BY COUNT DESC';
          const [results, fields] = await this.#db.promise().execute(GET_SONGS_BY_COUNT, [gid]);
          console.log(gid, results);
          return results;
      }
      catch(err) {
          console.error(err);
      }
  }
}
const songServiceInstance = new SongService(db);
module.exports = songServiceInstance; 