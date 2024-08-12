import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Injectable } from '@nestjs/common';
import { NotFountError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDTO: CreatePostDto): Promise<PostEntity> {
    const { authorEmail } = createPostDTO;

    delete createPostDTO.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    if (!user) {
      throw new NotFountError('Author not found');
    }

    const data: Prisma.PostCreateInput = {
      ...createPostDTO,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    return this.prisma.post.create({
      data,
    });
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.prisma.post.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePostDTO: UpdatePostDto): Promise<PostEntity> {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: updatePostDTO,
    });
  }

  async remove(id: number) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
