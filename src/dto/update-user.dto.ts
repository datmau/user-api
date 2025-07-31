import { z } from 'zod';

export const UpdateUserDto = z.object({
 name: z.string()
 .min(2, 'El nombre debe tener al menos 2 caracteres')
 .max(50, 'El nombre no puede exceder 50 caracteres')
 .optional(),
 
 email: z.string()
 .email('Formato de email inválido')
 .toLowerCase()
 .optional(),
 
 age: z.number()
 .int('La edad debe ser un número entero')
 .min(18, 'Edad mínima: 18 años')
 .max(120, 'Edad máxima: 120 años')
 .optional(),
 }).strict(); // No permite campos adicionales

export type UpdateUserType = z.infer<typeof UpdateUserDto>;