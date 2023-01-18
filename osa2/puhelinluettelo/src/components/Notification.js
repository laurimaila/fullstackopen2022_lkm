import '../App.css'

const Notification = ({ message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className="change">
            {message}
        </div>
    )
}

export default Notification