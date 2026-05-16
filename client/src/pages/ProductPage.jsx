import Navbar2 from "../components/Navbar2"
import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import WhyPollSync from "../components/WhyPollSync";
import Features from "../components/Features";
import Screenshots from "../components/Screenshots";
import Workflow from "../components/Workflow";
import UseCases from "../components/UseCases";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import LiveSimulator from "../components/LiveSimulator";

const ProductPage = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] font-sans antialiased selection:bg-[#DBEAFE] selection:text-[#097FE8]">
      <Navbar2 scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <ProblemSolution />
      <WhyPollSync />
      <LiveSimulator/>
      <Features />
      <Screenshots />
      <Workflow />
      <UseCases />
      <Testimonial />
      <FAQ />
      <CTA scrollToSection={scrollToSection} />
      <Footer />
    </div>
  );
};

export default ProductPage;