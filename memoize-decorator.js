export decorator SelfMemoizeGet {
	@wrap( fn=> {
		// only wrap get functions
		if( !fn.name.startsWith( "get ")){
			return fn
		}
		let value
		function memoized(){
			if( fn=== null){
				return value
			}
			fn= null // free
			value= fn.call( this)
			return value
		}
		memoized.name= fn.name
		return memoized
	})
}
