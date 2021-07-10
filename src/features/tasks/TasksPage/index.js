import Form from "../TasksPage/Form";
import TaskList from "./TaskList";
import Buttons from "../TasksPage/Buttons";
import Section from "../../../common/Section";
import Header from "../../../common/Header";
import Container from "../../../common/Container";

export const TasksPage = ()  => {
  return (
    <Container>
      <Header title="Lista zadań" />
      <Section
        title="Dodaj nowe zadanie"
        body={<Form />}
      />
      <Section
        title="Lista zadań"
        body={<TaskList />}
        extraHeaderContent={<Buttons />}
      />
    </Container>
  );
};