import express from 'express';
import morgan from 'morgan';
import routes from './routes';

const app = express();

app.use(morgan('dev'));

app.use('/api/v1', routes);

app.listen(process.env.PORT || 8080);

export default app;
