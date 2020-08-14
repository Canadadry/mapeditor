import {Vector} from './vector'
import {Quad} from './quad'
import {Color,Colors} from './color'

export class Mesh{
	points:Vector[]
	quads:Quad[]
	centers:Vector[]

	constructor(){
		this.points=[]
		this.quads=[]
		this.centers=[]
	}

	draw(){
		for(let i:number=0;i<this.quads.length;i++){
			this.quads[i].draw(this.points)
		}
		for(let i:number=0;i<this.centers.length;i++){
			this.centers[i].draw()
		}
	}

}