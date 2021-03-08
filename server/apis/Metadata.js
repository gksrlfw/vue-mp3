const nodeID3 = require('node-id3').Promise
const fs = require('fs');
const axios = require('axios');
const path = require('path');

class Metadata {
  #title; #artist; #album; #lyrics; #genre; #audioFile; #imageFile; #videoUrl; #imageUrl; 
  constructor(title, artist, album='', lyrics='', imageUrl='', genre='', videoUrl='') {
    this.#title = title;
    this.#artist = artist;
    this.#album = album;
    this.#lyrics = lyrics;
    this.#imageUrl = imageUrl;
    this.#genre = genre;
    this.#videoUrl = videoUrl;
    this.#audioFile = path.join(__dirname, '..', `/media/audios/${title}.mp3`);
    this.#imageFile = path.join(__dirname, '..', `/media/images/${title}_${artist}.jpg`);
  }


  // Set metadata
  async setMetadata(song) {
    let tags = {
      title: this.#title,
      artist: this.#artist,
      album: this.#album,
      unsynchronisedLyrics: {
          language: "kor",
          text: this.#lyrics,
      },
      genre: this.#genre,
    }
    
    // write data
    nodeID3.write(tags, this.#audioFile)
    .then(() => {
      console.log('Completed write metadata');
    })
    .catch(err => {
      console.log(err);
    });

    let status = 200;

    // if iamgeurl, download
    if(this.#imageUrl === '') return status;
    await axios.get(this.#imageUrl, { responseType: 'arraybuffer' })
    .then(img => {
      fs.writeFile(this.#imageFile, img.data, async (err) => {
        if(err) {
          console.error(err);
          return;
        }
        console.log('Completed image downloading');
        let tags = {
          title: this.#title,
          artist: this.#artist,
          album: this.#album,
          unsynchronisedLyrics: {
              language: "kor",
              text: this.#lyrics,
          },
          image: this.#imageFile,
          genre: this.#genre,
        }
          
        nodeID3.write(tags, this.#audioFile)
        .then(() => {
          if(this.#title!=='' && this.#artist!=='' && this.#album!=='' && this.#lyrics!=='' && this.#genre!=='' && this.#videoUrl!=='' && this.#imageFile!=='' && this.#imageUrl!=='')
              status = song.insertSongData(this.#title, this.#artist, this.#album, this.#lyrics, this.#genre, this.#videoUrl, this.#imageUrl, this.#imageFile);
          return status;
        })
        .catch(err => {
          console.log(err);
        });
      });
    })
    .catch(err => {
      console.error(err);
    })
  }
}



module.exports = Metadata;