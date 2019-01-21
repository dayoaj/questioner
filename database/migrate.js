import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let pool = {};

if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    connectionString: 'postgres://postgres:root@127.0.0.1:5432/test',
    max: 2,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 20000
  });
} else if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: 'postgres://postgres:root@127.0.0.1:5432/test',
    max: 2,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 20000
  });
}

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Migrate Data
 */
const queryInsertUser = `INSERT INTO users(
	id, firstname, lastname, othername, email, phonenumber, username, password, registered, isadmin)
	VALUES ('ddcda972-4b8a-4fd9-b8ce-7a08535a2984', 'Johnson', 'Benson', 'Golden', 'dayoaj@gmail.com', '2348094857883', 'bluebird', 'jddu3i99dj38djj3j990jdfh9hapod3', '2019-01-17T15:48:52.344Z', true)`;

const queryInsertMeetup = `INSERT INTO meetups(
	id, user_id, createdon, location, images, topic, body, happeningon, tags, convener)
	VALUES ('5442b061-8c81-46b2-b934-c07743bd1976', 'ddcda972-4b8a-4fd9-b8ce-7a08535a2984', '2019-01-17T15:48:52.344Z', 'Yaba, Lagos', null, 'German Language Meetup', 'German Language Meetup', '2019-01-17T15:48:52.344Z', null, '');`;

const queryInsertUpcomingMeetup = `INSERT INTO meetups(
	id, user_id, createdon, location, images, topic, body, happeningon, tags, convener)
	VALUES ('e67831a6-96c3-4698-86ce-924321336719', 'ddcda972-4b8a-4fd9-b8ce-7a08535a2984', '2019-01-17T15:48:52.344Z', 'Yaba, Lagos', null, 'French Language Meetup', 'French Language Meetup', '2019-01-25T15:48:52.344Z', null, '');`;

const queryInsertQuestion = `INSERT INTO questions(
	id, createdon, createdby, meetup, title, body, votes)
	VALUES ('2efb2565-e532-4160-bc58-6f25e8728c42', '2019-01-17T15:48:52.344Z', 'ddcda972-4b8a-4fd9-b8ce-7a08535a2984', 'e67831a6-96c3-4698-86ce-924321336719', 'Are we going to get free Materials?', 'Are we going to get free Materials?', 0);`;

const queryInsertRSVP = `INSERT INTO rsvps(
	id, meetup, user_id, response, topic)
	VALUES ('9dfe2b1c-fade-4b2e-9f06-bfc6b025e090', 'e67831a6-96c3-4698-86ce-924321336719', 'ddcda972-4b8a-4fd9-b8ce-7a08535a2984', 'yes', 'French Language Meetup');`;

const queryInsertComment = `INSERT INTO comments(
	id, question, createdby, createdon, body)
	VALUES ('ca9445a4-34fa-4883-a20c-022389f68e8b', '2efb2565-e532-4160-bc58-6f25e8728c42', 'ddcda972-4b8a-4fd9-b8ce-7a08535a2984', '2019-01-25T15:48:52.344Z', 'I would like to know about that too')`;

// Create tables with pool request.
pool
  .query(queryInsertUser)
  .then(() => {
    pool.query(queryInsertMeetup);
    console.log('inserting meetup');
  })
  .then(() => {
    pool.query(queryInsertUpcomingMeetup);
    console.log('inserting upcoming meetup');
  })
  .then(() => {
    pool.query(queryInsertQuestion);
    console.log('inserting question');
  })
  .then(() => {
    pool.query(queryInsertRSVP);
    console.log('inserting rsvp');
  })
  .then(() => {
    pool.query(queryInsertComment);
    console.log('inserting comment');
  })
  .then(() => pool.end())
  .catch(err => {
    console.log(err);
    pool.end();
  });

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});
