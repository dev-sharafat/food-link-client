import { Helmet } from "react-helmet";
import Banner from "../../components/HomeComponents/Banner";
import CherityRequest from "../../components/HomeComponents/CherityRequest";
import CommunityStories from "../../components/HomeComponents/CommunityStories ";
import Featured from "../../components/HomeComponents/Featured";
import ImpactStats from "../../components/HomeComponents/ImpactStats ";
import AboutSection from "../../components/HomeComponents/AboutSection";
import CTASection from "../../components/HomeComponents/CTASection";
import FAQSection from "../../components/HomeComponents/FAQSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | FoodLink</title>
      </Helmet>
      <div className="container-box">
        <Banner />
        <AboutSection/>
        <Featured />
        <CherityRequest />
        <ImpactStats></ImpactStats>
        <CommunityStories></CommunityStories>
        <CTASection/>
        <FAQSection/>
      </div>
    </>
  );
};

export default Home;
