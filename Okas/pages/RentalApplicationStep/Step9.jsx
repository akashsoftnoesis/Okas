import { Col, FormGroup, Label, Row, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import RenderSelect from "../../components/Common/RenderSelect";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import RadioGroup from "../../components/Common/RadioGroup";
import { useEffect } from "react";

const employmentData = [
	{ value: "unemployed", label: "I Am Not Employed" },
	{ value: "employed", label: "I Am Currently Employed" },
	{ value: "centrelink", label: "Receiving Centrelink Payments" },
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

export default function Step9({ handleNext, handleBack, handleApplicationData, rentalApplicationData = {} }) {
	const {
		employmentStatus,
		employeeCompanyName,
		employeeCompanyAddress,
		employeeOccupation,
		employeeLength,
		employeeManager,
		employeeEmail,
		employeePhone,
		grossWeekly,
		grossMonthly,
		annualSalary,
		additionalIncome,
		employeeDate,
		additionalGrossMonthly,
		previousEmployment,
		previousEmployeeCompanyName,
		previousEmployeeCompanyAddress,
		previousEmployeeOccupation,
		previousEmployeeLength,
		previousEmployeeManager,
		previousEmployeeEmail,
		previousEmployeeDate,
		previousEmployeePhone,
		previousGrossWeekly,
		previousGrossMonthly,
		previousAnnualSalary,
		monthlyAmount
	} = rentalApplicationData

	const phoneRegExp = /^\d{9}$/
	const digitsOnly = (value) => /^\d+$/.test(value)

	const validationSchema = Yup.object().shape({
		employmentStatus: Yup.string().required('Employment status is required').default(employmentStatus || 'unemployed'),
		employeeCompanyName: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Company name is required').default(employeeCompanyName)
		}),
		employeeCompanyAddress: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Company address is required').default(employeeCompanyAddress)
		}),
		employeeOccupation: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Occupation is required').default(employeeOccupation)
		}),
		employeeLength: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Length is required').test('employeeLength', 'The field should have digits only', digitsOnly).default(employeeLength)
		}),
		employeeManager: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Manager name is required').default(employeeManager)
		}),
		employeeEmail: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Email is required').email('Email is not valid').default(employeeEmail)
		}),
		employeeDate: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Date is required').default(employeeDate)
		}),
		employeePhone: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Phone is required').matches(phoneRegExp, 'Phone number is not valid').default(employeePhone)
		}),
		grossWeekly: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Gross weekly is required').test('grossWeekly', 'The field should have digits only', digitsOnly).default(grossWeekly)
		}),
		grossMonthly: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Gross monthly is required').test('grossMonthly', 'The field should have digits only', digitsOnly).default(grossMonthly)
		}),
		annualSalary: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Annual salary is required').test('annualSalary', 'The field should have digits only', digitsOnly).default(annualSalary)
		}),
		additionalIncome: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Select any one').default(additionalIncome)
		}),
		additionalGrossMonthly: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().when('additionalIncome', {
				is: 'true',
				then: Yup.string().required('Aditional income is required').test('grossMonthly', 'The field should have digits only', digitsOnly).default(additionalGrossMonthly).typeError('Contact number is Invalid')
			})
		}),
		previousEmployment: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().required('Select any one').default(previousEmployment)
		}),
		previousEmployeeCompanyName: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().when('previousEmployment', {
				is: 'true',
				then: Yup.string().required('Company name is required').default(previousEmployeeCompanyName)
			})
		}),
		previousEmployeeCompanyAddress: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().when('previousEmployment', {
				is: 'true',
				then: Yup.string().required('Address is required').default(previousEmployeeCompanyAddress)
			})
		}),
		previousEmployeeOccupation: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().when('previousEmployment', {
				is: 'true',
				then: Yup.string().required('Occupation is required').default(previousEmployeeOccupation)
			})
		}),
		previousEmployeeLength: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().when('previousEmployment', {
				is: 'true',
				then: Yup.string().required('Length is required').test('previousEmployeeLength', 'The field should have digits only', digitsOnly).default(previousEmployeeLength)
			})
		}),
		previousEmployeeManager: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().when('previousEmployment', {
				is: 'true',
				then: Yup.string().required('Manager name is required').default(previousEmployeeManager)
			})
		}),
		previousEmployeeEmail: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().when('previousEmployment', {
				is: 'true',
				then: Yup.string().required('Email is required').default(previousEmployeeEmail)
			})
		}),
		previousEmployeeDate: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().when('previousEmployment', {
				is: 'true',
				then: Yup.string().required('Date is required').default(previousEmployeeDate)
			})
		}),
		previousEmployeePhone: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().when('previousEmployment', {
				is: 'true',
				then: Yup.string().required('Date is required').default(previousEmployeePhone)
			})
		}),
		previousGrossWeekly: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().when('previousEmployment', {
				is: 'true',
				then: Yup.string().required('Date is required').default(previousGrossWeekly)
			})
		}),
		previousGrossMonthly: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().when('previousEmployment', {
				is: 'true',
				then: Yup.string().required('Date is required').default(previousGrossMonthly)
			})
		}),
		previousAnnualSalary: Yup.string().when('employmentStatus', {
			is: 'employed',
			then: Yup.string().when('previousEmployment', {
				is: 'true',
				then: Yup.string().required('Date is required').default(previousAnnualSalary)
			})
		}),
		monthlyAmount: Yup.string().when('employmentStatus', {
			is: 'centrelink',
			then: Yup.string().required('Amount is required').test('monthlyAmount', 'The field should have digits only', digitsOnly).default(monthlyAmount).typeError('Contact number is Invalid')
		})

	});

	const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data) => {
		if (data) {
			handleNext();
			handleApplicationData('step9', data, true);
		}
	};

	const radioOptions = [
		{ label: 'Yes', value: true },
		{ label: 'No', value: false }
	]

	useEffect(() => {
		Object.keys(rentalApplicationData).forEach(item => {
			setValue(item, rentalApplicationData[item])
		})
	}, [rentalApplicationData])

	const employmentStatusValue = watch('employmentStatus', employmentStatus)
	const additionalIncomeValue = watch('additionalIncome', additionalIncome)
	const previousEmploymentValue = watch('previousEmployment', previousEmployment)

	const handleGoBack = () => {
		handleBack();
	}

	return (
		<>
			<form>
				{/* Employment */}
				<div className="form-section">
					<div className="form-group-block">
						<h3 className="mb-2">Current Employment</h3>
						<FormGroup className="mb-0">
							<Row>
								<Col md={6} lg={6} className="mb-3">
									<Label>Employment status</Label>
									<Controller
										name="employmentStatus"
										styles={customStyles}
										control={control}
										rules={{ required: true }}
										render={({ field }) => (<RenderSelect field={field} defaultValue={employmentStatus || 'no'} data={employmentData} />)}
									/>
									{errors?.employmentStatus?.message && <small className="text-danger ml-1">{errors.employmentStatus.message}</small>}
								</Col>
								{employmentStatusValue === 'centrelink' &&
									<Col md={6} lg={4} className="mb-3">
										<Label>Amount (Monthly)</Label>
										<div className="dollar">
											<Input
												type="text"
												defaultValue={monthlyAmount}
												name="monthlyAmount"
												{...register("monthlyAmount")}
											/>
											<span>$</span>
										</div>
										{errors?.monthlyAmount?.message && <small className="text-danger ml-1">{errors.monthlyAmount.message}</small>}
									</Col>}
							</Row>
						</FormGroup>
					</div>

					{employmentStatusValue === 'employed' && <>
						<div className="form-group-block mb-4">
							<FormGroup className="mb-0">
								<Row>
									<Col md={6} lg={6} className="mb-3">
										<Label>Company name</Label>
										<Input
											type="text"
											name="employeeCompanyName"
											defaultValue={employeeCompanyName}
											{...register("employeeCompanyName")}
										/>
										{errors?.employeeCompanyName?.message && <small className="text-danger ml-1">{errors.employeeCompanyName.message}</small>}
									</Col>
									<Col md={6} lg={6} className="mb-3">
										<Label>Company address</Label>
										<ReactGoogleAutocomplete
											options={{
												types: ["address"],
												componentRestrictions: { country: "au" },
											}}
											className="form-control"
											apiKey={process.env.REACT_APP_API_GOOGLE_MAP_KEY}
											defaultValue={employeeCompanyAddress}
											onPlaceSelected={(place) => console.log(place)}
											{...register("employeeCompanyAddress")}
										/>
										{errors?.employeeCompanyAddress?.message && <small className="text-danger ml-1">{errors.employeeCompanyAddress.message}</small>}
									</Col>
									<Col md={6} lg={4} className="mb-3">
										<Label>Occupation/Position</Label>
										<Input
											type="text"
											name="employeeOccupation"
											defaultValue={employeeOccupation}
											{...register("employeeOccupation")}
										/>
										{errors?.employeeOccupation?.message && <small className="text-danger ml-1">{errors.employeeOccupation.message}</small>}
									</Col>
									<Col md={6} lg={4} className="mb-3">
										<Label>Length of employment</Label>
										<Input
											type="text"
											name="employeeLength"
											placeholder="Month"
											defaultValue={employeeLength}
											{...register("employeeLength")}
										/>
										{errors?.employeeLength?.message && <small className="text-danger ml-1">{errors.employeeLength.message}</small>}
									</Col>
									<Col md={6} lg={4} className="mb-3">
										<Label>From</Label>
										<Input type="date" name="employeeDate" defaultValue={employeeDate} {...register("employeeDate")} />
										{errors?.employeeDate?.message && <small className="text-danger ml-1">{errors.employeeDate.message}</small>}
									</Col>
									<Col md={6} lg={4} className="mb-3">
										<Label>Manager name</Label>
										<Input
											type="text"
											name="employeeManager"
											defaultValue={employeeManager}
											{...register("employeeManager")}
										/>
										{errors?.employeeManager?.message && <small className="text-danger ml-1">{errors.employeeManager.message}</small>}
									</Col>
									<Col md={6} lg={4} className="mb-3">
										<Label>Manager email</Label>
										<Input
											type="text"
											name="employeeEmail"
											defaultValue={employeeEmail}
											{...register("employeeEmail")}
										/>
										{errors?.employeeEmail?.message && <small className="text-danger ml-1">{errors.employeeEmail.message}</small>}
									</Col>
									<Col md={6} lg={4} className="mb-3">
										<Label>Manager phone</Label>
										<InputGroup>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>+61</InputGroupText>
											</InputGroupAddon>
											<Input type="text" placeholder="xxx xxx xxx" defaultValue={employeePhone} {...register("employeePhone")} />
										</InputGroup>
										{errors?.employeePhone?.message && <small className="text-danger ml-1">{errors.employeePhone.message}</small>}
									</Col>
								</Row>
							</FormGroup>
						</div>
						<div className="form-group-block mb-4">
							<h3 className="mt-2">Salary</h3>
							<FormGroup className="mb-0">
								<Row>
									<Col md={6} lg={4} className="mb-3">
										<Label>Gross weekly</Label>
										<div className="dollar">
											<Input
												type="text"
												defaultValue={grossWeekly}
												name="grossWeekly"
												{...register("grossWeekly")}
											/>
											<span>$</span>
										</div>
										{errors?.grossWeekly?.message && <small className="text-danger ml-1">{errors.grossWeekly.message}</small>}
									</Col>
									<Col md={6} lg={4} className="mb-3">
										<Label>Gross monthly</Label>
										<div className="dollar">
											<Input
												type="text"
												name="grossMonthly"
												defaultValue={grossMonthly}
												{...register("grossMonthly")}
											/>
											<span>$</span>
										</div>
										{errors?.grossMonthly?.message && <small className="text-danger ml-1">{errors.grossMonthly.message}</small>}
									</Col>
									<Col md={6} lg={4} className="mb-3">
										<Label>Annual salary</Label>
										<div className="dollar">
											<Input
												type="text"
												defaultValue={annualSalary}
												name="annualSalary"
												{...register("annualSalary")}
											/>
											<span>$</span>
										</div>
										{errors?.annualSalary?.message && <small className="text-danger ml-1">{errors.annualSalary.message}</small>}
									</Col>
									<Col md={6} lg={4}>
										<Label className="mb-1 mt-3">
											Additional source of income ?
										</Label>
										<div className="d-flex">
											<Controller
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<RadioGroup
														name={`additionalIncome`}
														field={field}
														defaultValue={additionalIncome}
														options={radioOptions}
														{...register(`additionalIncome`)}
													/>
												)}
											/>
											{errors?.additionalIncome?.message && <small className="text-danger ml-1">{errors.additionalIncome.message}</small>}
										</div>
									</Col>
									{additionalIncomeValue === 'true' &&
										<Col md={6} lg={4} className="mb-3">
											<Label>Gross monthly (additional income)</Label>
											<div className="dollar">
												<Input
													type="text"
													name="additionalGrossMonthly"
													defaultValue={additionalGrossMonthly}
													{...register("additionalGrossMonthly")}
												/>
												<span>$</span>
											</div>
											{errors?.additionalGrossMonthly?.message && <small className="text-danger ml-1">{errors.additionalGrossMonthly.message}</small>}
										</Col>}
									<Col md={6} lg={4}>
										<Label className="mb-1 mt-3">
											Do you have previous employment details?
										</Label>
										<div className="d-flex">
											<Controller
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<RadioGroup
														name={`previousEmployment`}
														field={field}
														defaultValue={previousEmployment}
														options={radioOptions}
														{...register(`previousEmployment`)}
													/>
												)}
											/>
											{errors?.previousEmployment?.message && <small className="text-danger ml-1">{errors.previousEmployment.message}</small>}
										</div>
									</Col>
								</Row>
							</FormGroup>
						</div>


						{/* Previous Employment */}
						{previousEmploymentValue === 'true' && <>
							<div className="form-group-block mb-4">
								<h3 className="mb-2">Previous Employment</h3>
								<FormGroup className="mb-0">
									<Row>
										<Col md={6} lg={6} className="mb-3">
											<Label>Previous company name</Label>
											<Input
												type="text"
												name="previousEmployeeCompanyName"
												defaultValue={previousEmployeeCompanyName}
												{...register("previousEmployeeCompanyName")}
											/>
											{errors?.previousEmployeeCompanyName?.message && <small className="text-danger ml-1">{errors.previousEmployeeCompanyName.message}</small>}
										</Col>
										<Col md={6} lg={6} className="mb-3">
											<Label>Previous company address</Label>
											<ReactGoogleAutocomplete
												options={{
													types: ["address"],
													componentRestrictions: { country: "au" },
												}}
												className="form-control"
												apiKey={process.env.REACT_APP_API_GOOGLE_MAP_KEY}
												defaultValue={previousEmployeeCompanyAddress}
												onPlaceSelected={(place) => console.log(place)}
												{...register("previousEmployeeCompanyAddress")}
											/>
											{errors?.previousEmployeeCompanyAddress?.message && <small className="text-danger ml-1">{errors.previousEmployeeCompanyAddress.message}</small>}
										</Col>
										<Col md={6} lg={4} className="mb-3">
											<Label>Occupation/Position</Label>
											<Input
												type="text"
												name="previousEmployeeOccupation"
												defaultValue={previousEmployeeOccupation}
												{...register("previousEmployeeOccupation")}
											/>
											{errors?.previousEmployeeOccupation?.message && <small className="text-danger ml-1">{errors.previousEmployeeOccupation.message}</small>}
										</Col>
										<Col md={6} lg={4} className="mb-3">
											<Label>Length of employment</Label>
											<Input
												type="text"
												name="previousEmployeeLength"
												placeholder="Month"
												defaultValue={previousEmployeeLength}
												{...register("previousEmployeeLength")}
											/>
											{errors?.previousEmployeeLength?.message && <small className="text-danger ml-1">{errors.previousEmployeeLength.message}</small>}
										</Col>
										<Col md={6} lg={4} className="mb-3">
											<Label>From</Label>
											<Input type="date" name="previousEmployeeDate" defaultValue={previousEmployeeDate} {...register("previousEmployeeDate")} />
											{errors?.previousEmployeeDate?.message && <small className="text-danger ml-1">{errors.previousEmployeeDate.message}</small>}
										</Col>
										<Col md={6} lg={4} className="mb-3">
											<Label>Manager name</Label>
											<Input
												type="text"
												name="previousEmployeeManager"
												defaultValue={previousEmployeeManager}
												{...register("previousEmployeeManager")}
											/>
											{errors?.previousEmployeeManager?.message && <small className="text-danger ml-1">{errors.previousEmployeeManager.message}</small>}
										</Col>
										<Col md={6} lg={4} className="mb-3">
											<Label>Manager email</Label>
											<Input
												type="text"
												name="previousEmployeeEmail"
												defaultValue={previousEmployeeEmail}
												{...register("previousEmployeeEmail")}
											/>
											{errors?.previousEmployeeEmail?.message && <small className="text-danger ml-1">{errors.previousEmployeeEmail.message}</small>}
										</Col>
										<Col md={6} lg={4} className="mb-3">
											<Label>Manager phone</Label>
											<InputGroup>
												<InputGroupAddon addonType="prepend">
													<InputGroupText>+61</InputGroupText>
												</InputGroupAddon>
												<Input type="text" placeholder="xxx xxx xxx" defaultValue={previousEmployeePhone} {...register("previousEmployeePhone")} />
											</InputGroup>
											{errors?.previousEmployeePhone?.message && <small className="text-danger ml-1">{errors.previousEmployeePhone.message}</small>}
										</Col>
									</Row>
								</FormGroup>
							</div>
							<div className="form-group-block">
								<h3 className="mt-3">Salary</h3>
								<FormGroup className="mb-0">
									<Row>
										<Col md={6} lg={4} className="mb-3">
											<Label>Gross weekly</Label>
											<div className="dollar">
												<Input
													type="text"
													defaultValue={previousGrossWeekly}
													name="previousGrossWeekly"
													{...register("previousGrossWeekly")}
												/>
												<span>$</span>
											</div>
											{errors?.previousGrossWeekly?.message && <small className="text-danger ml-1">{errors.previousGrossWeekly.message}</small>}
										</Col>
										<Col md={6} lg={4} className="mb-3">
											<Label>Gross monthly</Label>
											<div className="dollar">
												<Input
													type="text"
													name="previousGrossMonthly"
													defaultValue={previousGrossMonthly}
													{...register("previousGrossMonthly")}
												/>
												<span>$</span>
											</div>
											{errors?.previousGrossMonthly?.message && <small className="text-danger ml-1">{errors.previousGrossMonthly.message}</small>}
										</Col>
										<Col md={6} lg={4} className="mb-3">
											<Label>Annual salary</Label>
											<div className="dollar">
												<Input
													type="text"
													defaultValue={previousAnnualSalary}
													name="previousAnnualSalary"
													{...register("previousAnnualSalary")}
												/>
												<span>$</span>
											</div>
											{errors?.previousAnnualSalary?.message && <small className="text-danger ml-1">{errors.previousAnnualSalary.message}</small>}
										</Col>
									</Row>
								</FormGroup>
							</div>

						</>}
					</>}
				</div>
				{/* Previous Employment */}
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
