const ExercicioForm = ({children, handleSubmit= null}) => {
    return (
        <form onSubmit={handleSubmit && handleSubmit} className={'d-flex flex-column text-white'}>
            {children}
        </form>
    );
}

export default ExercicioForm;