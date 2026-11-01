import { About } from './components/About'
import { Contact } from './components/Contact'
import { ExperienceSection } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { TechStack } from './components/TechStack'

function App() {
  return (
    <div className="relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <ExperienceSection />
        <TechStack />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
