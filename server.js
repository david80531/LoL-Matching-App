const express = require('express');
var app = require('express')();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('dist'));

var active_users = [];
var sockets = [];

io.on('connection', function(socket){
    console.log('A user connected');

    socket.on('login', function(data) {
		
		var idx = active_users.indexOf(data);

        if(active_users.indexOf(data) > -1 ) {
            console.log('login already!');
			active_users[idx] = data;
			sockets[idx] = socket;
        } else {
            active_users.push(data);
            sockets.push(socket);

            console.log('login success');
        }
    });



    socket.on('send_message', function(data) {
		console.log(data);

		var msg = data.msg;
		//msg._id = '7feaac04-dd9c-41d4-beea-46fb9a111111'; //test
		msg.user._id = 2;
		msg.user.avatar ='http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+data.championName+'_0.jpg';


        const idx = active_users.indexOf(data.partnerName);

        if(idx > -1){
			sockets[idx].emit('rec_message',{
                msg: [msg],
                partnerName: data.userName,
                championName: data.championName
            });
            sockets[idx].emit('change_state', {
                msg:[msg]
            });
        }
        else{
			console.log("User isn't online");
			}

    });

    socket.on('disconnect', function() {
        //active_users.splice(sockets.indexOf(socket), 1);
        //sockets.splice(sockets.indexOf(socket), 1);

        console.log('client disconnected!');
    })



})
server.listen(3000, function() {
  console.log('listening on localhost:3000');
});
