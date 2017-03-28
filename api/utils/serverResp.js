module.exports = {
  success: (resp) => ({ message: resp, type: 'success' }),
  error: (resp) => ({ message: resp, type: 'error'})
};
