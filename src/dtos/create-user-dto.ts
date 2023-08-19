import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  username: string;

  @IsUrl()
  @IsString()
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  avatar: string;
}
