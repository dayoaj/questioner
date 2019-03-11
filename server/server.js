import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import pkg from '../package.json';

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('dev'));

app.use('/api/v1', routes);

app.get('*', (req, res) => {
  res.send({
    status: 200,
    data: `API version ${pkg.version}`
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

export default app;
