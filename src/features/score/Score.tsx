import DeleteIcon from '@mui/icons-material/Delete';
import { TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { addRecord, checked, delRecord, Score, selectGPA, selectScores } from "./scoreSlice";
export function ScoreList({ }) {
    const scoreList = useSelector(selectScores)
    const GPA = useSelector(selectGPA)
    const formEl = useRef<HTMLFormElement>();

    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("scoreList", scoreList)
    }, [])
    const add = (e: React.MouseEvent<HTMLElement>) => {
        const formData = new FormData(formEl.current);
        const name = formData.get("course")?.toString();
        const credit = Number(formData.get("credit")?.toString());
        const score = Number(formData.get("score")?.toString());
        if (isNaN(credit) || isNaN(score)) {
            return
        }
        dispatch(addRecord({ name, credit, score, selected: true } as Score));
    }
    const checkCourse = (index: number) => (e: React.ChangeEvent<HTMLElement>) => {
        dispatch(checked(index))
    }
    const deleteCourse = (index: number) => (e: React.MouseEvent<HTMLElement>) => {
        dispatch(delRecord(index))
    }
    return (
        <div>
            <Box
                ref={formEl}
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="on"
            >
                <TextField id="outlined-basic" label="Course Name" name="course" variant="outlined" />
                <TextField id="filled-basic" label="Credit" name="credit" variant="filled" />
                <TextField id="standard-basic" label="Score" name="score" variant="standard" />
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
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {
                            scoreList.map((score: Score, index: number) => {
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

            <h3>GPA: {GPA}</h3>
        </div>
    )
}