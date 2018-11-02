// Comando para establecer la comunicacion

var socket = io();

var label = $('#lblNuevoTicket')
socket.on('connect', function (){

    console.log('Conectado al servidor');
    
})

socket.on('disconnect', function(){

    console.log('Perdimos la conexion al servidor');

})

socket.on('estadoActual', function(res) {

    label.text(res.actual);

})

$('button').on('click', function(){


    socket.emit('nuevoTicket', null, function(siguenteTicket){

        label.text(siguenteTicket);
    
    })

    console.log('anda!');
})