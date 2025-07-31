import { AuthService } from "./auth.service";
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { signToken } from '../utils/jwt';
import { Role } from '@prisma/client';
import { AppError } from '../errors/AppError';
import { jest } from '@jest/globals';

jest.mock('bcrypt');
//jest.mock('../lib/prisma');
jest.mock('../utils/jwt');
jest.mock('../errors/AppError');
jest.mock('../lib/prisma', () => ({
    prisma: {
        user: {
            create: jest.fn(() => Promise.resolve({
                id: "123",
                name: "Test User",
                email: "test@test.com",
                password: "hashed_password",
                role: Role.USER,
                avatar: null,
                bio: null,
                createdAt: new Date(),
                updatedAt: new Date()
            })),
            findUnique: jest.fn(),
        }
    }
}));

describe("AuthService", () => {
    const mockUser = {
        id: "123",
        name: "Test User",
        email: "test@test.com",
        password: "hashed_password",
        role: Role.USER,
        avatar: null,
        bio: null,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const mockToken = "token_jwt_super_seguro";

    beforeEach(() => {
        jest.clearAllMocks();
        (signToken as jest.Mock).mockReturnValue(mockToken);
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password' as never);
    });


    describe('register', () => {
        const registerData = {
            name: "Test User",
            email: "test@test.com",
            password: "password123"
        };

        it('Deberia registrar un nuevo usuario', async () => {
            // Arrange
            //(prisma.user.create as jest.Mock).mockResolvedValue(mockUser as never);

            // Act
            const result = AuthService.register(registerData);

            // Assert
            expect(bcrypt.hash).toHaveBeenCalledWith(registerData.password, 10);
            expect(await prisma.user.create).toHaveBeenCalledWith({ data: { ...registerData, 
                password: 'hashed_password', role: Role.USER } } as never);
            expect(signToken).toHaveBeenCalledWith({ id: mockUser.id, role: mockUser.role });
            expect(result).toBe(mockToken);

        });
    });
});