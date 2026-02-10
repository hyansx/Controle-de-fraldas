'use client';

import Link from 'next/link';
import styles from './Dashboard.module.css';
import DeliveryChart from '../analytics/DeliveryChart';
import WhatsAppButton from '../ui/WhatsAppButton';

interface DashboardProps {
  status: {
    currentStock: number;
    daysRemaining: number;
    dailyRate: number;
    depletionDate: Date;
    expectedStock: number;
    discrepancy: number;
  };
  analytics: {
    currentMonthTotal: number;
    recentDeliveries: { date: string; quantity: number }[];
  };
}

const Dashboard = ({ status, analytics }: DashboardProps) => {
  // Determine Status State
  let bgClass = styles.bgSuccess;
  let heroMessage = "Estoque Tranquilo ✅";
  
  if (status.daysRemaining < 7) {
    bgClass = styles.bgCritical;
    heroMessage = "Estoque Crítico 🚨";
  } else if (status.daysRemaining < 15) {
    bgClass = styles.bgWarning;
    heroMessage = "Atenção ⚠️";
  }

  return (
    <main className={styles.mainContent}>
      
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.greeting}>Bem-vindo Família</div>
        <h1 className={styles.title}>Controle de Fraldas</h1>
      </header>

      {/* Hero Card - The One Thing that Matters */}
      <section className={`${styles.heroCard} ${bgClass}`}>
        <div className={styles.heroLabel}>Resta estoque para</div>
        <div className={styles.heroValue}>{status.daysRemaining}</div>
        <div className={styles.heroUnit}>dias</div>
        <div className={styles.heroMessage}>{heroMessage}</div>
      </section>

      {/* Quick Stats */}
      <div className={styles.statsRow}>
         <div className={styles.statCard}>
            <div className={styles.statValue}>{status.currentStock}</div>
            <div className={styles.statLabel}>Pacotes/Unid</div>
         </div>
         <div className={styles.statCard}>
            <div className={styles.statValue}>{status.dailyRate}</div>
            <div className={styles.statLabel}>Uso por dia</div>
         </div>
      </div>

      {/* Primary Action - Big Button */}
      <nav className={styles.actionZone}>
        <Link href="/delivery" className={styles.bigButton}>
          <span>📦</span> Registrar Chegada
        </Link>
      </nav>

      {/* Chart - Hidden details, manageable */}
      <section className={styles.chartContainer}>
        <DeliveryChart data={analytics.recentDeliveries} title="Histórico Recente" />
      </section>

      <Link href="/audit" className={styles.historyLink}>
        Ver histórico completo
      </Link>

      <WhatsAppButton data={{
        daysRemaining: status.daysRemaining,
        currentStock: status.currentStock,
        currentMonthTotal: analytics.currentMonthTotal,
        depletionDate: status.depletionDate
      }} />
    </main>
  );
};

export default Dashboard;
