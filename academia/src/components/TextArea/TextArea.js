
import './index.css';
const TextArea = ({name, label}) => {
    return (
        <div className={'mb-3 d-flex flex-column align-items-center'}>
            <label className={'form-label'} htmlFor={name}>{label}</label>
            <textarea className={'form-control w-25'} placeholder={"Separe os parágrafos com 'enter' "}></textarea>
        </div>
    );
}

export default TextArea;