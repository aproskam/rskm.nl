import contentful from 'contentful';
import { API_CONTENTFUL_SPACE_ID, API_CONTENTFUL_ACCESS_TOKEN } from '$env/static/private';

export const client = contentful.createClient({
  space: API_CONTENTFUL_SPACE_ID,
  accessToken: API_CONTENTFUL_ACCESS_TOKEN
});
