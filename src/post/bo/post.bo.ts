import { Inject, Injectable, Logger } from "@nestjs/common";
import { UpdatePostDto } from "../dto/update-post.dto";
import { Post } from "../entities/post.entity";
import { PostService } from "../post.service";
import { CreatePostDto } from "../dto/create-post.dto";

@Injectable()
export class PostBO {
  private readonly logger: Logger = new Logger(PostBO.name);

  private post: Post;
  private started: boolean;

  constructor(@Inject() private readonly postService: PostService) {}

  public start(): void {
    this.post = new Post();
  }

  public async load(id: number): Promise<void> {
    this.post = await this.postService.findOneById(id);
  }

  public setData(createPostDto: CreatePostDto): void {
    if (this.started === false) {
      throw new Error("Não iniciou o BO corretamente!");
    }
    this.post.content = createPostDto.getContent();
    this.post.title = createPostDto.getTitle();
    this.post.user = createPostDto.getUser();
  }

  public updateData(updatePostDto: UpdatePostDto): void {
    if (this.started === false) {
      throw new Error("Não iniciou o BO corretamente!");
    }

    this.post.content = updatePostDto.getContent();
    this.post.title = updatePostDto.getTitle();
    this.post.user = updatePostDto.getUser();
  }

  public async save(): Promise<void> {
    this.post = await this.postService.create(this.post);
  }

  public async remove(): Promise<void> {
    await this.postService.remove(this.post.id);
  }

  public getPost(): Post {
    return this.post;
  }
}
