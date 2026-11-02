import { About } from './components/About'
import { CinematicBackground } from './components/CinematicBackground'
import { Contact } from './components/Contact'
import { CustomCursor } from './components/CustomCursor'
import { ExperienceSection } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { SectionFade } from './components/SectionFade'
import { SmoothScroll } from './components/SmoothScroll'
import { TechStack } from './components/TechStack'

function App() {
  return (
    <div className="relative min-h-screen">
      <CinematicBackground />
      <SmoothScroll />
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true" />

      <div className="relative z-10">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main">
          <SectionFade>
            <Hero />
          </SectionFade>
          <SectionFade>
            <About />
          </SectionFade>
          <SectionFade>
            <ExperienceSection />
          </SectionFade>
          <SectionFade>
            <TechStack />
          </SectionFade>
          <SectionFade>
            <Projects />
          </SectionFade>
          <SectionFade>
            <Contact />
          </SectionFade>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App
