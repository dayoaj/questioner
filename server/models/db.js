import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 2000
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create All Tables
 */
const queryCreateUser = `CREATE TABLE IF NOT EXISTS
  users(
    id UUID,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    othername VARCHAR(50),
    email VARCHAR(50),
    phoneNumber VARCHAR(30),
    username VARCHAR(30),
    registered timestamp DEFAULT CURRENT_TIMESTAMP,
    isAdmin boolean,
    PRIMARY KEY (id),
    UNIQUE (username)
  )`;

const queryCreateMeetup = `CREATE TABLE IF NOT EXISTS
    meetups(
    id UUID,
    user_id UUID NOT NULL,
    createdOn timestamp DEFAULT CURRENT_TIMESTAMP,
    location VARCHAR(60),
    images text[],
    topic VARCHAR (50),
    body VARCHAR (255),
    happeningOn timestamp NOT NULL,
    tags text[],
    convener VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )`;

const queryCreateQuestion = `CREATE TABLE IF NOT EXISTS
    questions(
    id UUID,
    createdOn timestamp DEFAULT CURRENT_TIMESTAMP,
    createdBy UUID NOT NULL,
    meetup UUID NOT NULL,
    title VARCHAR (50),
    body VARCHAR (255),
    votes int DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY(createdBy) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(meetup) REFERENCES meetups(id) ON DELETE CASCADE
    )`;

const queryCreateRSVP = `CREATE TABLE IF NOT EXISTS
    rsvps( 
    id UUID,
    meetup  UUID NOT NULL,
    user_id UUID NOT NULL,
    response VARCHAR(10),
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(meetup) REFERENCES meetups(id) ON DELETE CASCADE
    )`;

const queryCreateComment = `CREATE TABLE IF NOT EXISTS
    comments(
    id UUID,
    question UUID NOT NULL,
    createdBy UUID NOT NULL,
    createdOn timestamp DEFAULT CURRENT_TIMESTAMP,
    body VARCHAR (255),
    PRIMARY KEY (id),
    FOREIGN KEY(createdBy) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(question) REFERENCES questions(id) ON DELETE CASCADE
    )`;

pool
  .query(queryCreateUser)
  .then(res => {
    console.log(res);
    pool.end();
  })
  .catch(err => {
    console.log(err);
    pool.end();
  });

pool
  .query(queryCreateMeetup)
  .then(res => {
    console.log(res);
    pool.end();
  })
  .catch(err => {
    console.log(err);
    pool.end();
  });

pool
  .query(queryCreateQuestion)
  .then(res => {
    console.log(res);
    pool.end();
  })
  .catch(err => {
    console.log(err);
    pool.end();
  });

pool
  .query(queryCreateRSVP)
  .then(res => {
    console.log(res);
    pool.end();
  })
  .catch(err => {
    console.log(err);
    pool.end();
  });

pool
  .query(queryCreateComment)
  .then(res => {
    console.log(res);
    pool.end();
  })
  .catch(err => {
    console.log(err);
    pool.end();
  });

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});
