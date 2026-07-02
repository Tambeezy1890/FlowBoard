import {
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export function useTaskDragAndDrop({
  columns,
  setColumns,
  activeBoard,
  moveTask,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findColumnId = (columns, id) => {
    if (columns.some((column) => column.id === id)) return id;

    return columns.find((column) => column.tasks.some((task) => task.id === id))
      ?.id;
  };

  const handleDragOver = ({ active, over }) => {
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    setColumns((prev) => {
      const sourceColumnId = findColumnId(prev, activeId);
      const targetColumnId = findColumnId(prev, overId);

      if (!sourceColumnId || !targetColumnId) return prev;
      if (sourceColumnId === targetColumnId) return prev;

      const sourceColumn = prev.find((col) => col.id === sourceColumnId);
      const targetColumn = prev.find((col) => col.id === targetColumnId);

      const activeTask = sourceColumn.tasks.find(
        (task) => task.id === activeId
      );

      if (!activeTask) return prev;

      const overIndex = targetColumn.tasks.findIndex(
        (task) => task.id === overId
      );

      const insertIndex =
        overIndex === -1 ? targetColumn.tasks.length : overIndex;

      return prev.map((column) => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== activeId),
          };
        }

        if (column.id === targetColumnId) {
          const cleanTasks = column.tasks.filter(
            (task) => task.id !== activeId
          );

          return {
            ...column,
            tasks: [
              ...cleanTasks.slice(0, insertIndex),
              {
                ...activeTask,
                column: targetColumnId,
              },
              ...cleanTasks.slice(insertIndex),
            ],
          };
        }

        return column;
      });
    });
  };

  const handleDragEnd = async ({ active, over }) => {
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const finalColumnId = findColumnId(columns, activeId);
    if (!finalColumnId || !activeBoard?._id) return;

    const finalColumn = columns.find((col) => col.id === finalColumnId);
    if (!finalColumn) return;

    const oldIndex = finalColumn.tasks.findIndex(
      (task) => task.id === activeId
    );
    const newIndex = finalColumn.tasks.findIndex((task) => task.id === overId);

    let finalTasks = finalColumn.tasks;

    if (newIndex !== -1 && oldIndex !== -1 && oldIndex !== newIndex) {
      finalTasks = arrayMove(finalColumn.tasks, oldIndex, newIndex);

      setColumns((prev) =>
        prev.map((column) =>
          column.id === finalColumnId
            ? { ...column, tasks: finalTasks }
            : column
        )
      );
    }

    const finalOrder = finalTasks.findIndex((task) => task.id === activeId);

    await moveTask(activeBoard._id, activeId, {
      column: finalColumnId,
      order: finalOrder,
    });
  };

  return {
    sensors,
    handleDragOver,
    handleDragEnd,
  };
}
