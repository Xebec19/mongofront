import React from 'react';
import 'tachyons';

function  RecordList(props){
	console.log(props);
	console.log(props.currentId)
	return (
	  <tr className="stripe-dark">
	  <td className="pa3">{props.name}</td>
      <td className="pa3">{props.date}</td>
      <td className="pa3">{props.phone}</td>
      <td className="pa3">{props.org}</td>
      <td className="pa3">{props.ratings}</td>
      </tr>
		)
}

export default RecordList;