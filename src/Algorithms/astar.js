// push startNode onto openList
// while(openList is not empty) {
//  currentNode = find lowest f in openList
//  if currentNode is final, return the successful path
//  push currentNode onto closedList and remove from openList
//  foreach neighbor of currentNode {
//      if neighbor is not in openList {
//             save g, h, and f then save the current parent
//             add neighbor to openList
//      }
//      if neighbor is in openList but the current g is better than previous g {
//              save g and f, then save the current parent
//      }
//  }


function heru(a,b){
    let d = Math.abs(a.row-a.col) + Math.abs(b.row - b.col);
    return d;
}

const getUnvisitedNeighbors = (grid,current)=> {
    var neighbors = [];
    const {col, row} = current;
    if (row > 0){
        // console.log(grid[row - 1][col])    
        neighbors.push(grid[row - 1][col]);
    } 
    if (row < grid.length - 1){
        // console.log(grid[row + 1][col])
        neighbors.push(grid[row + 1][col]);
    } 
    if (col > 0){
        // console.log(grid[row][col - 1])
        neighbors.push(grid[row][col - 1]);
    } 
    if (col < grid[0].length - 1){
        // console.log(grid[row][col + 1])
        neighbors.push(grid[row][col + 1]);
    }
    // console.log("BEFORE FILTER",neighbors)
    // return neighbors.filter(neighbor => !neighbor.isVisited);
    return neighbors;
  }

const Astar = (startNode,endNode,grid)=>{
    let openSet = [] // unvisited nodes (will contain nodes which we have to visit)
    let closedSet = [] //visited nodes
    let path = [] // will contain shortst path
    let visitedNodes = []

    openSet.push(startNode)
    while(openSet.length>0){
        let leastIndex = 0; 
        for(let i=0;i<openSet.length;i++){
            if(openSet[i].f < openSet[leastIndex].f){
                leastIndex = i;
            }
        }

        let current = openSet[leastIndex];
        visitedNodes.push(current)

        if(current === endNode){
            console.log("PATH FOUND")
            let temp = current;
            path.push(temp);
            while(temp.previousNode){
                path.push(temp.previousNode)
                temp = temp.previousNode;
            }
            // console.log(path)
            return {path,visitedNodes};
        }

        openSet = openSet.filter((elt) => elt!==current);
        closedSet.push(current)
        let neighbors = getUnvisitedNeighbors(grid,current);
        // console.log("NEIGHBOUTS",neighbors)
        for(let i=0;i<neighbors.length;i++){
            let neighbor = neighbors[i];
            if(!closedSet.includes(neighbor) && !neighbor.isWall){
                let tempG = current.g + 1;
                let newPath = false;
                if(openSet.includes(neighbor)){
                    if(tempG < neighbor.g){
                        neighbor.g = tempG;
                        newPath = true;
                    }
                }else{
                    neighbor.g = tempG;
                    newPath=true;
                    openSet.push(neighbor);
                }

                if(newPath){
                    neighbor.h = heru(neighbor,endNode);
                    neighbor.f = neighbor.g + neighbor.f;
                    neighbor.previousNode = current;
                }
            }
        }
    }
    return {path,visitedNodes}
}



  export default Astar;