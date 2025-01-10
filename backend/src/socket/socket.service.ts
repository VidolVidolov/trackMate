import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway(3002, { cors: 'http://localhost:5173/' })
export class SocketService implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      //   console.log(socket.id);
      //   console.log('Connected');
    });
  }

  @SubscribeMessage('onPartyUpdate')
  handlePartyUpdate(@MessageBody() message: unknown) {
    console.log(message);

    // this.sendMessage(message);
  }

  sendMessage(message: unknown) {
    this.server.emit('onPartyUpdate', { partyInfo: message });
  }
}
