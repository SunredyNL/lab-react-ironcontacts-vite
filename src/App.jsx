import { useState } from "react";
import "./App.css";
import contactsJSON from './contacts.json';


function App() {
  const [contact, setContact] = useState(contactsJSON.slice(0, 5));
  const [remainContacts, setRemainContacts] = useState(contactsJSON.slice(5));

  const addRandom = () => {
    const randomPosition = Math.floor(Math.random() * remainContacts.length);
    const randomContact = remainContacts[randomPosition];

    setContact((prevContacts) => [...prevContacts, randomContact]);

    const updateOfRemaining = [
      ...remainContacts.slice(0, randomPosition),
      ...remainContacts.slice(randomPosition + 1),
    ];

    setRemainContacts(updateOfRemaining);
  }
  const sortName = () => {
    const sortedContactsName = [...contact].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContact(sortedContactsName);
  };
  const sortPop = () => {
    const sortedContactsPop = [...contact].sort(
      (a, b) => b.popularity - a.popularity
    );
    setContact(sortedContactsPop);
  };
  const removeContact = (id) => {
    const updatedContacts = contact.filter(contact => contact.id !== id);
    setContact(updatedContacts)
  };


  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={addRandom}>Add Random Contact</button>
      <button onClick={sortName}>Sort by Name</button>
      <button onClick={sortPop}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contact.map((oneContact) => {
            return (
              <tr key={oneContact.id}>
                <td><img className="photo" src={oneContact.pictureUrl} /></td>
                <td >{oneContact.name}</td>
                <td>{oneContact.popularity}</td>
                <td>{oneContact.wonOscar &&
                  "🏆"
                }</td>
                <td>{oneContact.wonEmmy &&
                  "🏆"
                }</td>
                <td>
                  <button onClick={() => removeContact(oneContact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
