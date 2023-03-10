import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Contacts from './components/Contacts'
import './App.css'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [changeMessage, setChangeMessage] = useState(null)

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
      number: newNumber,
      id: contacts.length + 1

    }
    if (contacts.find(cont => cont.name === newName)) {

      const contactToChange = contacts.find(cont => cont.name === newName)
      if (window.confirm(`${contactToChange.name} is already added to phonebook, replace the old number with a new one?`)) {
        numberObject.id = contactToChange.id
        personService
          .update(contactToChange.id, numberObject)
          .then(() => {
            setContacts(contacts.map(f => f.id !== contactToChange.id ? f : numberObject
            ))
            setChangeMessage(
              `Changed ${contactToChange.name}`
            )
            setTimeout(() => {
              setChangeMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(error.response.data.error)

            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {

      personService
        .create(numberObject)
        .then(returnedPerson => {
          setContacts(contacts.concat(returnedPerson))
          setChangeMessage(
            `Added ${numberObject.name}`
          )
          setTimeout(() => {
            setChangeMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)

          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

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

      <Notification message={changeMessage} />
      <ErrorNotification message={errorMessage} />

      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new contact</h3>

      <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Contacts</h3>

      <Contacts contacts={contacts} filter={filter}
        setContacts={setContacts} setChangeMessage={setChangeMessage} />
    </div>

  )

}
export default App

