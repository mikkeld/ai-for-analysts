// const SERVER =  "http://127.0.0.1:5000/api";
const SERVER =  "http://localhost:3001";

// export const getHeaders = filePath => {
//   return fetch(`${SERVER}/headers`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(filePath)
//   }).then(res => res.json())
// };

export const getHeaders = filePath => {
  const path = `${SERVER}/headers`;
  return fetch(path)
    .then(headers => headers.json())
};


export const analyse = (type, inputs) => {
  const path = `${SERVER}/initial_issues`;
  return fetch(path)
    .then(assessment => assessment.json())
};
