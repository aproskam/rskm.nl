import { error } from '@sveltejs/kit';
import { client } from '$lib/contentfulClient';

const getHomePageData = () => {
  return client
    .getEntry("5jdaaECkdwOpujO0zdmxKF")
    .then(entry => entry)
    .catch(err => console.error("getHomePageData error: ", err));
}

const getWorkData = () => {
  return client
    .getEntries({
      content_type: 'work',
      limit: 2
    })
    .then(response => {
      return {"workData": response.items};
    })
    .catch(err => console.error("getWorkData error: ", err));
}

export const prerender = true;

export async function load() {
  const homePageData = await getHomePageData();
  const workData = await getWorkData();
 
  if (homePageData && workData) {
    return {
      status: 200,
      ...homePageData,
      ...workData
    };
  }
 
  throw error(404, 'Not found');
}
