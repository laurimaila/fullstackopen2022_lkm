import '../App.css'

const SingleContact = ({ contact, deleteContact }) => {
    return (
        <li className='singlecontact'>
            {contact.name} {contact.number}
            {' '}<button onClick={() =>
                deleteContact(contact.id)}>Delete</button>
        </li>
    )

}

export default SingleContact