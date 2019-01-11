import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import pkg from '../package.json';

const app = express();

app.use(morgan('dev'));

app.use('/api/v1', routes);

app.get('*', (req, res) => {
  res.send(pkg.version);
});

app.listen(process.env.PORT || 8080);

export default app;
