import { Col, FormGroup, Label, Row, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import RenderSelect from "../../components/Common/RenderSelect";
import ReactGoogleAutocomplete from "react-google-autocomplete";

const previousAddressData = [
  { value: "enterAddress", label: "Enter Address" },
  { value: "noAddress", label: "I Have No Previous Address" },
  { value: "currentAddress", label: "I Have Lived At My Current Address My Entire Life" },
]

export const relationship = [
  { value: "spouse", label: "Spouse" },
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "sibling", label: "Sibling" },
  { value: "friend", label: "Friend" },
  { value: "son", label: "Son" },
  { value: "daughter", label: "Daugther" },
  { value: "other", label: "Other" },
]

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

export default function Step8({ handleNext, handleBack, handleApplicationData, rentalApplicationData = {} }) {

  const { currentAddress, lengthOfStay, fromDate, reasonOfLeaving, previousMonthlyRent, landloadName, landloadPhone, landloadEmail,
    previousAddress, enterPreviousAddress,
    previousAddressDetails = {},
    refName1,
    refPhone1,
    refRelation1,
    refEmail1,
    refName2,
    refPhone2,
    refRelation2,
    refEmail2,
    refName3,
    refPhone3,
    refRelation3,
    refEmail3,
  } = rentalApplicationData

  const phoneRegExp = /^\d{9}$/
  const digitsOnly = (value) => /^\d+$/.test(value)

  const validationSchema = Yup.object().shape({
    currentAddress: Yup.string().required('Current address is required').default(currentAddress),
    lengthOfStay: Yup.string().required('Length of stay is required').test('lengthOfStay', 'The field should have digits only', digitsOnly).default(lengthOfStay),
    fromDate: Yup.string().required('From is required').default(fromDate),
    reasonOfLeaving: Yup.string().required('Reason of leaving is required').default(reasonOfLeaving),
    previousMonthlyRent: Yup.string().required('Monthly rent is required').test('previousMonthlyRent', 'The field should have digits only', digitsOnly).default(previousMonthlyRent),
    landloadName: Yup.string().required('Landload name is required').default(landloadName),
    landloadPhone: Yup.string().required('Landload phone is required').matches(phoneRegExp, 'Phone number is not valid').default(landloadPhone),
    landloadEmail: Yup.string().required('Landload email is required').email('Email is not valid').default(landloadEmail),
    previousAddress: Yup.string().required('Please select any').default(previousAddress),
    enterPreviousAddress: Yup.string().when('previousAddress', {
      is: 'enterAddress',
      then: Yup.string().required('Previous address is required').default(enterPreviousAddress)
    }),
    previousAddressDetails: Yup.object().when('previousAddress',{
      is: 'enterAddress',
      then: Yup.object().shape({
        lengthOfStay: Yup.string().required('Length of stay is required').test('lengthOfStay', 'The field should have digits only', digitsOnly).default(lengthOfStay),
        fromDate: Yup.string().required('From date is required').default(fromDate),
        // reasonOfLeaving: Yup.string().required('Reason of leaving is required').default(reasonOfLeaving),
        previousMonthlyRent: Yup.string().required('Monthly rent is required').test('previousMonthlyRent', 'The field should have digits only', digitsOnly).default(previousMonthlyRent),
        landloadName: Yup.string().required('Landload name is required').default(landloadName),
        landloadPhone: Yup.string().required('Landload phone is required').matches(phoneRegExp, 'Phone number is not valid').default(landloadPhone),
        landloadEmail: Yup.string().required('Landload email is required').email('Email is not valid').default(landloadEmail),
      }),
    }), 
    refName1: Yup.string().required('Reference name is required').default(refName1),
    refPhone1: Yup.string().required('Reference phone is required').matches(phoneRegExp, 'Phone number is not valid').default(refPhone1),
    refRelation1: Yup.string().required('Reference relation is required').default(refRelation1),
    refEmail1: Yup.string().required('Reference email is required').email('Email is not valid').default(refEmail1),
    refName2: Yup.string().required('Reference name is required').default(refName2),
    refPhone2: Yup.string().required('Reference phone is required').matches(phoneRegExp, 'Phone number is not valid').default(refPhone2),
    refRelation2: Yup.string().required('Reference relation is required').default(refRelation2),
    refEmail2: Yup.string().required('Reference email is required').email('Email is not valid').default(refEmail2),
  });

  const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log('data', data)
    if (data) {
      handleNext();
      handleApplicationData('step8', data, true);
    }
  };

  const handleGoBack = () => {
    handleBack();
  };

  const previousAddressValue = watch('previousAddress', previousAddress)

  return (
    <>
      <form>
        <div className="form-section">
          {/* <div className="form-group-block mb-4">
            <h3 className="mb-2">Rental History</h3>
              <FormGroup className="mb-0">
                <Row>
                  <Col md={12} lg={6} className="mb-3">
                    <Label>Current address</Label>
                    <ReactGoogleAutocomplete
                      options={{
                        types: ["address"],
                        componentRestrictions: { country: "au" },
                      }}
                      className="form-control"
                      defaultValue={currentAddress}
                      apiKey={process.env.REACT_APP_API_GOOGLE_MAP_KEY}
                      onPlaceSelected={(place) => console.log(place)}
                      {...register("currentAddress")}
                    />
                    {errors?.currentAddress?.message && <small className="text-danger ml-1">{errors.currentAddress.message}</small>}
                  </Col>
                  <Col md={6} lg={3} className="mb-3">
                    <Label>Length of stay</Label>
                    <Input type="text" {...register("lengthOfStay")} defaultValue={lengthOfStay} placeholder="Month" />
                    {errors?.lengthOfStay?.message && <small className="text-danger ml-1">{errors.lengthOfStay.message}</small>}
                  </Col>
                  <Col md={6} lg={3} className="mb-3">
                    <Label>From</Label>
                    <Input type="date" name="fromDate" defaultValue={fromDate} {...register("fromDate")} />
                    {errors?.fromDate?.message && <small className="text-danger ml-1">{errors.fromDate.message}</small>}
                  </Col>
                  <Col md={7} lg={9} className="mb-3">
                    <Label>Reason for leaving</Label>
                    <Input
                      type="text"
                      name="reasonOfLeaving"
                      defaultValue={reasonOfLeaving}
                      {...register("reasonOfLeaving")}
                    />
                    {errors?.reasonOfLeaving?.message && <small className="text-danger ml-1">{errors.reasonOfLeaving.message}</small>}
                  </Col>
                  <Col md={5} lg={3} className="mb-3">
                    <Label>Monthly rent</Label>
                    <div className="dollar">
                      <Input
                        type="text"
                        name="previousMonthlyRent"
                        placeholder="Monthly"
                        defaultValue={previousMonthlyRent}
                        {...register("previousMonthlyRent")}
                      />
                      <span>$</span>
                    </div>
                    {errors?.previousMonthlyRent?.message && <small className="text-danger ml-1">{errors.previousMonthlyRent.message}</small>}
                  </Col>
                  <Col md={6} lg={4} className="mb-3">
                    <Label>{`Landlord/Agent/Parent's Name`}</Label>
                    <Input
                      type="text"
                      name="landloadName"
                      defaultValue={landloadName}
                      {...register("landloadName")}
                    />
                    {errors?.landloadName?.message && <small className="text-danger ml-1">{errors.landloadName.message}</small>}
                  </Col>
                  <Col md={6} lg={4} className="mb-3">
                    <Label>{`Landlord/Agent/Parent's Phone`}</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>+61</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="xxx xxx xxx" defaultValue={landloadPhone} {...register("landloadPhone")} />
                    </InputGroup>
                    {errors?.landloadPhone?.message && <small className="text-danger ml-1">{errors.landloadPhone.message}</small>}
                  </Col>
                  <Col md={6} lg={4} className="mb-3">
                    <Label>{`Landlord/Agent/Parent's Email`}</Label>
                    <Input
                      type="text"
                      name="landloadEmail"
                      defaultValue={landloadEmail}
                      {...register("landloadEmail")}
                    />
                    {errors?.landloadEmail?.message && <small className="text-danger ml-1">{errors.landloadEmail.message}</small>}
                  </Col>
                </Row>
              </FormGroup>
          </div> */}
          <div className="form-group-block mb-4">
            <h3 className="mb-2">Rental History</h3>
            <FormGroup className="mb-0">
              <Row>
                <Col md={12} lg={6} className="mb-3">
                  <Label>Current address</Label>
                  <ReactGoogleAutocomplete
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: "au" },
                    }}
                    className="form-control"
                    defaultValue={currentAddress}
                    apiKey={process.env.REACT_APP_API_GOOGLE_MAP_KEY}
                    onPlaceSelected={(place) => console.log(place)}
                    {...register("currentAddress")}
                  />
                  {errors?.currentAddress?.message && <small className="text-danger ml-1">{errors.currentAddress.message}</small>}
                </Col>
                <Col md={6} lg={3} className="mb-3">
                  <Label>Length of stay</Label>
                  <Input type="text" {...register("lengthOfStay")} defaultValue={lengthOfStay} placeholder="Month" />
                  {errors?.lengthOfStay?.message && <small className="text-danger ml-1">{errors.lengthOfStay.message}</small>}
                </Col>
                <Col md={6} lg={3} className="mb-3">
                  <Label>From</Label>
                  <Input type="date" name="fromDate" defaultValue={fromDate} {...register("fromDate")} />
                  {errors?.fromDate?.message && <small className="text-danger ml-1">{errors.fromDate.message}</small>}
                </Col>
              </Row>
              <Row>
                <Col md={7} lg={9} className="mb-3">
                  <Label>Reason for leaving</Label>
                  <Input
                    type="text"
                    name="reasonOfLeaving"
                    defaultValue={reasonOfLeaving}
                    {...register("reasonOfLeaving")}
                  />
                  {errors?.reasonOfLeaving?.message && <small className="text-danger ml-1">{errors.reasonOfLeaving.message}</small>}
                </Col>
                <Col md={5} lg={3} className="mb-3">
                  <Label>Monthly rent</Label>
                  <div className="dollar">
                    <Input
                      type="text"
                      name="previousMonthlyRent"
                      placeholder="Monthly"
                      defaultValue={previousMonthlyRent}
                      {...register("previousMonthlyRent")}
                    />
                    <span>$</span>
                  </div>
                  {errors?.previousMonthlyRent?.message && <small className="text-danger ml-1">{errors.previousMonthlyRent.message}</small>}
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={4} className="mb-3">
                  <Label>{`Landlord/Agent/Parent's Name`}</Label>
                  <Input
                    type="text"
                    name="landloadName"
                    defaultValue={landloadName}
                    {...register("landloadName")}
                  />
                  {errors?.landloadName?.message && <small className="text-danger ml-1">{errors.landloadName.message}</small>}
                </Col>
                <Col md={6} lg={4} className="mb-3">
                  <Label>{`Landlord/Agent/Parent's Phone`}</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>+61</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="xxx xxx xxx" defaultValue={landloadPhone} {...register("landloadPhone")} />
                  </InputGroup>
                  {errors?.landloadPhone?.message && <small className="text-danger ml-1">{errors.landloadPhone.message}</small>}
                </Col>
                <Col md={6} lg={4} className="mb-3">
                  <Label>{`Landlord/Agent/Parent's Email`}</Label>
                  <Input
                    type="text"
                    name="landloadEmail"
                    defaultValue={landloadEmail}
                    {...register("landloadEmail")}
                  />
                  {errors?.landloadEmail?.message && <small className="text-danger ml-1">{errors.landloadEmail.message}</small>}
                </Col>
              </Row>
            </FormGroup>
          </div>
          <div className="form-group-block mb-4">
            <h3 className="mb-2">Previous Address</h3>
            <FormGroup className="mb-0">
              <Row>
                <Col md={6} lg={6} className="mb-3">
                  <Label>Select any</Label>
                  <Controller
                    name="previousAddress"
                    styles={customStyles}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (<RenderSelect field={field} defaultValue={previousAddress} data={previousAddressData} />)}
                  />
                  {errors?.previousAddress?.message && <small className="text-danger ml-1">{errors.previousAddress.message}</small>}
                </Col>
                  {previousAddressValue === 'enterAddress' ? 
                    <Col md={6} className="mb-3">
                      <Label>Previous address</Label>
                      <ReactGoogleAutocomplete
                        options={{
                          types: ["address"],
                          componentRestrictions: { country: "au" },
                        }}
                        className="form-control"
                        apiKey={process.env.REACT_APP_API_GOOGLE_MAP_KEY}
                        onPlaceSelected={(place) => console.log(place)}
                        defaultValue={enterPreviousAddress}
                        {...register("enterPreviousAddress")}
                      />
                      {errors?.enterPreviousAddress?.message && <small className="text-danger ml-1">{errors.enterPreviousAddress.message}</small>}
                    </Col>
                  : null}
                  {previousAddressValue === 'enterAddress' ? <>
                    <Col md={6} lg={4} className="mb-3">
                      <Label>Length of stay</Label>
                      <Input type="text" {...register("previousAddressDetails.lengthOfStay")} defaultValue={previousAddressDetails.lengthOfStay} placeholder="Month" />
                      {errors?.previousAddressDetails?.lengthOfStay?.message && <small className="text-danger ml-1">{errors?.previousAddressDetails?.lengthOfStay?.message}</small>}
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                      <Label>From</Label>
                      <Input type="date" name="fromDate" defaultValue={previousAddressDetails.fromDate} {...register("previousAddressDetails.fromDate")} />
                      {errors?.previousAddressDetails?.fromDate?.message && <small className="text-danger ml-1">{errors?.previousAddressDetails?.fromDate?.message}</small>}
                    </Col>
                    <Col md={5} lg={4} className="mb-3">
                      <Label>Monthly rent</Label>
                      <div className="dollar">
                        <Input
                          type="text"
                          name="previousMonthlyRent"
                          placeholder="Monthly"
                          defaultValue={previousAddressDetails.previousMonthlyRent}
                          {...register("previousAddressDetails.previousMonthlyRent")}
                        />
                        <span>$</span>
                      </div>
                      {errors?.previousAddressDetails?.previousMonthlyRent?.message && <small className="text-danger ml-1">{errors.previousAddressDetails?.previousMonthlyRent.message}</small>}
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                      <Label>{`Landlord/Agent/Parent's Name`}</Label>
                      <Input
                        type="text"
                        name="landloadName"
                        defaultValue={previousAddressDetails.landloadName}
                        {...register("previousAddressDetails.landloadName")}
                      />
                      {errors?.previousAddressDetails?.landloadName?.message && <small className="text-danger ml-1">{errors.previousAddressDetails.landloadName.message}</small>}
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                      <Label>{`Landlord/Agent/Parent's Phone`}</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>+61</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="xxxx xxx xxx" defaultValue={previousAddressDetails.landloadPhone} {...register("previousAddressDetails.landloadPhone")} />
                      </InputGroup>
                      {errors?.previousAddressDetails?.landloadPhone?.message && <small className="text-danger ml-1">{errors.previousAddressDetails.landloadPhone.message}</small>}
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                      <Label>{`Landlord/Agent/Parent's Email`}</Label>
                      <Input
                        type="text"
                        name="landloadEmail"
                        defaultValue={previousAddressDetails.landloadEmail}
                        {...register("previousAddressDetails.landloadEmail")}
                      />
                      {errors?.previousAddressDetails?.landloadEmail?.message && <small className="text-danger ml-1">{errors.previousAddressDetails.landloadEmail.message}</small>}
                    </Col>
                    </> : 
                    ''}
              </Row>
              
            </FormGroup>
          </div>
          <div className="form-group-block mb-4">
            <h3 className="mb-2">Reference 1</h3>
            <FormGroup className="mb-4">
              <Row>
                <Col md={6} lg={6} className="mb-3">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="refName1"
                    defaultValue={refName1}
                    {...register("refName1")}
                  />
                  {errors?.refName1?.message && <small className="text-danger ml-1">{errors.refName1.message}</small>}
                </Col>
                <Col md={6} lg={3} className="mb-3">
                  <Label>Phone</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>+61</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="xxx xxx xxx" defaultValue={refPhone1} {...register("refPhone1")} />
                  </InputGroup>
                  {errors?.refPhone1?.message && <small className="text-danger ml-1">{errors.refPhone1.message}</small>}
                </Col>
                <Col md={6} lg={3} className="mb-3">
                  <Label>Their relationship to you</Label>
                  <Controller
                    name={`refRelation1`}
                    control={control}
                    styles={customStyles}
                    rules={{ required: true }}
                    render={({ field }) => (<RenderSelect field={field} defaultValue={refRelation1} data={relationship} />)
                    }
                  />
                  {errors?.refRelation1?.message && <small className="text-danger ml-1">{errors.refRelation1.message}</small>}
                </Col>
                <Col md={6} lg={6} className="mb-3">
                  <Label>Email</Label>
                  <Input
                    type="text"
                    name="refEmail1"
                    defaultValue={refEmail1}
                    {...register("refEmail1")}
                  />
                  {errors?.refEmail1?.message && <small className="text-danger ml-1">{errors.refEmail1.message}</small>}
                </Col>
              </Row>
            </FormGroup>
          </div>
          <div className="form-group-block mb-4">
            <h3 className="mb-2">Reference 2</h3>
            <FormGroup>
              <Row>
                <Col md={6} lg={6} className="mb-3">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="refName2"
                    defaultValue={refName2}
                    {...register("refName2")}
                  />
                  {errors?.refName2?.message && <small className="text-danger ml-1">{errors.refName2.message}</small>}
                </Col>
                <Col md={6} lg={3} className="mb-3">
                  <Label>Phone</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>+61</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="xxx xxx xxx" defaultValue={refPhone2} {...register("refPhone2")} />
                  </InputGroup>
                  {errors?.refPhone2?.message && <small className="text-danger ml-1">{errors.refPhone2.message}</small>}
                </Col>
                <Col md={6} lg={3} className="mb-3">
                  <Label>Their relationship to you</Label>
                  <Controller
                    name={`refRelation2`}
                    control={control}
                    styles={customStyles}
                    rules={{ required: true }}
                    render={({ field }) => (<RenderSelect field={field} defaultValue={refRelation2} data={relationship} />)
                    }
                  />
                  {errors?.refRelation2?.message && <small className="text-danger ml-1">{errors.refRelation2.message}</small>}
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={6} className="mb-3">
                  <Label>Email</Label>
                  <Input
                    type="text"
                    name="refEmail2"
                    defaultValue={refEmail2}
                    {...register("refEmail2")}
                  />
                  {errors?.refEmail2?.message && <small className="text-danger ml-1">{errors.refEmail2.message}</small>}
                </Col>
              </Row>
            </FormGroup>
          </div>
          <div className="form-group-block mb-4">
            <h3 className="mb-2">Reference 3 (Optional)</h3>
            <FormGroup>
              <Row>
                <Col md={6} lg={6} className="mb-3">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="refName3"
                    defaultValue={refName3}
                    {...register("refName3")}
                  />
                  {errors?.refName3?.message && <small className="text-danger ml-1">{errors.refName3.message}</small>}
                </Col>
                <Col md={6} lg={3} className="mb-3">
                  <Label>Phone</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>+61</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="xxx xxx xxx" defaultValue={refPhone3} {...register("refPhone3")} />
                  </InputGroup>
                  {errors?.refPhone3?.message && <small className="text-danger ml-1">{errors.refPhone3.message}</small>}
                </Col>
                <Col md={6} lg={3} className="mb-3">
                  <Label>Their relationship to you</Label>
                  <Controller
                    name={`refRelation3`}
                    control={control}
                    styles={customStyles}
                    rules={{ required: true }}
                    render={({ field }) => (<RenderSelect field={field} defaultValue={refRelation3} data={relationship} />)
                    }
                  />
                  {errors?.refRelation3?.message && <small className="text-danger ml-1">{errors.refRelation3.message}</small>}
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={6} className="mb-3">
                  <Label>Email</Label>
                  <Input
                    type="text"
                    name="refEmail3"
                    defaultValue={refEmail3}
                    {...register("refEmail3")}
                  />
                  {errors?.refEmail3?.message && <small className="text-danger ml-1">{errors.refEmail3.message}</small>}
                </Col>
              </Row>
            </FormGroup>
          </div>
        </div>
        <div className="step-btn">
          <Button color="secondary" onClick={handleGoBack}>
            Back
          </Button>
          <Button color="secondary ml-auto" onClick={handleSubmit(onSubmit)}>
            Save & Continue
          </Button>
        </div>
      </form>
    </>
  );
}
