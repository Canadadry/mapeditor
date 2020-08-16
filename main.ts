import {Vector} from './src/vector'
import {QuadTree} from './src/quadtree'
import {Colors,Color} from './src/color'

type VertexData = [number,number,number,number,number,number,number,number]

let json = require("vendor.json")

let mesh:Mesh
let tree:QuadTree<number>
let closest:number|null

love.update = (dt) =>{}

love.mousemoved = function( x:number, y:number,dx:number,dy:number,isTouch:boolean ){
	let result = tree.searchClosest(x,y)
	if (result == null){
		return
	}
	if(closest==null){
		closest = result[1]
		setQuadColor(mesh,closest,Colors.Red)
		return
	}
	if(closest == result[1]){
		return
	}
	setQuadColor(mesh,closest,Colors.Black)
	closest =result[1]
	setQuadColor(mesh,closest,Colors.Red)
}

function setQuadColor(mesh:Mesh,quad:number,c:Color){
	let v0:VertexData = mesh.getVertex(quad*6+0+1)
	let v1:VertexData = mesh.getVertex(quad*6+1+1)
	let v2:VertexData = mesh.getVertex(quad*6+2+1)
	let v3:VertexData = mesh.getVertex(quad*6+3+1)
	let v4:VertexData = mesh.getVertex(quad*6+4+1)
	let v5:VertexData = mesh.getVertex(quad*6+5+1)

	mesh.setVertex(quad*6+0+1,v0[0],v0[1],v0[2],v0[3],c.r,c.g,c.b,v0[7])
	mesh.setVertex(quad*6+1+1,v1[0],v1[1],v1[2],v1[3],c.r,c.g,c.b,v1[7])
	mesh.setVertex(quad*6+2+1,v2[0],v2[1],v2[2],v2[3],c.r,c.g,c.b,v2[7])
	mesh.setVertex(quad*6+3+1,v3[0],v3[1],v3[2],v3[3],c.r,c.g,c.b,v3[7])
	mesh.setVertex(quad*6+4+1,v4[0],v4[1],v4[2],v4[3],c.r,c.g,c.b,v4[7])
	mesh.setVertex(quad*6+5+1,v5[0],v5[1],v5[2],v5[3],c.r,c.g,c.b,v5[7])
}

love.draw = function() {
	love.graphics.clear(0,0,0)
	love.graphics.draw(mesh,0,0)
}

class Quad{
	points:[number,number,number,number]
}

class MeshData{
	points:Vector[];
	quads:Quad[];
}

love.load = ()=>{
	let vertices:VertexData[] = []
	tree = new QuadTree<number>();
	let meshData:MeshData = json.decode(love.filesystem.read("assets/map.json")[0])

	for(let i:number = 0;i<meshData.quads.length;i++){
		let quadData = meshData.quads[i].points;

		let p0 = new Vector(meshData.points[quadData[0]].x, meshData.points[quadData[0]].y)
		let p1 = new Vector(meshData.points[quadData[1]].x, meshData.points[quadData[1]].y)
		let p2 = new Vector(meshData.points[quadData[2]].x, meshData.points[quadData[2]].y)
		let p3 = new Vector(meshData.points[quadData[3]].x, meshData.points[quadData[3]].y)
		let center = p0.add(p1).add(p2).add(p3).mul(1/4)
		tree.insert(i,center.x,center.y)

		vertices.push([p0.x,p0.y,0,0,0,0,0,1]);
		vertices.push([p1.x,p1.y,0,0,0,0,0,1]);
		vertices.push([p3.x,p3.y,0,0,0,0,0,1]);

		vertices.push([p3.x,p3.y,0,0,0,0,0,1]);
		vertices.push([p1.x,p1.y,0,0,0,0,0,1]);
		vertices.push([p2.x,p2.y,0,0,0,0,0,1]);
	}
	mesh = love.graphics.newMesh(vertices,"triangles","static")
}



