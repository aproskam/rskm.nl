import { error } from '@sveltejs/kit';
import { client } from '$lib/contentfulClient';

const getWorkPageData = () => {
  return client
    .getEntry("5s9fuvkHTxb0Z9AP42xqik")
    .then(entry => {
      return entry;
    })
    .catch(err => console.error("getWorkPageData error: ", err));
}

const getWorkData = () => {
  return client
    .getEntries({
      content_type: 'work'
    })
    .then(response => {
      return {"workData": response.items};
    })
    .catch(err => console.error("getWorkData error: ", err));
}

export async function load() {
  const workPageData = await getWorkPageData();
  const workData = await getWorkData();

	if (workPageData) {
    return {
      status: 200,
      ...workPageData,
      ...workData
    };
  }

	throw error(404, 'Not found');
}
