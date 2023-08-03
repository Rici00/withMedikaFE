import Head from 'next/head'

import { Calcu } from '@/components/Calcu'
import { Calcu1 } from '@/components/Calcu1'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
export default function Home() {
  return (
    <>
      <Head>
        <title>Gisca</title>
        <meta
          name="description"
          content="By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <Calcu1 />
      </main>
      <Footer />
    </>
  )
}
