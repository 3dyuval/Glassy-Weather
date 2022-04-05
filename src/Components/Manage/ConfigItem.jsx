
export default function ConfigItem(props) {


    return (
        <li>
            <div className='left'>
                <div className="name">{props.statName}</div>
                <div className="id">{props.statName}</div>
            </div>
            <div className="right">
                <input value={props.statName}
                    type="checkbox"
                    checked={props.checked}
                    onChange={e => props.onToggle(e)}
                />
            </div>
        </li>
    )
}