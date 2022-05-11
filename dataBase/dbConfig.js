module.exports = {
    HOST: "ec2-34-254-120-2.eu-west-1.compute.amazonaws.com",
    PORT: "5432",
    USER: "gsjydlkxutwswk",
    PASSWORD: "898a63d7a7771620af4613dad2af551d8604b944a53ad5d410fe53351799d9c1",
    DB: "daqrv81u7jb4a",
    DIALECT: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };