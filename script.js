// Retrieve existing expenses from local storage or initialize an empty array
var expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to add an expense
// Function to add an expense
function addExpense(name, amount, type) {
    var expense = {
        name: name,
        amount: amount,
        type: type
    };

    expenses.push(expense);

    // Save expenses to local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));
}


// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);

    // Save expenses to local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Re-render the expense list
    renderExpenses();
}

// Function to edit an expense
function editExpense(index, newName, newAmount,newType) {
    expenses[index].name = newName;
    expenses[index].amount = newAmount;
    expenses[index].type = newType;

    // Save expenses to local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Re-render the expense list
    renderExpenses();
}

// Function to render the expense list
function renderExpenses() {
    var expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    expenses.forEach(function (expense, index) {
        var expenseItem = document.createElement("li");
        expenseItem.innerText = expense.name + " - Rs:" + expense.amount +" -Type: " + expense.type;

        // Delete button
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteExpense(index);
        });
        expenseItem.appendChild(deleteButton);

        // Edit button
        var editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", function () {
            var newName = prompt("Enter the new expense name:", expense.name);
            var newAmount = prompt("Enter the new expense amount:", expense.amount);
            var newAmount = prompt("Enter the new expense type:", expense.type);

            if (newName && newAmount && newType) {
                editExpense(index, newName, newAmount , newType);
            }
        });
        expenseItem.appendChild(editButton);

        expenseList.appendChild(expenseItem);
    });
}

// Handle form submission
document.getElementById("expenseForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var expenseName = document.getElementById("expenseName").value;
    var expenseAmount = document.getElementById("expenseAmount").value;
    var expenseType = document.getElementById("expenseType").value;


    addExpense(expenseName, expenseAmount, expenseType);
    renderExpenses();

    // Clear form inputs
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseType").value = "";
});

// Render expenses on page load
renderExpenses();
