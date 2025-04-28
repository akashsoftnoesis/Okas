import { Col, FormGroup, Label, Row, Button, Input ,Alert} from "reactstrap";
import Select from "react-select";

export default function Step7({onFinalSubmit,loading,success}) {
  const onSubmit = () => {
    onFinalSubmit();
  }

  return (
    <div className="form-section">
      {success && <Alert color={success === 'success' ? 'success' : 'danger'}>
                {success === 'success' ? <><strong>Success! </strong> Rental Application mail has been sent.</> :
                  <><strong>Sorry!</strong> Your Rental Application mail has not been sent. </>}
              </Alert>}
      <h3 className="mb-4">Review</h3>
      
      <h6>Well done, your application is ready to send to ire@okaspropertygroup.com.au</h6>

      <div className="step-btn">
        <Button color="secondary ml-auto" onClick={onSubmit} disabled={loading || success === 'success' ? true : false}>
          {loading ? 'Loading...' : 'Finish'}
        </Button>
      </div>

    </div>
  );
}
