import DeleteIcon from '@mui/icons-material/Delete';
import { TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { SelectChangeEvent } from '@mui/material/Select';
import Stack from "@mui/material/Stack";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import EnhancedTextField, { ValidateType } from '../../components/TextField';
import { addCourse, checked, delCourse, saveRecord, Score, selectCourses, selectGPA, selectName, switchRecord } from "./scoreSlice";
export function ScoreList({ }) {
    const courseList = useSelector(selectCourses)
    const GPA = useSelector(selectGPA)
    const name = useSelector(selectName)
    const formEl = useRef<HTMLFormElement>();
    const saveEl = useRef<HTMLFormElement>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("courseList", courseList)
        console.log("selectName: ", name)
    })
    const add = (e: React.MouseEvent<HTMLElement>) => {
        const formData = new FormData(formEl.current);
        const name = formData.get("course")?.toString();
        const credit = Number(formData.get("credit")?.toString());
        const score = Number(formData.get("score")?.toString());
        if (isNaN(credit) || isNaN(score) || !name || name?.length <= 0) {
            alert("invalid input")
            return
        }
        dispatch(addCourse({ name, credit, score, selected: true } as Score));
    }
    const saveCurRecord = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(saveRecord(name))
    }
    const save = (e: React.MouseEvent<HTMLElement>) => {
        const formData = new FormData(saveEl.current);
        const name = formData.get("recored_name")?.toString()
        if (!name) {
            return
        }
        dispatch(saveRecord(name))
    }
    const checkCourse = (index: number) => (e: React.ChangeEvent<HTMLElement>) => {
        dispatch(checked(index))
    }
    const deleteCourse = (index: number) => (e: React.MouseEvent<HTMLElement>) => {
        dispatch(delCourse(index))
    }
    const recordChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        dispatch(switchRecord(event.target.value))
    }
    return (
        <Box>
            <Box
                ref={formEl}
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="on"
                display={"flex"}
                alignContent={"center"}
                alignItems={"center"}
            >
                <TextField id="name" label="Course Name" name="course" variant="outlined" />
                <EnhancedTextField id="score" label="Score" name="score" variant="outlined" validType={ValidateType.NUMBER} />
                <EnhancedTextField id="credit" label="Credit" name="credit" variant="outlined" validType={ValidateType.NUMBER} />
                <Button variant="outlined" color="success" onClick={e => add(e)}>
                    Add
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Course Name
                            </TableCell>
                            <TableCell>
                                Credit
                            </TableCell>
                            <TableCell>
                                Score
                            </TableCell>
                            <TableCell>
                                Selected
                            </TableCell>
                            <TableCell>
                                Edit
                            </TableCell>
                            <TableCell>
                                Delete
                            </TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {
                            courseList.map((score: Score, index: number) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            {score.name}
                                        </TableCell>
                                        <TableCell>
                                            {score.credit}
                                        </TableCell>
                                        <TableCell>
                                            {score.score}
                                        </TableCell>
                                        <TableCell >
                                            <Checkbox color="secondary" checked={score.selected} onChange={checkCourse(index)} />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="delete" size="large" onClick={deleteCourse(index)}>
                                                <DeleteIcon fontSize="inherit" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>



            <Box
                ref={saveEl}
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="on"
                display={"flex"}
                alignContent={"center"}
                alignItems={"center"}
                
            >
                <Stack direction="row" spacing={2} alignItems={"center"}>
                    <Button variant="outlined" color="success" onClick={e => saveCurRecord(e)} size='large'>
                        Save this record
                    </Button>
                    <EnhancedTextField id="save-record" label="record name" name="recored_name" variant="outlined" validType={ValidateType.STRING} />
                    <Button variant="outlined" color="success" onClick={e => save(e)}>
                        Save
                    </Button>
                    <Button disabled variant="outlined" color="success"  >
                        GPA: {GPA}
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}