import { useState, useEffect } from 'react'
import axios from 'axios'



const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setContacts(response.data)
      })
  }, [])
  console.log('render', contacts.length, 'contacts')

  const addNumber = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName,
      number: newNumber
    }
    if (contacts.find(cont => cont.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setContacts(contacts.concat(numberObject))
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

      <Contacts contacts={contacts} filter={filter} />

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

const Contacts = ({ contacts, filter }) => (
  <ul>
    {contacts.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()) 
    || filter === '')
      .map(contact =>
        <li key={contact.name}>{contact.name} {contact.number}</li>
      )}
  </ul>
)

export default App