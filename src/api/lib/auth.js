module.exports = {
  authToken(key) {
    return key === process.env.AUTH_TOKEN;
  },
};
