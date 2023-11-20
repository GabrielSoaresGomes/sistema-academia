import "./index.css";
import {Link} from "react-router-dom";
import {useState} from "react";

const Card = ({item}) => {

    const [imageUrl, setImageurl] = useState(item?.image);
    const onError = () => {
        const imageNotFoundUrl = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png';
        setImageurl(imageNotFoundUrl);
    };

    return (
        <div className={"card text-bg-dark mb-3"} style={{maxWidth: 540}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img className={"img-fluid rounded-start"} alt="..." src={imageUrl} onError={() => onError()}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <Link className={"link-info link-underline link-underline-opacity-0 p-0 m-0"} to={`/${item?.id}`}>
                            <p className={"fw-bold p-0 m-0"}>{item?.name}</p>
                        </Link>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className={"fst-italic"}>{item?.description?.split('\n')[0]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;