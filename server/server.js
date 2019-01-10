import express from 'express';
import morgan from 'morgan';
import routes from './routes';

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('dev'));

app.use('/api/v1', routes);

app.listen(port);

export default app;
