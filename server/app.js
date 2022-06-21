const express = require('express');
const promMid = require('express-prometheus-middleware');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    }),
);

app.use((req, res, next) => {
    const { authorization } = req.headers;
    let token;
    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1];
    }

    if (token !== 'mysecrettoken') {
        next({
            message: 'Unauthorized',
            status: 403,
        });
    }
    next();
});

app.use(
    promMid({
        metricsPath: '/metrics',
        collectDefaultMetrics: true,
        requestDurationBuckets: [0.1, 0.5, 1, 1.5],
        requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
        responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    }),
);

app.all('/time', (req, res, next) => {
    const serverTime = Math.floor(new Date().getTime() / 1000);
    setTimeout(() => {
        return res.json({
            epoch: serverTime,
        });
    }, 5000);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next({
        message: 'Not found',
        status: 404,
    });
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500).json({
        message: err.message,
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost: ${PORT}`);
});
