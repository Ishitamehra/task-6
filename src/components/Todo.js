// src/components/Todo.js
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Todo = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [db]);

  const handleAddTodo = async () => {
    try {
      await addDoc(collection(db, "todos"), {
        ...newTask,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });
      setNewTask({
        name: "",
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
      });
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return; // dropped outside the list

    const updatedTodos = [...todos];
    const [removed] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, removed);

    setTodos(updatedTodos);

    // Update Firebase with the new order
    // Note: You'll need a way to uniquely identify tasks (e.g., using task IDs)
    // and update the Firestore documents accordingly.
    // This example assumes each task has a unique 'id'.
    const batch = [];
    updatedTodos.forEach((task, index) => {
      batch.push(updateDoc(doc(db, "todos", task.id), { order: index }));
    });

    try {
      await writeBatch(batch);
    } catch (error) {
      console.error("Error updating task order:", error.message);
    }
  };

  const handlePriorityChange = async (taskId, newPriority) => {
    const updatedTodos = todos.map((task) =>
      task.id === taskId ? { ...task, priority: newPriority } : task,
    );

    setTodos(updatedTodos);

    // Update Firebase with the new priority
    // This example assumes each task has a unique 'id'.
    try {
      await updateDoc(doc(db, "todos", taskId), { priority: newPriority });
    } catch (error) {
      console.error("Error updating task priority:", error.message);
    }
  };

  return (
    <div>
      <div>
        <label>Task Name:</label>
        <input
          type="text"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <br />
        <br />
        <label>Task Title:</label>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <br />
        <br />
        <label>Description:</label>
        <textarea
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <br />
        <br />
        <label>Due Date:</label>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <br />
        <br />
        <label>Priority:</label>
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <br />
        <br />
        <button type="button" onClick={handleAddTodo}>
          Add Task
        </button>
        <h1>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</h1>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <strong>{task.name}</strong> - {task.title} (
                      {task.priority})<p>{task.description}</p>
                      <p>Due Date: {task.dueDate}</p>
                      {/* Add a button to change priority */}
                      <button
                        onClick={() => handlePriorityChange(task.id, "high")}
                      >
                        High Priority
                      </button>
                      <button
                        onClick={() => handlePriorityChange(task.id, "medium")}
                      >
                        Medium Priority
                      </button>
                      <button
                        onClick={() => handlePriorityChange(task.id, "low")}
                      >
                        Low Priority
                      </button>
                      <h1>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</h1>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div>{/* Input fields and add button*/}</div>
    </div>
  );
};

export default Todo;
