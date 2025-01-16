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
import { MessageBodyType } from './types/PartyUpdateMessageBody';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` });

@WebSocketGateway(3002, { cors: process.env.SOCKET_CORS_LINK })
export class SocketService implements OnModuleInit {
  constructor(
    private locationService: LocationService,
    @Inject(forwardRef(() => PartyService))
    private partyService: PartyService,
    private configService: ConfigService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Connection with id: ${socket.id} established`);
    });
  }

  @SubscribeMessage('onPartyUpdate')
  async handlePartyUpdate(
    @MessageBody()
    message: MessageBodyType,
  ) {
    if (!message) {
      return this.sendMessage(null);
    }
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

  sendMessage(message: MessageBodyType) {
    this.server.emit('onPartyUpdate', message);
  }
}
