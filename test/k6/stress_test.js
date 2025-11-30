import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    scenarios: {
        stressTest: {
            executor: 'ramping-vus',
            startVus: 50,
            stages: [
                // Implementación deseada
                // { duration: '20s', target: 100 }, // Ramp up to 100 users
                // { duration: '20s', target: 100 }, // Stay at 100 users
                // { duration: '20s', target: 200 }, // Ramp up to 200 users
                // { duration: '20s', target: 200 }, // Stay at 200 users
                // { duration: '20s', target: 300 }, // Ramp up to 300 users
                // { duration: '20s', target: 300 }, // Stay at 300 users
                // { duration: '20s', target: 50 }, 

                // Implementación realizada debido a la limitación establecida por Grafana Cloud (100 usuarios concurrentes)
                { duration: '20s', target: 50 }, // Ramp up to 50 users
                { duration: '20s', target: 50 }, // Stay at 50 users
                { duration: '20s', target: 70 }, // Ramp up to 70 users
                { duration: '20s', target: 70 }, // Stay at 70 users
                { duration: '20s', target: 100 }, // Ramp up to 100 users
                { duration: '20s', target: 100 }, // Stay at 100 users
                { duration: '20s', target: 50 },
            ],

        },
    },
    thresholds: {
        http_req_duration: ['p(95)<500'],
    },      
    cloud: {
        projectID: '5888033',
    }
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  // 1. Create
  const payload = JSON.stringify({
    nombre: `Game ${__VU}-${__ITER}`,
    genero: 'Action',
    plataforma: 'PC',
    fechaLanzamiento: new Date().toISOString(),
    precio: 59.99,
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  let res = http.post(`${BASE_URL}/videogame`, payload, params);
  check(res, { 'created status is 201': (r) => r.status === 201 });
  
  let id;
  try {
      if (res.status === 201) {
          id = res.json('id');
      }
  } catch (e) {
      console.error('Failed to parse response body', e);
  }

  // 2. Get All
  res = http.get(`${BASE_URL}/videogame`);
  check(res, { 'get all status is 200': (r) => r.status === 200 });

  if (id) {
      // 3. Get One
      res = http.get(`${BASE_URL}/videogame/${id}`, { tags: { name: 'GetOneVideogame' } });
      check(res, { 'get one status is 200': (r) => r.status === 200 });

      // 4. Patch
      const updatePayload = JSON.stringify({
          precio: 49.99,
      });
      res = http.patch(`${BASE_URL}/videogame/${id}`, updatePayload, { headers: params.headers, tags: { name: 'PatchVideogame' } });
      check(res, { 'patch status is 200': (r) => r.status === 200 });

      // 5. Delete
      res = http.del(`${BASE_URL}/videogame/${id}`, null, { tags: { name: 'DeleteVideogame' } });
      check(res, { 'delete status is 200': (r) => r.status === 200 });
  }

  sleep(1);
}
