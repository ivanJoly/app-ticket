// Comando para establecer la comunicacion

var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if ( !searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function(){


    socket.emit('atenderTicket', { escritorio: escritorio}, function(resp){
        console.log(resp);
        if( resp === 'No hay mas tickets'){
            console.log('dentro');

            alert(resp);
            return;
        }

        label.text(' el ticket numero: ' + resp.numero);
    })

})
