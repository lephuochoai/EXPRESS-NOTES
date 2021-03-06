const app = require('./app');

// 404 Not Found
app.use((req, res, next) => {
    next({
        code: 404,
        data: null
    })
});

app.use((err, req, res, next) => {
    return res.status(400).json({err})
});
