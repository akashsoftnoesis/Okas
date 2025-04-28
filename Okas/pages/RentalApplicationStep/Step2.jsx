import { Col, FormGroup, Label, Row, Button, Input } from "reactstrap";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import RenderSelect from "../../components/Common/RenderSelect";
import RadioGroup from "../../components/Common/RadioGroup";

const vehicleProperty = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5+" },
]
const relationship = [
  { value: "spouse", label: "Spouse" },
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "sibling", label: "Sibling" },
  { value: "friend", label: "Friend" },
  { value: "son", label: "Son" },
  { value: "daughter", label: "Daugther" },
  { value: "other", label: "Other" },
]
const vehicle = [
  { value: "motorbike", label: "Motorbike" },
  { value: "scooter", label: "Scooter" },
  { value: "car", label: "Car" },
  { value: "carvan", label: "Carvan" },
  { value: "boat", label: "Boat" },
  { value: "trailer", label: "Trailer" },
  { value: "truck", label: "Truck" },
  { value: "other", label: "Other" },
]
const propertyInspectionDetails = [
  { value: "", label: "Please Select..." },
  { value: "1", label: "I have not yet inspected this property but i plan to" },
  { value: "2", label: "I have physically inspected this property and accept it in its current state" },
  { value: "3", label: "I am interstate/overseas and will physically inspect the property upon my arrival" },
  { value: "4", label: "Someone else has inspected on my behalf as I’m interstate/overseas and I accept it in its current state" },
  { value: "5", label: "I have inspected this property digitally and accept it in its current state" },
];
const PersonOptions = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10+" },
];
const radioOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false }
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

