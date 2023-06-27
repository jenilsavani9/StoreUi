import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Spinners() {
  return (
    <Button variant="dark" disabled>
      <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      Loading...
    </Button>
  );
}

export default Spinners;