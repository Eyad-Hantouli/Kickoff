import "../styles/referee_rate_stars.css";

const RefereeRateStars = ({ value }) => {
    const int_value = parseInt(value);
    
    const rate = Array.from({ length: int_value }).map((_, index) => (
        <span key={index}><i className="fa-solid fa-star"></i></span>
    ));

    const no_rate = Array.from({ length: 5 - int_value }).map((_, index) => (
        <span key={int_value + index}><i className="fa-regular fa-star"></i></span>
    ));

    return (
        <ol className="referee_rate_stars">
            {rate}
            {no_rate}
        </ol>
    );
};

export default RefereeRateStars;
