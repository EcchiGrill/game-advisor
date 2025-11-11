-- CreateTable
CREATE TABLE "Test" (
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" SERIAL NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("uid")
);
