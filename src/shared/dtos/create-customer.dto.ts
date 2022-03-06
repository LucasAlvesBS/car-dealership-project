import {
  IsNotEmpty,
  Matches,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateCustomerDto {
  @IsNotEmpty()
  @Matches(RegexHelper.fullName, { message: MessageHelper.FULL_NAME_VALID })
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: MessageHelper.PASSWORD_MIN_VALID })
  @MaxLength(30, { message: MessageHelper.PASSWORD_MAX_VALID })
  @Matches(RegexHelper.password, { message: MessageHelper.PASSWORD_VALID })
  password: string;
}
