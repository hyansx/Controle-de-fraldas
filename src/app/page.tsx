import { getStockStatus, getDeliveryAnalytics } from '@/lib/logic';
import Dashboard from '@/components/dashboard/Dashboard';

export const revalidate = 0; // Disable cache for real-time updates

export default async function Page() {
  const status = await getStockStatus();
  const analytics = await getDeliveryAnalytics();

  return (
    <Dashboard 
      status={status}
      analytics={analytics}
    />
  );
}
