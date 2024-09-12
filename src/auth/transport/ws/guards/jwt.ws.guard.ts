import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WsJwtGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const authToken = client.handshake?.headers?.authorization?.split(' ')[1];
    console.log('authToken', authToken);
    if (!authToken) {
      throw new UnauthorizedException('Missing authorization token');
    }
    client.handshake.headers.authorization = `Bearer ${authToken}`;
    return client.handshake;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
