import React from "react";
import styled from "styled-components";

export default class Checkbox extends React.Component {
    render() {

        const Input = styled.input`
          display: none;
          &:checked + label::after {
              display: block;
            }
          
        `;

        const Label = styled.label`
            color: black;
            padding-left: 30px;
            display: block;
            position: relative;
            cursor: pointer;
        
            &::before {
              content: "";
              position: absolute;
              width: 20px;
              height: 20px;
              border: 1px solid #000;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
            }
        
            &::after {
              display: none;
              content: "";
              position: absolute;
              left: 3px;
              top: 50%;
              transform: translateY(-50%) rotate(-45deg);
              width: 16px;
              height: 6px;
              border-left: 2px solid #1C1E1B;
              border-bottom: 2px solid #1C1E1B;
            }
          
        `;

        return (
            <fieldset>
                <Input id={"hidden-checkbox"} type={"checkbox"}/>
                <Label htmlFor={"hidden-checkbox"}>Отметить</Label>
            </fieldset>


        )
    }
}

