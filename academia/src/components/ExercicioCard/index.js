import "./index.css";
import {Link} from "react-router-dom";

const ExercicioCard = ({exercise}) => {
    return (
      <div className={"my-card text-white d-flex w-75 h-75 py-4 bg-secondary bg-opacity-50 text-bg-50 rounded"}>
          <div className={"d-flex align-items-center"}>
              <img className={"image rounded ms-3"} alt={exercise?.title} src={exercise?.thumbnail_url}/>
          </div>
          <div>
              <div className={"ms-5 d-flex fs-4"}>
                  <Link className={"link-underline link-underline-opacity-0 p-0 m-0"} to={`/${exercise?.id}`}><p className={"fw-bold p-0 m-0"}>{exercise?.title}</p></Link>
              </div>
              <div className={"ms-5 mt-4 pe-4 text-justify me-4"}>
                  <p className={"fst-italic"}>{exercise?.description?.split('\n')[0]}</p>
              </div>
          </div>
      </div>
    );
}

export default ExercicioCard;