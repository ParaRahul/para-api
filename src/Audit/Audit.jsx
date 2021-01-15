import React ,{useEffect,useState,useReducer} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

import { Navbar, Nav } from 'react-bootstrap';
import Pagination from './Pagination'
import ListItems from './ListItems'


const Auditpage=(props) => {

    const { user, users } = props;
    const [res,setRes] = useState([])


            const [currentPage, setCurrentPage] = useState(1);
            const [postsPerPage] = useState(20);


            const [query, setQuery] = useState('')

    // const [deleteUser,setDeleteUser]= useState([])


    // const reducer=(state,action)=> {
            // if(action.type==='del'){
            //     
            // }
            // else{}
    // }

    // const [state,dispatch] = useReducer(reducer, {id:0})


    useEffect(() => {
       props.getUsers()
    }, [])

    useEffect(()=>{
        users.items? setRes(users.items): 'no items'
    },[users])

 

    
                // Get current posts
                const indexOfLastPost = currentPage * postsPerPage;
                const indexOfFirstPost = indexOfLastPost - postsPerPage;
                const currentPosts = res.slice(indexOfFirstPost, indexOfLastPost);
                //on click pagination
                const paginate = pageNumber => setCurrentPage(pageNumber);






                // Sorting 


    function search(rows){

            //   console.log('kkkkkkkkkkkkkkkkk',rows.filter(row=> row.firstName.indexOf(query)> -1) )
              return    rows.filter(row=> row.firstName.indexOf(query)> -1) ||
                        rows.filter(row => row.lastName.indexOf(query) > -1 ) ||
                        rows.filter(row => row.role.indexOf(query) > -1 )
                        
    }


        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand ></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link ><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link href="#features">Auditor</Nav.Link>
                        <Nav.Link> <Link to="/login">Logout</Link></Nav.Link>
                    </Nav>
                </Navbar>
                <div className="col-md-12">

                    <h1>Hi {user.firstName}!</h1>
                    <p>You're logged in with React!!</p>
                    <h3>All login audit :</h3>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}




                    <input type="text" value={query} placeholder='enter a name to search' onChange={(e)=> setQuery(e.target.value) } />
                                                        /* implementing table here */
                        
                                                       
                                                        <Pagination
                                                        postsPerPage={postsPerPage}
                                                        totalPosts={res.length}
                                                        paginate={paginate}
                                                    />
                             <ListItems items={search(currentPosts)}    deleteUser={props.deleteUser}/>
                        
                    
                 
                
                  
                  
                    {/* users.items &&
                        <ul className="user-screen">
                            {users.items.map((user, index) =>
                                <li key={user.id}>
                                    {user.id + ' ' + user.role + ' ' + user.createdDate + ' '}
                                    {user.firstName + ' ' + user.lastName}
                                    {
                                        user.deleting ? <em> - Deleting...</em>
                                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                : <span> - <a >Delete</a></span>
                                    }
                                </li>
                            )}

                        </ul> */
                    }





                </div>
            </div>
        );
    
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };
