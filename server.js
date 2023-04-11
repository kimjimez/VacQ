const cors = require('cors');
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db.js");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
//load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

//Route files
const hospitals = require("./routes/hospitals");
const auth = require("./routes/auth");
const appointments = require("./routes/appointments");
const { Promise } = require("mongoose");

const app = express();

const swaggerOptions={
  swaggerDefinition:{
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express VacQ API'
    },
    servers:[{
      url: 'http://localhost:3001/api/v1'
    }],
  },
    apis:['./routes/*.js'],
  };
const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors());
//add body parser
app.use(express.json());
//cookie parser
app.use(cookieParser());
//Sanitize data
app.use(mongoSanitize());
//Set security headers
app.use(helmet());
//Prevent XSS attacks
app.use(xss());
//Rate limiting 
const limiter = rateLimit({
  windowsMs: 10*60*1000, //10mins
  max: 100
});
app.use(limiter);
//Prevent http param pollutions
app.use(hpp());



//Mount routers
app.use("/api/v1/hospitals", hospitals);
app.use("/api/v1/auth", auth);
app.use("/api/v1/appointments", appointments);

const PORT = process.env.PORT || 3000;
const server = app.listen(
  PORT,
  console.log("Server running in", process.env.NODE_ENV, " mode on port", PORT)
);

//handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});
