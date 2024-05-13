const BandList = require("./band-list");

class Sockets {

    constructor( io ) {

        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log("cliente conectao");

            // Emitir al cliente todas las bandas actuales
            socket.emit('currentBands', this.bandList.getBands() );
        
            socket.on('voteBand', (id) => {
                this.bandList.increaseVotes(id);
            });

        });
    }

    

}

module.exports = Sockets;