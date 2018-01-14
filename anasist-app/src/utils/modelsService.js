const SERVER =  "http://localhost:3001";

export const getModels = () => {
  const path = `${SERVER}/models`;
  return fetch(path)
    .then(models => models.json())
};

export const getModelData = modelId => {
  const path = `${SERVER}/model_results/${modelId}`;
  return fetch(path)
    .then(data => data.json())
};

export const getDeployData = modelId => {
  const path = `${SERVER}/deploy/${modelId}`;
  return fetch(path)
    .then(deployment => deployment.json())
};