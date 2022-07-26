
import {
  limit,
  orderBy,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  startAfter,
  where,
  getDocs,
  DocumentData
} from "firebase/firestore";
import { getNotesRef, sleep } from "./helpers";


const PAGE_SIZE = 50;
const SLEEP_BETWEEN_PAGES = 5;

export const onNotes = async (
  maxCount: number,
  onLoadingPage: (count: number) => void
) => {
  const ref = getNotesRef();

  let lastSyncDate: Date | undefined = undefined;
  let lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;

  let count = 0;
  do {
    console.log("loading page");
    await sleep(SLEEP_BETWEEN_PAGES);

    const constraints: QueryConstraint[] = [
      limit(PAGE_SIZE),
    ];

    const pageQuery = query(ref, ...constraints);
    const snap = await getDocs(pageQuery);

    count += snap.docs.length;
    console.log(`loaded ${snap.docs.length} records. total ${count} records`);
    onLoadingPage(count);

    lastDoc = snap.docs[snap.docs.length - 1];

  } while (lastDoc && count < maxCount);

  console.log("all pages are loaded");

  return null
};
