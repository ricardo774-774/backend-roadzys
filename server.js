const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);

const port = process.env.PORT;

app.use(cors());

const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:4200']
    }
});

io.on('connection', (socket) => {
    socket.on('find-driver', ({points}) => {
        console.log('.....', points);

        const counter = setInterval(() => {
            const coords = points.shift();
            if(!coords) {
                clearInterval(counter);
            } else {
                socket.emit('position', {coords});
            }
        }, 1000)
    });
});

server.listen(port, () => console.log('Todo Bien', port));