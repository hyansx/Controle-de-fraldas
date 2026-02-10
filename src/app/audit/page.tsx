import Link from 'next/link';
import { prisma } from '@/lib/db';
import styles from './page.module.css';
import DeleteTransactionButton from './DeleteTransactionButton';

export const revalidate = 0;

export default async function AuditPage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
  });

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Histórico</h1>
        <p className={styles.subtitle}>Registro de entradas e saídas.</p>
      </header>

      <div className={styles.list}>
        {transactions.length === 0 && (
          <div className={styles.emptyState}>
            <div style={{ fontSize: '3rem' }}>📭</div>
            <p>Nenhum registro encontrado ainda.</p>
          </div>
        )}

        {transactions.map((t) => {
          const dateObj = new Date(t.date);
          const day = dateObj.toLocaleDateString('pt-BR', { day: '2-digit' });
          const month = dateObj.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
          const time = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

          const isEntry = t.type === 'IN';
          const qtySign = isEntry ? '+' : '-';
          const qtyClass = isEntry ? styles.badgeIn : styles.badgeOut;

          return (
            <div key={t.id} className={styles.card}>
              <div className={styles.cardLeft}>
                <div className={styles.dateBlock}>
                  <span className={styles.day}>{day}</span>
                  <span className={styles.month}>{month}</span>
                </div>
                <div className={styles.details}>
                  <div className={styles.receiver}>{t.receiverName || 'Sistema'}</div>
                  {t.notes && <span className={styles.notes}>{t.notes}</span>}
                  {!t.notes && isEntry && <span className={styles.notes}>Entrada de Estoque</span>}
                  {!t.notes && !isEntry && <span className={styles.notes}>Consumo Diário</span>}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className={styles.cardRight}>
                  <div className={`${styles.quantity} ${qtyClass}`}>
                    {qtySign}{t.quantity}
                  </div>
                  <div className={styles.time}>{time}</div>
                </div>
                <DeleteTransactionButton id={t.id} />
              </div>
            </div>
          );
        })}
      </div>

      <Link href="/" className={styles.backLink}>
        Voltar ao Início
      </Link>
    </main>
  );
}
