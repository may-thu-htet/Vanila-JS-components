## Overview

This solution implement the editable table using Vanilla JavaScript, HTML and CSS.
Users can add, edit or delete table rows. All changes are directly applied to DOM without external storage.

## Main Features

- Add a new row with a default empty state
- Edit cell content inline by edit button
- Save and update DOM via save button
- Revert to original value via cancel button
- Delete rows via delete button
- Responsive and clean UI

## Code Structure

-`createRow(headOrBody)` : Build table header and table data row with initial data populated. Depending on the argument that has been assigned into the function, it will create `<th>` or `<td>` and append to `thead` or `tbody` respectively.

-`tdToInput(editBtn)` : When 'Edit' button has been clicked, all the td in table body will turn into html `<input>` elements.

-`switchButtons(editBtn)` : When 'Edit' button has been clicked,'Edit' button will not be displayed and switched into 'Save' and 'Cancel' buttons. These buttons will be inserted before 'Delete' button.

-`saveInput(saveBtn)` : When 'Save' button has been clicked, all the data in the table cell will be replaced with the user input values. (used in handleEdit function for click event)

-`showEditButton(btn)` : When 'Save' button has been clicked, 'Save' and 'Cancel' buttons will be removed and 'Edit' button will be displayed.(used in handleEdit function for click event)

-`handleCancel(cancelBtn)` : When 'Cancel' button has been clicked, first check if it is new row. If it is, remove the entire row. If it is not, revert to original values and show them in the table cells.

-`handleDelete(deleteBtn)` : When 'Delete' button has been clicked, alert message will be displayed and if user has selected 'Yes', the entire row will be removed.

-`handleAdd()` : This is for adding additional row to table body when user click Add button.

\*\* Event delegation was used for click events.

\*\*All DOM manipulation is handled with standard `document.createElement`, `appendChild`, and `addEventListener`. No third-party libraries are used.

## Edge Cases Handled

- Prevents empty cell submissions
- Deletes individual rows cleanly

## Future Improvements

- Input validation (e.g., email format)
- Save data to localStorage or API
- Keyboard shortcuts for accessibility
