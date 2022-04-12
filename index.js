var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

// io.on('connection', function (socket) {
//     clients++;
//     socket.emit('newclientconnect', { description: 'Hey, welcome!' });
//     socket.broadcast.emit('newclientconnect', { description: clients + ' clients connected!' })
//     socket.on('disconnect', function () {
//         clients--;
//         socket.broadcast.emit('newclientconnect', { description: clients + ' clients connected!' })
//     });
// });

io.on('connection', (socket) => {
    socket.on("login", (name) => {
        socket.broadcast.emit("login", name + " logged in")
        socket.on('disconnect', function () {
            socket.broadcast.emit('login', name + " logged out")
        })
    })

    // socket.on("online", (msg) => {
    //     io.emit("online", msg + " is online")
    //     socket.on('disconnect', function () {
    //         socket.broadcast.emit('online', msg + " logged out")
    //     })
    // })

    socket.on('message', (msg) => {
        io.emit('message', msg)
    })
})

http.listen(3000, function () {
    console.log('listening on localhost:3000');
});