import { useEffect, useState } from "react";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { Col, FormGroup, Label, Row, Button, Input, Container, Alert, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import Layout from "../components/Layout";
import Topsection from "../components/Common/Topsection";
import feedback from '../public/assets/images/feedback.jpg'
import { useForm } from "react-hook-form";
import { ApiPost } from "../helper/ApiData";
import MetaHandler, { getMetaDetails } from "../helper/utils/commonMetaApi";

export default function Feedback() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [metaDetails, setMetaDetails] = useState({
        pageName: 'Feedback'
    })

    //eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(async () => {
    //     const metadetail = await getMetaDetails('Feedback');
    //     setMetaDetails(metadetail)
    // }, [])
    const phoneRegExp = /^\d{9}$/
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").trim().matches(/^[A-Za-z_ ]+$/, 'Name is not valid'),
        phoneNumber: Yup.string().trim()
          .required("Phone number is required")
          .trim()
          .matches(phoneRegExp, 'Phone number is not valid'),
        email: Yup.string()
          .required("Email address is required")
          .trim()
          .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            "Please enter valid email"
          ),
        message: Yup.string().trim().required("Additional message is required"),
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver: yupResolver(validationSchema) });
    
      const onSubmit = async(data) => {
        setLoading(true)
        setSuccess(null)
        Object.assign(data, {template_name:'feedbackForm', subject: "Feedback", type: 'Feedback', send_to: "info@okasre.com.au"})
        try {
        console.log('data',JSON.stringify(data))
        const res = await ApiPost(`send/mail`, data);
          if(res) { 
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
        window.scrollTo({top: 0, behavior: 'smooth',})
      };
    
    return (
        <Layout>
            <MetaHandler props={metaDetails} />
            <Topsection titleLight pageTitle="Client Feedback" backgroundImage="/assets/images/feedback-bg.jpg" />
            <div className="section properties-wrap">
                <Container>
                    <Row className="justify-content-between">
                        <Col md={8}>
                            {success && <Alert color={success === 'success' ? 'success' : 'danger'}>
                                {success === 'success' ? <><strong>Success! </strong> Request an appraisal mail has been sent.</> :
                                <><strong>Sorry!</strong> Your feedback has not been sent. </>}
                            </Alert>}
                            <div className="heading text-left mb-4">
                                <h5 className="font2 mb-4">If you have any feedback, a compliment or complaint, we want to hear about it!</h5>
                                <p>At Okas Real Estate, we love to hear your feedback – whether you have a compliment or a complaint, we want to know about it. If you feel we haven’t delivered on what we promised, please let us know and we’ll start an investigation for you. OKAS take all concerns seriously and every complaint is considered carefully.</p>
                                <p>We’ll let you know what we’re doing about your complaint as soon as possible, aiming to be in touch with you within the next business day. If your complaint can’t be resolved to your satisfaction at office level, it will be escalated to our corporate team for further attention. Just complete the online form – it’s as easy as that!</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-section">
                                    <FormGroup>
                                        <Row>
                                            <Col xs={12}>
                                                <Label>Your Full Name</Label>
                                                <Input type="text" placeholder="Joe Bloggs" {...register("name")}/>
                                                {errors?.name?.message && <small className="text-danger ml-1">{errors.name.message}</small>}
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col sm={12} lg={6}>
                                                <Label>Your Phone Number</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>+61</InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="text" placeholder="xxx xxx xxx" {...register("phoneNumber")} />
                                                </InputGroup>
                                                {errors?.phoneNumber?.message && <small className="text-danger ml-1">{errors.phoneNumber.message}</small>}
                                            </Col>
                                            <Col sm={12} lg={6}>
                                                <Label>Your Email</Label>
                                                <Input type="email" placeholder="abc@gmail.com" {...register("email")}/>
                                                {errors?.email?.message && <small className="text-danger ml-1">{errors.email.message}</small>}
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs={12}>
                                                <Label>Additional Message</Label>
                                                <textarea
                                                    className="form-control"
                                                    rows="3"
                                                    {...register("message")}
                                                />
                                                {errors?.message?.message && <small className="text-danger ml-1">{errors.message.message}</small>}
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <Button
                                        color="secondary"
                                        className="btn-appraisal"
                                        type="submit"
                                        disabled={loading || success === 'success' ? true : false}
                                    >
                                    {loading ? 'Loading...' : 'Send Feedback'}
                                    </Button>
                                </div>
                            </form>
                        </Col>
                        <Col md={4}>
                            <div className="request-appraisal-img">
                                <Image src={feedback} alt="feedback"/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}
