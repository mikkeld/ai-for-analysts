export const generateFilename = (file) => file.name.split('.')[0] + '_' + Date.now() + file.name.split('.')[1];

export const formatPercentage = decimal => Math.floor(decimal * 100) + "%";

export const formatDuration = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes} min`
};