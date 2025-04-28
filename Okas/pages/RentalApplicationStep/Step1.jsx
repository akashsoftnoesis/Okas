import { Col, FormGroup, Label, Row, Button, Input } from "reactstrap";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import RenderSelect from "../../components/Common/RenderSelect";
import { useRouter } from "next/router";

const PropertyState = [
  { value: "ACT", label: "ACT" },
  { value: "NSW", label: "NSW" },
  { value: "NT", label: "NT" }
];

const PropertyType = [
  { value: "Acreage/Semi-Rural", label: "Acreage/Semi-Rural" },
  { value: "Block of Units", label: "Block of Units" },
  { value: "House", label: "House" },
  { value: "Townhouse", label: "Townhouse" },
  { value: "Unit/Apartment", label: "Unit/Apartment" },
];

const Months = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
];

const Years = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10+" },
];

const Bedrooms = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5+" },
];

export const findPropertyData = [
  { value: "rentalList", label: "Rental List" },
  { value: "internet", label: "Internet" },
  { value: "newspaper", label: "Newspaper" },
  { value: "leaseBoard", label: "Lease Board" },
  { value: "other", label: "Other" },
];
export const newspaperDetails = [
  { value: "adelaideAdvertiser", label: "Adelaide Advertiser" },
  { value: "australianFinancialReview", label: "Australian Financial Review" },
  { value: "brisbaneCourierMail", label: "Brisbane Courier Mail" },
  { value: "cityNewsCanberra", label: "City News Canberra" },
  { value: "localPaper", label: "Local Paper" },
  { value: "melbourneHeraldSun", label: "Melbourne Herald Sun" },
  { value: "northernTerritoryNews", label: "Northern Territory News" },
  { value: "sydneyDailyTelegraph", label: "Sydney Daily Telegraph" },
  { value: "sydneyMorningHerald", label: "Sydney Morning Herald" },
  { value: "theAge", label: "The Age" },
  { value: "theAustralian", label: "The Australian" },
  { value: "theCanberraTimes", label: "The Canberra Times" },
  { value: "theMercury", label: "The Mercury" },
  { value: "theSundayMail", label: "The Sunday Mail" },
  { value: "theWestAustralian", label: "The West Australian" },
  { value: "bayOfPlentyTimes", label: "Bay Of Plenty Times" },
  { value: "newZealandHerald", label: "New Zealand Herald" },
  { value: "taranakiDaily", label: "Taranaki Daily" },
  { value: "theDominionPost", label: "The Dominion Post" },
  { value: "theMarlboroughExpress", label: "The Marlborough Express" },
  { value: "theNelsonMail", label: "The Nelson Mail" },
  { value: "thePress", label: "The Press" },
  { value: "theSouthlandTimes", label: "The Southland Times" },
  { value: "waikatoTimes", label: "Waikato Times" },
]
export const websiteDetails = [
  { value: "allhomes.com.au", label: "allhomes.com.au" },
  { value: "aussiehome.com", label: "aussiehome.com" },
  { value: "domain.com.au", label: "domain.com.au" },
  { value: "homehound.com.au", label: "homehound.com.au" },
  { value: "homesales.com.au", label: "homesales.com.au" },
  { value: "iproperty.com.au", label: "iproperty.com.au" },
  { value: "justlisted.com.au", label: "justlisted.com.au" },
  { value: "myhome.com.au", label: "myhome.com.au" },
  { value: "property.com.au", label: "property.com.au" },
  { value: "propertypost.com.au", label: "propertypost.com.au" },
  { value: "realestate.com.au", label: "realestate.com.au" },
  { value: "realestateview.com.au", label: "realestateview.com.au" },
  { value: "reiwa.com", label: "reiwa.com" },
  { value: "rent.com.au", label: "rent.com.au" },
  { value: "rentalguide.com.au", label: "rentalguide.com.au" },
  { value: "rentfind.com.au", label: "rentfind.com.au" },
  { value: "This Agents Website", label: "This Agents Website" },
  { value: "warentals.com.au", label: "warentals.com.au" },
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

export default function Step1({ rentalApplicationData = {}, handleApplicationData, handleNext }) {
  const router = useRouter(); 
  const [data, setData] = useState({}); 

  const { applicationAddress, suburb, state, postCode, propertyType, bedrooms, agencyName, managerName, managerEmail, commencementDate,
    lengthOfLeaseYears, lengthOfLeaseMonths, weeklyRent, monthlyRent, bond, whyPropertyRight, findProperty, Other, Website, Newspaper
  } = rentalApplicationData

  const validationSchema = Yup.object().shape({
    applicationAddress: Yup.string().required('Application address is required').default(applicationAddress),
    propertyType: Yup.string().required('Property type is required').default(propertyType),
    bedrooms: Yup.string().required('No. of bedrooms is required').default(bedrooms),
    agencyName: Yup.string().default(agencyName || 'Okas Property Group'),
    managerName: Yup.string().trim().matches(/^[A-Za-z_ ]+$/, 'Name is not valid').required('Manager name is required').default(managerName),
    managerEmail: Yup.string().email('Email is Invalid').required('Manager email is required').default(managerEmail),
    commencementDate: Yup.string().required('Preferred commencement date is required').default(commencementDate),
    lengthOfLeaseYears: Yup.string().required('Preferred lease years is required').default(lengthOfLeaseYears),
    lengthOfLeaseMonths: Yup.string().required('Preferred lease months is required').default(lengthOfLeaseMonths),
    weeklyRent: Yup.number().required('Weekly rent is required').typeError('Weekly rent must be a number').default(weeklyRent),
    monthlyRent: Yup.number().required('Monthly rent is required').typeError('Monthly rent must be a number').default(monthlyRent),
    bond: Yup.number().required('Bond is required').typeError('Bond must be a number').default(bond),
    findProperty: Yup.string().required('Please select any').default(findProperty),
    whyPropertyRight: Yup.string().required('This field is required').default(whyPropertyRight),
    Other: Yup.string().when('findProperty', {
      is: 'other',
      then: Yup.string().required('Other details is required')
    }).default(Other),
    Website: Yup.string().when('findProperty', {
      is: 'internet',
      then: Yup.string().required('Plaese select any')
    }).default(Website),
    Newspaper: Yup.string().when('findProperty', {
      is: 'newspaper',
      then: Yup.string().required('Plaese select any')
    }).default(Newspaper)
  });

  const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      applicationAddress: data?.displayAddress,
      propertyType: data?.type?.name,
      bedrooms: data?.bed?.toString(),
      weeklyRent: data?.searchPrice,
      monthlyRent: data?.bondPrice,
      bond:data?.bondPrice,
      managerName: 'Nirali Desai',
      managerEmail: 'nirali@okaspropertygroup.com.au'
    }
  });

  const watchFindProperty = watch('findProperty', findProperty);

  console.log('errors', errors)

  const onSubmit = (data) => {
    if (data) {
      handleNext();
      handleApplicationData('step1', data, true);
    }
  };

  useEffect(() => {
    setValue('applicationAddress',data?.displayAddress);
    setValue('propertyType',data?.type?.name);
    setValue('bedrooms',data?.bed?.toString());
    setValue('weeklyRent',data?.searchPrice);
    setValue('monthlyRent',data?.bondPrice);
    setValue('bond',data?.bondPrice);
  }, [data, setValue])

  useEffect(() => {
    const formData = router.query.data && JSON.parse(decodeURIComponent(router.query.data));
    setData({
      ...formData
    })
  }, [router.query]);

  return (
    <>
      <form>
        <div className="form-section">
          <div className="form-group-block mb-4">
            <h3 className="mb-2">Property details</h3>
            <FormGroup className="mb-0">
              <Row>
                <Col md={6} className="mb-3">
                  <Label>Application address, suburb & postcode</Label>
                  <Input type="text" {...register("applicationAddress")} defaultValue={data?.displayAddress || applicationAddress} placeholder="Application address" disabled={!!data?.displayAddress}/>
                  {errors?.applicationAddress?.message && <small className="text-danger ml-1">{errors.applicationAddress.message}</small>}
                </Col>
                <Col md={3} className="mb-3">
                  <Label>Type of property</Label>
                  <Controller
                    name="propertyType"
                    styles={customStyles}
                    control={control}
                    rules={{ required: true }}
                    render={({ field, value, defaultValue }) => (<RenderSelect defaultValue={data?.type?.name || propertyType} field={field} data={PropertyType} disabled={ !!data?.type?.name}/>)}
                  />
                  {errors?.propertyType?.message && <small className="text-danger ml-1">{errors.propertyType.message}</small>}
                </Col>
                <Col md={3} className="mb-3">
                  <Label>Number of bedrooms</Label>
                  <Controller
                    name="bedrooms"
                    styles={customStyles}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (<RenderSelect defaultValue={data?.bed?.toString() || bedrooms} field={field} data={Bedrooms} disabled={ !!data?.bed}/>)}
                  />
                  {errors?.bedrooms?.message && <small className="text-danger ml-1">{errors.bedrooms.message}</small>}
                </Col>
              </Row>
            </FormGroup>
          </div>
          
          <div className="form-group-block mb-4">
            <h3 className="mb-2">Property manager details</h3>
            <FormGroup className="mb-0">
              <Row>
                <Col md={6} className="mb-3">
                  <Label>Agency name</Label>
                  <Input type="text" defaultValue={"Okas Property Group"} {...register("agencyName")} disabled/>
                  {errors?.agencyName?.message && <small className="text-danger ml-1">{errors.agencyName.message}</small>}
                </Col>
                <Col md={3} className="mb-3">
                  <Label>Property manager name</Label>
                  <Input type="text" {...register("managerName")} defaultValue={ 'Nirali Desai'} placeholder="Manager name" disabled/>
                  {errors && errors?.managerName?.message && <small className="text-danger ml-1">{errors.managerName.message}</small>}
                </Col>
                <Col md={3} className="mb-3">
                  <Label>Property manager email</Label>
                  <Input type="text" name="managerEmail" {...register("managerEmail")} defaultValue={"nirali@okaspropertygroup.com.au"} placeholder="Manager email" disabled/>
                  {errors?.managerEmail?.message && <small className="text-danger ml-1">{errors.managerEmail.message}</small>}
                </Col>
              </Row>
            </FormGroup>
          </div>
          <div className="form-group-block">
            <h3 className="mb-2">Lease details</h3>
            <FormGroup className="mb-0">
              <Row>
                <Col xs={12} md={6} lg={4} className="mb-3">
                  <Label>Preferred commencement date</Label>
                  <Input type="date" name="commencementDate" defaultValue={commencementDate} {...register("commencementDate")} />
                  {errors?.commencementDate?.message && <small className="text-danger ml-1">{errors.commencementDate.message}</small>}
                </Col>
                <Col xs={12} md={12} lg={8}>
                  <Label>Preferred length of lease</Label>
                  <Row>
                    <Col xs={6} className="mb-3">
                      <Row className="align-items-center">
                        <small className="col-sm-3">Years</small>
                        <div className="col-sm-9">
                          <Controller
                            name="lengthOfLeaseYears"
                            styles={customStyles}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (<RenderSelect field={field} defaultValue={lengthOfLeaseYears} data={Years} />)}
                          />
                          {errors?.lengthOfLeaseYears?.message && <small className="text-danger ml-1">{errors.lengthOfLeaseYears.message}</small>}
                        </div>
                      </Row>
                    </Col>
                    <Col xs={6} className="mb-3">
                      <Row className="align-items-center">
                        <small className="col-sm-3">Months</small>
                        <div className="col-sm-9">
                          <Controller
                            name="lengthOfLeaseMonths"
                            styles={customStyles}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (<RenderSelect field={field} defaultValue={lengthOfLeaseMonths} data={Months} />)}
                          />
                          {errors?.lengthOfLeaseMonths?.message && <small className="text-danger ml-1">{errors.lengthOfLeaseMonths.message}</small>}
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={4} className="mb-3">
                  <Label>Weekly rent</Label>
                  <div className="dollar">
                    <Input
                      type="text"
                      defaultValue={data?.searchPrice || weeklyRent}
                      name="weeklyRent"
                      {...register("weeklyRent")}
                      disabled={!!data?.searchPrice}
                    />
                    <span>$</span>
                  </div>
                  {errors?.weeklyRent?.message && <small className="text-danger ml-1">{errors.weeklyRent.message}</small>}
                </Col>
                <Col xs={12} md={4} className="mb-3">
                  <Label>Monthly rent</Label>
                    <div className="dollar">
                      <Input
                        type="text"
                        name="monthlyRent"
                        defaultValue={data?.bondPrice || monthlyRent}
                        {...register("monthlyRent")}
                        disabled={!!data?.bondPrice}
                      />
                      <span>$</span>
                    </div>
                    {errors?.monthlyRent?.message && <small className="text-danger ml-1">{errors.monthlyRent.message}</small>}
                  </Col>
                  <Col xs={12} md={4} className="mb-3">
                    <Label>Bond</Label>
                    <div className="dollar">
                      <Input
                        type="text"
                        defaultValue={data?.bondPrice || bond}
                        name="bond"
                        {...register("bond")}
                        disabled={!!data?.bondPrice}
                      />
                      <span>$</span>
                    </div>
                    {errors?.bond?.message && <small className="text-danger ml-1">{errors.bond.message}</small>}
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <Label>How did you find out about this property?</Label>
                    <Controller
                      name="findProperty"
                      styles={customStyles}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (<RenderSelect field={field} defaultValue={findProperty} data={findPropertyData} />)}
                    />
                    {errors?.findProperty?.message && <small className="text-danger ml-1">{errors.findProperty.message}</small>}
                </Col>
                <Col xs={12} md={6} className="mb-3">
                  {watchFindProperty === "other" && (
                    <>
                      <Label>Other Details</Label>
                      <Input type="text" name="Other" defaultValue={Other} {...register("Other")} />
                      {errors?.Other?.message && <small className="text-danger ml-1">{errors.Other.message}</small>}
                    </>
                  )}
                  {watchFindProperty === "internet" && (
                    <>
                      <Label>Website</Label>
                      <Controller
                        name="Website"
                        styles={customStyles}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (<RenderSelect field={field} defaultValue={Website} data={websiteDetails} />)}
                      />
                      {errors?.Website?.message && <small className="text-danger ml-1">{errors.Website.message}</small>}
                    </>
                  )}
                  {watchFindProperty === "newspaper" && (
                    <>
                      <Label>Newspaper</Label>
                      <Controller
                        name="Newspaper"
                        styles={customStyles}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (<RenderSelect field={field} defaultValue={Newspaper} data={newspaperDetails} />)}
                      />
                      {errors?.Newspaper?.message && <small className="text-danger ml-1">{errors.Newspaper.message}</small>}
                    </>
                  )}
                </Col>
                
                <Col xs={12}>
                  <Label>Why is this property right for you?</Label>
                  <Input
                    type="textarea"
                    rows={4}
                    name="whyPropertyRight"
                    defaultValue={whyPropertyRight}
                    {...register("whyPropertyRight", {
                      required: "why property right is required",
                    })}
                  />
                  {errors?.whyPropertyRight?.message && <small className="text-danger ml-1">{errors.whyPropertyRight.message}</small>}
              </Col>
              </Row>
            </FormGroup>
          </div>
        </div>
        <div className="step-btn">
          <Button color="secondary ml-auto" onClick={handleSubmit(onSubmit)}>
            Save & Continue
          </Button>
        </div>
      </form>
    </>
  );
}
