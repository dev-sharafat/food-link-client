import loadingGif from '../assets/loadingSpinner.gif';
const LoadingComp = () => {
    return (
        <>
            <div className='min-h-screen flex justify-center items-center'>
                <img className='w-64' src={loadingGif} alt="" />
            </div>
        </>
    );
};

export default LoadingComp;