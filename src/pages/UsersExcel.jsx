import { useEffect, useState } from 'react'
import ipcConnect from '../api/ipcIndex'

const UsersExcel = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        ipcConnect.get('excel')
            .then(data => {
                // console.log(data)
                setUsers(data.data)
            })

    }, [])
    return (
        <div>
            {users.map((user, key) => <li key={key}>{user.Nombre} - {user.Apellido}</li>)}
        </div>
    )
}

export default UsersExcel