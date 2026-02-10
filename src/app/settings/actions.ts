'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateSettings(formData: FormData) {
  const dailyRate = parseInt(formData.get('dailyRate') as string);
  const bufferDays = parseInt(formData.get('bufferDays') as string);
  
  if (dailyRate <= 0) throw new Error('Consumo diário deve ser positivo');

  // Upsert settings (ID 1 is fixed for singleton)
  await prisma.systemSettings.upsert({
    where: { id: 1 },
    update: { dailyConsumptionRate: dailyRate, bufferDays },
    create: { id: 1, dailyConsumptionRate: dailyRate, bufferDays },
  });

  revalidatePath('/');
  redirect('/');
}
