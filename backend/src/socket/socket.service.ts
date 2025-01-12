import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { forwardRef, Inject, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { LocationService } from 'src/location/location.service';
import { PartyService } from 'src/party/party.service';

@WebSocketGateway(3002, { cors: 'http://localhost:5173/' })
export class SocketService implements OnModuleInit {
  constructor(
    private locationService: LocationService,
    @Inject(forwardRef(() => PartyService))
    private partyService: PartyService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      //   console.log(socket.id);
      //   console.log('Connected');
    });
  }

  @SubscribeMessage('onPartyUpdate')
  async handlePartyUpdate(
    @MessageBody()
    message: {
      userId?: number;
      location?: {
        latitude: number;
        longitude: number;
      };
      partyId?: number;
    },
  ) {
    if (message.userId && message.location) {
      await this.locationService.updateLocationForUser(
        message.userId,
        message.location,
      );
    }
    if (!message.partyId) {
      return;
    }
    const updatedParty = await this.partyService.getPartyById(message.partyId);
    this.sendMessage(updatedParty);
  }

  sendMessage(message: unknown) {
    this.server.emit('onPartyUpdate', message);
  }
}
