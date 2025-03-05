
const ENV = process.env.ENV || 'dev';

const config = {
  dev: {
    baseUrl: "https://app-ezclaim-identity-dev-centralus.azurewebsites.net",
  },
  sandbox: {
    baseUrl: "https://ezclaimapisandbox.azurewebsites.net",
  },
  production: {
    baseUrl: "",
  }
};

  const endpoint = {
    baseUrl: "https://ezclaimapisandbox.azurewebsites.net",
    tokenUrl: "https://app-ezclaim-identity-dev-centralus.azurewebsites.net",
    endpoints: {
      login: "/api/auth/login",
      filteringapi: "/api/v2/Reports/FilterList",
     }
  };

module.exports = endpoint;