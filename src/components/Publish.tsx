import Navbar from "./Navbars";
import Home from "./Home";
import About from "./About";
import RecommendMenu from "./RecommendMenu";
import Footer from "./Footer";
import Menu from "./Menu";

const Publish = () => {
  console.log("Publish component is rendered!");
  return (
    <div className="pg-[#F8FAFD]">
      <Navbar />

      <main >
        <section id="home">
          <Home />
        </section>

        <section id="recommend">
          <RecommendMenu />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="menu">
          <Menu />
        </section>
        
        
      </main>

      <Footer />
    </div>

  );
};

export default Publish;