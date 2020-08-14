import {Mesh} from './src/mesh'
import {Vector} from './src/vector'
import {Quad} from './src/quad'

let json = require("vendor.json")

let mesh:Mesh

love.update = (dt) =>{}

love.draw = function() {
	love.graphics.clear(0,0,0)
	mesh.draw()
}

class MeshData{
	points:Vector[];
	quads:Quad[];
}

love.load = ()=>{
	mesh = new Mesh();
	let meshData:MeshData = json.decode(love.filesystem.read("assets/map.json")[0])

	for(let i:number = 0;i<meshData.points.length;i++){
		let p = meshData.points[i];
		mesh.points.push(new Vector(p.x,p.y))
	}
	for(let i:number = 0;i<meshData.quads.length;i++){
		let quadData = meshData.quads[i].points;
		let quad = new Quad(quadData[0],quadData[1],quadData[2],quadData[3])
		mesh.quads.push(quad)
		mesh.centers.push(quad.computeCenter(mesh.points))
	}
}



