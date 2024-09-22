import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ATC and Pilot Communication</h1>
      <p className={styles.description}>Choose your role to begin:</p>
      <div className={styles.buttons}>
        <Link href="/pilot">
          <button className={styles.btn}>Join as Pilot</button>
        </Link>
        <Link href="/atc">
          <button className={styles.btn}>Join as ATC</button>
        </Link>
      </div>
    </div>
  );
}
