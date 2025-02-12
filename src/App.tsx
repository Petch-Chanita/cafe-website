import Navbar from "./components/Navbars";
import Home from "./components/Home";
import About from "./components/About";
import RecommendMenu from "./components/RecommendMenu";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

const App = () => {
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

export default App;