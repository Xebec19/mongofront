import React,{useState} from 'react';
import 'tachyons';
import Moment from 'react-moment';
import 'moment-timezone';

function  RecordList(props){
	const [mode,setMode] = useState(false);
	const [name,setName] = useState(props.name);
	const [date,setDate] = useState(props.date);
	const [phone,setPhone] = useState(props.phone);
	const [org,setOrg] = useState(props.organization);
	const [ratings,setRatings] = useState(props.ratings);
	let dateget = props.date;
	if(!mode){
	 return (
	  <tr className="stripe-dark">
	  <td className="pa3">{props.name}</td>
      <td className="pa3">
      <Moment format="YYYY/MM/DD">
      {dateget}
      </Moment>
      </td>
      <td className="pa3">{props.phone}</td>
      <td className="pa3">{props.organization}</td>
      <td className="pa3">{props.ratings}</td>
      <td className="pa3">
      <p className="pointer dim" onClick={() => setMode(true)}>View</p>
      <p className="pointer dim">Delete</p>
      </td>
      </tr>
		)}  //if ends here
	 else{
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
		<p className="pointer dim">Submit</p>
		</td>
		</tr>
	 		)
	 }
}

export default RecordList;