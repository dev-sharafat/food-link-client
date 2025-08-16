import { Helmet } from "react-helmet";
import Banner from "../../components/HomeComponents/Banner";
import CherityRequest from "../../components/HomeComponents/CherityRequest";
import CommunityStories from "../../components/HomeComponents/CommunityStories ";
import Featured from "../../components/HomeComponents/Featured";
import ImpactStats from "../../components/HomeComponents/ImpactStats ";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | FoodLink</title>
      </Helmet>
      <div className="container-box">
        <Banner />
        <Featured />
        <CherityRequest />
        <ImpactStats></ImpactStats>
        <CommunityStories></CommunityStories>
      </div>
    </>
  );
};

export default Home;
