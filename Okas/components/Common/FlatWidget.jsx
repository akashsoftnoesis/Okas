
export default function FlatWidget(props) {
    return (
        <div className={`flat-widget ${props.className ? props.className : null}`}>
            {
                props.title &&
                    <h4 className="widget-title">{props.title}</h4>
            }
            {props.children}
        </div>
    )
}
