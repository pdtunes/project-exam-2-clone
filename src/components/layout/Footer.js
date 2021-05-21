import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <img
        className={styles.logo}
        src="https://res.cloudinary.com/dgeiq2r6e/image/upload/v1618224103/holidaze/logob_c0orww.png"
        alt="Logo"
      />
      <p className={styles.footertext}>©2021</p>
    </div>
  );
}
