const Input = ({name, type, label}) => {
    return (
        <div className={'mb-3 d-flex flex-column align-items-center'}>
            <label className={'form-label'} htmlFor={name}>{label}</label>
            <input className={'form-control w-25'} id={name} name={name} type={type} />
        </div>
    );
}

export default Input;