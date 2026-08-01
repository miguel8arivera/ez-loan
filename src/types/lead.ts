import { z } from 'zod';

export const occupationTypes = ['dependiente', 'independiente'] as const;

export const leadFormSchema = z.object({
  salary: z.coerce
    .number({ message: 'Ingresa un monto válido' })
    .positive('El sueldo debe ser mayor a 0')
    .max(200000, 'Ingresa un monto realista'),
  occupationType: z.enum(occupationTypes, {
    message: 'Selecciona un tipo de ocupación',
  }),
  phone: z
    .string()
    .trim()
    .regex(/^9\d{8}$/, 'Ingresa un celular peruano válido (9 dígitos, empieza en 9)'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Ingresa un correo electrónico válido')
    .max(254, 'El correo es demasiado largo'),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
export type OccupationType = (typeof occupationTypes)[number];
