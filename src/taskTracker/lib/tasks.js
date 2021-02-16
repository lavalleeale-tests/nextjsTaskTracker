import excuteQuery from "./db";
import { v4 as uuidv4 } from "uuid";

export async function addTask(email, name, content) {
  let id = uuidv4();
  try {
    const result = await excuteQuery({
      query: `INSERT INTO ${process.env.MYSQL_TABLE} (email, id, name, content, reminder) VALUES(?, ?, ?, ?, ?)`,
      values: [email, id, name, content, true],
    });
  } catch (error) {
    console.log(error);
  }

  return {
    id,
    name,
    content,
  };
}

export async function getTasks(email) {
  try {
    const result = await excuteQuery({
      query: `SELECT * FROM ${process.env.MYSQL_TABLE} WHERE email = ?`,
      values: [email],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}
