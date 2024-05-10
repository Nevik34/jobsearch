// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Note, Update, Listing, Recruiter } = initSchema(schema);

export {
  Note,
  Update,
  Listing,
  Recruiter
};