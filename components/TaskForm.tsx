import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";
import Cookie from "universal-cookie";

type Props = {
  taskCreated: any;
};

const cookie = new Cookie();

export const TaskForm = ({ taskCreated }: Props) => {
  const { selectedTask, setSelectedTask } = useContext(StateContext);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`, {
      method: "POST",
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 400) {
        alert("JWT Token not valid");
      }
    });
    setSelectedTask({ id: 0, title: "", created_at: "" });
    // mutateを実行
    taskCreated();
  };

  const update = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${selectedTask.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 400) {
        alert("JWT Token not valid");
      }
    });
    setSelectedTask({ id: 0, title: "", created_at: "" });
    taskCreated();
  };

  return (
    <div>
      <form onSubmit={selectedTask.id !== 0 ? update : create}>
        <input
          type="text"
          className="text-black mb-8 px-2 py-1"
          value={selectedTask.title}
          onChange={(e) =>
            setSelectedTask({ ...selectedTask, title: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
        >
          {selectedTask.id !== 0 ? "update" : "create"}
        </button>
      </form>
    </div>
  );
};
