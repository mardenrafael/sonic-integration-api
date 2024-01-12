import { Injectable, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostService {
  private readonly logger: Logger = new Logger(PostService.name);

  private readonly repository: Repository<Post>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Post);
  }

  public async create(post: Post): Promise<Post> {
    return await this.repository.save(post);
  }

  public async findOneById(use_id: number): Promise<Post> {
    return await this.repository.findOneBy({
      id: use_id,
    });
  }

  public async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<string> {
    this.logger.log(updatePostDto);
    return `This action updates a #${id} post`;
  }

  public async remove(id: number): Promise<void> {
    await this.repository.delete({
      id: id,
    });
  }
}
