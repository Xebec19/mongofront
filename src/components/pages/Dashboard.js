import React,{ useState,useEffect } from 'react';
import axios from 'axios'
import { FaFilter } from 'react-icons/fa';
import RecordList from '../etc/RecordList';
import Nav from '../etc/Nav';
import 'tachyons';

function Dashboard(){
	const [filter,setFilter] = useState(null);
	const [record,setRecord] = useState([]);
	const [isLoaded,setIsLoaded] = useState(false);

	useEffect(() => {
      axios({
      	method:'get',
      	url:'http://localhost:3000/user/read/record',
      	headers: {
      		Authorization: 'Bearer ' + localStorage.getItem('item')
      	}
      })
      .then(res => {
      	setRecord(res.data);
      	console.log('Update ',record);
      	setIsLoaded(true);
      })
      .catch(err => console.log(err))
	},[isLoaded])
    let data;
	if(record.length){
			    data = record.map((value,index) => {
			          	return <RecordList 
					          {...value} 
					          key={index}/>;
			          })}
	else{
		data = <p>No records</p>
	}
	if(isLoaded){
	return(
		<div>
		  <Nav />
		  <div >
		    <div className="pa4">
			  <div className="overflow-auto">
			    <div className="f6 w-100 mw8 center">
			    <label htmlFor="filter">
			    <FaFilter className="f6 w-100 mw8 center"/>
			    </label>
					<select className="f6 w-100 mw8 center" 
					onClick={(e) => setFilter(e.target.value)}
					name="filter" id="filter">
					  <option value="date">
					  {`Date`}
					  </option>
					  <option value="organisation">
					  {`Organisation`}
					  </option>
					  <option value="rating">
					  {`Rating`}
					  </option>
					</select>
			    
			    </div>

			    <table className="f6 w-100 mw8 center" cellSpacing="0">
			      <thead>
			        <tr className="stripe-dark">
			          <th className="fw6 tl pa3 bg-white">Name</th>
			          <th className="fw6 tl pa3 bg-white">Date</th>
			          <th className="fw6 tl pa3 bg-white">Phone Number</th>
			          <th className="fw6 tl pa3 bg-white">Organization</th>
			          <th className="fw6 tl pa3 bg-white">Ratings</th>
			          <th className="fw6 tl pa3 bg-white"></th>
			        </tr>
			      </thead>
			      <tbody className="lh-copy">
			          {data}
			        
			      </tbody>
			    </table>
			  </div>
			</div>
		  </div>
		</div>
		)
} //if ends here
else {return <h1>Loading</h1>}
}

export default Dashboard;