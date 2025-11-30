import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('VideogameController (e2e)', () => {
  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  let createdId: number;

  // beforeAll(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  // afterAll(async () => {
  //   await app.close();
  // });

  it('/videogame (POST)', () => {
    return request(appUrl)
      .post('/videogame')
      .send({
        nombre: 'Test Game',
        genero: 'Test Genre',
        plataforma: 'Test Platform',
        fechaLanzamiento: new Date().toISOString(),
        precio: 29.99,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        createdId = response.body.id;
      });
  });

  it('/videogame (GET)', () => {
    return request(appUrl)
      .get('/videogame')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  it('/videogame/:id (GET)', () => {
    return request(appUrl)
      .get(`/videogame/${createdId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id', createdId);
        expect(response.body).toHaveProperty('nombre', 'Test Game');
      });
  });

  it('/videogame/:id (PATCH)', () => {
    return request(appUrl)
      .patch(`/videogame/${createdId}`)
      .send({
        precio: 19.99,
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('precio', 19.99);
      });
  });

  it('/videogame/:id (DELETE)', () => {
    return request(appUrl)
      .delete(`/videogame/${createdId}`)
      .expect(200);
  });
});
