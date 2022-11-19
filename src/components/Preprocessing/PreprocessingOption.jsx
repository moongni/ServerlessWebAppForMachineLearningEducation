import React, { useCallback, useState, useEffect } from "react";
import { isEmptyArray } from "../Common/package";
import { useDispatch } from "react-redux";
import { preprocessingActions } from "../../reducers/preprocessingSlice";
import { toArray, toOption } from "../Common/package";
import Inputs from "../Common/inputs/Inputs";
import "../Common/table/scrollStyle.css";

export const PreprocessingOptions = ({children, preprocess, ...props}) => {

  const style = {
    divStyle: {
      paddingRight: "6.80rem",
      paddingLeft: "1rem",
    }
  }

  return (
    <div style={style.divStyle}>
      {!isEmptyArray(props.columns) &&
        <div style={{"display":"inline"}}>
          {props.columns.map( column => (
            <PreprocessingInputs
              title={props.title}
              kind={props.kind}
              column={column}
              preprocess={preprocess[column]}
            /> 
          ))}
        </div>
      }
    </div>

  )
}

const PreprocessingInputs = ({ children, preprocess, ...props }) => {
  const dispatch = useDispatch();

  const [ selectedValue, setSeletedValue ] = useState([]);

  useEffect(()=> {
    setSeletedValue(toOption(preprocess))
  }, [])
  
  useEffect(() => {
    var curProcess = toArray(selectedValue);
    
    dispatch(preprocessingActions.setProcess({
      title: props.title,
      column: props.column,
      preprocess: curProcess,
      kind: props.kind
    }));

  }, [ selectedValue ])

  const options = [
    {value: "stardardScale", label: "Standard Scale"},
    {value: "normalize", label: "Normalize"},
    {value: "fillMean", label: "Fill Mean"},
    {value: "fillMedian", label: "Fill Median"},
    {value: "fillMostFrequnce", label: "Fill Most Frequnce"},
    {value: "oneHotEncoding", label: "One Hot Encoding"},
    {value: "labelEncoding", label: "Label Encoding"},
    {value: "dropNull", label: "Drop Null Value"}
  ];

  return (
    <Inputs
      kind="MultiSelect"
      title={props.column}
      value={selectedValue}
      setValue={setSeletedValue}
      options={options}
      hasSelectAll={false}/>
  )
}
