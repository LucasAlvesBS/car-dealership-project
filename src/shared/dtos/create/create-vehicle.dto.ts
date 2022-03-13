import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  passengers: number;
}
