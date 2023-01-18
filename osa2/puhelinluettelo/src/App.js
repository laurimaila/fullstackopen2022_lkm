import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Contacts from './components/Contacts'



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

      const contactToChange = contacts.find(cont => cont.name === newName)
      if (window.confirm(`${contactToChange.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(contactToChange.id, numberObject)
          .then(() => {
            setContacts(contacts.map(f => f.id !== contactToChange.id ? f : numberObject
            ))
          })
      }
    } else {

      personService
        .create(numberObject)
        .then(returnedNote => {
          setContacts(contacts.concat(returnedNote))
        })
      console.log("added", newName)
    }

    setNewName('')
    setNewNumber('')
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
export default App

