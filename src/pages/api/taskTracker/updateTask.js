// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteTask, getTasks, addTask } from "../../../taskTracker/lib/tasks";
import { getSession } from "next-auth/client";

export default async function addTaskAPI(req, res) {
  switch (req.method) {
    case "PUT":
      const session = await getSession({ req });
      await deleteTask(req.body.id, session.user.email);
      await addTask(session.user.email, req.body.name, req.body.content);
      res.status(200).json(getTasks(session.user.email));
      break;
    default:
      break;
  }
}
