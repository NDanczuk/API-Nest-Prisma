import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User`s email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User`s name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Defines if user is admin', default: false })
  @IsBoolean()
  admin: boolean;
}
