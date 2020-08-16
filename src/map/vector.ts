export class Vector{
	x:number=0;
	y:number=0;
	constructor(x:number,y:number){
		this.x=x;
		this.y=y;
	}
	add(v:Vector):Vector{
		return new Vector(this.x+v.x,this.y+v.y)
	}
	sub(v:Vector):Vector{
		return new Vector(this.x-v.x,this.y-v.y)
	}
	mul(s:number):Vector{
		return new Vector(this.x*s,this.y*s)	
	}
	dist(to:Vector):number{
		let diff = this.sub(to);
		return  math.sqrt( diff.x*diff.x+diff.y*diff.y ) 
	}

	draw(){
		love.graphics.rectangle("fill",this.x-2,this.y-2,4,4,2,2)
	}
}
