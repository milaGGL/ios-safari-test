The web app is created to test the memory usage change when we are trying to fetch large data from AWS pre-signed url, local JSON file and firestore.

Pleass note that AWS pre-signed url expires at a maximum of 12 hours. So check the console to see if the link expired while fetching data from aws url. 

The large JSON file which consists of 5000 documents cannot be uploaded to github as it exceeds 100MB size limit. If you would like to try that out as well, simply create a 5000data.json file, and copy paste the data from other json file couple of times. 

Please remember to add the firebase client config into the src/firebase.config.tsx to be able to connect to firestore.

The script to generate sample-data is removed from this project along the way when I was trying to cut down the code. So try generate a sample collection using the other test project first, and use that collection in this project to fetch data from firestore. 
