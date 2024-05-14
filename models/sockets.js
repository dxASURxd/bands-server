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

            // Emitir al cliente todas las bandas actuales
            socket.emit('currentBands', this.bandList.getBands() );
        
            socket.on('voteBand', (id) => {
                this.bandList.increaseVotes(id);
                this.io.emit('currentBands', this.bandList.getBands() );
            });

            socket.on('delBand', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('currentBands', this.bandList.getBands() );
            });

            socket.on('changName', ({id, name}) => {
                this.bandList.changeName(id, name);
                this.io.emit('currentBands', this.bandList.getBands() );
            });

            socket.on('create-band', ({name}) => {
                this.bandList.addBand(name);
                this.io.emit('currentBands', this.bandList.getBands() );
            });

        });
    }

}

module.exports = Sockets;