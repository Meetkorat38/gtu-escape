import FeaturedPapers from "@/components/FeaturedPapers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SubjectGrid from "@/components/SubjectGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
        <Header/>
        <Hero/>
        <SubjectGrid/>
        <FeaturedPapers/>
        <Footer/>
    </div>
  );
}
