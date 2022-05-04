import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTasksData } from "../lib/tasks";
import { NextPage } from "next";
import { TaskType } from "../types/task";
import { Task } from "../components/Task";
import useSWR from "swr";
import { useEffect } from "react";
import StateContextProvider from "../context/StateContext";
import { TaskForm } from "../components/TaskForm";

type Props = {
  static_filtered_tasks: TaskType[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API_URL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

const TaskPage: NextPage<Props> = ({ static_filtered_tasks }) => {
  // useSWRでフェッチング
  const { data: tasks, mutate } = useSWR(API_URL, fetcher, {
    fallbackData: static_filtered_tasks,
  });

  const filtered_tasks: TaskType[] = tasks.sort(
    (a: TaskType, b: TaskType) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  useEffect(() => {
    // mutate()でuseSWRで実行されるキャッシュを最新化できる
    mutate();
  }, []);

  return (
    <StateContextProvider>
      <Layout title="Task Page">
        <TaskForm taskCreated={mutate} />
        <ul>
          {filtered_tasks &&
            filtered_tasks.map((task) => (
              <Task key={task.id} task={task} taskDelated={mutate} />
            ))}
        </ul>
        <Link href="/main-page">
          <div className="flex cursor-pointer mt-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            <span>Back to main page</span>
          </div>
        </Link>
      </Layout>
    </StateContextProvider>
  );
};

export default TaskPage;

export const getStaticProps = async () => {
  const static_filtered_tasks = await getAllTasksData();

  return {
    props: { static_filtered_tasks },
    revalidate: 3,
  };
};
