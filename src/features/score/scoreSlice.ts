import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
export interface Score {
    name: string | '';
    credit: number | 0;
    score: number | 0;
    selected: boolean | false;
}
export interface ScoresState {
    scores: Score[];
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
        console.log("calc: ", score.name, "  ", score.selected)
        creditSum += score.credit;
        sum += score.credit * (4.0 - 0.1 * Math.max(0, 85 - score.score))
        console.log(sum, creditSum)
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
const initialState: ScoresState = {
    scores: initScores,
}

export const scoreSlice = createSlice({
    name: "scores slice",
    initialState,
    reducers: {
        checked: (state, action: PayloadAction<number, string>) => {
            console.log("action type:", action.type)
            state.scores[action.payload].selected = !state.scores[action.payload].selected
        },
        addRecord: (state, action: PayloadAction<Score>) => {
            state.scores.push(action.payload)
        },
        delRecord: (state, action: PayloadAction<number>) => {
            state.scores.splice(action.payload, 1)
        }
    }
})
export const check = (index: number) => (dispatch: AppDispatch) => {

}
export const selectScores = (state: RootState) => state.scores.scores
export const selectGPA = (state: RootState) => calc(state.scores.scores).toFixed(3)
export default scoreSlice.reducer
export const { checked, addRecord, delRecord } = scoreSlice.actions