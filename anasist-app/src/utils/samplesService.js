const SERVER =  "http://localhost:3001";


export const getSamples = () => {
  const path = `${SERVER}/samples`;
  return fetch(path)
    .then(samples => samples.json())
};

export const getSampleData = id => {
  const path = `${SERVER}/sample_datasets/${id}`;
  return fetch(path)
    .then(samples => samples.json())
};
