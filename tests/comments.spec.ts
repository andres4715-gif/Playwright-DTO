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

  test('debería obtener todos los comentarios', async () => {
    const comments = await commentService.getAllComments();

    // Verificamos que hay comentarios
    expect(comments.length).toBeGreaterThan(0);

    // Verificamos que el primer comentario tiene la estructura correcta
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

    // Verificamos que el comentario tiene la estructura correcta
    expect(comment.id).toBe(commentId);
    expect(comment.postId).toBeDefined();
    expect(comment.name).toBeDefined();
    expect(comment.email).toBeDefined();
    expect(comment.body).toBeDefined();
  });

  test('debería obtener comentarios por post id', async () => {
    const postId = 1;
    const comments = await commentService.getCommentsByPostId(postId);

    // Verificamos que hay comentarios
    expect(comments.length).toBeGreaterThan(0);

    // Verificamos que todos los comentarios pertenecen al post
    comments.forEach((comment) => {
      expect(comment.postId).toBe(postId);
    });
  });

  test('debería crear un comentario', async () => {
    const newComment = new CreateCommentDTO(
      1,
      'Nombre de prueba',
      'email@ejemplo.com',
      'Este es un comentario de prueba'
    );

    const createdComment = await commentService.createComment(newComment);

    // Verificamos que el comentario creado tiene la estructura correcta
    expect(createdComment.id).toBeDefined();
    expect(createdComment.postId).toBe(newComment.postId);
    expect(createdComment.name).toBe(newComment.name);
    expect(createdComment.email).toBe(newComment.email);
    expect(createdComment.body).toBe(newComment.body);
  });
});
