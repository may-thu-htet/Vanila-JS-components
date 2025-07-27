## Overview

This solution implements a dynamic and editable table interface using Vanilla JavaScript, HTML, and CSS. Users can submit a form to add new rows to the table, validate input fields, and interact with each row through "Move Up", "Move Down", and "Delete" actions. The table updates dynamically using DOM manipulation without refreshing the page.

## Features

- Add new rows via a form submission
- Input validation using regular expressions (for email, first name, and last name)
- Delete a row with confirmation
- Move a row up or down in the table
- Disable "Move Up" on the first row and "Move Down" on the last row for UX clarity
- Clear error messages and form reset after successful submission

## Code Structure

### `handleAdd()`

Triggered on form submission. It:

- Validates input fields using `EMAIL_REGEX` and `NAME_REGEX`
- Creates a new table row with the provided values
- Appends action buttons ("Move Up", "Move Down", "Delete") to the row
- Dynamically disables up/down buttons based on the row's position
- Resets the form on success

### `handleDelete(deleteBtn)`

- Removes a table row after confirming with the user

### `handleMoveUp(button)`

- Moves the current row above the previous sibling row
- Disables the "Move Up" button when the row is already at the top

### `handleMoveDown(button)`

- Moves the current row below the next sibling row
- (Note: Currently doesn't disable the button like `handleMoveUp()` — see Possible Improvements)

### Event Listeners

- The `submit` event is attached to the form to trigger `handleAdd()`
- A `click` event listener is attached to the table body to handle all row-level button interactions using `event delegation`

## Assumptions

- Email, first name, and last name are all optional but validated if entered
- IDs are used to uniquely identify and increment rows
- The row's position in the DOM is used to manage movement logic
- The form structure includes inputs named `email`, `first`, and `last`

## Edge Cases Handled

- Empty inputs are not rejected, but incorrect formats are flagged
- "Move Up" is disabled when the row is the first
- "Move Down" is conditionally disabled on insertion (though it may need refinement)
- Confirm dialog prevents accidental row deletion

## Possible Improvements

- Add persistent storage (e.g. localStorage) to retain table data between sessions
- Extract repetitive logic for enabling/disabling buttons into a utility function
- Improve keyboard accessibility (e.g. tab navigation, Enter to submit)
- Add visual indicators or animations when rows are moved
- Refactor `handleMoveDown()` to also handle "last-row" disabling logic consistently

## Tools & Techniques Used

- Vanilla JavaScript for all logic
- DOM APIs: `createElement`, `appendChild`, `closest`, `querySelector`
- Event delegation for button actions
- Regular expressions for validation
- Graceful fallback and error messaging
