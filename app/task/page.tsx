import { prisma } from "@/lib/prisma";
import TaskClient from "../components/TaskClient";

export default async function Page() {
  const tasks = await prisma.task.findMany({
    orderBy: { title: "asc" },
  });

  return <TaskClient tasks={tasks} />;
}
