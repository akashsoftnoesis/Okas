import { Col, FormGroup, Label, Row, Button, Input } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import RadioGroup from "../../components/Common/RadioGroup";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";

export default function Step3({ rentalApplicationData = {}, handleApplicationData, handleBack, handleNext }) {

  const radioOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
  ]

  const { tenancyTerminated,
    refusedProperty,
    debt,
    rentalPayment,
    pendingProperties,
    currentProperty,
    buyingPropeties,
    terminatedDetails,
    refusedDetails,
    debtDetails,
    futureRentalPaymentsDetails,
    specifySuburbDetails } = rentalApplicationData

  const validationSchema = Yup.object().shape({
    tenancyTerminated: Yup.string().required('Terminated By A Landlord Or Agent is required').default(tenancyTerminated),
    refusedProperty: Yup.string().required('Refused Property By A Landlord Or Agent is required').default(refusedProperty),
    debt: Yup.string().required('Debt By A Landlord Or Agent is required').default(debt),
    rentalPayment: Yup.string().required('Reason To Affect Payments is required').default(rentalPayment),
    pendingProperties: Yup.string().required('Pending Other Properties Applications is required').default(pendingProperties),
    currentProperty: Yup.string().required('Currently Own Property is required').default(currentProperty),
    buyingPropeties: Yup.string().required('Buying Property In Future is required').default(buyingPropeties),
    terminatedDetails: Yup.string().when('tenancyTerminated', {
      is: 'true',
      then: Yup.string().required('Terminated Details is required'),
    }).default(terminatedDetails),
    refusedDetails: Yup.string().when('refusedProperty', {
      is: 'true',
      then: Yup.string().required('Refused Details is required'),
    }).default(refusedDetails),
    debtDetails: Yup.string().when('debt', {
      is: 'true',
      then: Yup.string().required('Debt Details is required'),
    }).default(debtDetails),
    futureRentalPaymentsDetails: Yup.string().when('rentalPayment', {
      is: 'true',
      then: Yup.string().required('Future Rental Payments Details is required'),
    }).default(futureRentalPaymentsDetails),
    specifySuburbDetails: Yup.string().when('currentProperty', {
      is: 'true',
      then: Yup.string().required('Specify Suburb is required'),
    }).default(specifySuburbDetails),
    // intendOnBuyingDetail: Yup.string().required('Intend On Buying Detail is required').default(intendOnBuyingDetail)
  });

  const { register, handleSubmit, formState: { errors }, control, watch } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const tenancyTerminatedValue = watch('tenancyTerminated', tenancyTerminated);
  const refusedPropertyValue = watch('refusedProperty', refusedProperty);
  const debtValue = watch('debt', debt);
  const rentalPaymentValue = watch('rentalPayment', rentalPayment);
  const currentPropertyValue = watch('currentProperty', currentProperty);

  console.log('tenancyTerminatedValue', tenancyTerminatedValue, tenancyTerminated);
  console.log('refusedPropertyValue', refusedPropertyValue, refusedProperty);
  console.log('debtValue', debtValue, debt);
  console.log('rentalPaymentValue', rentalPaymentValue, rentalPayment);
  console.log('currentPropertyValue', currentPropertyValue, currentProperty)  ;

  const onSubmit = data => {
    if (data) {
      handleNext();
      handleApplicationData('step3', data, true);
    }
  }

  const handleGoBack = () => {
    handleBack();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
      <div className="form-group-block mb-4">
        <h3 className="mb-2">Agency questions</h3>
          <FormGroup className="mb-0">
            <Row>
              <Col md={12}>
                <Label className="mb-1">
                  Has your tenancy ever been terminated by a landlord or agent?
                </Label>
                <div className="d-flex">
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <RadioGroup
                        name={`tenancyTerminated`}
                        field={field}
                        defaultValue={tenancyTerminated}
                        options={radioOptions}
                        {...register(`tenancyTerminated`)}
                      />
                    )}
                  />
                  {errors?.tenancyTerminated?.message && <small className="text-danger ml-1">{errors.tenancyTerminated.message}</small>}
                </div>
              </Col>
              {(tenancyTerminatedValue || tenancyTerminated) === 'true' && 
                  <Col md={6}>
                    <Label>Please provide details</Label>
                    <Input
                      type="text"
                      name="terminatedDetails"
                      defaultValue={terminatedDetails}
                      {...register('terminatedDetails')}
                    />
                    {errors?.terminatedDetails?.message && <small className="text-danger ml-1">{errors.terminatedDetails.message}</small>}
                  </Col>}
            </Row>
          </FormGroup>
      </div>
      <div className="form-group-block mb-4">
        <FormGroup className="mb-0">
          <Row>
            <Col md={12}>
              <Label className="mb-1">
                Have you ever been refused a property by any landlord or agent?
              </Label>
              <div className="d-flex">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      name={`refusedProperty`}
                      field={field}
                      defaultValue={refusedProperty}
                      options={radioOptions}
                      {...register(`refusedProperty`)}
                    />
                  )}
                />
                {errors?.refusedProperty?.message && <small className="text-danger ml-1">{errors.refusedProperty.message}</small>}
              </div>
            </Col>
            {(refusedPropertyValue || refusedProperty) === 'true' && 
              <Col md={6}>
                <Label>Please provide details</Label>
                <Input type="text" name="refusedDetails" defaultValue={refusedDetails} {...register('refusedDetails')} />
                {errors?.refusedDetails?.message && <small className="text-danger ml-1">{errors.refusedDetails.message}</small>}
              </Col>}
          </Row>
        </FormGroup>
      </div>
      <div className="form-group-block mb-4">
        <FormGroup className="mb-3">
            <Row>
              <Col md={12}>
                <Label className="mb-1">Are you in debt to another landlord or agent?</Label>
                <div className="d-flex">
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <RadioGroup
                        name={`debt`}
                        defaultValue={debt}
                        field={field}
                        options={radioOptions}
                        {...register(`debt`)}
                      />
                    )}
                  />
                  {errors?.debt?.message && <small className="text-danger ml-1">{errors.debt.message}</small>}
                </div>
              </Col>
              {(debtValue || debt) === 'true' && 
                <Col md={6}>
                  <Label>Please provide details</Label>
                  <Input type="text" name="debtDetails" defaultValue={debtDetails} {...register('debtDetails')} />
                  {errors?.debtDetails?.message && <small className="text-danger ml-1">{errors.debtDetails.message}</small>}
                </Col>}
            </Row>
          </FormGroup>
      </div>
      <div className="form-group-block mb-4">
        <FormGroup className="mb-0">
          <Row>
            <Col md={12}>
              <Label className="mb-1">
                Is there any reason known to you that would affect your future
                rental payments?
              </Label>
              <div className="d-flex">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      name={`rentalPayment`}
                      field={field}
                      defaultValue={rentalPayment}
                      options={radioOptions}
                      {...register(`rentalPayment`)}
                    />
                  )}
                />
                {errors?.rentalPayment?.message && <small className="text-danger ml-1">{errors.rentalPayment.message}</small>}
              </div>
            </Col>
            {(rentalPaymentValue || rentalPayment) === 'true' && 
            <Col md={6}>
              <Label>Please provide details</Label>
              <Input
                type="text"
                name="futureRentalPaymentsDetails"
                defaultValue={futureRentalPaymentsDetails}
                {...register('futureRentalPaymentsDetails')}
              />
              {errors?.futureRentalPaymentsDetails?.message && <small className="text-danger ml-1">{errors.futureRentalPaymentsDetails.message}</small>}
            </Col>}
          </Row>
        </FormGroup>
      </div>
      <div className="form-group-block mb-4">
        <FormGroup className="mb-0">
          <Row>
            <Col md={12}>
              <Label className="mb-1">
                Do you have any other applications pending on other properties?
              </Label>
              <div className="d-flex">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      name={`pendingProperties`}
                      field={field}
                      defaultValue={pendingProperties}
                      options={radioOptions}
                      {...register(`pendingProperties`)}
                    />
                  )}
                />
                {errors?.pendingProperties?.message && <small className="text-danger ml-1">{errors.pendingProperties.message}</small>}
              </div>
            </Col>
          </Row>
        </FormGroup>
      </div>
      <div className="form-group-block mb-4">
        <FormGroup className="mb-0">
          <Row>
            <Col md={12}>
              <Label className="mb-1">Do you currently own a property?</Label>
              <div className="d-flex">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      name={`currentProperty`}
                      field={field}
                      defaultValue={currentProperty}
                      options={radioOptions}
                      {...register(`currentProperty`)}
                    />
                  )}
                />
                {errors?.currentProperty?.message && <small className="text-danger ml-1">{errors.currentProperty.message}</small>}
              </div>
            </Col>
            {(currentPropertyValue || currentProperty) === 'true' &&
              <Col md={6}>
                <Label>Please specify the suburb</Label>
                <Input type="text" name="specifySuburbDetails" defaultValue={specifySuburbDetails} {...register('specifySuburbDetails')} />
                {errors?.specifySuburbDetails?.message && <small className="text-danger ml-1">{errors.specifySuburbDetails.message}</small>}
              </Col>}
          </Row>
        </FormGroup>
      </div>
      <div className="form-group-block mb-4">
        <FormGroup className="mb-0">
          <Row>
            <Col md={12}>
              <Label className="mb-1">
                Are you considering buying a property after this tenancy or in the
                near future?
              </Label>
              <div className="d-flex">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      name={`buyingPropeties`}
                      field={field}
                      options={radioOptions}
                      defaultValue={buyingPropeties}
                      {...register(`buyingPropeties`)}
                    />
                  )}
                />
                {errors?.buyingPropeties?.message && <small className="text-danger ml-1">{errors.buyingPropeties.message}</small>}
              </div>
            </Col>
          </Row>
        </FormGroup>
      </div>

        {/* <FormGroup className="mb-3">
          <Row>
            <Col md={6}>
              <Label className="mb-1">When do you intend on buying?</Label>
              <Controller
                name="intendOnBuyingDetail"
                styles={customStyles}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (<RenderSelect  defaultValue={intendOnBuyingDetail} field={field} data={bedrooms} />)}
              />
              {errors?.intendOnBuyingDetail?.message && <small className="text-danger ml-1">{errors.intendOnBuyingDetail.message}</small>}
            </Col>
          </Row>
        </FormGroup> */}
        <div className="step-btn">
          <Button color="secondary" onClick={handleGoBack} >
            Back
          </Button>
          <Button color="secondary ml-auto" type="submit">
            Save & Continue
          </Button>
        </div>
      </div>
    </form >
  );
}
