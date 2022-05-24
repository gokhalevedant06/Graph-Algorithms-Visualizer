import React, { useState } from "react";
import "../Assets/Node.css";
import { selectData } from "../Redux/slice";
import { useSelector, useDispatch } from "react-redux";
import {setStart,setEnd} from '../Redux/slice'

const Node = ({ props }) => {
  const dispatch = useDispatch();
  const {data} = useSelector(selectData)
  const [start, setStart] = useState();
  const [finish, setEnd] = useState();
  var { row, col, isStart, isWall, isFinish, startReady, endReady} = props;
  isStart = start;
  isFinish = finish;
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      onClick={() => {
        if (data.isSetStart ) {
          setStart(row, col);
        }
        if (data.isSetStart && data.isSetEnd) {
          setEnd(row, col);
        }
      }}
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
    ></div>
  );
};

export default Node;
