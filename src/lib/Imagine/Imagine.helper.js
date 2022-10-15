const linkGenerator = (link = '', parameters = 'fm=jpg') => {
  return `${link}?${parameters}`;
}

export default linkGenerator;
