export const generateFilename = (file) => file.name.split('.')[0] + '_' + Date.now() + file.name.split('.')[1];
