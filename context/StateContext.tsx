import { createContext, ReactNode, useState } from "react";
import { TaskType } from "../types/task";

type ContextType = {
  selectedTask: TaskType;
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskType>>;
};

type Props = {
  children: ReactNode;
};

export const StateContext = createContext({} as ContextType);

const StateContextProvider = (props: Props) => {
  const [selectedTask, setSelectedTask] = useState({
    id: 0,
    title: "",
    created_at: "",
  });

  return (
    <StateContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
