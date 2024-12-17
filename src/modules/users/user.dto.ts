import { IsString, IsEmail, MinLength } from 'class-validator';

// Other DTOs needs to be added
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  mobileNumber: string;
}
