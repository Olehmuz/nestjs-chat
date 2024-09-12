import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { Channel } from '../../../../domain/channel';
import { ChannelEntity } from '../entities/channel.entity';

export class ChannelMapper {
  static toDomain(raw: ChannelEntity): Channel {
    const domainEntity = new Channel();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.name = raw.name;
    domainEntity.createdBy = UserMapper.toDomain(raw.createdBy);

    return domainEntity;
  }

  static toPersistence(domainEntity: Channel): ChannelEntity {
    const persistenceEntity = new ChannelEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.createdBy = UserMapper.toPersistence(
      domainEntity.createdBy,
    );

    return persistenceEntity;
  }
}
