const Select = ({name, label, options, selected}) => {
    return (
        <div className={'mb-3 d-flex flex-column align-items-center'}>
            <label className={'form-label text-black'} htmlFor={name}>{label}</label>
            <select id={name} name={name} className={'form-control'}>
                <option value=""> --- </option>
                {
                    options?.map((option) => {
                        return (
                            <option key={option?.id} selected={selected === option?.id} value={option?.id}>{option?.name}</option>
                        )
                    })
                }
            </select>
        </div>
    );
}

export default Select;