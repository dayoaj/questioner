import http from 'http';
import express from 'express';
import morgan from 'morgan';
import routes from './app/routes';
// import meetups from './app/controller/MeetupController';

const app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));

// app.get('/', (req, res) => res.status(200).send({ message: 'Server is up!' }));
app.use('/api/v1', routes());

app.server.listen(process.env.PORT || 8080, () => {
  console.log(`Started on port ${app.server.address().port}`);
});
