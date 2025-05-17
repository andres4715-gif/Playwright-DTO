import { test, expect } from '@playwright/test';
import { CommentService } from '../src/services/comment.service';
import { CommentDTO, CreateCommentDTO } from '../src/dtos/comment.dto';

test.describe('Comments API', () => {
  let commentService: CommentService;

  test.beforeEach(async () => {
    commentService = new CommentService();
    await commentService.init();
  });

  test.afterEach(async () => {
    await commentService.close();
  });

  test('[TEST] Should Obtain all the comments', async () => {
    const comments = await commentService.getAllComments();

    // We check that there are comments
    expect(comments.length).toBeGreaterThan(0);

    // We verify that the first comment has the correct structure
    const comment = comments[0];
    expect(comment.id).toBeDefined();
    expect(comment.postId).toBeDefined();
    expect(comment.name).toBeDefined();
    expect(comment.email).toBeDefined();
    expect(comment.body).toBeDefined();
  });

  test('debería obtener un comentario por id', async () => {
    const commentId = 1;
    const comment = await commentService.getCommentById(commentId);

    // We verify that the comment has the correct structure
    expect(comment.id).toBe(commentId);
    expect(comment.postId).toBeDefined();
    expect(comment.name).toBeDefined();
    expect(comment.email).toBeDefined();
    expect(comment.body).toBeDefined();
  });

  test('[TEST] Should get comments by post id', async () => {
    const postId = 1;
    const comments = await commentService.getCommentsByPostId(postId);

    // We check that there are comments
    expect(comments.length).toBeGreaterThan(0);

    // We verify that all comments belong to the post
    comments.forEach((comment) => {
      expect(comment.postId).toBe(postId);
    });
  });

  test('[TEST] Should make a comment', async () => {
    const newComment = new CreateCommentDTO(
      1,
      'Name of the test',
      'email@example.com',
      'This is the comment test'
    );

    const createdComment = await commentService.createComment(newComment);

    // We verify that the comment created has the correct structure
    expect(createdComment.id).toBeDefined();
    expect(createdComment.postId).toBe(newComment.postId);
    expect(createdComment.name).toBe(newComment.name);
    expect(createdComment.email).toBe(newComment.email);
    expect(createdComment.body).toBe(newComment.body);
  });
});
