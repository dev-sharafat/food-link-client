import Title from "../Title";
// import { Typewriter } from "react-simple-typewriter";
import banner from "../../assets/banner.jpg"

const Banner = () => {
    return (
        <div className="min-h-[70vh] flex flex-col gap-6 justify-center items-center bg-cover bg-center bg-no-repeat mt-2"
            style={{ backgroundImage: `radial-gradient(circle,rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.48) 50%, rgba(0, 0, 0, 0.6) 100%), url(${banner})` }}>
            <h1 className="text-3xl xl:text-6xl lg:text-5xl md:text-4xl font-semibold text-white">
                Share Food. Spread Hope.
            </h1>
            <p className="text-lg lg:text-xl text-gray-100">Every meal you donate brings comfort to someone in need and helps build a kinder, hunger-free world.
            </p>
        </div>
    );
};

export default Banner;