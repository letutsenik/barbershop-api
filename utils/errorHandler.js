import uniqueParam from './unique-param';

export const errorHandler = (error) => {
  const { message, type, path } = error.errors[0];
  if (type === 'unique violation') {
    uniqueParam(path)
  }
};
