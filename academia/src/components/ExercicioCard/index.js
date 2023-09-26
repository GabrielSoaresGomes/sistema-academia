import "./index.css";
import {Link} from "react-router-dom";
import {useState} from "react";

const ExercicioCard = ({exercise}) => {

    const [imageUrl, setImageurl] = useState(exercise?.thumbnail_url);
    const onError = () => {
        const imageNotFoundUrl = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png';
        setImageurl(imageNotFoundUrl);
    };

    return (
        <div className={"my-card text-white d-flex w-75 h-75 py-4 text-bg-50 rounded"}>
            <div className={"d-flex align-items-center"}>
                <img className={"image rounded ms-3"} alt={exercise?.title} src={imageUrl} onError={() => onError()}/>
            </div>
            <div>
                <div className={"ms-5 d-flex fs-4"}>
                    <Link className={"link-info link-underline link-underline-opacity-0 p-0 m-0"} to={`/${exercise?.id}`}><p
                        className={"fw-bold p-0 m-0"}>{exercise?.title}</p></Link>
                </div>
                <div className={"ms-5 mt-4 pe-4 text-justify me-4"}>
                    <p className={"fst-italic"}>{exercise?.description?.split('\n')[0]}</p>
                </div>
            </div>
        </div>
    );
}

export default ExercicioCard;