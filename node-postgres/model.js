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
                  `A new merchant has been added added: ${JSON.stringify(
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

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  getLoginInfo,
  deleteLoginInfo,
  getAddress,
  deleteAddress,
};
