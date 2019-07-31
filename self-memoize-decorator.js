export decorator SelfMemoizeGet {
	@wrap( f=> {
		// only wrap get functions
		if( !f.name.startsWith( "get ")){
			return f
		}
		let set
		let value
		function memoized(){
			if( set){
				return value
			}
			f= null // free
			set= true
			value= f()
			return value
		}
		memoized.name= f.name
		return memoized
	})
}
