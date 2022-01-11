import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import SortableTable, { HeadCell } from "../../components/SortableTable";
import { delRecords, Record, selectRecords, switchRecord } from "./scoreSlice";

const jsonStringfy = <T extends {}>(): (data: T) => string => {
    return (data: T) => JSON.stringify(data)
}

const headCells: readonly HeadCell<Record>[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
        stringfy: (record: Readonly<Record>): string => {
            return record.name
        },
    },
    {
        id: 'courses',
        numeric: false,
        disablePadding: false,
        label: 'courses',
        stringfy: (record: Readonly<Record>): string => {
            return record.courses.length.toString()
        },

    },
    {
        id: 'GPA',
        numeric: true,
        disablePadding: false,
        label: 'GPA',
        stringfy: (record: Readonly<Record>): string => {
            return record.GPA.toFixed(2).toString()
        }
    }
];
export default function Records() {
    const records = useSelector(selectRecords)
    const dispatch = useDispatch();
    const delItems = (selected: readonly string[]): boolean => {
        dispatch(delRecords(selected))
        return true
    }
    return (
        <Box>
            <SortableTable onDelte={delItems} data={records} defaultOrderBy={'GPA'} headCells={headCells}
                onItemClick={(name: string) => dispatch(switchRecord(name))} />
        </Box>)
}