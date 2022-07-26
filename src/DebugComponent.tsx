import React, { useCallback } from "react";
import {
  onFetchJson,
  onFetchLocalJson,
  onNotes,
  onNotesSnapshotV3,
} from "./api";

export const DebugComponent: React.FC = () => {
  const [count, setCount] = React.useState<string | number>(0);
  const [started, setStarted] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const startOnSnapshot = useCallback(async (maxCount: number) => {
    setStarted(true);
    await onNotesSnapshotV3(maxCount, setCount);
    setDone(true);
  }, []);
  const startGetAtOnce = useCallback(async (maxCount: number) => {
    setStarted(true);
    await onNotes(maxCount, setCount);
    setDone(true);
  }, []);
  const startFetchAWS = useCallback(
    async (maxCount: number, isGradually: boolean) => {
      setStarted(true);
      await onFetchJson(maxCount, setCount, isGradually);
      setDone(true);
    },
    []
  );
  const startFetchLocalJson = useCallback(async (maxCount: number) => {
    setStarted(true);
    await onFetchLocalJson(maxCount, setCount);
    setDone(true);
  }, []);

  const reset = () => {
    setStarted(false);
    setDone(false);
    setCount(0);
  };

  return (
    <div>
      <h4>Grab documents from AWS based on the number of documents</h4>

      {started ? null : (
        <>
          <p>
            sample AWS &nbsp;
            <a
              target="_blank"
              href="https://mila-test-json.s3.us-east-1.amazonaws.com/1000data.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIBHSBiPqp3JzSDIRThrPEAfMpXYc8ffAhyGaW0DFi6YGAiEApPSh%2BQDPkQtkkiyF0Wwi5KjAbnkGHkrbMeobw8WuFw4q7QIIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2MzA2MDgyMDExNjkiDOIW5VeUfL67gYaJ4SrBArMy1HAvwRGtumIYpuVR6QNgLswHjQJvRmqACCsPDSM5Bg2JkG5lI%2B0%2FutqIKB%2BO9si8TnZ3LHoDNBYXmF1VK25fbyG6sVImEk8L%2BXC2lClvYtuTdasPyr5CySh9FEJvNXR9m6KlH6iTfTjeIcFF4RRNEMnCSBSUmbFTHrCoJ6G5Oud3z7627znLE3IqH7D9RVoNXzHUuRXHFW%2FYzfPbDN980mdpn0kKBG9msRj8exP6%2Fn6Ha%2Fkco0rek5sTC3jfC7XfYuqrlholOBS7uVBhhWnEftQA%2BwHVwAtnv5xOdY4qIup7sK2%2FGoqzdbU%2FEgj0BWXk2kJPW0%2B02lIQdEsXnO5GLVOrB7OFuDT5gKjcsRA47K%2FrMyKWuhToNmjW%2FecxOS5p7JZsG7yx5Uxbu4tM1icWYI0eku%2FRJyqYia%2FVVERXQTCutoCXBjqzAolm89YhSGOhC46wn7fZiHETDnGUylYp%2By6J0e3lcM%2FoDxSi55UzxQwwoh55MVLYVWL2xVefv614mAPgaHYNKl0Lfw3IVg9RGug68o%2FItsaEQTJshzHksyFNq6FD0BqiWEKMViphu%2FzI3lFFVC0hgQKRQkcLJkPGZoAcX7aZx9yD48zFFJbZeJgPkvRf8jyp%2BocpsYeIAVugrPE2WgO9JchFiLKe1Bj3TW%2Ft9V7HCfGZ9AFcrkf6wC%2FxDMBpiLErjqPBZmuTMb53WmlyKtIohHo8X%2FWSS0gJy%2BrXC%2FRqe2sTMEjbTBX8ne3AKKvh%2BUzCMx5l%2FUhU%2FVXNp6juFK075Y0pyioa6%2BayjzzELzNjZgtsEuL7dHrjvhcCbVZvjoytVz6lTZ4vJn7if2io0beubQq3eZI%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220726T165143Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAZFUZNQXISNTUNR6A%2F20220726%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c3809e152c93f58fe8cd49acd2f3c0944064a429fa23228f6ed163ff55e90294"
            >
              link
            </a>
          </p>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[50, 100, 1000, 2000, 5000].map((maxCount) => {
              return (
                <li key={maxCount}>
                  <button onClick={() => startFetchAWS(maxCount, false)}>
                    click me to fetch {maxCount} documents from aws
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {started ? null : (
        <>
          <h4>
            Grab documents from AWS repeatedly by fetching 50 documents each
            time
          </h4>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[50, 100, 1000, 2000, 5000].map((maxCount) => {
              return (
                <li key={maxCount}>
                  <button onClick={() => startFetchAWS(maxCount, true)}>
                    click me to fetch {maxCount} documents from aws gradually
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {started ? null : (
        <>
          <h4>
            Grab documents from local json file based on the number of documents
          </h4>

          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[50, 100, 1000, 2000, 5000].map((maxCount) => {
              return (
                <li key={maxCount}>
                  <button onClick={() => startFetchLocalJson(maxCount)}>
                    click me to fetch {maxCount} local documents
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {/* {started ? null : (
        <ul
          style={{
            listStyle:"none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {[50, 100, 500, 1000, 2000, 5000].map((maxCount) => {
            return (
              <li key={maxCount}>
                <button onClick={() => startOnSnapshot(maxCount)}>
                  click me to load {maxCount} documents with listener
                </button>
              </li>
            );
          })}
        </ul>
      )} */}

      {started ? null : (
        <>
          <h4>
            Grab documents from Firestore repeatedly by fetching 50 documents
            each time
          </h4>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[50, 100, 500, 1000, 2000, 5000].map((maxCount) => {
              return (
                <li key={maxCount}>
                  <button onClick={() => startGetAtOnce(maxCount)}>
                    click me to load {maxCount} documents from firestore
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {started ? <p>loaded documents: {count}</p> : null}

      {done && <h1>Finished!</h1>}
      {done && <button onClick={reset}>reset</button>}
      <div>
        Note:
        <span>1. all data are the same in Firestire, AWS, and local</span>
        <span> &nbsp; 2. 50 documents ≈ 2MB </span>
      </div>
    </div>
  );
};
