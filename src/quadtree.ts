import {Vector} from './vector'

export class QuadTree<T>{
	splitX:number
	splitY:number
	children:[QuadTree<T>,QuadTree<T>,QuadTree<T>,QuadTree<T>]|null
	content:[Vector,T][]
	max:number = 10

	constructor(){
		this.children = null
		this.content = []
	}

	insert(object:T, x:number, y:number){
		let bucket = this.findBucket(x,y);
		if(bucket != null ){
			bucket.insert(object,x,y)
			return
		}
		this.content.push([new Vector(x,y),object])
		if(this.content.length>this.max){
			this.split()
		}
	}

	findBucket(x:number,y:number):QuadTree<T>|null{
		if(this.children == null){
			return null
		}
		let X :number = ( x < this.splitX) ? 1:0
		let Y :number = ( y < this.splitY) ? 1:0

		let id = X+2*Y
		return this.children[id]
	}

	split(){
		let center = new Vector(0,0)
		for(let i:number=0;i<this.content.length;i++){
			center = center.add(this.content[i][0])
		}
		center = center.mul(this.content.length)

		this.splitX = center.x
		this.splitY = center.y
		for(let i:number=0;i<this.content.length;i++){
			this.insert(this.content[i][1],this.content[i][0].x,this.content[i][0].y)
		}
	}

	searchClosest(x:number,y:number):T|null{
		return null
	}

}