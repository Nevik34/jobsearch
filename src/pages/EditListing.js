import { ListingUpdateForm } from '../ui-components';
import { useParams, useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';

export default function EditListing(props) {
  const navigate = useNavigate();
  const params = useParams();
  const client = generateClient();
  console.log(params);
  return (
    <ListingUpdateForm
      id={params.listingId}
      onSuccess={() => navigate('/listings')}
    />
  );
}
