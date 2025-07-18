/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'USER', 'ADMIN');

-- Add temporary column with new enum type
ALTER TABLE "User" ADD COLUMN "role_new" "Role" NOT NULL DEFAULT 'USER';

-- Migrate existing data - map all non-standard roles to USER
UPDATE "User" SET "role_new" = 
  CASE 
    WHEN "role" = 'GUEST' THEN 'GUEST'::"Role"
    WHEN "role" = 'ADMIN' THEN 'ADMIN'::"Role"
    ELSE 'USER'::"Role"
  END;

-- Drop old column and rename new one
ALTER TABLE "User" DROP COLUMN "role";
ALTER TABLE "User" RENAME COLUMN "role_new" TO "role";
