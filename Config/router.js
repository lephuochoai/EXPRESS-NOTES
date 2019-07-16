const app = require('./app');

const authorization = require('../Routes/authorization');
const teamRouter = require('../Routes/Team');
// const userRouter = require('../Routes/User')
const notesRouter = require('../Routes/note');

const apiPrefix = '/api/v1';

app.use(`${apiPrefix}/auth`, authorization);
app.use(`${apiPrefix}/notes`, notesRouter);
app.use(`${apiPrefix}/team`, teamRouter);
