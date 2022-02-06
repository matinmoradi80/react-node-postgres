const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "my_database",
  password: "1041018",
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
});

const getUsers = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM usersite", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, firstname, lastname, username, password } = body;
    pool.query(
      "Insert into logininfo (username, password) values ($1, $2)",
      [username, password],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          pool.query(
            "INSERT INTO usersite (nationalcode, firstname, lastname, username) VALUES ($1, $2, $3, $4);",
            [nationalcode, firstname, lastname, username],
            (error, results) => {
              if (error) {
                reject(error);
                console.log(error);
              } else {
                resolve(
                  `A new user has been added added: ${JSON.stringify(
                    results.rows[0]
                  )}`
                );
              }
            }
          );
        }
      }
    );
  });
};

const deleteUser = (merchantId) => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(merchantId);

    pool.query(
      "DELETE FROM usersite WHERE nationalcode = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`Merchant deleted with ID: ${id}`);
        }
      }
    );
  });
};

const getLoginInfo = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM logininfo", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteLoginInfo = (username) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM logininfo WHERE username = $1",
      [username],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`logininfo deleted with username: ${username}`);
        }
      }
    );
  });
};

const getAddress = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM address", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteAddress = (postalcode) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM address WHERE postalcode = $1",
      [postalcode],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`address deleted with postalcode: ${postalcode}`);
        }
      }
    );
  });
};

const createAddress = (body) => {
  return new Promise(function (resolve, reject) {
    const { postalcode, state, city, street, vallay, plate, floor } = body;
    pool.query(
      "INSERT INTO address (postalcode, state, city, street, vallay, plate, floor) VALUES ($1, $2, $3, $4, $5, $6, $7);",
      [postalcode, state, city, street, vallay, plate, floor],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new address has been added: ${JSON.stringify(results.rows[0])}`
          );
        }
      }
    );
  });
};

const getClientAddress = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM clientaddress", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteClientAddress = (postalcode, nationalcode) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM clientAddress WHERE postalcode = $1 and nationalcode = $2",
      [postalcode, nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`clientaddress deleted with username: ${postalcode}`);
        }
      }
    );
  });
};

const createClientAddress = (body) => {
  return new Promise(function (resolve, reject) {
    const { postalcode, nationalcode } = body;
    pool.query(
      "INSERT INTO clientaddress (postalcode, nationalcode) VALUES ($1, $2);",
      [postalcode, nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new clientAddress has been added: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        }
      }
    );
  });
};

const getClientAddressView = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM clientaddressview", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getClient = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM client", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteClient = (nationalcode) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM client WHERE nationalcode = $1",
      [nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`clientaddress deleted with nationalcode: ${nationalcode}`);
        }
      }
    );
  });
};

const createClient = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, wallet } = body;
    pool.query(
      "INSERT INTO client (nationalcode, wallet) VALUES ($1, $2);",
      [nationalcode, wallet],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new clientAddress has been added: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        }
      }
    );
  });
};

const getClientUser = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM clientuser", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getManager = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM manager", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  getLoginInfo,
  deleteLoginInfo,
  getAddress,
  deleteAddress,
  createAddress,
  getClientAddress,
  deleteClientAddress,
  createClientAddress,
  getClientAddressView,
  getClient,
  deleteClient,
  createClient,
  getClientUser,
  getManager,
};
