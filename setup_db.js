import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const URL = 'postgres://postgres:postgres@127.0.0.1:5432/questioner';

const pool = new Pool({
  connectionString: URL,
  max: 1,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 30000
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */

const createUser = `CREATE TABLE IF NOT EXISTS public."User"
  (
      id uuid NOT NULL,
      firstname character varying(50),
      lastname character varying(50),
      othername character varying(50),
      email character varying(50),
      phonenumber character varying(30),
      username character varying(30),
      password character varying(128),
      isadmin boolean,
      registered timestamp without time zone DEFAULT now(),
      CONSTRAINT id PRIMARY KEY (id)
  )`;
const createMeetup = `CREATE TABLE IF NOT EXISTS public.meetup
(
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    createdon timestamp without time zone DEFAULT now(),
    location character varying(60),
    images text[],
    topic character varying(50),
    body character varying(255),
    happenningon timestamp without time zone,
    tags text[],
    convener character varying(50),
    CONSTRAINT meetup_id PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public."User" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;

const createQuestion = `CREATE TABLE IF NOT EXISTS public.question
(
  id uuid NOT NULL,
  createdon timestamp without time zone DEFAULT now(),
  createdby uuid NOT NULL,
  meetup uuid NOT NULL,
  title character varying(50),
  body character varying(255),
  votes integer DEFAULT 0,
  CONSTRAINT question_pkey PRIMARY KEY (id),
  CONSTRAINT meetup FOREIGN KEY (meetup)
      REFERENCES public.meetup (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE NO ACTION,
  CONSTRAINT user_id FOREIGN KEY (createdby)
      REFERENCES public."User" (id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE
)`;

const createRSVP = `CREATE TABLE IF NOT EXISTS public.rsvp
(
    id uuid NOT NULL,
    meetup uuid NOT NULL,
    user_id uuid NOT NULL,
    response character varying(10),
    topic character varying(50),
    CONSTRAINT rsvp_pkey PRIMARY KEY (id),
    CONSTRAINT meetup_id FOREIGN KEY (meetup)
        REFERENCES public.meetup (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public."User" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)`;

const createComment = `CREATE TABLE IF NOT EXISTS public.comment
(
    id uuid NOT NULL,
    question uuid NOT NULL,
    createdby uuid NOT NULL,
    createdon timestamp without time zone,
    body character varying(255),
    CONSTRAINT comment_pkey PRIMARY KEY (id),
    CONSTRAINT createdby FOREIGN KEY (createdby)
        REFERENCES public."User" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT question FOREIGN KEY (question)
        REFERENCES public.question (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)`;

pool
  .query(createUser)
  .then(pool.query(createMeetup))
  .then(pool.query(createQuestion))
  .then(pool.query(createRSVP))
  .then(pool.query(createComment))
  .catch(err => {
    console.log(err);
    pool.end();
  });

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});
