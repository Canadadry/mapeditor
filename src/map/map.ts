import {Vector} from './vector'
import {QuadTree} from './quadtree'
import {Colors,Color} from '../ui/painter/color'
let json = require("vendor.json")

type VertexData = [number,number,number,number,number,number,number,number]

class Quad{
	points:[number,number,number,number]
}

class MeshData{
	points:Vector[];
	quads:Quad[];
}

export class Map{
	mesh:Mesh
	tree:QuadTree<number>
	closest:number|null
	tiles:[[[number,number],[number,number],[number,number],[number,number],[number,number],[number,number]],[[number,number],[number,number],[number,number],[number,number],[number,number],[number,number]]]

	constructor(map_file:string,texture_file:string){
		
		let vertices:VertexData[] = []
		this.tree = new QuadTree<number>();
		let meshData:MeshData = json.decode(love.filesystem.read(map_file)[0])
		this.tiles = [
			[
				[   0,   0],
				[ 0.5,   0],
				[   0, 0.5],
				[   0, 0.5],
				[ 0.5,   0],
				[ 0.5, 0.5],
			],			
			[
				[ 0.5,   0],
				[   1,   0],
				[ 0.5, 0.5],
				[ 0.5, 0.5],
				[   1,   0],
				[   1, 0.5],
			],
		]

		for(let i:number = 0;i<meshData.quads.length;i++){
			let quadData = meshData.quads[i].points;

			let p0 = new Vector(meshData.points[quadData[0]].x, meshData.points[quadData[0]].y)
			let p1 = new Vector(meshData.points[quadData[1]].x, meshData.points[quadData[1]].y)
			let p2 = new Vector(meshData.points[quadData[2]].x, meshData.points[quadData[2]].y)
			let p3 = new Vector(meshData.points[quadData[3]].x, meshData.points[quadData[3]].y)
			let center = p0.add(p1).add(p2).add(p3).mul(1/4)
			this.tree.insert(i,center.x,center.y)

			vertices.push([p0.x,p0.y,this.tiles[0][0][0],this.tiles[0][0][1],1,1,1,1]);
			vertices.push([p1.x,p1.y,this.tiles[0][1][0],this.tiles[0][1][1],1,1,1,1]);
			vertices.push([p3.x,p3.y,this.tiles[0][2][0],this.tiles[0][2][1],1,1,1,1]);
			vertices.push([p3.x,p3.y,this.tiles[0][3][0],this.tiles[0][3][1],1,1,1,1]);
			vertices.push([p1.x,p1.y,this.tiles[0][4][0],this.tiles[0][4][1],1,1,1,1]);
			vertices.push([p2.x,p2.y,this.tiles[0][5][0],this.tiles[0][5][1],1,1,1,1]);
		}
		this.mesh = love.graphics.newMesh(vertices,"triangles")
		let text = love.graphics.newImage(texture_file)
		this.mesh.setTexture(text)
	}

	pick(x:number,y:number){
		let result = this.tree.searchClosest(x,y)
		if (result == null){
			return
		}
		if(this.closest==null){
			this.closest = result[1]
			this.setQuadColor(this.mesh,this.closest,1)
			return
		}
		if(this.closest == result[1]){
			return
		}
		this.setQuadColor(this.mesh,this.closest,0)
		this.closest =result[1]
		this.setQuadColor(this.mesh,this.closest,1)
	}

	setQuadColor(mesh:Mesh,quad:number,tile:number){
		let v0:VertexData = mesh.getVertex(quad*6+0+1)
		let v1:VertexData = mesh.getVertex(quad*6+1+1)
		let v2:VertexData = mesh.getVertex(quad*6+2+1)
		let v3:VertexData = mesh.getVertex(quad*6+3+1)
		let v4:VertexData = mesh.getVertex(quad*6+4+1)
		let v5:VertexData = mesh.getVertex(quad*6+5+1)

		mesh.setVertex(quad*6+0+1,v0[0],v0[1],this.tiles[tile][0][0],this.tiles[tile][0][1],1,1,1,1)
		mesh.setVertex(quad*6+1+1,v1[0],v1[1],this.tiles[tile][1][0],this.tiles[tile][1][1],1,1,1,1)
		mesh.setVertex(quad*6+2+1,v2[0],v2[1],this.tiles[tile][2][0],this.tiles[tile][2][1],1,1,1,1)
		mesh.setVertex(quad*6+3+1,v3[0],v3[1],this.tiles[tile][3][0],this.tiles[tile][3][1],1,1,1,1)
		mesh.setVertex(quad*6+4+1,v4[0],v4[1],this.tiles[tile][4][0],this.tiles[tile][4][1],1,1,1,1)
		mesh.setVertex(quad*6+5+1,v5[0],v5[1],this.tiles[tile][5][0],this.tiles[tile][5][1],1,1,1,1)
	}


}

