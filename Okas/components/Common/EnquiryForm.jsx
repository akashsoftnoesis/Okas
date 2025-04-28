import { useState } from 'react';
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Col, FormGroup, Label, Row, Button, Input, Alert, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { ApiPost } from '../../helper/ApiData';

const items = [
    {
        name: "Indication of Price"
    },
    {
        name: "Contract of Sale"
    },
    {
        name: "Book VIP Inspection"
    },
    {
        name: "Similar Properties"
    },
];

export default function EnquiryForm({ agentContactData, address }) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)

    const phoneRegExp = /^\d{9}$/
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        phoneNumber: Yup.string().required('Phone number is required').matches(phoneRegExp, 'Phone number is not valid'),
        email: Yup.string().required('Email address is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Please enter valid email'),
        description: Yup.string(),
        purposeOfEnquiry: Yup.array().transform(ids => ids.filter(name => name === '' || name)).min(1, "Purpose of enquiry of Contact is required")
    });

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { purposeOfEnquiry: [] },
    });
    const onSubmit = async (data) => {
        const send_to = agentContactData.map(agentContact => agentContact?.email)
        setLoading(true)
        setSuccess(null)
        Object.assign(data, { template_name: 'makeAnEnquiry', subject: "Enquiry", displayAddress: address, send_to })
        try {
            const res = await ApiPost(`send/mail`, data);
            if (res) {
                setLoading(false)
                setSuccess('success')
            } else {
                setLoading(false)
                setSuccess('fail')
            }
        } catch (error) {
            setLoading(false)
            setSuccess('fail')
        }
    };

    const handleCheck = checkedItem => {
        const { purposeOfEnquiry: items } = getValues();
        const newItems = items?.includes(checkedItem)
            ? items?.filter(name => name !== checkedItem)
            : [...(items ?? []), checkedItem];
        return newItems;
    };

    return (
        <>
            {success && <Alert color={success === 'success' ? 'success' : 'danger'}>
                {success === 'success' ? <><strong>Success! </strong> Request an appraisal mail has been sent.</> :
                    <><strong>Sorry!</strong> Your request an appraisal mail has not been sent. </>}
            </Alert>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className="font2">Your enquiry will be sent via e-mail to {agentContactData[0]?.firstName} {agentContactData[1]?.firstName ? `and ${agentContactData[1]?.firstName}` : null}, who will be in touch to provide more information.</p>
                <div className="form-section">
                    <FormGroup>
                        <Row>
                            <Col xs={12}>
                                <Label className="font2 font-weight-bold">Full Name</Label>
                                <Input
                                    type="text"
                                    placeholder="Joe Bloggs"
                                    {...register("name")}
                                />
                                {errors?.name?.message && <small className="text-danger ml-1">{errors.name.message}</small>}
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col sm={12} lg={6}>
                                <Label>Phone Number</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>+61</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" placeholder="xxx xxx xxx" {...register("phoneNumber")} />
                                </InputGroup>
                                {errors?.phoneNumber?.message && <small className="text-danger ml-1">{errors.phoneNumber.message}</small>}
                            </Col>
                            <Col sm={12} lg={6}>
                                <Label className="font2 font-weight-bold">Email</Label>
                                <Input
                                    type="email"
                                    placeholder="abc@gmail.com"
                                    {...register("email")}
                                />
                                {errors?.email?.message && <small className="text-danger ml-1">{errors.email.message}</small>}
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Label className="font2 font-weight-bold">Purpose of the enquiry</Label>
                        <Row>
                            {items.map((item) => {
                                return (
                                    <Col md={6} key={item.name}>
                                        <FormGroup check className="mr-4">
                                            <Label check className="mb-0">
                                                <input type="checkbox" value={item.name}  {...register("purposeOfEnquiry")} onChange={() => handleCheck(item.name)} />{" "}
                                                {item.name}
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                )
                            })}
                        </Row>
                        {errors?.purposeOfEnquiry?.message && <small className="text-danger ml-1">{errors.purposeOfEnquiry.message}</small>}
                    </FormGroup>

                    <FormGroup>
                        <Label className="font2 font-weight-bold">Additional Message</Label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="4"
                            {...register("description")}
                            defaultValue={`Hi ${agentContactData[0]?.firstName}${agentContactData[1]?.firstName ? ` and ${agentContactData[1]?.firstName}` : ''}, I have a question about ${address} `}
                        >
                        </textarea>
                        {errors?.description?.message && <small className="text-danger ml-1">{errors.description.message}</small>}
                    </FormGroup>
                    <Button
                        color="secondary"
                        className="btn-appraisal"
                        type="submit"
                        disabled={loading || success === 'success' ? true : false}
                    >
                        {loading ? 'Loading...' : 'Send Enquiry'}
                    </Button>
                </div>
            </form >
        </>
    )
}
