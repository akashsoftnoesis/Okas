
export default function Widget(props) {
    return (
        <div className={`widget ${props.className ? props.className : null}`}>
            {
                props.title &&
                    <h6 className="mb-4 text-capitalize">{props.title}</h6>
            }
            {props.children}
        </div>
    )
}
