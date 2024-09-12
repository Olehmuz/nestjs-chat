import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelRepository } from './infrastructure/persistence/channel.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Channel } from './domain/channel';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChannelsService {
  constructor(
    private readonly channelRepository: ChannelRepository,
    private usersService: UsersService,
  ) {}

  async create(createChannelDto: CreateChannelDto, userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }

    return this.channelRepository.create({
      ...createChannelDto,
      createdBy: user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.channelRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Channel['id']) {
    return this.channelRepository.findById(id);
  }

  update(id: Channel['id'], updateChannelDto: UpdateChannelDto) {
    return this.channelRepository.update(id, updateChannelDto);
  }

  remove(id: Channel['id']) {
    return this.channelRepository.remove(id);
  }
}
