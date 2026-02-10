import { prisma } from './db';

/**
 * Calculates the current physical stock based on all transactions.
 */
export async function getCurrentStock() {
  const result = await prisma.transaction.aggregate({
    _sum: {
      quantity: true,
    },
    where: {
      type: 'IN',
    },
  });

  const totalIn = result._sum.quantity || 0;

  const resultOut = await prisma.transaction.aggregate({
    _sum: {
      quantity: true,
    },
    where: {
      type: 'OUT',
    },
  });

  const totalOut = resultOut._sum.quantity || 0;

  return totalIn - totalOut;
}

/**
 * Calculates the expected stock based on the "Truth Engine" logic:
 * Total Delivered - (Days Passed * Daily Rate).
 * 
 * Note: This requires a "start date" or a specific logic window. 
 * For simplicity V1, we might calculate from the first delivery date.
 */
export async function getExpectedStock() {
  const firstDelivery = await prisma.transaction.findFirst({
    where: { type: 'IN' },
    orderBy: { date: 'asc' },
  });

  if (!firstDelivery) return 0;

  const totalDelivered = await prisma.transaction.aggregate({
    where: { type: 'IN' },
    _sum: { quantity: true },
  });

  const settings = await prisma.systemSettings.findFirst();
  const dailyRate = settings?.dailyConsumptionRate || 6;

  const daysSinceStart = Math.max(0, Math.floor((new Date().getTime() - new Date(firstDelivery.date).getTime()) / (1000 * 60 * 60 * 24)));
  
  const expectedConsumption = daysSinceStart * dailyRate;
  const totalIn = totalDelivered._sum.quantity || 0;

  return totalIn - expectedConsumption;
}

export async function getStockStatus() {
  const current = await getCurrentStock();
  const expected = await getExpectedStock();
  const settings = await prisma.systemSettings.findFirst();
  const dailyRate = settings?.dailyConsumptionRate || 6;
  
  const daysRemaining = dailyRate > 0 ? Math.floor(current / dailyRate) : 0;
  const depletionDate = new Date();
  depletionDate.setDate(depletionDate.getDate() + daysRemaining);

  return {
    currentStock: current,
    expectedStock: expected,
    dailyRate,
    daysRemaining,
    depletionDate,
    discrepancy: current - expected // Negative means missing items
  };
}

export async function getDeliveryAnalytics() {
  // Group by "Month/Year"
  // optimized: separate query for grouping if prisma supported it well for sqlite dates, but we can at least optimize the fetch
  // For SQLite, standard groupBy on date parts is tricky without raw queries or pulling data. 
  // However, we can fetch only necessary fields.
  
  const transactions = await prisma.transaction.findMany({
    where: { type: 'IN' },
    orderBy: { date: 'asc' },
    select: { date: true, quantity: true } // Reduce payload
  });

  const monthlyData: Record<string, number> = {};
  
  // Group by "Last 7 Deliveries" for detailed view
  const recentDeliveries = transactions.slice(-7).map((t) => ({
    date: new Date(t.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    quantity: t.quantity,
  }));

  let currentMonthTotal = 0;
  const now = new Date();
  
  for (const t of transactions) {
     const date = new Date(t.date);
     const key = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
     
     if (!monthlyData[key]) monthlyData[key] = 0;
     monthlyData[key] += t.quantity;

     if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
       currentMonthTotal += t.quantity;
     }
  }

  // Convert map to array for Recharts
  const monthlyChartData = Object.entries(monthlyData).map(([name, total]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize
    total
  }));

  return {
    recentDeliveries,
    monthlyChartData,
    currentMonthTotal
  };
}
