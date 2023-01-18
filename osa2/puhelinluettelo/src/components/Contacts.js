import personService from '../services/persons'
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

export default Contacts   