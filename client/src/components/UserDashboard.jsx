import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import PriorityCard from "./PriorityCard";

function UserDashboard() {
  const initialColumns = [
    { id: "today", title: "Today", tasks: [] },
    { id: "week", title: "This Week", tasks: [] },
    { id: "later", title: "Later", tasks: [] },
  ];
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem("trello-columns");
    if (savedColumns) {
      return JSON.parse(savedColumns);
    }
    return initialColumns;
  });

  useEffect(() => {
    localStorage.setItem("trello-columns", JSON.stringify(columns));
  }, [columns]);

  const addTask = (columnId, taskTitle) => {
    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: [
                ...column.tasks,
                {
                  id: Date.now(),
                  title: taskTitle,
                },
              ],
            }
          : column
      )
    );
  };
  return (
    <div className="bg-purple-600 h-screen rounded-2xl scrollbar-thin  ">
      <div className="sticky top-0">
        <DashboardHeader />
      </div>
      <div className="overflow-x-auto overflow-y-auto px-2 h-[calc(100%-140px)]">
        <div className="flex gap-4 items-start">
          {columns.map((card) => (
            <PriorityCard
              key={card.id}
              column={card}
              addTask={addTask}
              count={card.tasks?.length}
              title={card.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
