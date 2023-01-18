import { useState, useEffect } from 'react'
import personService from './services/persons'
import DeleteContact from './components/DeleteContact'



const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setContacts(initialNotes)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName,
      number: newNumber
    }
    if (contacts.find(cont => cont.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(numberObject)
        .then(returnedNote => {
          setContacts(contacts.concat(returnedNote))
          setNewName('')
          setNewNumber('')
        })
      console.log("added", newName)
    }
    setNewName('')
  }
  


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new contact</h3>

      <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Contacts</h3>

      <Contacts contacts={contacts} filter={filter} setContacts={setContacts} />

    </div>

  )

}
const PersonForm = ({ addNumber, newName, handleNameChange, newNumber, handleNumberChange }) => {

  return (
    <div>


      <form onSubmit={addNumber}>

        <div>
          Name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>

        <div>Number: <input
          value={newNumber}
          onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">Add</button>
        </div>

      </form>
    </div>
  )
}

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      Filter shown with: <input
        value={filter}
        onChange={event => setFilter(event.target.value)}
      />
    </div>
  )
}


const Contacts = ({ contacts, filter, setContacts }) => {

  const deleteContact = (id) => {
    const contactToDelete = contacts.find(n => n.id === id)
    if (window.confirm(`Delete ${contactToDelete.name}?`)) {
      personService
        .deleteData(id)
        .then(() => {
          setContacts(contacts.filter(n => n.id !== id))
        })
    }
  }

  return (
    <ul>
      {contacts.filter(f => f.name.toLowerCase().includes(filter.toLowerCase())
        || filter === '')
        .map(contact =>
          <li key={contact.name}>{contact.name} {contact.number}
            {' '}<button onClick={() =>
              deleteContact(contact.id)}>Delete</button>
          </li>
        )}
    </ul>
  );
}

export default App

