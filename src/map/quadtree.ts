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
		center = center.mul(1/this.content.length)

		this.splitX = center.x
		this.splitY = center.y
		this.children = [
			new QuadTree<T>(),new QuadTree<T>(),new QuadTree<T>(),new QuadTree<T>()
		]
		for(let i:number=0;i<this.content.length;i++){
			this.insert(this.content[i][1],this.content[i][0].x,this.content[i][0].y)
		}
		this.content = []
	}

	searchClosest(x:number,y:number):[number,T,Vector]|null{
		let bucket = this.findBucket(x,y);
		if(bucket != null ){
			return bucket.searchClosest(x,y)
		}
		if(this.content.length <= 0){
			return null
		}
		let min = this.content[0][0].dist(new Vector(x,y))
		let minIdex = 0
		for(let i:number=1;i<this.content.length;i++){
			let currentMin = this.content[i][0].dist(new Vector(x,y))
			if(min > currentMin){
				min = currentMin
				minIdex = i
			}
		}
		return [min,this.content[minIdex][1],this.content[minIdex][0]]
	}

}