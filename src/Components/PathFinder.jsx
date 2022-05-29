import React, {useState, useEffect} from 'react'
import Node from './Node';
import { dijkstra,getNodesInShortestPathOrder } from '../Algorithms/dijkstra';
import { selectData } from "../Redux/slice";
import { useSelector, useDispatch } from "react-redux";

const PathFinder = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(selectData)
    const [grid,setGrid] = useState([]);


    useEffect(() => {
        const matrix = formGrid();
        setGrid(matrix);
        console.log(matrix);
    }, [])

    const START_NODE_ROW = data?.startIndex?.row || 10;
    const START_NODE_COL = data?.startIndex?.col || 15;
    const FINISH_NODE_ROW = data?.endIndex?.row || 15;
    const FINISH_NODE_COL = data?.endIndex?.col || 35;
    

    const createNode = (row,col)=>{
        return {
            row,
            col,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
          };
    }

    const formGrid = ()=>{
        const grid = []
        for(let row=0;row<20;row++){
            const currentRow = []
            for(let col = 0;col<50;col++){
                currentRow.push(createNode(row,col));
            }
            grid.push(currentRow);
        }
        return grid;
    }

    const animateShortestPath=(nodesInShortestPathOrder)=> {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
      }

    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder)=> {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            // const startElement = document.getElementsByClassName('node-start');
            // const endElement = document.getElementsByClassName('node-finish');
            // console.log(document.getElementById(`node-${node.row}-${node.col}`).classList)
            document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-visited');
            // startElement.classList.add('node-start')
            // endElement.classList.add('node-finish')
          }, 10 * i);
        }
      }

     const visualizeDijkstra=()=> {
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      }


  return (
    <>
    <div>
        {
            grid.map((row)=>{
                return(
                    <div>
                        {
                            row.map((node)=>{
                                const {row,col,isWall,isStart,isFinish} = node;
                                return(
                                    <Node  props={{row,col,isStart,isWall,isFinish}} />
                                )
                            })
                        }
                    </div>
                )
            })
        }
    </div>
    <button onClick={() =>visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
    </>
  )
}

export default PathFinder