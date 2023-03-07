import { IsOptional, IsString } from 'class-validator';

export class ProfileUpData {
  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
