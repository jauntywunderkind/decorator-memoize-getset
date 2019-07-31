"use module"
function make(){
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
