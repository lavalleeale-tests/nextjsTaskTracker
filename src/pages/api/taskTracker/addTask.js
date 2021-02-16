// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getTasks, addTask } from "../../../taskTracker/lib/tasks";
import { getSession } from "next-auth/client";

async function hello(req, res) {
  switch (req.method) {
    case "POST":
      const session = await getSession({ req });
      await addTask(session.user.email, req.body.name, req.body.content);
      res.status(200).json(getTasks(session.user.email));
      break;
    default:
      break;
  }
}

export default hello;
