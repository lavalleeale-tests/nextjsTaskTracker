// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteTask } from "../../../taskTracker/lib/tasks";
import { getSession } from "next-auth/client";

export default async function deleteTasksApi(req, res) {
  switch (req.method) {
    case "DELETE":
      const session = await getSession({ req });
      res.status(200).json(deleteTask(req.body, session.user.email));
      break;
    default:
      break;
  }
}
