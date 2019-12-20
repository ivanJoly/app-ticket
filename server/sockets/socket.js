const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

let ticketControl = new TicketControl();

io.on('connection', (cliente) => {

    cliente.emit('estadoActual',{
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    cliente.on('nuevoTicket', (data, callback) => {

        let ultimo = ticketControl.siguiente();
        callback(ultimo);
    });

    cliente.on('atenderTicket', (data, callback) => {
        if (!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        cliente.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    })
});