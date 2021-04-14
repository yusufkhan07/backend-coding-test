import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { OutBlogsDto } from './dto/out-blogs.dto';

@Injectable()
export class BlogsService {
  constructor(
    private connection: Connection,
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const blog = new Blog();

    blog.title = createBlogDto.title;
    blog.description = createBlogDto.description;

    await this.connection.transaction(async (manager) => {
      await manager.save(blog);
    });

    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = new Blog();

    blog.id = id;
    blog.title = updateBlogDto.title;
    blog.description = updateBlogDto.description;

    await this.connection.transaction(async (manager) => {
      await manager.save(blog);
    });

    return blog;
  }

  async remove(id: number) {
    const blog = new Blog();

    blog.id = id;

    await this.blogRepository.remove(blog);
  }

  async findAll(curPage: number, perPage: number): Promise<OutBlogsDto> {
    const [count, blogs] = await Promise.all([
      this.blogRepository.count(),
      this.blogRepository.find({
        skip: (curPage - 1) * perPage,
        take: perPage,
      }),
    ]);

    return plainToClass<OutBlogsDto, OutBlogsDto>(
      OutBlogsDto,
      {
        blogs: blogs,
        meta: {
          curPage,
          perPage,
          totalPages: perPage > count ? 1 : Math.ceil(count / perPage),
          totalResults: count,
        },
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: number): Promise<Blog> {
    throw new Error('method not implemented');
  }
}
