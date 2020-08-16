import {Vector} from './vector'
import {Color} from './color'

export class Quad{
	points:[number,number,number,number]
	center:Vector|null
	selected:boolean

	constructor(p1:number,p2:number,p3:number,p4:number){
		this.points = [p1,p2,p3,p4]
		this.center = null
		this.selected = false
	}
	computeCenter(points:Vector[]):Vector{
		let p0:Vector = points[this.points[0]]
		let p1:Vector = points[this.points[1]]
		let p2:Vector = points[this.points[2]]
		let p3:Vector = points[this.points[3]]

		this.center = p0.add(p1).add(p2).add(p3).mul(1/4)
		return this.center
	}
	
	draw(points:Vector[]){
		let p0:Vector = points[this.points[0]]
		let p1:Vector = points[this.points[1]]
		let p2:Vector = points[this.points[2]]
		let p3:Vector = points[this.points[3]]

		love.graphics.setColor(1,1,1,1)
		love.graphics.line(p0.x,p0.y,p1.x,p1.y)
		love.graphics.line(p1.x,p1.y,p2.x,p2.y)
		love.graphics.line(p2.x,p2.y,p3.x,p3.y)
		love.graphics.line(p3.x,p3.y,p0.x,p0.y)

		if(this.selected && this.center != null){
			this.center.draw()
		}
	}
}