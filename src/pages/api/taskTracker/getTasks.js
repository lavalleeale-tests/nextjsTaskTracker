// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getTasks } from "../../../taskTracker/lib/tasks";

async function getTasksAPI(req, res) {
  switch (req.method) {
    case "POST":
      res.status(200).json(await getTasks(req.body));
      break;
    default:
      break;
  }
}

export default getTasksAPI;
