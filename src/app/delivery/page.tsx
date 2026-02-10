import Link from 'next/link';
import { createDelivery } from './actions';
import styles from './page.module.css';

export default function DeliveryPage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Registrar Entrada</h1>
        <p className={styles.subtitle}>Documente o recebimento de fraldas.</p>
      </header>

      <form action={createDelivery} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="date" className={styles.label}>Data da Entrega</label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            required 
            defaultValue={new Date().toISOString().split('T')[0]} 
            className={styles.input} 
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="receiverName" className={styles.label}>Quem Recebeu?</label>
          <input 
            type="text" 
            id="receiverName" 
            name="receiverName" 
            placeholder="Ex: Maria" 
            required 
            className={styles.input} 
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantity" className={styles.label}>Quantidade</label>
          <input 
            type="number" 
            id="quantity" 
            name="quantity" 
            placeholder="0" 
            min="1" 
            required 
            className={styles.input} 
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="photo" className={styles.label}>Foto (Opcional)</label>
          <input 
            type="file" 
            id="photo" 
            name="photo" 
            accept="image/*" 
            className={styles.input} 
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="notes" className={styles.label}>Observações</label>
          <input 
            id="notes" 
            name="notes" 
            placeholder="Alguma avaria?" 
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.buttonSubmit}>
          Confirmar Entrada
        </button>
      </form>

      <Link href="/" className={styles.backLink}>
        Cancelar
      </Link>
    </main>
  );
}
