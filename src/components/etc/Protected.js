import React from 'react'
import {Route,Redirect} from 'react-router-dom'

export const Protected = ({component: Component, ...rest}) => {
	return (
		<Route
		{...rest}
		render={
			props => {
				if(localStorage.getItem('item')){
					return <Component {...props} />;
				}else {
					return ( <Redirect to={
						{
							pathname: "/asd",
							state: {
								from: props.location
							}
						}
					}/>)
				}
			}
		}/>
		)
}