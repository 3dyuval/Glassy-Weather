
export default function ConfigItem(props) {

    const { type, name, className, ...rest } = props
    // className={classes} {...props}

    return (
        <li className={className}>
            <div className='left'>
                <div className="name">{name}</div>
                <div className="id">{(props.checked === false) ? 'OFF' : 'ON'}</div>
            </div>
            <div className="right">
                <input
                    value={name}
                    type={type}
                    {...rest}
                />
            </div>
        </li>
    )
}