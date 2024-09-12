import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

export class Channel {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdBy: User;
}
