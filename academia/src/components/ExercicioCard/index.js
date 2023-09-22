import "./index.css";

const ExercicioCard = ({exercise}) => {
    return (
      <div className={"d-flex w-75 align-items-center justify-content-between bg-secondary bg-opacity-50 text-bg-50 rounded mx-3"}>
          <div className={""}>
              <img className={"image"} src={exercise?.thumbnail_url}/>
          </div>
          <div className={"fs-3"}>
              <div className={"ms-5"}>
                  {exercise?.title}
              </div>
              <div className={"ms-5 mt-5 fs-4"}>
                  {exercise?.description}
              </div>
          </div>
      </div>
    );
}

export default ExercicioCard;