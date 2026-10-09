import { useState } from 'react'

import { About } from './components/About'
import { Consulting } from './components/Consulting'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Work } from './components/Work'

export default function App() {
  // Shared so "Discuss this" on a service card can preselect the contact form topic.
  const [service, setService] = useState('')

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Work />
        <Consulting onSelectService={setService} />
        <About />
        <Contact service={service} onServiceChange={setService} />
      </main>
      <Footer />
    </>
  )
}
