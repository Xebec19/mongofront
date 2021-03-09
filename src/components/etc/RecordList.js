import React,{useState} from 'react';
import Notifications, {notify} from 'react-notify-toast';
import axios from 'axios'
import 'tachyons';
import Moment from 'react-moment';
import 'moment-timezone';

function  RecordList(props){
	/*console.log(props._id);*/
	const [err,setErr] = useState('');
	const [mode,setMode] = useState('read');
	const [name,setName] = useState(props.name);
	const [date,setDate] = useState(props.date);
	const [phone,setPhone] = useState(props.phone);
	const [org,setOrg] = useState(props.organization);
	const [ratings,setRatings] = useState(props.ratings);
	let dateget = props.date;
	
	function handleDelete(e){
		e.preventDefault();
		axios({
			method:'delete',
			url:`http://localhost:3000/user/delete/record/${props._id}`,
			headers: {
			Authorization: 'Bearer ' + localStorage.getItem('item')
			}
			})
			.then(res => {
			console.log(res);
			setMode('delete');
			})
			.catch(err => {
			console.log(err);
			/*notify.show('alert!!!')*/
			}
			)
			setErr('');
			/*notify.show('Done!');*/

		}

	function handleEdit(e){
		e.preventDefault();
		const data = {
			name: name,
			data: date,
			phone: phone,
			organization: org,
			ratings: ratings
		}
		axios({
			method:'patch',
			url:`http://localhost:3000/user/update/record/${props._id}`,
			data: data,
			headers: {
			Authorization: 'Bearer ' + localStorage.getItem('item')
			}
			})
			.then(res => {
			console.log(res);
			setName(res.data.name);
			setDate(res.data.date);
			dateget=res.data.date;
			setPhone(res.data.phone);
			setOrg(res.data.organization);
			setRatings(res.data.ratings);
			setMode(false);
			})
			.catch(err => {
			console.log(err);
			/*notify.show('alert!!!')*/
			}
			)
			setErr('');
			/*notify.show('Done!');*/

		}

	if(mode === 'read'){
	 return (
	  <tr className="stripe-dark">
	  <td className="pa3">{name}</td>
      <td className="pa3">
      <Moment format="YYYY/MM/DD">
      {dateget}
      </Moment>
      </td>
      <td className="pa3">{phone}</td>
      <td className="pa3">{org}</td>
      <td className="pa3">{ratings}</td>
      <td className="pa3">
      <p className="pointer dim" onClick={() => setMode('edit')}>Edit</p>
      <p className="pointer dim" onClick={handleDelete}>Delete</p>
      </td>
      </tr>
		)}  //if ends here
	 else if(mode === 'edit'){
	 	return(
		<tr className="stripe-dark">
		<td className="pa3">
		<input type="text" value={name} onChange={(e) => setName(e.target.value)}>

		</input>
		</td>
		<td className="pa3">
		<input type="date" value={date} onChange={(e) => setDate(e.target.value)}>
		
		</input>
		</td>
		<td className="pa3">
		<input type="number" value={phone} min='1000000000' max='9999999999' onChange={(e) => setPhone(e.target.value)}>
		
		</input>
		</td>
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
		<td className="pa3">
		<input type="number" value={ratings} min='0' max='5' onChange={(e) => setRatings(e.target.value)}>
		
		</input>
		</td>
		<td className="pa3">
		<p 
		onClick={handleEdit}
		className="pointer dim">
		Submit
		</p>
		<p 
		onClick = {() => setMode('read')}
		className="pointer dim">
		Cancel
		</p>
		</td>
		</tr>
	 		)
	 }  //else if ends here
	 else if(mode === 'delete'){
	 	return(
			<tr className="stripe-dark">
			<td className="pa3">Record Deleted</td>
			</tr>
	 		)
	 }
}

export default RecordList;