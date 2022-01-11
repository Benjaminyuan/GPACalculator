

import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { useState } from 'react';
import { IsNumeric } from '../utils/check';

export enum ValidateType {
    STRING,
    NUMBER
}
interface PropWithValidate {
    validType: ValidateType;
}

export default function EnhancedTextField(props: PropWithValidate & TextFieldProps) {
    const [err, setErr] = useState("")
    const check = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        if (props.validType === ValidateType.NUMBER) {
            console.log(val)
            if (val.length > 0 && !IsNumeric(val)) {
                setErr("invalid number")
            } else {
                setErr("")
            }
        }
    }
    return <TextField  {...props} error={err ? true : false} onChange={check} helperText={err} />
} 