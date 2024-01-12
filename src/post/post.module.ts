import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { Post } from "./entities/post.entity";
import { PostBO } from "./bo/post.bo";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, PostBO],
})
export class PostModule {}
