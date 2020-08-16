import {Vector} from './vector'
import {Quad} from './quad'
import {Color,Colors} from './color'

export class Mesh{
	points:Vector[]
	quads:Quad[]

	constructor(){
		this.points=[]
		this.quads=[]
	}

	draw(){
		for(let i:number=0;i<this.quads.length;i++){
			this.quads[i].draw(this.points)
		}
	}

}