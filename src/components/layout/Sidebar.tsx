import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>Controle</div>

            <nav className={styles.nav}>
                <Link href="/" className={styles.navItem}>
                    <span>📊</span> Visão Geral
                </Link>
                <Link href="/delivery" className={styles.navItem}>
                    <span>📦</span> Registrar Entrada
                </Link>
                <Link href="/audit" className={styles.navItem}>
                    <span>📋</span> Histórico
                </Link>
                <Link href="/settings" className={styles.navItem}>
                    <span>⚙️</span> Configurações
                </Link>
            </nav>

            <div className={styles.footer}>
                <div className={styles.footerLink}>
                    Família Conectada ❤️
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
