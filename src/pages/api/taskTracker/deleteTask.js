// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteTask } from "../../../taskTracker/lib/tasks";
import { getSession } from "next-auth/client";

async function hello(req, res) {
  switch (req.method) {
    case "DELETE":
      const session = await getSession({ req });
      res.status(200).json(deleteTask(req.body, session.user.email));
      break;
    default:
      break;
  }
}

export default hello;
