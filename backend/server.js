const express = require("express");
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const userRoutes = require('./routes/user.routes');
// const postRoutes = require('./routes/post.routes');
// const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// app.use(cookieParser());

const db = require("./models");
db.sequelize.sync();

// app.get('*', checkUser);
// app.get('/jwtid', requireAuth, (req, res) => {
//   res.status(200).send(res.locals.user._id)
// });

// app.use('/api/user', userRoutes);
// app.use('/api/post', postRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});