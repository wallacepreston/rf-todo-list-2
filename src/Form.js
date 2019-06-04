import React from 'react'

const Form = props => {
  const {
    taskName,
    assignee,
    handleChange,
    handleSubmit,
    warningMessage,
    errorMessage,
  } = props

  return (
    <form id="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="taskName">
        Task Name:
        {!taskName && warningMessage && (
          <span className="warning">{warningMessage}</span>
        )}
      </label>
      <input
        name="taskName"
        type="text"
        onChange={handleChange}
        value={taskName}
      />

      <label htmlFor="assignee">
        Assign To:
        {!assignee && warningMessage && (
          <span className="warning">{warningMessage}</span>
        )}
      </label>
      <input
        name="assignee"
        type="text"
        onChange={handleChange}
        value={assignee}
      />

      <button type="submit" disabled={!taskName || !assignee}>
        Submit
      </button>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </form>
  )
}

export default Form
