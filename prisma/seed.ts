import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from './generated/client';

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

const videoGameData: Prisma.VideoGameCreateInput[] = [
  {
    nombre: 'The Legend of Zelda: Breath of the Wild',
    genero: 'Action-adventure',
    plataforma: 'Nintendo Switch',
    fecha_lanzamiento: new Date('2017-03-03'),
    precio: 59.99,
  },
  {
    nombre: 'God of War',
    genero: 'Action-adventure',
    plataforma: 'PlayStation 4',
    fecha_lanzamiento: new Date('2018-04-20'),
    precio: 39.99,
  },
  {
    nombre: 'Red Dead Redemption 2',
    genero: 'Action-adventure',
    plataforma: 'PlayStation 4, Xbox One, PC',
    fecha_lanzamiento: new Date('2018-10-26'),
    precio: 59.99,
  },
];

async function main() {
  console.log('Seeding database with videogame data...');

  await prisma.videoGame.deleteMany();
  for (const game of videoGameData) {
    const vg = await prisma.videoGame.create({ data: game });
    console.log(`Created videogame with id: ${vg.id}`);
  }
  console.log('Seeding completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
