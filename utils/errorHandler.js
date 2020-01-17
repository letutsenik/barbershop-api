import uniqueParam from './unique-param';

export const errorHandler = (error) => {
  const { errors = [] } = error;
  const { message, type, path } = errors[0] || {};
  if (type === 'unique violation') {
    uniqueParam(path)
  }
};
