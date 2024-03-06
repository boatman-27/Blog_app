import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-local";
import pgSession from "connect-pg-simple";
import e from "express";

const app = express();
const port = 7001;
const saltRounds = 10;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const pgSessionStore = pgSession(session);

const db = new pg.Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});
db.connect();

app.use(
  session({
    store: new pgSessionStore({
      pool: db,
    }),
    secret: "LMAOO",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const checkAuth = async (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Please log in" });
};

app.get("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: "User is authenticated", user: req.user });
  } else {
    res.status(401).json({ message: "User is not authenticated" });
  }
});

app.get("/main", checkAuth, async (req, res) => {
  console.log(req.isAuthenticated());
  console.log(req.user);

  if (req.isAuthenticated()) {
    try {
      const result = await db.query("SELECT * FROM blogs");
      res.status(200).json({ blogs: result.rows, user: req.user });
    } catch (error) {
      console.log(req.isAuthenticated());
      console.log(error);
    }
  } else {
    res.status(401).json({ message: "Please log in" });
  }
});

app.post("/addblog", checkAuth, async (req, res) => {
  console.log(req.body);
  const { title, content, author, username, tags } = req.body;
  try {
    await db.query(
      "INSERT INTO blogs (blog_title, blog_content, author_username, tags, author_name) VALUES ($1, $2, $3, $4, $5)",
      [title, content, username, tags, author]
    );
    res.status(201).json({ message: "Blog added successfully!" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const { firstName, lastName, username, email, dateOfBirth, password } =
      req.body;
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (result.rows.length > 0) {
      res.status(401).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const insertResult = await db.query(
        "INSERT INTO users (first_name, last_name, username, email, date_of_birth, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [firstName, lastName, username, email, dateOfBirth, hashedPassword]
      );
      const user = insertResult.rows[0];
      req.login(user, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "User creation failed" });
        } else {
          res.status(201).json({ message: "User created successfully!" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User creation failed" });
  }
});

app.post("/login", async (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (!user) {
      res
        .status(401)
        .json({ message: "Incorrect username or password", info: info });
    }
    req.login(user, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: "Successfully logged in", info: info });
      }
    });
  })(req, res);
});

app.delete("/delete", checkAuth, async (req, res) => {
  const userId = req.query.id;
  try {
    const result = await db.query("SELECT * FROM users WHERE id = ($1)", [
      userId,
    ]);
    if (result.rows.length > 0) {
      await db.query("DELETE FROM users WHERE id = ($1)", [userId]);
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/myblogs", checkAuth, async (req, res) => {
  const userId = req.user.username;
  if (req.isAuthenticated()) {
    try {
      const result = await db.query(
        "SELECT * FROM blogs WHERE author_username = $1",
        [userId]
      );
      res.status(200).json({ blogs: result.rows, user: req.user });
    } catch (error) {
      console.log(req.isAuthenticated());
      console.log(error);
    }
  } else {
    res.status(401).json({ message: "Please log in" });
  }
});

passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = ($1)", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          cb(null, user);
        } else {
          cb(null, false);
        }
      } else {
        cb("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  })
);

passport.serializeUser((user, cb) => {
  return cb(null, user);
});

passport.deserializeUser((user, cb) => {
  return cb(null, user);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
