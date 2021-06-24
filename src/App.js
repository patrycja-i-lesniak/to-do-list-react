import { useState } from "react";
import Form from "./Form";
import Tasks from "./Tasks";
import Buttons from "./Buttons";
import Section from "./Section";
import Header from "./Header";
import Container from "./Container";
import { useTasks } from "./useTasks";
import { ThemeProvider } from "styled-components";
import { theme } from "./Theme"


function App() {
  const [hideDone, setHideDone] = useState(false);
  const toggleHideDone = () => {
    setHideDone(hideDone => !hideDone);
  };

  const [selectAll, setSelectAll] = useState(false);
  const toggleSelectAll = () => {
    setSelectAll(selectAll => !selectAll);
  };


  const {
    tasks,
    removeTask,
    toggleTaskDone,
    setAllDone,
    setAllNotDone,
    addNewTask,
    deleteAllTasks,
  } = useTasks();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header title="Lista zadań" />
        <Section
          title="Dodaj nowe zadanie"
          body={<Form addNewTask={addNewTask} />}
        />
        <Section
          title="Lista zadań"
          body={
            <Tasks
              tasks={tasks}
              hideDone={hideDone}
              removeTask={removeTask}
              toggleTaskDone={toggleTaskDone}
            />
          }
          extraHeaderContent={
            <Buttons
              tasks={tasks}
              hideDone={hideDone}
              toggleHideDone={toggleHideDone}
              selectAll={selectAll}
              toggleSelectAll={toggleSelectAll}
              setAllDone={setAllDone}
              setAllNotDone={setAllNotDone}
              deleteAllTasks={deleteAllTasks}
            />
          }
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;