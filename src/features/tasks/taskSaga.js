import { call, put, takeEvery } from "@redux-saga/core/effects";
import { fetchExampleTasks, setTasks } from "./tasksSlice";
import {getExampleTasks} from "./getExampleTasks";

function* fetchExampleTasksHandler() {
    try {
        const exampleTasks = yield call(getExampleTasks);
        yield put(setTasks(exampleTasks))
    } catch (error) {
        yield call(alert, "Coś poszło nie tak!");
    }
}

export function* watchFetchExampleTasks() {
    console.log("Saga jest podłączona");
    yield takeEvery(fetchExampleTasks.type, fetchExampleTasksHandler);
}