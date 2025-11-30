-- CreateTable
CREATE TABLE "video_game" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "genero" VARCHAR(100) NOT NULL,
    "plataforma" VARCHAR(100) NOT NULL,
    "fecha_lanzamiento" TIMESTAMPTZ NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "video_game_pkey" PRIMARY KEY ("id")
);
