import { Pagination } from "reactstrap";


export default function CustomPagination(props) {
    return (
        <Pagination className="custom-pagination">
            {props.children}
        </Pagination>
    )
}
