'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createDelivery(formData: FormData) {
  const quantity = parseInt(formData.get('quantity') as string);
  const receiverName = formData.get('receiverName') as string;
  const notes = formData.get('notes') as string;
  const dateStr = formData.get('date') as string;
  
  // Basic validation
  if (!quantity || quantity <= 0) {
    throw new Error('Quantidade inválida');
  }
  if (!receiverName) {
    throw new Error('Nome do responsável é obrigatório');
  }

  // Handle Date
  const date = dateStr ? new Date(dateStr) : new Date();

  // Handle Photo (Placeholder logic for V1 - Base64 or just note)
  // In a real app, upload to S3/Blob and get URL.
  // Here we just acknowledge it was "uploaded".
  const photo = formData.get('photo') as File;
  let photoUrl = null;
  if (photo && photo.size > 0) {
      // Simulate upload
      photoUrl = `local-upload-${Date.now()}.jpg`; 
  }

  await prisma.transaction.create({
    data: {
      type: 'IN',
      quantity,
      receiverName,
      date,
      notes,
      photoUrl, // Storing the "path" or null
    },
  });

  revalidatePath('/');
  redirect('/');
}
