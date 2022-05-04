import fetch from "node-fetch";
import { TaskType } from "../types/task";

// すべてのタスクデータを取得する関数
export const getAllTasksData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`
  );

  const tasks: TaskType[] = (await res.json()) as TaskType[];
  const filtered_tasks: TaskType[] = tasks.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return filtered_tasks;
};

// タスクidの一覧を取得するための関数
export const getAllTaskIds = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`
  );

  const tasks: TaskType[] = (await res.json()) as TaskType[];
  return tasks.map((task) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });
};

// 特定のIDに対してタスクを取得する関数
export const getTaskData = async (id: string | undefined) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`
  );
  const task: TaskType = (await res.json()) as TaskType;

  return {
    task,
  };
};
