import { Col, FormGroup, Label, Row, Button, Input } from "reactstrap";
import Select from 'react-select'

export default function Step4({ handleNext, handleBack }) {

    return (
        <div className="form-section">
            <h3 className="mb-4">Moving services</h3>
            <FormGroup className="mb-5">
                <p><small>No moving services are currently available for this property. If you are a successful applicant, please arrange your utilities and other moving services with your real estate agent directly.</small></p>
            </FormGroup>
            <div className="step-btn">
                <Button color="secondary" onClick={handleBack} >
                    Back
                </Button>
                <Button color="secondary ml-auto" onClick={handleNext}>
                    Save & Continue
                </Button>
            </div>
        </div>
    )
}