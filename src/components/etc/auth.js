class auth{
	constructor(){
		this.authenticated = false;
	}
	login(cb){
		try{
		this.authenticated = true;
		cb();
	}catch(err){console.log(err)}
	}
	logout(cb){
		this.authenticated = false;
		localStorage.clear();
		cb();
	}
	isAuthenticated(){
		return this.authenticated;
	}
}

export default new auth();