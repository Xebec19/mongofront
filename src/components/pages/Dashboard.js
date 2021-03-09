import React,{ useState,useEffect } from 'react';
import axios from 'axios'
import { FaFilter } from 'react-icons/fa';
import RecordList from '../etc/RecordList';
import Nav from '../etc/Nav';
import 'tachyons';

function Dashboard(){
	const [filter,setFilter] = useState('rating');
	const [record,setRecord] = useState([]);
	const [isLoaded,setIsLoaded] = useState(false);
	const [values,setValues] = useState(null);

	useEffect(() => {
      axios({
      	method:'get',
      	url:'http://localhost:3000/user/read/record',
      	headers: {
      		Authorization: 'Bearer ' + localStorage.getItem('item')
      	}
      })
      .then(res => {
      	/*setRecord(res.data);*/
      	console.log('Value of filter',filter);
		const filtered = res.data.sort(function(a, b) {
		if(filter === "organization"){
		var textA = a.organization.toUpperCase();
		var textB = b.organization.toUpperCase();
		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	    }
	    else if(filter === 'rating'){
	    	return a.ratings - b.ratings;
	    }
	    else if(filter === 'date'){
	    	return new Date(b.date) - new Date(a.date);
	    }
		});
		setRecord(filtered);
		console.log('Update ',filtered,record);
      	setIsLoaded(true);
		console.log('Original',record)
		if(record.length){
		let data = record.map((value,index) => {
		console.log('Filtering');
		return <RecordList 
		{...value} 
		key={index}
		/>;
		})
		setValues(data);
		}
		else{
		let data = <p>No records</p>
		setValues(data);
		}  	
      })
      .catch(err => console.log(err))
	},[isLoaded,localStorage.getItem('item')])

    
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
					defaultValue={filter} 
					onClick={(e) => setFilter(e.target.value)}
					name="filter" id="filter">
					  <option value="date">
					  {`Date`}
					  </option>
					  <option value="organization">
					  {`Organization`}
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
			          {values}
			        
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