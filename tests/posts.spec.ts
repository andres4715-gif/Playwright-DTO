import { test, expect } from '@playwright/test';
import { PostService } from '../src/services/post.service';
import { PostDTO, CreatePostDTO, UpdatePostDTO } from '../src/dtos/post.dto';

import { SchemaValidator } from '../src/validators/schema-validator';

import {
  postSchema,
  createPostSchema,
  updatePostSchema,
} from '../src/validators/post.validator';

test.describe('Posts API', () => {
  let postService: PostService;

  test.beforeEach(async () => {
    postService = new PostService();
    await postService.init();
  });

  test.afterEach(async () => {
    await postService.close();
  });

  test('[TEST] Should obtain all the post', async () => {
    const posts = await postService.getAllPosts();

    expect(posts.length).toBeGreaterThan(0);

    const validation = SchemaValidator.validate(posts[0], postSchema);
    expect(validation.success).toBeTruthy();
  });

  test('[TEST] Should obtain a post by id', async () => {
    const postId = 1;
    const post = await postService.getPostById(postId);

    // Check the Schema is correct
    const validation = SchemaValidator.validate(post, postSchema);
    expect(validation.success).toBeTruthy();

    //  We verify that the ID matches
    expect(post.id).toBe(postId);
  });

  test('[TEST] Should make a post', async () => {
    const newPost = new CreatePostDTO(
      1,
      'New test post',
      'This is the post content'
    );

    // Check the DTO is valid
    const dtoValidation = SchemaValidator.validate(newPost, createPostSchema);
    expect(dtoValidation.success).toBeTruthy();

    const createdPost = await postService.createPost(newPost);

    // Verify the post has the correct structure
    const validation = SchemaValidator.validate(createdPost, postSchema);
    expect(validation.success).toBeTruthy();

    // Verify the all data matches
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);

    // JSONPlaceholder always assign ID 101 for new posts
    expect(createdPost.id).toBe(101);
  });

  test('[TEST] Should delete a post', async () => {
    const postId = 1;

    // JSONPlaceholder does not actually delete  but it returns status code 200
    await postService.deletePost(postId);
  });
});
