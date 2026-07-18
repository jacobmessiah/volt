import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class GetProductsDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  priceMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  priceMax?: number;

  /** sizes=8&sizes=9  →  [8, 9] */
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map(Number)
      : [Number(value)],
  )
  sizes?: number[];

  /** tags=running&tags=casual  →  ['running', 'casual'] */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value : [value],
  )
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isNew?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  ratingMin?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10))
  page?: number;
}
