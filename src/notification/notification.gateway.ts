import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  MessageBody,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private jwtService: JwtService) {}
  private logger: Logger = new Logger('NotificationGateway');

  @WebSocketServer()
  server: Server;
  users = 0;

  async handleConnection(socket: Socket) {
    const user = await this.jwtService.verifyAsync(
      socket.handshake.query.token as string,
      { secret: process.env.JWT_ACCESS_TOKEN_SECRET },
    );

    socket.handshake.query.email = user.email;
    socket.join(user.role);
  }

  afterInit(server) {
    this.logger.log('initialized');
    this.logger.log(server);
  }

  async handleDisconnect() {
    // A client has disconnected
    this.users--;

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('notification')
  async onMessage(@MessageBody() body: any) {
    this.logger.log(body);
  }
}