export default function Step2({ rentalApplicationData = {}, handleApplicationData, handleNext, handleBack }) {

  const { primaryApplicant, primaryApplicantEmail, primaryApplicantMobile, numberOfPerson = 0, persons, vehical, pets = [], inspectedProperty, inspectionReasonably, associatesPersonsName, inspectionDate, vehiclesProperty = "0", totalPetsCount = "0", inspectionDetails } = rentalApplicationData

  const [personDetails, setPersonDetails] = useState(persons || []);
  const [vehicalDetails, setVehicalDetails] = useState(vehical || []);
  const [petDetails, setPetDetails] = useState(pets || []);

  const validationSchema = Yup.object().shape({
    primaryApplicant: Yup.string().required('Applicant name is required').trim().matches(/^[A-Za-z_ ]+$/, 'Name is not valid').default(primaryApplicant),
    primaryApplicantEmail: Yup.string().required(`Email is required`).email('Email is Invalid'),
    primaryApplicantMobile: Yup.string().required(`Mobile number is required`).test("len","Mobile number is not valid", (number) => /^\d{9}$/.test(number)).typeError('Mobile number is not valid'),
    numberOfPerson: Yup.number().required('Number of persons is required').default(numberOfPerson),
    persons: Yup.array().of(
      Yup.object().shape({
        personName: Yup.string().required('Name is required').trim().matches(/^[A-Za-z_ ]+$/, 'Name is not valid'),
        personRelationship: Yup.string().required('Relationship is required'),
        dateOfBirth: Yup.string().required('Date of birth is required'),
        personAge: Yup.string().required('Please select any'),
        minorPersonAge: Yup.number().when('personAge', {
          is: 'false',
          then: Yup.number().required('Age is required').min(1).max(18, 'Age should be less than 18')
        }),
        occupantLease: Yup.string().when('personAge', {
          is: 'true',
          then: Yup.string().required('Please select any')
        }),
        personEmail: Yup.string().when('personAge', {
          is: 'true',
          then: Yup.string().when('occupantLease', {
            is: 'true',
            then: Yup.string().required('Persons email is required').email('Email is Invalid')
          })
        }),
        personContact: Yup.string().when('personAge', {
          is: 'true',
          then: Yup.string().when('occupantLease', {
            is: 'true',
            then: Yup.string().required('Person Contact is required').typeError('Contact number is Invalid')
          })
        }),
      })
    ),
    vehical: Yup.array().of(
      Yup.object().shape({
        vehicleType: Yup.string().required('Vehicle type is required'),
        plateNumber: Yup.string().required('Registration number is required'),
      })
    ).default(vehical),
    pets: Yup.array().of(
      Yup.object().shape({
        petName: Yup.string().required('Pet name is required'),
        petRegistrationNumber: Yup.string().required('Registration number is required'),
      })
    ).default(pets),
    inspectedProperty: Yup.string().required('Please select any').default(inspectedProperty),
    inspectionDate: Yup.string().when('inspectedProperty', {
      is: (inspectedProperty) => inspectedProperty !== '',
      then: Yup.string().required('Inspection date is required').default(inspectionDate)
    }),
    associatesPersonsName: Yup.string().when('inspectedProperty', {
      is: '4',
      then: Yup.string().required('Associates/Other persons name is required').default(associatesPersonsName)
    }),
    inspectionReasonably: Yup.string().when('inspectedProperty', {
      is: (inspectedProperty) => inspectedProperty === '2' || inspectedProperty === '4',
      then: Yup.string().required('Inspection Reasonably is required').default(inspectionReasonably)
    }),
    inspectionDetails: Yup.string().when('inspectedProperty', {
      is: (inspectedProperty) => inspectedProperty === '2' || inspectedProperty === '4',
      then: Yup.string().when('inspectionReasonably', {
        is: 'false',
        then: Yup.string().required('Inspection details is required').default(inspectionDetails)
      })
    }),
    vehiclesProperty: Yup.string().required('Parked vehicle Property is required').default(vehiclesProperty),
  });

  const { register, unregister, handleSubmit, formState: { errors }, watch, control, setValue } = useForm({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    setValue('inspectedProperty', inspectedProperty)
  }, [inspectedProperty])
  const watchFInspectedProperty = watch('inspectedProperty', inspectedProperty);
  const watchInspectionReasonably = watch('inspectionReasonably');
  const watchMakeAndModalOfVehicle = watch('makeAndModalOfVehicle');


  useEffect(() => {
    const newPersons = [];
    persons?.forEach((item, i) => {
      setValue(`persons[${i}].personName`, item.personName);
      setValue(`persons[${i}].personAge`, item.personAge);
      setValue(`persons[${i}].dateOfBirth`, item.dateOfBirth);
      setValue(`persons[${i}].minorPersonAge`, item.minorPersonAge);
      setValue(`persons[${i}].occupantLease`, item.occupantLease);
      setValue(`persons[${i}].personRelationship`, item.personRelationship);
      setValue(`persons[${i}].personEmail`, item.personEmail);
      setValue(`persons[${i}].personContact`, item.personContact);
      newPersons.push({
        ...item,
        personAgeStatus: item.personAge === 'true',
        occupantLeaseStatus: item.occupantLease === 'true'
      })
    })
    setPersonDetails(newPersons);
  }, [persons])

  useEffect(() => {
    vehical?.forEach((item, i) => {
      setValue(`vehical[${i}].vehicleType`, item.vehicleType);
      setValue(`vehical[${i}].plateNumber`, item.plateNumber);
    })
  }, [vehical])

  useEffect(() => {
    pets?.forEach((item, i) => {
      setValue(`pets[${i}].petName`, item.petName);
      setValue(`pets[${i}].petRegistrationNumber`, item.petRegistrationNumber);
    })
  }, [pets])

  function onSubmit(data) {
    console.log('data', data)
    if (data) {
      handleNext();
      handleApplicationData('step2', { ...data, vehical: vehicalDetails, pets: petDetails }, true);
    }
  }

  const [personConsent, setPersonConsent] = useState(false);

  const handleGoBack = () => {
    handleBack();
  };

  const displayContent = () => {
    setPersonConsent(!personConsent);
  };

  const handleChangePerson = (e, i, name) => {
    const persons = personDetails.slice();
    if (name === 'personRelationship') {
      persons[i][name] = e;
      return;
    };
    const { value } = e.target;
    if (name === 'personAge') {
      persons[i].personAgeStatus = value === 'true';
      persons[i].occupantLease = '';
      persons[i].occupantLeaseStatus = false;
      setValue(`persons[${i}].personAge`, value, { shouldValidate: true })
      setValue(`persons[${i}].occupantLease`, '', { shouldValidate: true })
    };
    if (name === 'occupantLease') {
      persons[i].occupantLeaseStatus = value === 'true';
      setValue(`persons[${i}].occupantLease`, value, { shouldValidate: true })
    };
    setValue(`persons[${i}][${name}]`, value)
    persons[i][name] = value;
    setPersonDetails(persons);
  };


  const vehicalhandleChange = (e, i, name) => {
    const vehical = vehicalDetails.slice();
    if (name === 'vehicleType') {
      vehical[i][name] = e;
      vehical[i].vehicalValue = e
      setValue(`vehical[${i}][${name}]`, value)
      setVehicalDetails(vehical);
      return;
    };
    if (name === 'plateNumber') {
      vehical[i][name] = e.target.value;
      vehical[i].plateNumber = e.target.value
      setValue(`vehical[${i}][${name}]`, value)
      setVehicalDetails(vehical);
      return;
    };
    const { value } = e.target;
    vehical[i][name] = value;
    setValue(`vehical[${i}][${name}]`, value)
    setVehicalDetails(vehical);
  }

  const petsHandleChange = (e, i, name) => {
    const petsClone = petDetails.slice();
    const { value } = e.target;
    petsClone[i][name] = value;
    setValue(`pets[${i}][${name}]`, value)
    setPetDetails(petsClone);
  }

  const removeFormField = (fields, fieldArrayName, startIndex, endIndex) => {
    const fieldsToRemove = endIndex - startIndex;
    const arary = new Array(fieldsToRemove).fill(0);
    return arary.forEach((_, idx) => {
       const index = startIndex + idx;
       console.log('field index', index);
       fields.forEach(fieldName => {
         const fieldNameToRemove = `${fieldArrayName}[${index}].${fieldName}`;
         console.log('fieldNameToRemove', fieldNameToRemove);
         unregister(fieldNameToRemove,{
           keepError: false,
           keepIsValid: true
         })
       });
    });
  }

  const handleChangeNumberOfPerson = value => {
    setValue('numberOfPerson', value, { shouldValidate: true })
    const defaultPersonObject = {
      personName: '',
      dateOfBirth: '',
      personRelationship: '',
      personAge: '',
      minorPersonAge: '',
      personAgeStatus: false,
      occupantLease: '',
      occupantLeaseStatus: false,
      personEmail: '',
      personContact: ''
    };
    let newPersonDetails = personDetails.slice();
    const numbersOfPersons = parseInt(value || 0);
    if (numbersOfPersons < newPersonDetails.length) {
      const remainingPersons = newPersonDetails.slice(0, numbersOfPersons);
      removeFormField(Object.keys(defaultPersonObject), 'persons', numbersOfPersons, personDetails.length)
      setPersonDetails(remainingPersons);
    } else {
      const numberOfAddPerson = numbersOfPersons - newPersonDetails.length
      for (let index = 0; index < numberOfAddPerson; index++) {
        newPersonDetails.push({
          ...defaultPersonObject
        })
      }
      setPersonDetails(newPersonDetails);
    }
  }

  const handleChangeNumberOfPets = value => {
    setValue('totalPetsCount', value, { shouldValidate: true })
    let existingPetsData = petDetails.slice();
    const numbersOfPets = parseInt(value || 0);
    const defulatPetObject = {
      petName: '',
      petRegistrationNumber: '',
    };

    if (numbersOfPets < existingPetsData.length) {
      const remainingPets = existingPetsData.slice(0, numbersOfPets);
      removeFormField(Object.keys(defulatPetObject), 'pets', numbersOfPets, petDetails.length)
      setPetDetails(remainingPets);
    } else {
      const numberOfPetsToAdd = numbersOfPets - existingPetsData.length
      for (let index = 0; index < numberOfPetsToAdd; index++) {
        existingPetsData.push({...defulatPetObject})
      }
      setPetDetails(existingPetsData);
    }
  }

  const handleChangeNumberOfVehical = value => {
    setValue('vehiclesProperty', value, { shouldValidate: true })
    let newVehicalDetails = vehicalDetails.slice();
    const numbersOfVehical = parseInt(value || 0);
    const defaultVehicleObject = {
      vehicleType: '',
      plateNumber: '',
      vehicalValue: '',
      makeAndModalOfVehicle: '',
    };
    if (numbersOfVehical < newVehicalDetails.length) {
      const remainingVehical = newVehicalDetails.slice(0, numbersOfVehical);
      removeFormField(Object.keys(defaultVehicleObject), 'vehical', numbersOfVehical, vehicalDetails.length);
      setVehicalDetails(remainingVehical);
    } else {
      const numberOfAddVehical = numbersOfVehical - newVehicalDetails.length
      for (let index = 0; index < numberOfAddVehical; index++) {
        newVehicalDetails.push({
          ...defaultVehicleObject
        });
      }
      setVehicalDetails(newVehicalDetails);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-section">
          <div className="form-group-block mb-4">
            <h3 className="mb-2">Occupant</h3>
              <p className="mb-1">
                <small>{`You confirm that you have the `}
                  <span onClick={displayContent} style={{ color: "#21ABDC", cursor: "pointer" }} >{`person’s consent`}</span>{` to provide their personal information`}
                </small>
              </p>
              {personConsent && personConsent ? (
                <p className="occupancy-summary">
                  <h4>
                    {`By providing personal information for other people throughout this form, you confirm that those other people have consented
                    to their personal information being provided to OKAS PROPERTY GROUP and used and disclosed in accordance with OKAS PROPERTY
                    GROUP’s Privacy Policy, including, the information being passed on to a property manager or real estate agent for the purpose 
                    of processing your rental application.`}
                  </h4>
                </p>
              ) : null}
              <FormGroup className="mb-0">
                <Row>
                  <Col md={5} className="mb-3">
                    <Label>Primary applicant</Label>
                    <Input type="text" {...register("primaryApplicant")} defaultValue={primaryApplicant} />
                    {errors?.primaryApplicant?.message && <small className="text-danger ml-1">{errors?.primaryApplicant?.message}</small>}
                  </Col>
                  <Col md={4} className="mb-3">
                    <Label>Email</Label>
                    <Input type="text" {...register("primaryApplicantEmail")} defaultValue={primaryApplicantEmail} />
                    {errors?.primaryApplicantEmail?.message && <small className="text-danger ml-1">{errors?.primaryApplicantEmail?.message}</small>}
                  </Col>
                  <Col md={3} className="mb-3">
                    <Label>Mobile</Label>
                    <Input type="text" {...register("primaryApplicantMobile")} defaultValue={primaryApplicantMobile} />
                    {errors?.primaryApplicantMobile?.message && <small className="text-danger ml-1">{errors?.primaryApplicantMobile?.message}</small>}
                  </Col>
                  
                  <Col md={6} lg={6} className="mb-3">
                    <Label>How many other people will be occupying the property?</Label>
                    <Controller
                      name="numberOfPerson"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (<RenderSelect field={field} defaultValue={numberOfPerson} onChangeHandle={handleChangeNumberOfPerson} data={PersonOptions} />)
                      }
                    />
                    {errors?.numberOfPerson?.message && <small className="text-danger ml-1">{errors?.numberOfPerson?.message}</small>}

                  </Col>
                </Row>
              </FormGroup>
          </div>

          {personDetails?.map((item, i) => {
            return (
              <div key={i} className="form-group-block mb-3">
                <div>
                  <h3 className="mb-2">Person {i + 1}</h3>
                  <FormGroup className="mb-0">
                    <Row>
                      <Col md={6} className="mb-3">
                        <Label>Their name</Label>
                        <Input type="text" {...register(`persons[${i}].personName`)} defaultValue={item.personName} onChange={(e) => handleChangePerson(e, i, 'personName')} />
                        {errors?.persons?.[i]?.personName?.message && <small className="text-danger ml-1">{errors.persons[i].personName.message}</small>}
                      </Col>
                      <Col md={6} lg={3} className="mb-3">
                        <Label>Their relationship to you</Label>
                        <Controller
                          name={`persons[${i}].personRelationship`}
                          control={control}
                          styles={customStyles}
                          rules={{ required: true }}
                          render={({ field }) => (<RenderSelect field={field} defaultValue={item.personRelationship} onChangeHandle={(e) => handleChangePerson(e, i, 'personRelationship')} data={relationship} />)
                          }
                        />
                        {errors?.persons?.[i]?.personRelationship?.message && <small className="text-danger ml-1">{errors.persons[i].personRelationship.message}</small>}
                      </Col>
                      <Col md={6} lg={3} className="mb-3">
                        <Label>Date of birth</Label>
                        <Input type="date" name={`persons[${i}].dateOfBirth`} {...register(`persons[${i}].dateOfBirth`)} defaultValue={item.dateOfBirth} />
                        {errors?.persons?.[i]?.dateOfBirth?.message && <small className="text-danger ml-1">{errors.persons[i].dateOfBirth.message}</small>}
                      </Col>
                      <Col md={6} className="mb-3">
                        <Label className="mb-0">
                          Is the occupant 18 years of age or over?
                        </Label>
                        <div className="d-flex mt-2">
                          <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <RadioGroup
                                name={`persons[${i}].personAge`}
                                field={field}
                                options={radioOptions}
                                defaultValue={item.personAge}
                                {...register(`persons[${i}].personAge`)}
                                onChange={(e) => handleChangePerson(e, i, 'personAge')}
                              />
                            )}
                          />
                        </div>
                        {errors?.persons?.[i]?.personAge?.message && <small className="text-danger ml-1">{errors.persons[i].personAge.message}</small>}
                      </Col>

                      {item.personAgeStatus && <>
                        <Col md={6} className="mb-3">
                          <Label className="mb-0">Will this occupant be on the lease?</Label>
                          <div className="d-flex mt-2">
                            <Controller
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <RadioGroup
                                  name={`persons[${i}].occupantLease`}
                                  field={field}
                                  defaultValue={item.occupantLease}
                                  options={radioOptions}
                                  {...register(`persons[${i}].occupantLease`)}
                                  onChange={(e) => handleChangePerson(e, i, 'occupantLease')}
                                />
                              )}
                            />
                          </div>
                          {errors?.persons?.[i]?.occupantLease?.message && <small className="text-danger ml-1">{errors.persons[i].occupantLease.message}</small>}
                        </Col>
                        {item.occupantLeaseStatus && <Col md={6} className="mb-3">
                          <Label>Their email</Label>
                          <Input
                            type="text"
                            {...register(`persons[${i}].personEmail`)}
                            onChange={(e) => handleChangePerson(e, i, 'personEmail')}
                            defaultValue={item.personEmail}
                          />
                          {errors?.persons?.[i]?.personEmail?.message && <small className="text-danger ml-1">{errors.persons[i].personEmail.message}</small>}
                        </Col>}

                        {item.occupantLeaseStatus && <Col md={6} className="mb-3">
                          <Label>Mobile/All day contact</Label>
                          <Input
                            type="text"
                            {...register(`persons[${i}].personContact`)}
                            onChange={(e) => handleChangePerson(e, i, 'personContact')}
                            defaultValue={item.personContact}
                          />
                          {errors?.persons?.[i]?.personContact?.message && <small className="text-danger ml-1">{errors.persons[i].personContact.message}</small>}
                        </Col>}
                      </>}

                      {item.personAge === 'false' && <>
                        <Col md={2} className="mb-3">
                          <Label>Their age</Label>
                          <Input
                            type="text"
                            onChange={(e) => handleChangePerson(e, i, 'minorPersonAge')}
                            defaultValue={item.minorPersonAge}
                            {...register(`persons[${i}].minorPersonAge`)}
                          />
                          {errors?.persons?.[i]?.minorPersonAge?.message && <small className="text-danger ml-1">{errors.persons[i].minorPersonAge.message}</small>}
                        </Col>
                      </>}
                    </Row>
                  </FormGroup>
                </div>
              </div>
            );
          })}
          <div className="form-group-block mb-4">
            <h3 className="mb-2">Property inspection</h3>
            <FormGroup className="mb-0">
              <Row>
                <Col md={10} className="mb-3">
                  <Label>Have you inspected this property?</Label>
                  <Controller
                    name="inspectedProperty"
                    control={control}
                    styles={customStyles}
                    rules={{ required: true }}
                    render={({ field }) => (<RenderSelect field={field} defaultValue={inspectedProperty} data={propertyInspectionDetails} placeholder="Please select..." />)
                    }
                  />
                  {errors?.inspectedProperty?.message && <small className="text-danger ml-1">{errors.inspectedProperty.message}</small>}
                </Col>
                {watchFInspectedProperty === '4' &&
                  <Col md={6} className="mb-3">
                    <Label>Associates/Other persons name</Label>
                    <Input
                      type="text"
                      name="associatesPersonsName"
                      defaultValue={associatesPersonsName}
                      {...register("associatesPersonsName")}
                    />
                    {errors?.associatesPersonsName?.message && <small className="text-danger ml-1">{errors.associatesPersonsName.message}</small>}
                  </Col>}
              </Row>
            </FormGroup>

            {watchFInspectedProperty ?
              <>
                <FormGroup className="mb-0">
                  <Row>
                    
                    <Col md={4} className="mb-3">
                      <Label>{watchFInspectedProperty === '1' ? 'When do you intend to inspect the property?' : 'Inspection date'}</Label>
                      <Input
                        type="date"
                        name="inspectionDate"
                        defaultValue={inspectionDate}
                        {...register("inspectionDate")}
                      />
                      {errors?.inspectionDate?.message && <small className="text-danger ml-1">{errors.inspectionDate.message}</small>}
                    </Col>
                  </Row>
                </FormGroup>

                {watchFInspectedProperty === '2' || watchFInspectedProperty === '4' ?
                  <FormGroup className="mb-0">
                    <Row>
                      <Col md={12} className="mb-3">
                        <Label>
                          Was the property upon your inspection in a reasonably clean
                          and fair condition?
                        </Label>
                        <div className="d-flex mt-1">
                          <FormGroup check className="mr-3 pl-0 mb-0">
                            <Controller
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <RadioGroup
                                  name="inspectionReasonably"
                                  field={field}
                                  defaultValue={inspectionReasonably}
                                  options={radioOptions}
                                  {...register('inspectionReasonably')}
                                />
                              )}
                            />
                            {errors?.inspectionReasonably?.message && <small className="text-danger ml-1">{errors.inspectionReasonably.message}</small>}
                          </FormGroup>
                        </div>
                      </Col>
                    </Row>
                    {watchInspectionReasonably === 'false' && <Row>
                      <Col md={6} className="mb-3">
                        <Label>Please provide details</Label>
                        <textarea name="inspectionDetails" className="form-control" rows={3} {...register("inspectionDetails")}></textarea>
                        {/* <Input
                          type="text"
                          name="inspectionDetails"
                          // defaultValue={inspectionDetails}
                          {...register("inspectionDetails")}
                        /> */}
                        {errors?.inspectionDetails?.message && <small className="text-danger ml-1">{errors.inspectionDetails.message}</small>}
                      </Col>
                    </Row>}
                  </FormGroup> : null}
              </> : null}
          </div>
          
          <div className="form-group-block mb-4">
            <h3 className="mb-2">Vehicles</h3>
            <FormGroup className="mb-3">
              <Row>
                <Col md={6} lg={6} className="mb-3">
                  <Label>How many vehicles will be parked at the property?</Label>
                  <Controller
                    name="vehiclesProperty"
                    control={control}
                    styles={customStyles}
                    rules={{ required: true }}
                    render={({ field }) => (<RenderSelect field={field} defaultValue={vehiclesProperty} onChangeHandle={handleChangeNumberOfVehical} data={vehicleProperty} />)
                    }
                  />
                  {errors?.vehiclesProperty?.message && <small className="text-danger ml-1">{errors.vehiclesProperty.message}</small>}
                </Col>
              </Row>
            </FormGroup>
              {
                vehicalDetails?.map((item, i) => {
                  return (
                    <div key={i}>
                      <h3 className="mb-3">Vehicles {i + 1}</h3>
                      <FormGroup className="mb-0">
                        <Row>
                          <Col md={6} lg={4} className="mb-3">
                            <Label>Vehicle type</Label>
                            <Controller
                              name={`vehical[${i}].vehicleType`}
                              control={control}
                              styles={customStyles}
                              rules={{ required: true }}
                              render={({ field }) => (<RenderSelect defaultValue={item.vehicleType} onChangeHandle={(e) => vehicalhandleChange(e, i, 'vehicleType')} field={field} data={vehicle} />)
                              }
                            />
                            {errors?.vehical?.[i]?.vehicleType?.message && <small className="text-danger ml-1">{errors.vehical[i].vehicleType.message}</small>}
                          </Col>
                          {item?.vehicalValue === "other" &&
                            <Col md={6} lg={4} className="mb-3">
                              <Label>Other</Label>
                              <Input type="text" defaultValue={item.makeAndModalOfVehicle} name={`vehical[${i}].makeAndModalOfVehicle`} onChange={(e) => vehicalhandleChange(e, i, 'makeAndModalOfVehicle')} />
                            </Col>
                          }
                          <Col md={6} lg={4} className="mb-3">
                            <Label>Registration/plate number</Label>
                            <Input type="text" {...register(`vehical[${i}].plateNumber`)} defaultValue={item.plateNumber} name={`vehical[${i}].plateNumber`} onChange={(e) => vehicalhandleChange(e, i, 'plateNumber')} />
                            {errors?.vehical?.[i]?.plateNumber?.message && <small className="text-danger ml-1">{errors.vehical[i].plateNumber.message}</small>}
                          </Col>

                        </Row>
                      </FormGroup>
                    </div>
                  )
                })
              }
          </div>
          
          <div className="form-group-block mb-4">
            <h3 className="mb-2">Pets</h3>
            <FormGroup className="mb-3">
              <Row>
                <Col md={6} lg={4} className="mb-3">
                  <Label>How many pets do you have?</Label>
                  <Controller
                    name="totalPetsCount"
                    control={control}
                    styles={customStyles}
                    rules={{ required: true }}
                    render={({ field }) => (<RenderSelect field={field} defaultValue={totalPetsCount} onChangeHandle={handleChangeNumberOfPets} data={vehicleProperty} />)
                    }
                  />
                  {errors?.totalPetsCount?.message && <small className="text-danger ml-1">{errors.totalPetsCount.message}</small>}
                </Col>
              </Row>
            </FormGroup>
            {
              petDetails?.map((item, i) => {
                return (
                  <div key={i}>
                    <h3 className="mb-3">Pet {i + 1}</h3>
                    <FormGroup>
                      <Row>
                        <Col md={6} lg={4} className="mb-3">
                          <Label>Pet name</Label>
                          <Input type="text" {...register(`pets[${i}].petName`)} defaultValue={item.petName} onChange={(e) => petsHandleChange(e, i, 'petName')} />
                          {errors?.pets?.[i]?.petName?.message && <small className="text-danger ml-1">{errors.pets[i].petName.message}</small>}
                        </Col>
                        <Col md={6} lg={4} className="mb-3">
                          <Label>Registration number</Label>
                          <Input type="text"
                          {...register(`pets[${i}].petRegistrationNumber`)}
                          defaultValue={item.petRegistrationNumber} name={`pets[${i}].petRegistrationNumber`} onChange={(e) => petsHandleChange(e, i, 'petRegistrationNumber')} />
                          {errors?.pets?.[i]?.petRegistrationNumber?.message && <small className="text-danger ml-1">{errors.pets[i].petRegistrationNumber.message}</small>}
                        </Col>

                      </Row>
                    </FormGroup>
                  </div>
                )
              })
            }
          </div>
          

        </div>
        <div className="step-btn">
          <Button color="secondary" onClick={handleGoBack}>
            Back
          </Button>
          <Button color="secondary ml-auto" type="submit">
            Save & Continue
          </Button>
        </div>
      </form>
    </>
  );
}
