import '@/styles/globals.css'; // koristiš alias @ prema jsconfig.json

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
