const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const connectDB = require('./config/db');
// Load config
dotenv.config({path: './config/config.env'});

connectDB()

const app = express();

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

// Static folder

app.use(express.static(path.join(__dirname, 'public')))

  // routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`))