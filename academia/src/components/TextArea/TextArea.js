
import './index.css';
const TextArea = ({name, label, value = ''}) => {
    return (
        <div className={'mb-3 d-flex flex-column align-items-center'}>
            <label className={'form-label text-black'} htmlFor={name}>{label}</label>
            <textarea className={'form-control'} id={name} name={name} defaultValue={value} placeholder={"Separe os parágrafos com 'enter' "}></textarea>
        </div>
    );
}

export default TextArea;