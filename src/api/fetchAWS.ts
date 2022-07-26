import { sleep } from "./helpers";

const SLEEP_BETWEEN_PAGES = 5;

const urls = {
  "50": "https://mila-test-json.s3.us-east-1.amazonaws.com/50data.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIBHSBiPqp3JzSDIRThrPEAfMpXYc8ffAhyGaW0DFi6YGAiEApPSh%2BQDPkQtkkiyF0Wwi5KjAbnkGHkrbMeobw8WuFw4q7QIIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2MzA2MDgyMDExNjkiDOIW5VeUfL67gYaJ4SrBArMy1HAvwRGtumIYpuVR6QNgLswHjQJvRmqACCsPDSM5Bg2JkG5lI%2B0%2FutqIKB%2BO9si8TnZ3LHoDNBYXmF1VK25fbyG6sVImEk8L%2BXC2lClvYtuTdasPyr5CySh9FEJvNXR9m6KlH6iTfTjeIcFF4RRNEMnCSBSUmbFTHrCoJ6G5Oud3z7627znLE3IqH7D9RVoNXzHUuRXHFW%2FYzfPbDN980mdpn0kKBG9msRj8exP6%2Fn6Ha%2Fkco0rek5sTC3jfC7XfYuqrlholOBS7uVBhhWnEftQA%2BwHVwAtnv5xOdY4qIup7sK2%2FGoqzdbU%2FEgj0BWXk2kJPW0%2B02lIQdEsXnO5GLVOrB7OFuDT5gKjcsRA47K%2FrMyKWuhToNmjW%2FecxOS5p7JZsG7yx5Uxbu4tM1icWYI0eku%2FRJyqYia%2FVVERXQTCutoCXBjqzAolm89YhSGOhC46wn7fZiHETDnGUylYp%2By6J0e3lcM%2FoDxSi55UzxQwwoh55MVLYVWL2xVefv614mAPgaHYNKl0Lfw3IVg9RGug68o%2FItsaEQTJshzHksyFNq6FD0BqiWEKMViphu%2FzI3lFFVC0hgQKRQkcLJkPGZoAcX7aZx9yD48zFFJbZeJgPkvRf8jyp%2BocpsYeIAVugrPE2WgO9JchFiLKe1Bj3TW%2Ft9V7HCfGZ9AFcrkf6wC%2FxDMBpiLErjqPBZmuTMb53WmlyKtIohHo8X%2FWSS0gJy%2BrXC%2FRqe2sTMEjbTBX8ne3AKKvh%2BUzCMx5l%2FUhU%2FVXNp6juFK075Y0pyioa6%2BayjzzELzNjZgtsEuL7dHrjvhcCbVZvjoytVz6lTZ4vJn7if2io0beubQq3eZI%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220726T165055Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAZFUZNQXISNTUNR6A%2F20220726%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=6f1de08e8552c7c4f1a437d2004dfb210f0938bd8a436c45eb5ee82a3ddb95c2",
  "100":
    "https://mila-test-json.s3.us-east-1.amazonaws.com/100data.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIBHSBiPqp3JzSDIRThrPEAfMpXYc8ffAhyGaW0DFi6YGAiEApPSh%2BQDPkQtkkiyF0Wwi5KjAbnkGHkrbMeobw8WuFw4q7QIIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2MzA2MDgyMDExNjkiDOIW5VeUfL67gYaJ4SrBArMy1HAvwRGtumIYpuVR6QNgLswHjQJvRmqACCsPDSM5Bg2JkG5lI%2B0%2FutqIKB%2BO9si8TnZ3LHoDNBYXmF1VK25fbyG6sVImEk8L%2BXC2lClvYtuTdasPyr5CySh9FEJvNXR9m6KlH6iTfTjeIcFF4RRNEMnCSBSUmbFTHrCoJ6G5Oud3z7627znLE3IqH7D9RVoNXzHUuRXHFW%2FYzfPbDN980mdpn0kKBG9msRj8exP6%2Fn6Ha%2Fkco0rek5sTC3jfC7XfYuqrlholOBS7uVBhhWnEftQA%2BwHVwAtnv5xOdY4qIup7sK2%2FGoqzdbU%2FEgj0BWXk2kJPW0%2B02lIQdEsXnO5GLVOrB7OFuDT5gKjcsRA47K%2FrMyKWuhToNmjW%2FecxOS5p7JZsG7yx5Uxbu4tM1icWYI0eku%2FRJyqYia%2FVVERXQTCutoCXBjqzAolm89YhSGOhC46wn7fZiHETDnGUylYp%2By6J0e3lcM%2FoDxSi55UzxQwwoh55MVLYVWL2xVefv614mAPgaHYNKl0Lfw3IVg9RGug68o%2FItsaEQTJshzHksyFNq6FD0BqiWEKMViphu%2FzI3lFFVC0hgQKRQkcLJkPGZoAcX7aZx9yD48zFFJbZeJgPkvRf8jyp%2BocpsYeIAVugrPE2WgO9JchFiLKe1Bj3TW%2Ft9V7HCfGZ9AFcrkf6wC%2FxDMBpiLErjqPBZmuTMb53WmlyKtIohHo8X%2FWSS0gJy%2BrXC%2FRqe2sTMEjbTBX8ne3AKKvh%2BUzCMx5l%2FUhU%2FVXNp6juFK075Y0pyioa6%2BayjzzELzNjZgtsEuL7dHrjvhcCbVZvjoytVz6lTZ4vJn7if2io0beubQq3eZI%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220726T165120Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAZFUZNQXISNTUNR6A%2F20220726%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e61e8b06d96201e76c3bfdbb0e44d883f1d8b0c48e8f6e391fb289e27a0ff1fc",
  "1000":
    "https://mila-test-json.s3.us-east-1.amazonaws.com/1000data.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIBHSBiPqp3JzSDIRThrPEAfMpXYc8ffAhyGaW0DFi6YGAiEApPSh%2BQDPkQtkkiyF0Wwi5KjAbnkGHkrbMeobw8WuFw4q7QIIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2MzA2MDgyMDExNjkiDOIW5VeUfL67gYaJ4SrBArMy1HAvwRGtumIYpuVR6QNgLswHjQJvRmqACCsPDSM5Bg2JkG5lI%2B0%2FutqIKB%2BO9si8TnZ3LHoDNBYXmF1VK25fbyG6sVImEk8L%2BXC2lClvYtuTdasPyr5CySh9FEJvNXR9m6KlH6iTfTjeIcFF4RRNEMnCSBSUmbFTHrCoJ6G5Oud3z7627znLE3IqH7D9RVoNXzHUuRXHFW%2FYzfPbDN980mdpn0kKBG9msRj8exP6%2Fn6Ha%2Fkco0rek5sTC3jfC7XfYuqrlholOBS7uVBhhWnEftQA%2BwHVwAtnv5xOdY4qIup7sK2%2FGoqzdbU%2FEgj0BWXk2kJPW0%2B02lIQdEsXnO5GLVOrB7OFuDT5gKjcsRA47K%2FrMyKWuhToNmjW%2FecxOS5p7JZsG7yx5Uxbu4tM1icWYI0eku%2FRJyqYia%2FVVERXQTCutoCXBjqzAolm89YhSGOhC46wn7fZiHETDnGUylYp%2By6J0e3lcM%2FoDxSi55UzxQwwoh55MVLYVWL2xVefv614mAPgaHYNKl0Lfw3IVg9RGug68o%2FItsaEQTJshzHksyFNq6FD0BqiWEKMViphu%2FzI3lFFVC0hgQKRQkcLJkPGZoAcX7aZx9yD48zFFJbZeJgPkvRf8jyp%2BocpsYeIAVugrPE2WgO9JchFiLKe1Bj3TW%2Ft9V7HCfGZ9AFcrkf6wC%2FxDMBpiLErjqPBZmuTMb53WmlyKtIohHo8X%2FWSS0gJy%2BrXC%2FRqe2sTMEjbTBX8ne3AKKvh%2BUzCMx5l%2FUhU%2FVXNp6juFK075Y0pyioa6%2BayjzzELzNjZgtsEuL7dHrjvhcCbVZvjoytVz6lTZ4vJn7if2io0beubQq3eZI%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220726T165143Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAZFUZNQXISNTUNR6A%2F20220726%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c3809e152c93f58fe8cd49acd2f3c0944064a429fa23228f6ed163ff55e90294",
  "2000":
    "https://mila-test-json.s3.us-east-1.amazonaws.com/2000data.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIBHSBiPqp3JzSDIRThrPEAfMpXYc8ffAhyGaW0DFi6YGAiEApPSh%2BQDPkQtkkiyF0Wwi5KjAbnkGHkrbMeobw8WuFw4q7QIIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2MzA2MDgyMDExNjkiDOIW5VeUfL67gYaJ4SrBArMy1HAvwRGtumIYpuVR6QNgLswHjQJvRmqACCsPDSM5Bg2JkG5lI%2B0%2FutqIKB%2BO9si8TnZ3LHoDNBYXmF1VK25fbyG6sVImEk8L%2BXC2lClvYtuTdasPyr5CySh9FEJvNXR9m6KlH6iTfTjeIcFF4RRNEMnCSBSUmbFTHrCoJ6G5Oud3z7627znLE3IqH7D9RVoNXzHUuRXHFW%2FYzfPbDN980mdpn0kKBG9msRj8exP6%2Fn6Ha%2Fkco0rek5sTC3jfC7XfYuqrlholOBS7uVBhhWnEftQA%2BwHVwAtnv5xOdY4qIup7sK2%2FGoqzdbU%2FEgj0BWXk2kJPW0%2B02lIQdEsXnO5GLVOrB7OFuDT5gKjcsRA47K%2FrMyKWuhToNmjW%2FecxOS5p7JZsG7yx5Uxbu4tM1icWYI0eku%2FRJyqYia%2FVVERXQTCutoCXBjqzAolm89YhSGOhC46wn7fZiHETDnGUylYp%2By6J0e3lcM%2FoDxSi55UzxQwwoh55MVLYVWL2xVefv614mAPgaHYNKl0Lfw3IVg9RGug68o%2FItsaEQTJshzHksyFNq6FD0BqiWEKMViphu%2FzI3lFFVC0hgQKRQkcLJkPGZoAcX7aZx9yD48zFFJbZeJgPkvRf8jyp%2BocpsYeIAVugrPE2WgO9JchFiLKe1Bj3TW%2Ft9V7HCfGZ9AFcrkf6wC%2FxDMBpiLErjqPBZmuTMb53WmlyKtIohHo8X%2FWSS0gJy%2BrXC%2FRqe2sTMEjbTBX8ne3AKKvh%2BUzCMx5l%2FUhU%2FVXNp6juFK075Y0pyioa6%2BayjzzELzNjZgtsEuL7dHrjvhcCbVZvjoytVz6lTZ4vJn7if2io0beubQq3eZI%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220726T165207Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAZFUZNQXISNTUNR6A%2F20220726%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2337a246a6c66c17a2c03532e957f47e302c5a1658ec060915bcd61d5d4c0164",
  "5000":
    "https://mila-test-json.s3.us-east-1.amazonaws.com/5000data.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIBHSBiPqp3JzSDIRThrPEAfMpXYc8ffAhyGaW0DFi6YGAiEApPSh%2BQDPkQtkkiyF0Wwi5KjAbnkGHkrbMeobw8WuFw4q7QIIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2MzA2MDgyMDExNjkiDOIW5VeUfL67gYaJ4SrBArMy1HAvwRGtumIYpuVR6QNgLswHjQJvRmqACCsPDSM5Bg2JkG5lI%2B0%2FutqIKB%2BO9si8TnZ3LHoDNBYXmF1VK25fbyG6sVImEk8L%2BXC2lClvYtuTdasPyr5CySh9FEJvNXR9m6KlH6iTfTjeIcFF4RRNEMnCSBSUmbFTHrCoJ6G5Oud3z7627znLE3IqH7D9RVoNXzHUuRXHFW%2FYzfPbDN980mdpn0kKBG9msRj8exP6%2Fn6Ha%2Fkco0rek5sTC3jfC7XfYuqrlholOBS7uVBhhWnEftQA%2BwHVwAtnv5xOdY4qIup7sK2%2FGoqzdbU%2FEgj0BWXk2kJPW0%2B02lIQdEsXnO5GLVOrB7OFuDT5gKjcsRA47K%2FrMyKWuhToNmjW%2FecxOS5p7JZsG7yx5Uxbu4tM1icWYI0eku%2FRJyqYia%2FVVERXQTCutoCXBjqzAolm89YhSGOhC46wn7fZiHETDnGUylYp%2By6J0e3lcM%2FoDxSi55UzxQwwoh55MVLYVWL2xVefv614mAPgaHYNKl0Lfw3IVg9RGug68o%2FItsaEQTJshzHksyFNq6FD0BqiWEKMViphu%2FzI3lFFVC0hgQKRQkcLJkPGZoAcX7aZx9yD48zFFJbZeJgPkvRf8jyp%2BocpsYeIAVugrPE2WgO9JchFiLKe1Bj3TW%2Ft9V7HCfGZ9AFcrkf6wC%2FxDMBpiLErjqPBZmuTMb53WmlyKtIohHo8X%2FWSS0gJy%2BrXC%2FRqe2sTMEjbTBX8ne3AKKvh%2BUzCMx5l%2FUhU%2FVXNp6juFK075Y0pyioa6%2BayjzzELzNjZgtsEuL7dHrjvhcCbVZvjoytVz6lTZ4vJn7if2io0beubQq3eZI%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220726T165225Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAZFUZNQXISNTUNR6A%2F20220726%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=5e0381027c019c642a5bd1b2f796ca8d5896b71aa75c835347bebc0e75b9b3cb",
};
export const onFetchJson = async (
  maxCount: number,
  onLoadingPage: (count: number) => void,
  isGradually: boolean
) => {
  console.log("loading page");

  await sleep(SLEEP_BETWEEN_PAGES);
  let URL;
  if (isGradually) {
    URL = urls[50];
    let count = 0;
    try {
    do {
        const response = await fetch(URL, {
          headers: { ContentType: "application/json" },
        });
        const data = await response.text()
        if(data.length) count += 50;
        await sleep(SLEEP_BETWEEN_PAGES);

        console.log(`loaded 50 records. total ${count} records`);
        onLoadingPage(count);
      } while (count < maxCount);
    } catch (error) {
      console.log("Fetch error: ", error);
    }
  } else {
    switch (maxCount.toString()) {
      case "50":
        URL = urls[50];
        break;
      case "100":
        URL = urls[100];
        break;
      case "1000":
        URL = urls[1000];
        break;
      case "2000":
        URL = urls[2000];
        break;
      default:
        URL = urls[5000];
    }
    try {
      const response = await fetch(URL);
      const data = await response.text()
      onLoadingPage(maxCount);
    } catch (error) {
      console.log("Fetch error: ", error);
    }
  }

  console.log("all pages are loaded");

  return null;
};
