import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

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