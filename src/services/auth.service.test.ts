import { AuthService } from "./auth.service";
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { signToken } from '../utils/jwt';
import { Role } from '@prisma/client';
import { AppError } from '../errors/AppError';
import { jest } from '@jest/globals';

jest.mock('bcrypt');
//jest.mock('../lib/prisma');
jest.mock('../utils/jwt', () => ({
    signToken: jest.fn(),
}));
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
            findUnique: jest.fn(()=> Promise.resolve({
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
    const mockSignToken = signToken as jest.MockedFunction<typeof signToken>;
    beforeEach(() => {
        jest.clearAllMocks();
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
            mockSignToken.mockReturnValue(mockToken);
            //(prisma.user.create as jest.Mock).mockResolvedValue(mockUser as never);

            // Act
            const result = await AuthService.register(registerData);

            // Assert
            expect(bcrypt.hash).toHaveBeenCalledWith(registerData.password, 10);
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: {
                    ...registerData,
                    password: 'hashed_password', role: Role.USER
                }
            } as never);
            expect(signToken).toHaveBeenCalledWith({ id: mockUser.id, role: mockUser.role });
            expect(result).toBe(mockToken);

        });
    });

    describe('login', () => {
        it('Deberia iniciar sesión con credenciales válidas', async () => {
            // Arrange
            const email = "test@test.com";
            const password = "password123";
            mockSignToken.mockReturnValue(mockToken);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true as never);

            // Act
            const result = await AuthService.login(email, password);

            // Assert
            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
            expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
            expect(signToken).toHaveBeenCalledWith({ id: mockUser.id, role: mockUser.role });
            expect(result).toEqual({token: mockToken, id: mockUser.id, email: mockUser.email, role: mockUser.role, name: mockUser.name});
        });

        it('Deberia lanzar un error si las credenciales son inválidas', async () => {
            // Arrange
            const email = "test@test.com";
            const password = "wrongpassword";
            (bcrypt.compare as jest.Mock).mockResolvedValue(false as never);


            // Act & Assert
            await expect(AuthService.login(email, password)).rejects.toThrow(AppError);
            expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
        });
    });
});