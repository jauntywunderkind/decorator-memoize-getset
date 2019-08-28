"use module"

function wrapGet( fn){
	function memoized(){
		if( memoized.fn=== null){
			return value
		}
		memoized.reset= function( fn){
			memoized.fn= fn
		}
		memoized.fn= null // free
		memoized.value= fn.call( this)
		return memoized.value
	}
	return memoized
}

function wrapSet( fn){
	function memoized( newValue){
		if( !memoized.getter){
			memoized.getter= Object.getOwnPropertyDescriptor( this, memoized.shortName).get
		}
		memoized.getter.value= newValue
		memoized.getter.fn= null
	}
	const
	  nameIsSet= fn.name.startsWith( "set"),
	  shortName= nameIsSet? fn.name.substring( 4): fn.name
	memoized.shortName= shortName
	return memoized
}

export decorator @MemoizeGetSet{
	@wrap( fn=> {
		if( fn.name.startsWith( "get ")){
			// wrap get functions
			return wrapGet( fn)
		}
		return fn
	})
}

export decorator @MemoizeGetSetSettable{
	@wrap( fn=> {
		if( fn.name.startsWith( "get ")){
			// wrap get functions
			return wrapGet( fn)
		}else if( fn.name.startsWith( "set ")){
			// wrap set functions
			return wrapSet( fn)
		}
		return fn
	})
}
