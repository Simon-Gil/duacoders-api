import { IsOptional, IsString, IsInt, Min, Max, IsBoolean } from 'class-validator';

export class GetDuacodersQuery {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly departmentId?: string;

  @IsOptional()
  @IsBoolean()
  readonly withOnion?: boolean;

  @IsOptional()
  @IsString()
  readonly positionId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;
}