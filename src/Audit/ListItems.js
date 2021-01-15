import React,{useState,useMemo,useEffect} from 'react'
import dateFormat from 'dateformat'
import './ListItems.css'

export default function ListItems({items, deleteUser}) {

 
    const position = ['user', 'Auditor']
    const [role, setRole] = useState('user')

    const timeformat=['12hrs','24hrs']
    const [timeFormat, setTimeFormat] = useState('h')

    console.log('heyyyyyyy' , items[0])


    

   function onChangeRole(){
       role === 'user'? setRole('Auditor'): setRole('user')
   }


   function onChangeTime(){
        timeFormat === 'h'? setTimeFormat('H'): setTimeFormat('h')
   }

    return (
        <div>

           
            <table >
            <tr>
                <th>id</th>
                <th>name</th>
                <th>lastname</th>
                <th>date</th>
                <th><select onChange={onChangeTime}>{timeformat.map(el => <option>{el}</option>)}</select></th>
                <th><select onChange={onChangeRole}>{position.map(el => <option>{el}</option> )}</select></th>
                <th>Delete Profile</th>
            </tr>
        
            {items.map((user,index) => {

        
                return (user.role === role?<tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{dateFormat(user.createdDate,'dd/mm/yyyy')}</td>
                    <td>{dateFormat(user.createdDate,`${timeFormat}:MM:ss TT`)}</td>
                    <td>{user.role}</td>
                    <td>{
                        user.deleting ? <em> - Deleting...</em>
                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <a onClick={()=>deleteUser(user.id)}>Delete</a></span>
                    }</td>


                    
                </tr>: '' )
            })}
        </table>

        </div>
    )
}
