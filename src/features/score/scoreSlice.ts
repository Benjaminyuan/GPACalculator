import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
export interface Score {
    name: string | '';
    credit: number | 0;
    score: number | 0;
    selected: boolean | false;
}
export interface Record {
    name: string;
    courses: Score[];
    GPA: number;
}
export interface ScoresState {
    courses: Score[];
    status: string | "";
    saved: Record[];
    name: string | "";
}
export const createScore: (name: string, score: number, credit: number, selected: boolean) => Score = (name, score, credit, selected = false) => {
    return { name, score, credit, selected }
}
const calc: (scores: Score[]) => number = (scores) => {
    let creditSum = 0;
    let sum = 0;
    console.log(scores)
    scores.forEach((score: Score) => {
        if (score.selected === false) {
            return
        }
        // console.log("calc: ", score.name, "  ", score.selected)
        creditSum += score.credit;
        sum += score.credit * (4.0 - 0.1 * Math.max(0, 85 - score.score))
        // console.log(sum, creditSum)
    })
    return creditSum > 0 ? sum / creditSum : 0
}
const initScores: Score[] = [{
    name: "Fundamentals of computer Technology",
    credit: 1.0,
    score: 87,
    selected: true,
},
{
    name: "C programming",
    credit: 3.0,
    score: 89,
    selected: true,
},
{
    name: "Data structure",
    credit: 3.0,
    score: 90,
    selected: true,
},
{
    name: "Assembly Language Programming",
    credit: 1.5,
    score: 94,
    selected: true,
}
]
const getAllSavedRecords: () => Record[] = () => {
    const records: Record[] = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const res = localStorage.getItem(key ? key : "")
        if (res) {
            records.push(JSON.parse(res))
        }
    }
    return records
}
const initialState: ScoresState = {
    courses: [],
    name: "",
    status: "unsave",
    saved: getAllSavedRecords(),
}

export const scoreSlice = createSlice({
    name: "scores slice",
    initialState,
    reducers: {
        checked: (state, action: PayloadAction<number, string>) => {
            console.log("action type:", action.type)
            state.courses[action.payload].selected = !state.courses[action.payload].selected
        },
        addCourse: (state, action: PayloadAction<Score>) => {
            state.courses.push(action.payload)
        },
        delCourse: (state, action: PayloadAction<number>) => {
            state.courses.splice(action.payload, 1)
        },
        saveRecord: (state, action: PayloadAction<string>) => {
            let record: Record = { courses: state.courses, name: action.payload, GPA: calc(state.courses) };
            localStorage.setItem(action.payload, JSON.stringify(record))
            state.status = "saved"
            state.saved = getAllSavedRecords();
        },
        switchRecord: (state, action: PayloadAction<string>) => {
            if (state.name === action.payload) {
                return;
            }
            const rec = localStorage.getItem(action.payload)
            if (rec) {
                let record: Record = JSON.parse(rec)
                state.courses = record.courses
                state.name = action.payload
            }
        },
        delRecords: (state, action: PayloadAction<readonly string[]>) => {
            action.payload.forEach((item: string) => {
                localStorage.removeItem(item)
            })
            state.saved = getAllSavedRecords();
        }
    }
})
export const check = (index: number) => (dispatch: AppDispatch) => {

}
export const selectCourses = (state: RootState) => state.scores.courses
export const selectGPA = (state: RootState) => calc(state.scores.courses).toFixed(3)
export const selectRecords = (state: RootState) => state.scores.saved
export const selectName = (state: RootState) => state.scores.name
export default scoreSlice.reducer
export const { checked, addCourse, delCourse, saveRecord, switchRecord,delRecords} = scoreSlice.actions