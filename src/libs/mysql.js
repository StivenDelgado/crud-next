import mysql from "serverless-mysql";

export const conn = mysql({
  config: {
    host: "localhost",
    user: "StivenDev",
    password: "Stiven2004*",
    port: 3306,
    database: "crud_nextjs",
  },
});