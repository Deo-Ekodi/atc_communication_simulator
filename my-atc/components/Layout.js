// components/Layout.js
import styles from '../pages/Layout.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>ATC and Pilot Communication</h1>
            </header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Airport Simulation</p>
            </footer>
        </div>
    );
};

export default Layout;
