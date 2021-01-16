const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});
const DB = process.env.DBLINK.replace('<PASSWORD>',process.env.DBPASSWORD);

process.on('unhandledRejection' , (reason,promise) => {
    console.log(reason.name,reason.message);
    console.table('Server shutting down due to uncaught rejection');
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err,origin) => {
    console.log(err.name,err.message);
    console.table('Server shutting down due to uncaught exception');
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log("Shutting down due to SIGTERM");
    server.close(() => {
        console.log("Process terminated");
    });
})

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Database connection established");
}).catch(err => {
    console.log(err);
});

const port = process.env.PORT||5000;
const server = app.listen(port,() => {
    console.log(`Server up on port ${port}`);
})