import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { RelationalChannelPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { ChannelsGateway } from './channels.gateway';
import { WsJwtGuard } from '../auth/transport/ws/guards/jwt.ws.guard';

@Module({
  imports: [RelationalChannelPersistenceModule, UsersModule],
  controllers: [ChannelsController],
  providers: [ChannelsService, ChannelsGateway, WsJwtGuard],
  exports: [ChannelsService, RelationalChannelPersistenceModule],
})
export class ChannelsModule {}
