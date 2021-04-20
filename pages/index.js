import Head from "next/head";
import { LoveboxDropzone } from "../components/LoveboxDropzone";
import styles from "../styles/Home.module.css";

export default function Home({ uploadUrl, readUrl, imageId }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Lovebox Stash ❤️</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Lovebox Stash ❤️</h1>

                <p className={styles.description}>
                    Add cute photos to your Lovebox stash for The Girl
                </p>

                <LoveboxDropzone />
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <img
                        src="/vercel.svg"
                        alt="Vercel Logo"
                        className={styles.logo}
                    />
                </a>
            </footer>
        </div>
    );
}
