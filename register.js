"use module"

export function MemoizeProperty( name){
	if( this=== global){
		throw new Error()
	}
	if( !name){
		throw new Error()
	}
	Object.defineProperty( this, name, {
		get: function(){
			const value= fn()
			Object.defineProperty( this, name, {
				get: function(){
					return value
				}
			}
			return value
		}
	})
}
export default MemoizeProperty

export decorator @MemoizeRegister{
	@register(( target, prop)=> {
		// find existing property
		// TBD: do we need to dig deeper than 'own' in any cases?
		let oldProp= Object.getOwnPropertyDescriptor( target, name)
		if( !oldProp){
			console.warn( `Expected a property '${name}'`)
			return
		}

		// override old property
		Object.defineProperty( target, prop, {
			configurable: true,
			get: function( lolWut/* <--silly mis-feature*/){
				const value= oldProp.get.call( this, lolWut)
				// used this value for the last time, free it asap:
				oldProp= null

				// re-override property with memoized value
				Object.defineProperty( this, name, {
					configurable: true,
					get: function(){
						return value
					}
				})

				// return our generated 'value'
				return value
			}
		})
	})
}
