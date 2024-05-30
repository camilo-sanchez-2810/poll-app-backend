import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class VoterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
