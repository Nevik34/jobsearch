import { RecruiterUpdateForm } from '../ui-components';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateRecruiter() {
  const params = useParams();
  return <RecruiterUpdateForm id={params.recruiterId} />;
}
