import { z } from 'zod';

export const CreateUserDto = z.object({
 name: z.string()
 .min(2, 'El nombre debe tener al menos 2 caracteres')
 .max(50, 'El nombre no puede exceder 50 caracteres'),
 
 email: z.string()
 .email('Formato de email inválido')
 .toLowerCase(),
 
 age: z.number()
 .int('La edad debe ser un número entero')
 .min(18, 'Edad mínima: 18 años')
 .max(120, 'Edad máxima: 120 años'),
 
 password: z.string()
 .min(8, 'La contraseña debe tener al menos 8 caracteres')
 .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
 'Debe incluir mayúscula, minúscula y número')
});

export type CreateUserType = z.infer<typeof CreateUserDto>;