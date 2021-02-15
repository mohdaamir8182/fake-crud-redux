import Head from 'next/head'
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
   
    <div className={styles.container}>
      <Head>
        <title>Fake Crud</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h1>Welcome to Fake crud</h1>
        </div>
      </main>

      <footer className={styles.footer}>
          Copyright @abc.com
      </footer>
    </div>
  
  )
}
