
import "./Loader.css"

// eslint-disable-next-line react/prop-types
const Loader = ({ isLoading }) => {
    return (
        isLoading && (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        )
    );
};

export default Loader;
