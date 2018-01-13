const SERVER =  "http://localhost:3001";

export const getModels = () => {
  const path = `${SERVER}/models`;
  return fetch(path)
    .then(models => models.json())
};