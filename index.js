// inputs
const inputBudgetEl = document.querySelector(".budget-input");
const inputExpenseEl = document.querySelector(".expense-type-input");
const inputExpenseAmount = document.querySelector(".expense-amont-input");

// Buttons
const budgetBtn = document.querySelector(".add-budget");
const expenseBtn = document.querySelector(".add-expense");
const clearDataBtn = document.querySelector(".clear-data");

// Budget section
const budgetAmountEl = document.querySelector(".budget-amount");
const expensesTotalAmountEl = document.querySelector(".expenses-total-amount");
const balanceEl = document.querySelector(".budget-end-balance");

const budgetContainer = document.querySelector(".budget-container-div");
const budgetExpensesContainer = document.querySelector(".budget-expenses-div");

budgetBtn.addEventListener("click", () => {
  if (inputBudgetEl.value != "") {
    depositToBudget(inputBudgetEl.value);
    getdepositBudget();
    addExpensesToUI();
  } else {
    alert("Please enter a valid budget number");
  }
  inputBudgetEl.value = "";
});

expenseBtn.addEventListener("click", () => {
  if (inputExpenseEl.value != "" && inputExpenseAmount.value != "") {
    updateBudget();
  }
});

function updateBudget() {
  const expenseLabel = document.createElement("p");
  expenseLabel.classList.add("expense-label");
  budgetContainer.appendChild(expenseLabel);
  expenseLabel.innerText = inputExpenseEl.value;
  inputExpenseEl.value = "";

  const expenseAmount = document.createElement("p");
  expenseAmount.classList.add("expense-value");
  budgetExpensesContainer.appendChild(expenseAmount);
  expenseAmount.innerText = "$" + inputExpenseAmount.value;
  inputExpenseAmount.value = "";

  const objEl = {
    expenseLabel: expenseLabel.innerText,
    expenseMoney: expenseAmount.innerText,
  };

  const expensesArr =
    JSON.parse(localStorage.getItem("expenses-deposit")) || [];

  expensesArr.push(objEl);

  depositToExpenses(expensesArr);
  addExpensesToUI();
}

function depositToBudget(budget) {
  localStorage.setItem("budget-deposit", JSON.stringify(budget));
}
function getdepositBudget() {
  const budget = JSON.parse(localStorage.getItem("budget-deposit"));
  budgetAmountEl.innerText = "$" + (budget ? budget : 0);
}

window.addEventListener("load", () => {
  addExpensesToUI();
  getdepositBudget();
});

function depositToExpenses(expenses) {
  localStorage.setItem("expenses-deposit", JSON.stringify(expenses));
}

function addExpensesToUI() {
  const itemsToDeleteV = document.querySelectorAll(".expense-value");
  itemsToDeleteV.forEach((item) => {
    item.remove();
  });

  const itemsToDeleteL = document.querySelectorAll(".expense-label");
  itemsToDeleteL.forEach((item) => {
    item.remove();
  });

  const expenses = JSON.parse(localStorage.getItem("expenses-deposit"));
  let expensesTotal = 0;
  expenses?.forEach((expense) => {
    expensesTotal += parseFloat(expense.expenseMoney.replace("$", ""));
    const expenseLabel = document.createElement("p");
    expenseLabel.classList.add("expense-label");
    expenseLabel.innerText = expense.expenseLabel;
    budgetContainer.appendChild(expenseLabel);

    const expenseAmount = document.createElement("p");
    expenseAmount.classList.add("expense-value");
    expenseAmount.innerText = expense.expenseMoney;
    budgetExpensesContainer.appendChild(expenseAmount);
  });
  expensesTotalAmountEl.innerText = "$" + expensesTotal;

  let balanceAmount =
    JSON.parse(localStorage.getItem("budget-deposit")) - expensesTotal;

  balanceEl.innerText = "$" + balanceAmount.toFixed(2);

  if (balanceAmount < 0) {
    balanceEl.style.color = "red";
  } else if (balanceAmount >= 0) {
    balanceEl.style.color = "green";
  }
}

clearDataBtn.addEventListener("click", () => {
  localStorage.clear();
  localStorage.removeItem("expenses-deposit");
  addExpensesToUI();
  getdepositBudget();
  // updateBudget();
});
