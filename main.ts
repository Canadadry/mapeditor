import {Mesh} from './src/mesh'
import {Vector} from './src/vector'
import {Quad} from './src/quad'
import {QuadTree} from './src/quadtree'

let json = require("vendor.json")

let mesh:Mesh
let tree:QuadTree<Quad>

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
	tree = new QuadTree<Quad>();
	let meshData:MeshData = json.decode(love.filesystem.read("assets/map.json")[0])

	for(let i:number = 0;i<meshData.points.length;i++){
		let p = meshData.points[i];
		mesh.points.push(new Vector(p.x,p.y))
	}
	for(let i:number = 0;i<meshData.quads.length;i++){
		let quadData = meshData.quads[i].points;
		let quad = new Quad(quadData[0],quadData[1],quadData[2],quadData[3])
		let center = quad.computeCenter(mesh.points)
		mesh.quads.push(quad)
		mesh.centers.push(center)
		tree.insert(quad,center.x,center.y)
	}
}



