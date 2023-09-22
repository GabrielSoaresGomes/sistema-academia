const Button = ({type, text}) => {
    return (
        <button className={'btn btn-outline-primary btn-sm w-25 align-self-center'} type={type}>{text}</button>
    );
}

export default Button;