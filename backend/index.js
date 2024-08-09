require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const connect = require('./schemas');
// const bodyParser = require("body-parser"); //내장으로 변경
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const Join = require('./schemas/Join');
const newevaluation = require('./schemas/NewEvaluation');

const passportConfig = require('./passport');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 5000);
connect();

if (process.env.NODE_ENV === 'production') {
    app.use(
        helmet({
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
            crossOriginResourcePolicy: false
        })
    );
    app.use(hpp());
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

app.use(
    cors({
        origin: 'http://localhost:3000', // 프론트엔드 주소
        credentials: true, // 자격 증명 허용
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // 허용할 메소드 설정
        allowedHeaders: ['Content-Type', 'Authorization'] // 허용할 헤더 설정
    })
);
app.options('*', cors());

// app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_KEY,
        cookie: {
            httpOnly: true,
            secure: false
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use(
//     cors({
//         origin: 'http://localhost:3000', // 프론트엔드 주소
//         credentials: true, // 자격 증명 허용
//         methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // 허용할 메소드 설정
//         allowedHeaders: ['Content-Type', 'Authorization'] // 허용할 헤더 설정
//     })
// );
// app.options('*', cors());

app.use('/users', require('./routes/users'));
app.use('/auth', authRouter);
app.use('/post', postRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send(err);
    console.log(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
