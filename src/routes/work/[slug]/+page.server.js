import { error } from '@sveltejs/kit';
import { client } from '$lib/contentfulClient';

const getWorkCaseData = (slug) => {
  return client.getEntries({
      content_type: 'work',
      'fields.slug': slug,
      limit: 1
    })
    .then(response => {
      return {"workCaseData": response.items[0]};
    })
    .catch(err => console.error("getWorkCaseData error: ", err));
}

export async function load({ params }) {
  const workCaseData = await getWorkCaseData(params.slug);

  if (workCaseData) {
    return {
      status: 200,
      ...workCaseData
    };
  }

  throw error(404, 'Not found');
}

