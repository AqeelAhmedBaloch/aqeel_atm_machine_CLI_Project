#! /usr/bin/env node
import inquirer from "inquirer";

console.log("=====================================");
console.log("Welcome to my ATM Machine CLI Project");
console.log("===================================\n");

let userBalance = Math.floor(Math.random() * 20000);

let myLoop = true;
while (myLoop) {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      name: "userPin",
      message: "Enter Your Pin!",
    },
    {
      type: "list",
      name: "accountType",
      message: "Select your Account Type!",
      choices: ["Current Account", "Saving Account"],
    },
    {
      type: "list",
      name: "transactionType",
      message: "Select your transaction!",
      choices: ["Fast Cash", "Cash Withdraw", "Balance Inquiry"],
    },
    {
      type: "list",
      name: "amount",
      message: "Select the amount you want to withdraw!",
      choices: [1000, 1500, 2000, 3000, 5000, 8000, 10000],
      when(userInput) {
        return userInput.transactionType === "Fast Cash";
      },
    },
    {
      type: "number",
      name: "amount",
      message: "Enter amount you want to withdraw!",
      when(userInput) {
        return userInput.transactionType === "Cash Withdraw";
      },
    },
  ]);
  const { userPin, transactionType, amount } = userInput;

  if (userPin && transactionType === 'Balance Inquiry') {
    console.log(`Your current balance is Rs. ${userBalance}`)
  }else if(userPin){
    if(userBalance > amount){
        console.log(`Your account has been debited with Rs.${amount} and your remaining balance is ${userBalance -= amount}`)
    } else {
        console.log(`\nUnsufficient Balance`)
    }
  }
  let moreTransactions = await inquirer.prompt({
    type:'confirm',
    name : 'more',
    message: 'Do you want more transactions?',
    default :false
  })
  if(!moreTransactions.more){
    myLoop = false;
    console.log('\nThank you for using My ATM Machine CLI Project')
  }
}
