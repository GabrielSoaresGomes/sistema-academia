const Select = ({name, label, options, selected = null}) => {
    return (
        <div className={'mb-3 d-flex flex-column align-items-center'}>
            <label className={'form-label'} htmlFor={name}>{label}</label>
            <select id={name} name={name} className={'form-control w-25'}>
                <option value=""> --- </option>
                {
                    options?.map((option) => {
                        return (
                            <option selected={selected === option?.id} value={option?.id}>{option?.name}</option>
                        )
                    })
                }
            </select>
        </div>
    );
}

export default Select;