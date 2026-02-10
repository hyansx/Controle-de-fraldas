'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BottomNav.module.css";

const BottomNav = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path ? styles.active : '';

    return (
        <nav className={styles.bottomNav}>
            <Link href="/" className={`${styles.navItem} ${isActive('/')}`}>
                <span>📊</span>
                Início
            </Link>
            <Link href="/delivery" className={`${styles.navItem} ${isActive('/delivery')}`}>
                <span>📦</span>
                Entrada
            </Link>
            <Link href="/audit" className={`${styles.navItem} ${isActive('/audit')}`}>
                <span>📋</span>
                Histórico
            </Link>
            <Link href="/settings" className={`${styles.navItem} ${isActive('/settings')}`}>
                <span>⚙️</span>
                Ajustes
            </Link>
        </nav>
    );
};

export default BottomNav;
