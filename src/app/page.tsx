import { FeaturesPreview } from "./components/features-preview";
import { Footer } from "./components/footer";
import { HeroSection } from "./components/hero-section";
import { Navbar } from "./components/navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesPreview />
      <Footer />
    </main>
  )
}
