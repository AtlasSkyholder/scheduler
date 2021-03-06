import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form (props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset() {  //function to reset name to an empty string and interviewer to null
    setName("");
    setInterviewer(null);
  }

  function cancel() {  //function cancel calls on reset to update the interview
    reset();
    props.onCancel();
  }

  function validate() {  //validation function to prevent empty names from being stored in interview
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"  >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} setInterviewer={setInterviewer} onChange={(event) => {
            setInterviewer(event.target.value)
          }} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()} >Cancel</Button>
          <Button confirm onClick={() => validate()} >Save</Button>
        </section>
      </section>
    </main>
  );
}