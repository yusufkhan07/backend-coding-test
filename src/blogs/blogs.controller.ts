import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseIntPipe,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiQuery,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { Roles, Role, RolesGuard } from '../roles';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @ApiOperation({
    description: 'Add Random string in all blog titles at the end',
  })
  @HttpCode(204)
  @Post('randomize-titles')
  randomizeTitles(): Promise<void> {
    return this.blogsService.randomizeTitles();
  }

  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('firebase'), RolesGuard)
  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @ApiQuery({
    name: 'per_page',
    required: false,
    type: Number,
    description: 'Number of results to return per page',
  })
  @ApiQuery({
    name: 'cur_page',
    required: false,
    type: Number,
    description:
      'A page number within the paginated result set (starts from 1)',
  })
  @Get()
  findAll(
    @Query('per_page') perPage?: number,
    @Query('cur_page') curPage?: number,
  ) {
    return this.blogsService.findAll(curPage || 1, perPage || 10);
  }

  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
    const found = await this.blogsService.findOne(+id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('firebase'), RolesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<Partial<Blog>> {
    return this.blogsService.update(+id, updateBlogDto);
  }

  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('firebase'), RolesGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    console.log(typeof id);
    return this.blogsService.remove(+id);
  }
}
