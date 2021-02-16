// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getTasks } from "../../../taskTracker/lib/tasks";
import { getSession } from "next-auth/client";

async function getTasksAPI(req, res) {
  switch (req.method) {
    case "GET":
      const session = await getSession({ req });
      if (session) {
        res.status(200).json(await getTasks(session.user.email));
      } else {
        res.status(200).json(await getTasks(req.headers["email"]));
      }
      break;
    default:
      break;
  }
}

export default getTasksAPI;
