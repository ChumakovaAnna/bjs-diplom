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
    console.log(`Пользователь ${this.username} создан.`);
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
        callback(err, data);
      });
  }

  performLogin(callback) { 
    console.log(`Пользователь ${this.username} авторизован.`);
    return ApiConnector.performLogin(
      {
        username: this.username,
        password: this.password,
      },
      (err, data) => {
        callback(err, data)
      });
  }

  addMoney({currency, amount}, callback){
    console.log(`Добавлено ${amount} ${currency} в кошелек ${this.username}`);
    return ApiConnector.addMoney({currency, amount}, (err, data) => {
      callback(err, data);
      });
  }

  convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
    console.log(`Перевели ${targetAmount} ${targetCurrency} из ${fromCurrency}`);
    return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}, (err, data) => {
      callback(err, data)
    });
  }

  transferMoney({to, amount}, callback) {
    console.log(`Переведено ${amount} токенов пользователю ${to}`);
    return ApiConnector.transferMoney({to, amount}, (err, data) => {
      callback(err, data);
    });
  }
}

const exchangeRates = function (callback) {
  console.log(`Получили курс валют`);
  return getStocks = ApiConnector.getStocks((err, date) => {
    callback(err, date);
  });
}

let oleg = {
  username: `oleg12`,
  name: {
    firstName: `Oleg`,
    lastName: `Braun`},
  password: 1233
};
console.log(oleg);

const firstUser = new Profile(oleg);
console.log(firstUser);

firstUser.creatUser();

console.log(getStocks);