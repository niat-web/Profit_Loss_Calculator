# Profit_Loss_Calculator

## Objective
This project provides a user interface for calculating profit and loss based on cost price, selling price, and quantity of a transaction. It includes features for real-time calculation, transaction history tracking, summary of total profit/loss and overall percentage, a dark/light mode toggle, and the ability to generate and download a CSV report of all transactions. The project also retrieves and displays product data from an external API. Technologies used include HTML, CSS, JavaScript, and Font Awesome for icons.

## Output
<iframe src="https://github.com/niat-web/Profit_Loss_Calculator" height="1000" width="300" title="Profit_Loss_Calculator"></iframe>

## Project Requirements
**Technologies:** HTML, CSS, JavaScript, Font Awesome, [allorigins.win API (proxy)]

## Features to Implement
- Real-time profit/loss calculation based on user input.
- Display of individual transaction results and overall summary.
- Transaction history tracking and display in a table.

## UI Enhancements
- Implement Dark/Light mode toggle using JavaScript.
- Add visual validation feedback to input fields.

## Project Tasks & Expected Outcomes
| Task | Expected Outcome |
|------|------------------|
| Implement event listeners for form submission | Form submission triggers calculation and updates display. |
| Implement dark mode toggle | User can switch between dark and light themes. |
| Implement input validation | Only valid positive numerical inputs are accepted. |
| Implement transaction history | Transactions are tracked and displayed in a table |
| Calculate and display the total profit/loss and percentage  | Summary of all transaction history is shown |
| Implement CSV export functionality | User can download a CSV report of all transaction data. |
|Implement data display from API| Information will display on the screen from the API|

## JavaScript Concepts
| Concept | Implementation |
|---------|----------------|
| DOM Manipulation | Used to update and modify HTML elements dynamically based on user input and calculations. |
| Event Listeners | Used to handle user interactions like form submission, button clicks, and input changes. |
| Functions | Used to encapsulate and reuse code for calculations, display updates, and data management. |
| Arrays | Used to store transaction history for display and summary calculations. |
| Async/Await | Used to handle asynchronous operations like fetching data from the API. |

## API Details
| API | Endpoint | Description |
|-----|----------|-------------|
| freetestapi.com | /api/v1/products | Fetches product data (name, description, price, brand) for display. |
| allorigins.win | /raw?url=[API URL] | Used as a proxy to bypass CORS issues when accessing the freetestapi.com API. |