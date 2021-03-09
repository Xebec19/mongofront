import React,{useState,useEffect} from 'react';
import Notifications, {notify} from 'react-notify-toast';
import axios from 'axios'
import Nav from '../etc/Nav';

import '../../App.css';
import 'tachyons';

function Create(props){
	const [name,setName] = useState('');
	const [date,setDate] = useState('');
	const [phone,setPhone] = useState('');
	const [org,setOrg] = useState('Org1');
	const [ratings,setRatings] = useState('');
	const [err,setErr] = useState('');
	const object = {
	 name: name,
	 date: date,
	 phone: phone,
	 org: org,
	 ratings: ratings
	}
	function handleSubmit(){
		if(name === '' || date=== '' || phone < 10000000 || ratings===""){
			setErr('Invalid');
			return 0;
		}
		else{
			/*axios.post('http://localhost:3000/user/create/record',
			{
			name: name,
			date: date,
			phone: phone,
			ratings: ratings
			})*/
			const data = {
			name: name,
			date: date,
			phone: phone,
			organization: org,
			ratings: ratings
			}
			axios({
			method:'post',
			url:'http://localhost:3000/user/create/record',
			data: data,
			headers: {
			Authorization: 'Bearer ' + localStorage.getItem('item')
			}
			})
			.then(res => {
			console.log(res)
			})
			.catch(err => {
			console.log(err);
			notify.show('alert!!!')
			}
			)
			setErr('');
			notify.show('Done!');

		}
	} 
	return(
		<div>
		<Nav />
		<Notifications />
		<table className="f6 w-100 mw8 center" cellSpacing="0">
	      <thead>
	        <tr className="stripe-dark">
	          <th className="fw6 tl pa3 bg-white">Parameters</th>
	          <th className="fw6 tl pa3 bg-white">Values</th>
	        </tr>
	      </thead>

	      <tbody className="lh-copy">
	        
	        <tr className="stripe-dark">
	          <td className="pa3">Name</td>
	          <td className="pa3">
	          <input type="text" onChange={(e) => setName(e.target.value)}/>
	          </td>
	        </tr>
	        <tr className="stripe-dark">
	          <td className="pa3">Date</td>
	          <td className="pa3">
	          <input type="date" 
	          onChange={(e) => setDate(e.target.value)}/>
	          </td>
	        </tr>
	        <tr className="stripe-dark">
	          <td className="pa3">Phone Number</td>
	          <td className="pa3">
	          <input type="number" 
	          onChange={(e) => setPhone(e.target.value)}/>
	          </td>
	        </tr>
	        <tr className="stripe-dark">
	          <td className="pa3">Organization</td>
	          <td className="pa3">
	          <div className="dropdown">
	          <button className="dropbtn">
	          {org}</button>
	          <div className="dropdown-content">
	          <p onClick={(e) => setOrg('Org1')} value="Org1">Org1</p>
	          <p onClick={(e) => setOrg('Org2')} value="Org2">Org2</p>
	          <p onClick={(e) => setOrg('Org3')} value="Org3">Org3</p>
	          </div>
	          </div>
	          </td>
	        </tr>
	        <tr className="stripe-dark">
	          <td className="pa3">Ratings</td>
	          <td className="pa3">
	          <input type="number"
	          max="5" min="0"
	          onChange={(e) => setRatings(e.target.value)} />
	          </td>
	        </tr>
	        
	      </tbody>


	      <tfoot>
	        <tr className="stripe-dark center fw6 tl pa3 bg-white">
	          <td className="center fw6 tl pa3 bg-white"></td>
	          <td className="center fw6 tl pa3 bg-white">
	          {err && <p style={{color:"red"}}>Invalid</p>}
	          <button
	          onClick={() => handleSubmit()}>
	          Submit
	          </button>
	          </td>
	        </tr>
	      </tfoot>

		</table>
		</div>
		)
}

export default Create;