import Footer from "@/home/layout/Footer";
import Layout from "@/home/layout/Layout";
import Navbar from "@/home/layout/Navbar";
import Banner from "./components/Banner";

import Stages from "./components/Stages";
import Landing from "./components/Landing";
// import Slider from './components/Slider'

function Main() {
  return (
    <Layout>
      <Navbar />
      <Landing />
      {/* <Banner />

      <Stages /> */}

      {/* <Footer /> */}
    </Layout>
  );
}

export default Main;
