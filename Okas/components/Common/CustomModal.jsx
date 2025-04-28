import { Children } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function CustomModal(props) {
    return (
        <Modal className={props.className} centered isOpen={props.isOpen} toggle={props.toggle} size={props.size} width={540}>
            <ModalHeader toggle={props.toggle}>
                {
                    props.subHeading &&
                    <span className="modal-subhead">{props.subHeading}</span>
                }
                {props.heading}
            </ModalHeader>
            <ModalBody>
                {props.children}
            </ModalBody>
        </Modal>
    )
}