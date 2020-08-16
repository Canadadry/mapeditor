import {Vector} from './src/map/vector'
import {QuadTree} from './src/map/quadtree'
import {Colors,Color} from './src/ui/painter/color'
import {Map } from './src/map/map'

type VertexData = [number,number,number,number,number,number,number,number]

let json = require("vendor.json")

let map:Map

love.update = (dt) =>{}

love.mousemoved = function( x:number, y:number,dx:number,dy:number,isTouch:boolean ){
	map.pick(x,y)
}

love.draw = function() {
	love.graphics.clear(0,0,0)
	love.graphics.draw(map.mesh,0,0)
}


love.load = ()=>{
	map = new Map("assets/map.json")
}



