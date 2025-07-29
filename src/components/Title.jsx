import { Typewriter } from "react-simple-typewriter";

const Title = ({title}) => {
    return (
        <>
            <h3 className="text-2xl lg:text-3xl font-semibold">
                <Typewriter
                    words={[`${title}`]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />
            </h3>
        </>
    );
};

export default Title;