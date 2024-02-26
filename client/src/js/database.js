// Importing the openDB function from the 'idb' library
import { openDB } from 'idb';

// Asynchronous function to initialize the IndexedDB database
const initdb = async () =>
  openDB('jate', 1, { // Opening or creating a database named 'jate' with version 1
    // Function to handle database upgrade
    upgrade(db) {
      // Checking if the database already contains an object store named 'jate'
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists'); // Logging a message indicating that the database already exists
        return; // Exiting the function if the database already exists
      }
      // Creating an object store named 'jate' with auto-incrementing keys
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created'); // Logging a message indicating that the database was created
    },
  });

// Asynchronous function to store data in the IndexedDB database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1); // Opening the 'jate' database with version 1
  const tx = jateDb.transaction('jate', 'readwrite'); // Starting a read-write transaction on the 'jate' object store
  const store = tx.objectStore('jate'); // Getting a reference to the 'jate' object store
  const request = store.put({ id: 1, text: content }); // Putting the provided content into the object store with key 1
  const result = await request; // Waiting for the put operation to complete and storing the result
  console.log('Data saved to the database', result); // Logging a message indicating that data was successfully saved to the database
};

// Asynchronous function to retrieve data from the IndexedDB database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1); // Opening the 'jate' database with version 1
  const tx = jateDb.transaction('jate', 'readonly'); // Starting a read-only transaction on the 'jate' object store
  const store = tx.objectStore('jate'); // Getting a reference to the 'jate' object store
  const request = store.getAll(); // Getting all the data stored in the object store
  const result = await request; // Waiting for the getAll operation to complete and storing the result
  console.log('Data retrieved from the database', result); // Logging a message indicating that data was retrieved from the database
};

initdb(); // Initializing the IndexedDB database when this module is imported
