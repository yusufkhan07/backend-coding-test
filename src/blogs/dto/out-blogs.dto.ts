import { Type, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { Blog } from '../entities/blog.entity';

class PaginationMetaDto {
  @ApiProperty({ type: Number, description: 'Per Page Results' })
  @Expose()
  perPage: number;

  @ApiProperty({ type: Number, description: 'Total Pages' })
  @Expose()
  totalPages: number;

  @ApiProperty({ type: Number, description: 'Total Results' })
  @Expose()
  totalResults: number;

  @ApiProperty({ type: Number, description: 'Current Page' })
  @Expose()
  curPage: number;
}

export class OutBlogsDto {
  @Type(() => Blog)
  @ApiProperty({ type: Blog, isArray: true })
  @Expose()
  blogs: Blog[];

  @Type(() => PaginationMetaDto)
  @ApiProperty({ type: PaginationMetaDto })
  @Expose()
  meta: PaginationMetaDto;
}
