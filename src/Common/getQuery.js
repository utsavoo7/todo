import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getAllData = async (collection_name) => {
  const doc_refs = await getDocs(collection(db, collection_name));

  const res = [];

  doc_refs.forEach((country) => {
    res.push({
      id: country.id,
      ...country.data(),
    });
  });

  return res;
};
