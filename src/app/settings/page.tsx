import Link from 'next/link';
import { prisma } from '@/lib/db';
import { updateSettings } from './actions';
import styles from '../delivery/page.module.css'; // Reusing delivery styles for consistency

export default async function SettingsPage() {
  const settings = await prisma.systemSettings.findFirst() || { dailyConsumptionRate: 6, bufferDays: 15 };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Configurações Médicas</h1>
        <p style={{ color: '#718096' }}>Ajuste os parâmetros do Motor da Verdade.</p>
      </header>

      <form action={updateSettings} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="dailyRate" className={styles.label}>Consumo Diário Médio (Fraldas/Dia)</label>
          <input 
            type="number" 
            id="dailyRate" 
            name="dailyRate" 
            defaultValue={settings.dailyConsumptionRate} 
            min="1" 
            required 
            className={styles.input} 
          />
          <p style={{ fontSize: '0.8rem', color: '#718096' }}>Baseado na prescrição médica.</p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="bufferDays" className={styles.label}>Margem de Alerta (Dias)</label>
          <input 
            type="number" 
            id="bufferDays" 
            name="bufferDays" 
            defaultValue={settings.bufferDays} 
            min="1" 
            required 
            className={styles.input} 
          />
          <p style={{ fontSize: '0.8rem', color: '#718096' }}>Avisar quando o estoque durar menos que X dias.</p>
        </div>

        <button type="submit" className={styles.buttonSubmit}>
          💾 Salvar Configurações
        </button>
      </form>

      <Link href="/" className={styles.backLink}>
        ← Voltar ao Início
      </Link>
    </main>
  );
}
