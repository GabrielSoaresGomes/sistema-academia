import "./index.css";
import {Link} from "react-router-dom";

const ExercicioCard = ({exercise}) => {
    return (
      <div className={"my-card text-white d-flex w-75 align-items-center justify-content-between py-4 bg-secondary bg-opacity-50 text-bg-50 rounded"}>
          <div className={""}>
              <img className={"image"} src={exercise?.thumbnail_url}/>
          </div>
          <div className={"fs-3 "}>
              <div className={"ms-5 d-flex"}>
                  <Link className={"link-underline link-underline-opacity-0 p-0 m-0"} to={`/${exercise?.id}`}><p className={"fw-bold p-0 m-0"}>{exercise?.title}</p></Link>
              </div>
              <div className={"ms-5 mt-5 fs-4"}>
                  <p className={"fst-italic"}>{exercise?.description}</p>
              </div>
          </div>
      </div>
    );
}

export default ExercicioCard;