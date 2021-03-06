const path = require('path');
const { engine } = require('express-handlebars');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session')

const connectDB = require('./config/db');

const app = express();


// Load config
dotenv.config({path: './config/config.env'});

// Passport config

require('./config/passport')(passport)

connectDB()


if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

//Handlebars

app.set('view engine', '.hbs');

app.engine(
    ".hbs",
    engine({
    //   helpers: { formatDate, stripTags, truncate, editIcon, select },
      defaultLayout: "main",
      extname: ".hbs",
    })
  );

// Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }))


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder

app.use(express.static(path.join(__dirname, 'public')))

  // routes
app.use('/', require('./routes/index'))
app.use('/', require('./routes/auth'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`))