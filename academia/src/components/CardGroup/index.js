import './index.css';

const CardGroup = ({children}) => {
    return (
        <div className={'my-card-group'}>
            {children}
        </div>
    )
}

export default CardGroup;