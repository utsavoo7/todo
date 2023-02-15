import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const addTodo = ({ completed, title, description }) => {
  return addDoc(collection(db, "todo"), {
    completed: completed,
    title: title,
    description: description,
  });
};

const updateTodo = ({ id, completed, title, description }) => {
  return updateDoc(doc(db, "todo", id), {
    completed: completed,
    title: title,
    description: description,
  });
};

const deleteTodo = ({ id }) => {
  return deleteDoc(doc(db, "todo", id));
};

export { addTodo, updateTodo, deleteTodo };
