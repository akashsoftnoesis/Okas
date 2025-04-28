import { useState } from "react";
import { Col, FormGroup, Label, Row, Button, Input, Alert, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import RadioGroup from "./RadioGroup";
import RenderSelect from "./RenderSelect";
import { ApiPost } from "../../helper/ApiData";

const AboutMe = [
  { value: "owner", label: "I own my own home" },
  { value: "renter", label: "I am renting" },
  { value: "solder", label: "I have recently sold" },
  { value: "buyer", label: "I am a first home buyer" },
  { value: "invester", label: "I am looking to invest" },
  { value: "researcher", label: "I am monitoring the market" },
];
const Bedrooms = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5+" },
];
const Bathrooms = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5+" },
];
const Car = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5+" },
];

const radioOptions = [
  { label: "Sales Appraisal", value: "Sales Appraisal" },
  { label: "Rental Appraisal", value: "Rental Appraisal" },
];
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#000"
      : state.isFocused
      ? "rgba(0,0,0,0.05)"
      : "",
  }),
};

export default function AppraisalForm({agentEmail}) {

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const phoneRegExp = /^\d{9}$/
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").trim().matches(/^[A-Za-z_ ]+$/, 'Name is not valid'),
    phoneNumber: Yup.string()
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
    additionalMessage: Yup.string().trim(),
    propertyAddress: Yup.string().trim().required("Property address is required"),
    type: Yup.string().required("Please select type of appraisal"),
    aboutMe: Yup.string().required("About is required"),
    bedroom: Yup.string().required("Bedroom is required"),
    bathroom: Yup.string().required("Bathroom is required"),
    carSpace: Yup.string().required("Car spaces is required"),
    description: Yup.string().trim(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess(null);
    const mailRecipientJson = {};
    if (agentEmail) {
      mailRecipientJson["send_to"] = agentEmail;
      mailRecipientJson["send_cc"] =
        data.type === "Sales Appraisal"
          ? "hardik@okaspropertygroup.com.au,info@okasre.com.au"
          : "nirali@okaspropertygroup.com.au";
    } else {
      mailRecipientJson["send_to"] =
        data.type === "Sales Appraisal"
          ? "hardik@okaspropertygroup.com.au,info@okasre.com.au"
          : "nirali@okaspropertygroup.com.au";
    }
    Object.assign(data, {
      template_name: "requestAnAppraisal",
      subject: "Request An Appraisal",
    }, mailRecipientJson);
    // data["communicationTime"] = data.communicationTime && moment(data.communicationTime).format('DD/MM/YYYY HH:mm')
    try {
      const res = await ApiPost(`send/mail`, data);
      if (res) {
        setLoading(false);
        setSuccess("success");
      } else {
        setLoading(false);
        setSuccess("fail");
      }
    } catch (error) {
      setLoading(false);
      setSuccess("fail");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {success && <Alert color={success === 'success' ? 'success' : 'danger'}>
        {success === 'success' ? <><strong>Success! </strong> Request an appraisal mail has been sent.</> :
        <><strong>Sorry!</strong> Your request an appraisal mail has not been sent. </>}
      </Alert>
      }
      <form onSubmit={handleSubmit(onSubmit)}>
      <h4>Your Contact Details</h4>
      <div className="form-section">
        <FormGroup>
            <Label className="font2 font-weight-bold">Full Name</Label>
            <Input type="text" {...register("name")} placeholder="Joe Bloggs" />
            {errors?.name?.message && <small className="text-danger ml-1">{errors.name.message}</small>}
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm={12} lg={6} className="mb-3">
              <Label className="font2 font-weight-bold">Phone Number</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>+61</InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="xxx xxx xxx" {...register("phoneNumber")} />
              </InputGroup>
              {
                errors?.phoneNumber?.message && <small className="text-danger ml-1">{errors.phoneNumber.message}</small>
              }
            </Col>
            <Col sm={12} lg={6}>
              <Label className="font2 font-weight-bold">Email</Label>
              <Input
                type="email"
                placeholder="abc@gmail.com"
                {...register("email")}
              />
              {
                errors?.email?.message && <small className="text-danger ml-1">{errors.email.message}</small>
              }
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col lg={12}>
              <Label className="font2 font-weight-bold">About Me</Label>
              <Controller
                name="aboutMe"
                styles={customStyles}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (<RenderSelect field={field} data={AboutMe} />)}
              />
              {errors?.aboutMe?.message && <small className="text-danger ml-1">{errors.aboutMe.message}</small>}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={12}>
              <Label className="font2 font-weight-bold">Additional Message</Label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                {...register("additionalMessage")}
              >
              </textarea>
              {
                errors?.additionalMessage?.message && <small className="text-danger ml-1">{errors.additionalMessage.message}</small>
              }
            </Col>
          </Row>
        </FormGroup>
        <h4 className="mt-4">Property Details</h4>
        <FormGroup>
          <Row>
            <Col xs={12}>
              <Label className="font2 font-weight-bold">Address</Label>
              <ReactGoogleAutocomplete
                options={{
                  types: ["address"],
                  componentRestrictions: { country: "au" },
                }}
                className="form-control"
                apiKey={process.env.REACT_APP_API_GOOGLE_MAP_KEY}
                onPlaceSelected={(place) => console.log(place)}
                {...register("propertyAddress")}
              />
              {errors?.propertyAddress?.message && (
                <small className="text-danger ml-1">
                  {errors.propertyAddress.message}
                </small>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col lg={12}>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup
                    name={`type`}
                    field={field}
                    options={radioOptions}
                    {...register(`type`)}
                  />
                )}
              />
              {errors?.type?.message && <small className="text-danger ml-1">{errors.type.message}</small>}
            </Col>
          </Row>
        </FormGroup>
        {/* <FormGroup>
          <Row>
            <Col lg={6}>
              <Label className="font2 font-weight-bold">Property Type</Label>
              <Controller
                name="propertyType"
                styles={customStyles}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (<RenderSelect field={field} data={PropertyType} />)}
              />
              {errors?.propertyType?.message && <small className="text-danger ml-1">{errors.propertyType.message}</small>}
            </Col>
          </Row>
        </FormGroup> */}
        <FormGroup>
          <Row>
            <Col sm={12} lg={4} className="mb-3">
              <Label className="font2 font-weight-bold">Bedrooms</Label>
              <Controller
                name="bedroom"
                styles={customStyles}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (<RenderSelect field={field} data={Bedrooms} />)}
              />
              {errors?.bedroom?.message && <small className="text-danger ml-1">{errors.bedroom.message}</small>}
            </Col>
            <Col sm={12} lg={4} className="mb-3">
              <Label className="font2 font-weight-bold">Bathrooms</Label>
              <Controller
                name="bathroom"
                styles={customStyles}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (<RenderSelect field={field} data={Bathrooms} />)}
              />
              {errors?.bathroom?.message && <small className="text-danger ml-1">{errors.bathroom.message}</small>}
            </Col>
            <Col sm={12} lg={4}>
              <Label className="font2 font-weight-bold">Car Spaces</Label>
              <Controller
                name="carSpace"
                styles={customStyles}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (<RenderSelect field={field} data={Car} />)}
              />
              {errors?.carSpace?.message && <small className="text-danger ml-1">{errors.carSpace.message}</small>}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={12}>
              <Label className="font2 font-weight-bold">Additional Details</Label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                {...register("description")}
              >
              </textarea>
              {errors?.description?.message && <small className="text-danger ml-1">{errors.description.message}</small>}
            </Col>
          </Row>
        </FormGroup>
        {/* <FormGroup>
          <Label className="font2 font-weight-bold">Communication Time</Label>
          <Input type="datetime-local" placeholder="xxx xxx xxx"  {...register("communicationTime")} />
          {errors?.communicationTime?.message && (
            <small className="text-danger ml-1">
              {errors.communicationTime.message}
            </small>
          )}
        </FormGroup> */}
        <Button
          color="secondary"
          className="btn-appraisal"
          type="submit"
          disabled={loading || success === 'success' ? true : false}
        >
          {loading ? 'Loading...' : 'Request an Appraisal'}
        </Button>
      </div>
    </form >
    </>
  )
}
