import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
//hehe
import { Calcu } from '@/components/Calcu';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PrimaryFeatures } from '@/components/PrimaryFeatures';
import { SecondaryFeatures } from '@/components/SecondaryFeatures';

export default function Home() {
  const router = useRouter();
  let user = {};
  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem('user'));
  }

  useEffect(() => {
    // Redirect to initial page if no user data available
    if (!user || !user.email) {
      router.push('/'); // Replace '/' with the route to your initial page
    }
  }, []);

  return (
    <>
      <Head>
        <title>Gisca</title>
        <meta
          name="description"
          content="By leveraging insights our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses."
        />
      </Head>
      <Header />
      <main>
        <PrimaryFeatures />
        <SecondaryFeatures />
        <Calcu />
      </main>
      <Footer />
    </>
  );
}