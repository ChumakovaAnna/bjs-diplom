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
        firstName: `${firstName}`,
        lastName: `${lastName}`
      },
    this.password = `${password}`
  }

  creatUser(callback) {
    return ApiConnector.createUser(
      {
        username: this.username,
        name: {
          firstName: this.firstName,
          lastName: this.lastName
        },
        password: this.password
      },
      (err, data) => {
        console.log(`Пользователь ${this.username} создан.`);
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
        console.log(`Пользователь ${this.username} авторизован.`);
        callback(err, data)
      });
  }

  addMoney({currency, amount}, callback){
    return ApiConnector.addMoney({currency, amount}, (err, data) => {
      console.log(`Добавлено ${amount} ${currency} в кошелек ${this.username}`);
      callback(err, data);
      });
  }

  convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
    return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}, (err, data) => {
      console.log(`Перевели ${targetAmount} ${targetCurrency} из ${fromCurrency}`);
      callback(err, data)
    });
  }

  transferMoney({to, amount}, callback) {
    return ApiConnector.transferMoney({to, amount}, (err, data) => {
      console.log(`Переведено ${amount} токенов пользователю ${to}`);
      callback(err, data);
    });
  }
};

const getStocks = function (callback) {
  return getStocks = ApiConnector.getStocks((err, date) => {
    console.log(`Получили курс валют`);
    callback(err, date);
  });
};

function main () {
  const firstUser = new Profile(
    {
      username: "Oleg First",
      name: {
        firstName: "Oleg",
        lastName: "Versev"
        },
      password: "12345"
  });

  const userSecond = new Profile(
    {
      username: "Sveta Second",
      name: {
        firstName: "Sveta",
        lastName: "Nevolina"
        },
      password: "54321"
    });

    firstUser.creatUser((err, date) => {
      if (err) {
        console.error(`An error occurred during creating ${firstUser}`);
      } else {

        firstUser.performLogin((err, date) => {
          if (err) {
            console.error(`An error occurred during authorization ${firstUser}`);
          } else {

            firstUser.addMoney({currency: `EUR`, amount: 200}, (err, date) => {
              if (err) {
                console.error(`Error during adding money to ${firstUser}`);
              } else {

                // firstUser.convertMoney({fromCurrency: `EUR`, targetCurrency: 100, targetAmount: `EUR`});
              };
            });
          };
        });
      };
    });

};

main();
