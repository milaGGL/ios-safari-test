import { db } from "../firebase.config";
import  * as firestore from '@firebase/firestore'

const NOTES_COLLECTION = "debug_notes";

export const getNotesRef = () => {
  return   firestore.collection(db, NOTES_COLLECTION)
};

export const sleep = (time = 0) => {
  return new Promise((success) => {
    setTimeout(success, time)
  })
}
