import { test, expect } from '@playwright/test';
import { PostService } from '../src/services/post.service';
import { PostDTO, CreatePostDTO, UpdatePostDTO } from '../src/dtos/post.dto';

// Corrige la ruta de importación del SchemaValidator
import { SchemaValidator } from '../src/validators/schema-validator';

// Corrige también la ruta para los esquemas
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

  test('debería obtener todos los posts', async () => {
    const posts = await postService.getAllPosts();

    // Verificamos que hay posts
    expect(posts.length).toBeGreaterThan(0);

    // Verificamos que el primer post tiene la estructura correcta
    const validation = SchemaValidator.validate(posts[0], postSchema);
    expect(validation.success).toBeTruthy();
  });

  test('debería obtener un post por id', async () => {
    const postId = 1;
    const post = await postService.getPostById(postId);

    // Verificamos que el post tiene la estructura correcta
    const validation = SchemaValidator.validate(post, postSchema);
    expect(validation.success).toBeTruthy();

    // Verificamos que el ID coincide
    expect(post.id).toBe(postId);
  });

  test('debería crear un post', async () => {
    const newPost = new CreatePostDTO(
      1,
      'Nuevo post de prueba',
      'Este es el contenido del post'
    );

    // Verificamos que el DTO es válido
    const dtoValidation = SchemaValidator.validate(newPost, createPostSchema);
    expect(dtoValidation.success).toBeTruthy();

    const createdPost = await postService.createPost(newPost);

    // Verificamos que el post creado tiene la estructura correcta
    const validation = SchemaValidator.validate(createdPost, postSchema);
    expect(validation.success).toBeTruthy();

    // Verificamos que los datos coinciden
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);

    // JSONPlaceholder siempre asigna el ID 101 a los nuevos posts
    expect(createdPost.id).toBe(101);
  });

  test('debería eliminar un post', async () => {
    const postId = 1;

    // JSONPlaceholder no elimina realmente el post pero devuelve 200
    await postService.deletePost(postId);

    // No hacemos assert ya que si no hay error, consideramos que la prueba pasó
  });
});
