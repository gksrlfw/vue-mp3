const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const helmet = require('helmet');
const hpp = require('hpp'); 

dotenv.config();

const indexRouter = require('./router');

const app = express();
app.set('port', process.env.PORT || 3000);

console.log('aaa', process.env.COOKIE_SECRET, process.env.JWT_SECRET);
db.connect((err) => {
  if(err) {
    console.error(err);
    console.error(err.message);
    throw err;
  }
  console.log('mysql connected...');
});

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  proxy: true
}

if(process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
  // sessionOption.cookie.secure = true; // HTTPS 적용시 주석 풀기

  // (async () => {
  //   try {
  //     const SQL = `SELECT * FROM USERS`;
  //     const [results, fields] = await db.promise().execute(SQL);
  //     if(results.length) return;
  //     console.log('delete table all...');
  //     await deleteAll();
  //   }
  //   catch(err) {
  //     console.error(err);
  //     await createAll();
  //   }
  // })();
}
else app.use(morgan('dev'));

app.enable('trust proxy');
app.use(cors());
// 정적으로 지정된 기본 pulbic 폴더에서 client/dist에 있는 파일로 변경한다.
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));        
app.use('/audio', express.static(path.join(__dirname, 'apis/media/audio')));  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(sessionOption));

app.use('/api', indexRouter)
app.get('/api/download/:title', (req, res) => {
  console.log('download!', req.params.title);
  let audioPath = path.join(__dirname, '/media/audios/', req.params.title);
  console.log(audioPath);
  res.download(audioPath, req.params.title, err => {
      if(err) console.error(err);
      else res.end();
  });
});

app.use((req, res, next) => {
  res.status(404).send(`해당 페이지가 존재하지 않습니다!!!!`);
});


// 에러처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

module.exports = app;