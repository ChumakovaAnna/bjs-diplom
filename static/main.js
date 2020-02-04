class Profile {
  constructor (
    {
      username,
      name: {firstName, lastName},
      password
    }
  ) 
  {
      this.username = `${username}`,
      this.name = {
        firstName,
        lastName
      },
    this.password = `${password}`
  }

  creatUser(callback) {
    return ApiConnector.createUser(
      {
        username: this.username,
        name: this.name,
        password: this.password
      },
      (err, data) => {
        console.log(`Creating user ${this.username}`);
        callback(err, data);
      });
  }

  performLogin(callback) { 
    return ApiConnector.performLogin(
      {
        username: this.username,
        password: this.password,
      },
      (err, data) => {
        console.log(`Authorizing user ${this.username}`);
        callback(err, data)
      });
  }

  addMoney({currency, amount}, callback){
    return ApiConnector.addMoney({currency, amount}, (err, data) => {
      console.log(`Adding ${amount} ${currency} to ${this.username}`);
      callback(err, data);
      });
  }

  convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
    return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}, (err, data) => {
      console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
      callback(err, data)
    });
  }

  transferMoney({to, amount}, callback) {
    return ApiConnector.transferMoney({to, amount}, (err, data) => {
      console.log(`Transfering ${amount} of Netcoins to  ${to}`);
      callback(err, data);
    });
  }
};

function getStocks(callback) {
  return ApiConnector.getStocks((err, data) => {
    console.log(`Getting stocks info`)
    callback(err, data);
  });
};

function main () {
  let stocks;
  
  getStocks((err, data) => {
    if (err) {
      console.error(`Error during getting stocks`);
    } else {
      console.log(data[0]);
      stocks = data[0];
    };

    const userFirst = new Profile(
      {
        username: "Oleg",
        name: {
          firstName: "Oleg",
          lastName: "Versev"
          },
        password: "12345"
    });
  
    const userSecond = new Profile(
      {
        username: "Sveta",
        name: {
          firstName: "Sveta",
          lastName: "Nevolina"
          },
        password: "54321"
      });
  
    userFirst.creatUser((err, data) => {
      if (err) {
        console.error(`Error during creating ${userFirst.username}`);
      } else {
        console.log(`${userFirst.username} is created.`);
  
        userFirst.performLogin((err, data) => {
          if (err) {
            console.error(`Error during authorization ${userFirst.username}`);
          } else {
            console.log(`${userFirst.username} is authorized`);
  
            const newMoney = {
              currency: `RUB`,
              amount: 20000
            };
            userFirst.addMoney(newMoney, (err, data) => {
              if (err) {
                console.error(`Error during adding money to ${userFirst.username}`);
              } else {
                console.log(`Added ${newMoney.amount} ${newMoney.currency} to ${userFirst.username}`);
                
                const newCoins = {
                  fromCurrency: `RUB`,
                  targetCurrency: `NETCOIN`,
                  targetAmount: 10
                };
                userFirst.convertMoney(newCoins, (err, data) => {
                  if (err) {
                    console.error(`Error during convetring money`);
                  } else {
                    console.log(`${userFirst.username} converted to coins`, data);

                    userSecond.creatUser((err, data) => {
                      if (err) {
                        console.error(`Error during creating ${userSecond.username}`);
                      } else {
                        console.log(`${userSecond.username} is created.`);

                        const present = {
                          to: userSecond.username,
                          amount: 5
                        };
                        userFirst.transferMoney(present, (err, data) => {
                          if (err) {
                            console.error(`Error during transfer money`);
                          } else {
                            console.log(`${userSecond.username} has got ${present.amount} netcoins`);
                          };
                        });
                      };
                    });
                  };
                });
              };
            });
          };
        });
      };
    });
  });
};

main();
