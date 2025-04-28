/* eslint-disable @next/next/no-img-element */
import { Col, FormGroup, Label, Row, Button, Input, Container, Alert, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import Layout from "../components/Layout";
import Topsection from "../components/Common/Topsection";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as Yup from 'yup';
import UploadIcon from "../public/assets/images/upload-icon.svg"
// import SignatureCanvas from "react-signature-canvas";
import { useEffect, useState } from "react";
import RadioGroup from "../components/Common/RadioGroup";
import { ApiPost } from "../helper/ApiData";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import moment from "moment";
import MetaHandler, { getMetaDetails } from "../helper/utils/commonMetaApi";
import Dropzone from "react-dropzone";

export default function MaintenanceRequestForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [metaDetails, setMetaDetails] = useState({
    pageName: "Maintenance Request"
  })
  const [fileError, setFileError] = useState(false);

  //eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //   const metadetail = await getMetaDetails('Maintenance Request');
  //   setMetaDetails(metadetail)
  // }, [])

  // let padRef = useRef({})
  const phoneRegExp = /^\d{9}$/
  const validationSchema = Yup.object().shape({
    logedDate: Yup.string().required('Date is required'),
    propertyAddress: Yup.string().required('Property address is required'),
    tenantName: Yup.string().trim().matches(/^[A-Za-z_ ]+$/, 'Name is not valid').required('Tenant name is required'),
    preferredContact: Yup.string().required("Preferred method of contact is required"),
    preferredContactIAm: Yup.string().required("Please select any"),
    homePhoneNumber: Yup.number().when('preferredContact', {
      is: 'homePhone',
      then: Yup.number().required('Home number is required').test("len","Phone number is not valid", (number) => /^\d{9}$/.test(number)).typeError('Phone number is not valid')
    }),
    workPhoneNumber: Yup.number().when('preferredContact', {
      is: 'workPhone',
      then: Yup.number().required('Work number is required').test("len","Phone number is not valid", (number) => /^\d{9}$/.test(number)).typeError('Phone number is not valid')
    }),
    mobileNumber: Yup.number().when('preferredContact', {
      is: 'mobilePhone',
      then: Yup.number().required('Mobile number is required').test("len","Phone number is not valid", (number) => /^\d{9}$/.test(number)).typeError('Phone number is not valid'),
    }),
    emailAddress: Yup.string().when('preferredContact', {
      is: 'emailAddress',
      then: Yup.string().required('Email address is required'),
    }),
    repairMaintenance: Yup.string().required('Type of repair or maintenance is required'),
    descriptionMaintenance: Yup.string().required('Description about maintenance is required'),
    hotwater: Yup.string().required('Please select any'),
    stove: Yup.string().required('Please select any'),
    oven: Yup.string().required('Please select any'),
    hotWaterModal: Yup.string().required('Modal number is required'),
    stoveModal: Yup.string().required('Modal number is required'),
    ovenModal: Yup.string().required('Modal number is required'),
    bestContactNumber: Yup.number().required('Contact number is required').test("len","Phone number is not valid", (number) => /^\d{9}$/.test(number)).typeError('Phone number is not valid'),
    bestDayToCall: Yup.string().required('Date is required'),
    bestTimeToCall: Yup.string().required('Time is required'),
    tenantDate: Yup.string().required('Date is required'),
    // privacyStatement: Yup.string().required('Privacy statement is required'),
    uploadDocument: Yup.mixed().nullable().notRequired().test("file_upload", 'Document is required', (value) => {
      return !value || value.length > 0;
    }).test("file_upload", 'Upload description size should be less than 5mb', (value) => {
      return value && value[0] && value[0].size < 5242880
    })
  });
  const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const watchyourName = watch('tenantName');
  const preferredContactValue = watch('preferredContact')
  const uploadDocumentValue = watch('uploadDocument')

  const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  // console.log('watchyourName', watchyourName)
  const onSubmit = async (data) => {
    // setLoading(true)
    setSuccess(null)
    // const signature = padRef.current.getTrimmedCanvas().toDataURL('signature/png')
    // const payload = {
    //   ...data,
    //   signature
    // }
    const uploadDocument = await getBase64(uploadDocumentValue[0])
    Object.assign(data, { template_name: 'maintananceRequestForm', subject: "Request An Maintanance", tenantSignature: watchyourName, yourName: watchyourName, uploadDocument })
    data["logedDate"] = data.logedDate && moment(data.logedDate).format('DD/MM/YYYY')
    data["bestDayToCall"] = data.bestDayToCall && moment(data.bestDayToCall).format('DD/MM/YYYY')
    // data["bestTimeToCall"] = data.bestTimeToCall
    data["tenantDate"] = data.tenantDate && moment(data.tenantDate).format('DD/MM/YYYY')
    data["instructionsForTradesPerson"] = []
    data["currentDate"] = moment(new Date()).format('DD/MM/YYYY')
    if (data.preferredContact === "workPhone" && data.workPhoneNumber) {
      data.workPhoneNumber = "+61" + data.workPhoneNumber
    }
    if (data.preferredContact === "homePhone" && data.homePhoneNumber) {
      data.homePhoneNumber = "+61" + data.homePhoneNumber
    }
    if (data.preferredContact === "mobilePhone" && data.mobileNumber) {
      data.mobileNumber = "+61" + data.mobileNumber
    }
    if (data.bestContactNumber) {
      data.bestContactNumber = "+61" + data.bestContactNumber
    }
    data.instructionsForTradesPerson.push(data.tenantInstruction,data.tenantInstructionOne,data.tenantInstructionTwo)
    data["send_to"] = "ire@okaspropertygroup.com.au"
    
    console.log('data', data)
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
    window.scrollTo({top: 0, behavior: 'smooth',})
  };

  // const handleClear = () => {
  //   padRef.current.clear();
  // }

  const ApplicableRadioOptions = [
    { label: 'Gas', value: 'Gas' },
    { label: 'Electric', value: 'Electric' }
  ]
  const repairMaintenanceoptions = [
    {
      label: <p>
        <strong>{`URGENT`}</strong>{" "}
        {` - Emergency! if the Property or Person is in danger of damage or injury,`}
        <br></br>
        <strong>{`PLEASE CONTACT OUR AGENCY IMMEDIATELY - 0405 753 335`}</strong>
      </p>,
      value: true
    },
    {
      label: <p>
      <strong>{`NOT URGENT`}</strong>{" "}
      {` - i,e Not an emergency. NB: Please be aware our Agency is to refer to the Lessor for instructions regarding the item/s as advised and will advise the Tenant of the outcome ASAP`}
    </p>,
    value: false
    }
  ]
  const preferredContactIAmRadioOptions = [
    { label: 'Lease Holder', value: 'leaseHolder' },
    { label: 'Approved Occupant', value: 'approvedOccupant' }
  ]
  const preferredContactRadioOption = [
    { label: 'Home Phone', value: 'homePhone' },
    { label: 'Work Phone', value: 'workPhone' },
    { label: 'Mobile Phone', value: 'mobilePhone' },
    { label: 'Email Address', value: 'emailAddress' },
  ]
  // console.log(uploadDocumentValue && uploadDocumentValue[0] && uploadDocumentValue[0].type === )

  const imageHandler = e => {
    if(e.target.files[0]) {
      const imageTypes = ["image/apng", "image/avif", "image/gif", "image/jpeg", "image/webp", "image/svg+xml", "image/png"];
      if(!imageTypes.includes(e.target.files[0].type)) {
        setFileError(true)
        window.scrollTo(0,0)
            setTimeout(() => {
              setFileError(false)
            }, 3000);
            return false
      }
      setValue('uploadDocument', e.target.files);
    }
  }

  return (
    <Layout>
       <MetaHandler props={metaDetails} />
      <Topsection
        titleLight
        pageTitle="Maintenance Request"
        backgroundImage="/assets/images/maintenance-request-form-bg.jpg"
      />
      <div className="section properties-wrap">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              {fileError && <Alert color="danger">Please upload only Image</Alert>}
              {success && <Alert color={success === 'success' ? 'success' : 'danger'}>
                {success === 'success' ? <><strong>Success! </strong> Maintenance request mail has been sent.</> :
                  <><strong>Sorry!</strong> Your maintenance request mail has not been sent. </>}
              </Alert>}
              <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className="my-4">Property Details</h4>
                <div className="form-section request-form">
                  <Row>
                    <Col xs={12} className="mb-3">
                      <Row>
                        <Col md={7}>
                          <FormGroup>
                            <Label className="font2 font-weight-bold">Property Address</Label>
                            {/* <Input
                              {...register("propertyAddress")}
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="1"
                            /> */}
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
                            {errors?.propertyAddress?.message && <small className="text-danger ml-1">{errors.propertyAddress.message}</small>}
                          </FormGroup>
                        </Col>
                        <Col md={5}>
                          <FormGroup>
                            <Label className="font2 font-weight-bold">Date Lodged</Label>
                            <Input {...register("logedDate")} type="date" placeholder="dd-mm-PLEASE PHONE OUR AGENCY IMMEDIATELY - 0405 753 335" />
                            {errors?.logedDate?.message && <small className="text-danger ml-1">{errors.logedDate.message}</small>}
                          </FormGroup>
                        </Col>
                        <Col md={7}>
                          <FormGroup>
                            <Label className="font2 font-weight-bold">Tenant Name</Label>
                            <Input
                              {...register("tenantName")}
                              type="text" />
                            {errors?.tenantName?.message && <small className="text-danger ml-1">{errors.tenantName.message}</small>}
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={7}>
                      <Label className="font2 font-weight-bold">Preferred Method Of Contact</Label>
                      <div className="preferred-method">
                        <Controller
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (<RadioGroup name='preferredContact' field={field} options={preferredContactRadioOption} {...register(`preferredContact`)} />)}
                        />
                        {errors?.preferredContact?.message && <small className="text-danger ml-1">{errors.preferredContact.message}</small>}
                      </div>
                      <Row>
                        {
                          preferredContactValue === 'homePhone' ?
                            <Col className="mt-2 mb-5">
                              <Label className="font2 font-weight-bold">Home Phone Number</Label>
                              <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>+61</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" {...register("homePhoneNumber")} placeholder="xxx xxx xxx" />
                              </InputGroup>
                              {errors?.homePhoneNumber?.message && <small className="text-danger ml-1">{errors.homePhoneNumber.message}</small>}
                            </Col> : null
                        }
                        {
                          preferredContactValue === 'workPhone' ?
                            <Col className="mt-2 mb-5">
                              <Label className="font2 font-weight-bold">Work Phone Number</Label>
                              <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>+61</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" {...register("workPhoneNumber")} placeholder="xxx xxx xxx" />
                              </InputGroup>
                              {errors?.workPhoneNumber?.message && <small className="text-danger ml-1">{errors.workPhoneNumber.message}</small>}
                            </Col> : null
                        }
                        {
                          preferredContactValue === 'mobilePhone' ?
                            <Col className="mt-2 mb-5">
                              <Label className="font2 font-weight-bold">Mobile Number</Label>
                              <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>+61</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text"  {...register("mobileNumber")} placeholder="xxx xxx xxx" />
                              </InputGroup>
                              {errors?.mobileNumber?.message && <small className="text-danger ml-1">{errors.mobileNumber.message}</small>}
                            </Col> : null
                        }
                        {
                          preferredContactValue === 'emailAddress' ?
                            <Col className="mt-2 mb-5">
                              <Label className="font2 font-weight-bold">Email Address</Label>
                              <Input type="email" {...register("emailAddress")} placeholder="abc@gmail.com" />
                              {errors?.emailAddress?.message && <small className="text-danger ml-1">{errors.emailAddress.message}</small>}
                            </Col> : null
                        }
                      </Row>
                    </Col>
                    
                    <Col lg={5}>
                      <FormGroup>
                        <Label className="font2 font-weight-bold">I am</Label>
                        <div className="d-flex flex-wrap mb-4">
                          <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <RadioGroup
                                name='preferredContactIAmOne'
                                field={field}
                                options={preferredContactIAmRadioOptions}
                                {...register(`preferredContactIAm`)}
                              />
                            )}
                          />
                          {errors?.preferredContactIAm?.message && <small className="text-danger ml-1">{errors.preferredContactIAm.message}</small>}
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>

                  <h4 className="my-4">{`Type Of Repair Or Maintenance`}</h4>
                  <Row>
                    <Col xs={12}>
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (<RadioGroup name='Type Of Repair Or Maintenance' flex field={field} options={repairMaintenanceoptions} {...register(`repairMaintenance`)} />)}
                      /> 
                      {errors?.repairMaintenance?.message && <small className="text-danger ml-1">{errors.repairMaintenance.message}</small>}
                      {/* <FormGroup check>
                        <Input
                          type="radio"
                          id="exampleCheck"
                          name="repairMaintenance"
                          {...register("repairMaintenance")}
                        />
                        <Label for="exampleCheck" check>
                          <p>
                            <strong>{`URGENT`}</strong>{" "}
                            {` - Emergency! if the Property or Person is in danger of damage or injury,`}
                            <br></br>
                            <strong>{`PLEASE PHONE OUR AGENCY IMMEDIATELY - 0405 753 335`}</strong>
                          </p>
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input
                          type="radio"
                          id="exampleCheckOne"
                          name="repairMaintenance"
                          {...register("repairMaintenance")}
                        />
                        <Label for="exampleCheckOne" check>
                          <p>
                            <strong>{`NOT URGENT`}</strong>{" "}
                            {` - i,e Not an emergency. NB: Please be aware our Agency is to refer to the Lessor for instructions regarding the item/s as advised and will advise the Tenant of the outcome ASAP`}
                          </p>
                        </Label>
                        {errors?.repairMaintenance?.message && <small className="text-danger ml-1">{errors.repairMaintenance.message}</small>}
                      </FormGroup> */}
                    </Col>
                  </Row>

                  <h4 className="my-4 text-capitalize">{`Description And Details Of Repair Or Maintenance`}</h4>
                  <Row>
                    <Col lg={9} className="mb-3">
                      <FormGroup className="mb-0">
                        <Label className="font2 font-weight-bold">Description About Maintenance</Label>
                        <textarea
                          className="form-control"
                          rows="5"
                          {...register("descriptionMaintenance")}
                        />
                        {errors?.descriptionMaintenance?.message && <small className="text-danger ml-1">{errors.descriptionMaintenance.message}</small>}
                      </FormGroup>
                      </Col>
                      <Col lg={3} className="mb-3">
                      
                      <FormGroup className="mb-0 upload-btn-main-wrapper">
                        <Label className="font2 font-weight-bold">Upload Image</Label>
                        <div className="upload-btn-wrapper maintanance-upload-img-wrpper">
                          <label htmlFor="upload" className="mb-0">
                            
                            {
                              uploadDocumentValue && Array.from(uploadDocumentValue) && Array.from(uploadDocumentValue).length ? 
                               uploadDocumentValue && uploadDocumentValue[0] && (
                                <img src={URL.createObjectURL(uploadDocumentValue[0])} alt="image" />
                              ) : 
                              <div className="upload-icon">
                                <img src={UploadIcon.src} alt="upload-img" />
                              </div>
                              }
                          </label>
                          <input type="file" id="upload" name="uploadDocument" {...register('uploadDocument')} onChange={imageHandler} />
                        </div>
                              {/* <Dropzone onDrop={handleDrop}>
                                {({ getRootProps, getInputProps }) => (
                                  <div {...getRootProps({ className: "dropzone" })}>
                                    <input type="file" id="upload" name="myfile" {...getInputProps()} />
                                    <p>Drag'n'drop files, or click to select files</p>
                                  </div>
                                )}
                              </Dropzone>
                              <div>
                                <strong>Files:</strong>
                                <ul>
                                  {fileNames.map(fileName => (
                                    <li key={fileName}>{fileName}</li>
                                  ))}
                                </ul>
                              </div> */}
                      </FormGroup>
                      {errors?.uploadDocument?.message && <small className="text-danger ml-1">{errors.uploadDocument.message}</small>}
                    </Col>
                  </Row>

                  <h4 className="my-4 text-capitalize">{`Complete If Applicable`}</h4>
                  <Row>
                    <Col lg={3} xs={6}>
                      <Label className="font2 font-weight-bold">Hot Water</Label>
                      <div className="d-flex flex-wrap">
                        <Controller
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (<RadioGroup name='hotwater' field={field} options={ApplicableRadioOptions} {...register(`hotwater`)} />)}
                        />
                        {errors?.hotwater?.message && <small className="text-danger ml-1">{errors.hotwater.message}</small>}
                      </div>
                    </Col>
                    <Col lg={6} xs={6} className="mb-3">
                      <Label className="mb-0 font2 font-weight-bold">Model</Label>
                      <Input type="text" {...register("hotWaterModal")} placeholder="xxx xxx xxx" />
                      {errors?.hotWaterModal?.message && <small className="text-danger ml-1">{errors.hotWaterModal.message}</small>}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={3} xs={6}>
                      <Label className="font2 font-weight-bold">Stove</Label>
                      <div className="d-flex flex-wrap">
                        <Controller
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (<RadioGroup name='stove' field={field} options={ApplicableRadioOptions} {...register(`stove`)} />)}
                        />
                        {errors?.stove?.message && <small className="text-danger ml-1">{errors.stove.message}</small>}
                      </div>
                    </Col>
                    <Col lg={6} xs={6} className="mb-3">
                      <Label className="mb-0 font2 font-weight-bold">Model</Label>
                      <Input type="text" {...register("stoveModal")} placeholder="xxx xxx xxx" />
                      {errors?.stoveModal?.message && <small className="text-danger ml-1">{errors.stoveModal.message}</small>}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={3} xs={6}>
                      <Label className="font2 font-weight-bold">Oven</Label>
                      <div className="d-flex flex-wrap">
                        <Controller
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (<RadioGroup name='oven' field={field} options={ApplicableRadioOptions} {...register(`oven`)} />)}
                        />
                        {errors?.oven?.message && <small className="text-danger ml-1">{errors.oven.message}</small>}
                      </div>
                    </Col>
                    <Col lg={6} xs={6} className="mb-3">
                      <Label className="mb-0 font2 font-weight-bold">Model</Label>
                      <Input type="text" {...register("ovenModal")} placeholder="xxx xxx xxx" />
                      {errors?.ovenModal?.message && <small className="text-danger ml-1">{errors.ovenModal.message}</small>}
                    </Col>
                  </Row>

                  <h4 className="my-4 text-capitalize">{`Tenant Instruction For Tradesperson To Enter And Action Or Quote On Repair Or Maintenance`}</h4>
                  <FormGroup check>
                    <Input type="checkbox" value={`Dog/s kept on the premises. Tenant agrees to restrain or remove for property access.`} {...register("tenantInstruction")} id="exampleCheckPremises" />
                    <Label for="exampleCheckPremises" check>
                      <p>
                        {`Dog/s kept on the premises. Tenant agrees to restrain or remove for property access.`}
                      </p>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input type="checkbox" value={`Approval to enter via Agency key with Tradesperson to advise Tenant of the day of entry`} {...register("tenantInstructionOne")} id="exampleCheckApproval" />
                    <Label for="exampleCheckApproval" check>
                      <p>
                        {`Approval to enter via Agency key with Tradesperson to advise Tenant of the day of entry`}
                      </p>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input type="checkbox" value={`Tenant/s to be present. Tradesperson is to call Tenant to arrange time.`} {...register("tenantInstructionTwo")} id="exampleCheckTradesperson" />
                    <Label for="exampleCheckTradesperson" check>
                      <p>
                        {`Tenant/s to be present. Tradesperson is to call Tenant to arrange time.`}
                        <br></br>
                        <span className="intc-desc">
                          <strong>{`Please be aware that if the Tenant arranges a time with the Contractor but is not home as arranged, the Tenant may be responsible for the call out fee changed. Please ensure a nominated person is at home to allow access. `}</strong>
                        </span>
                      </p>
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col sm={12} lg={6} className="mb-3">
                        <Label className="font2 font-weight-bold">Preferred  Contact Number</Label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>+61</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="xxx xxx xxx" {...register("bestContactNumber")} />
                        </InputGroup>
                        {errors?.bestContactNumber?.message && <small className="text-danger ml-1">{errors.bestContactNumber.message}</small>}
                      </Col>
                      <Col sm={12} lg={6} className="mb-3">
                        <Label className="font2 font-weight-bold">Preferred communication time</Label>
                        <div className="d-flex">
                        <div>
                          <Input type="date" {...register("bestDayToCall")} />
                          {errors?.bestDayToCall?.message && <small className="text-danger ml-1">{errors.bestDayToCall.message}</small>}
                        </div>
                        <div className="ml-4">
                        <Input type="time" {...register("bestTimeToCall")} />
                        {errors?.bestTimeToCall?.message && <small className="text-danger ml-1">{errors.bestTimeToCall.message}</small>}
                        </div>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                  <h4 className="my-4 text-capitalize">{`Tenant Signature`}</h4>
                  <FormGroup>
                    <Row>
                      <Col xs={12} md={6} className="mb-3">
                        <Label className="font2 font-weight-bold">Your Name</Label>
                        <Input type="text" value={watchyourName} {...register("yourName")} disabled />
                        {errors?.yourName?.message && <small className="text-danger ml-1">{errors.yourName.message}</small>}
                      </Col>
                      <Col xs={12} md={3} className="mb-3">
                        <Label className="font2 font-weight-bold">Date</Label>
                        <Input type="date" {...register("tenantDate")} />
                        {errors?.tenantDate?.message && <small className="text-danger ml-1">{errors.tenantDate.message}</small>}
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col xs={12} md={6}>
                        <Label className="font2 font-weight-bold">Signature</Label>
                        {/* <Input type="text" {...register("tenantSignature")} /> */}
                        <Input type="text" className="tenant-signature" value={watchyourName} {...register("tenantSignature")} disabled />
                        {errors?.tenantSignature?.message && <small className="text-danger ml-1">{errors.tenantSignature.message}</small>}
                        {/* <div className="canvas">
                          <SignatureCanvas penColor='black' name="tenantSignature"
                            canvasProps={{ width: 427, height: 150, className: 'signature-canvas' }} ref={padRef} />
                          <span onClick={handleClear}>Reset</span>
                          {errors?.tenantSignature?.message && <small className="text-danger ml-1">{errors.tenantSignature.message}</small>}
                        </div> */}
                      </Col>
                    </Row>
                  </FormGroup>
                  {/* <FormGroup>
                    <Row>
                      <Col xs={12}>
                        <Label className="font2 font-weight-bold">PRIVACY STATEMENT</Label>
                        <div className="mb-2">
                          <small>{`Please refer to the Privacy Statement included in your 'Moving in kit'. if you have any questions in this regard, please contact our office and ask to speak to the privacy officer.`}</small>
                        </div>
                        <textarea
                          {...register("privacyStatement")}
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        />
                        {errors?.privacyStatement?.message && <small className="text-danger ml-1">{errors.privacyStatement.message}</small>}
                      </Col>
                    </Row>
                  </FormGroup> */}
                  <Button color="secondary" className="btn-appraisal" type="submit" disabled={loading || success === 'success' ? true : false}>
                    {loading ? 'Loading...' : 'Request Maintenance'}
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
