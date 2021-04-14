import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

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

  // can be viewed by admins & users.
  findAll() {
    // list all blogs with pagination.
    return `This action returns all blogs`;
  }

  async findOne(id: number): Promise<Blog> {
    throw new Error('method not implemented');
  }
}
