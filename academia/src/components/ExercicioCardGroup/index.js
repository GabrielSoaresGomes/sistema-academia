import './index.css';

const ExercicioCardGroup = ({children}) => {
    return (
        <div className={'my-card-group'}>
            {children}
        </div>
    )
}

export default ExercicioCardGroup;