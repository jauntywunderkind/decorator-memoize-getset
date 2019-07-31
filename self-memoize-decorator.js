export decorator SelfMemoizeGet {
	@wrap( f=> {
		// only wrap get functions
		if( !f.name.startsWith( "get ")){
			return f
		}
		let value
		function memoized(){
			if( f=== null){
				return value
			}
			f= null // free
			value= f()
			return value
		}
		memoized.name= f.name
		return memoized
	})
}
