import { useState } from "react";
import { CheckCircle } from "../../../node_modules/@mui/icons-material/index";
import { Checkbox, FormControlLabel, FormGroup } from "../../../node_modules/@mui/material/index";
interface Props{
    items:string[];
    checked?:string[];
    onChange:(items:string[])=>void
}
export default function RadioButtonGroup({items,checked,onChange}:Props){
    const [checkedItems,setCheckedItems]=useState(checked||[]);
    function handleChecked(value:string){
        const currentIndex=checkedItems.findIndex(i=>i===value);
        let newChecked:string[]=[];
        if(currentIndex===-1)newChecked=[...checkedItems,value];
        else newChecked=checkedItems.filter(i=>i!==value)
        setCheckedItems(newChecked);
        onChange(newChecked);
    }
    
    
    return(
        <FormGroup>
            {items.map((item: any) => (
              <FormControlLabel control={<Checkbox checked={checkedItems.indexOf(item)!==-1} onClick={()=>handleChecked(item)}/>} label={item} key={item} />
            ))}
          </FormGroup>
    )
}