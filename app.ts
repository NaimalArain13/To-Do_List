#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import Table from "cli-table3";


enum Commands {
  add = "Add New Todo",
  delete = "Remove Todo from list",
  view = "View your Todo List",
  quit = "Quit",
}
let todos: string[] = [];
let loop = true;

async function main(){
while (loop) {
  const OptionSelect = await inquirer.prompt([
    
    {
      name: "Commands",
      type: "list",
      message: chalk.yellow("Select an option"),
      choices: Object.values(Commands),
    },
  ]);

  switch (OptionSelect.Commands) {
    case Commands.add:
      await addTodo();
      break;
    case Commands.delete:
      await deleteTodo();
      break;
    case Commands.view:
      await viewTodoList();
      break;

    case Commands.quit:
       quitProgram()
      break;

      default:
        break;

  }
}
  async function addTodo() {
    const todoInput = await inquirer.prompt([
      {
        name: "todo",
        type: "input",
        message:chalk.yellow("Enter your new todo:"),
      },
    ]);
    todos.push(todoInput.todo);
    console.log(chalk.green("Todo added successfully!"));
  }
 

}
async function deleteTodo() {
    if (todos.length === 0) {
      console.log(chalk.red("No todos to delete."));
      return;
    }
    const todoToDelete = await inquirer.prompt([
      {
        name: "todo",
        type: "list",
        message: chalk.yellow("Select todo to delete:"),
        choices: todos,
      },
    ]);
    const index = todos.indexOf(todoToDelete.todo);
    todos.splice(index, 1);
    console.log(chalk.green("Todo deleted successfully!"));
  }
  
  async function viewTodoList() {
    console.log(chalk.magenta("Your Todo List:"));
     
    const table = new Table({
        head : ["#" , "Todo"],
    })

    todos.forEach((todo , index) => {
        table.push([index + 1 , todo])
        
    });
    console.log(table.toString());
    
  }

  async function quitProgram() {
    loop = false
    console.log(chalk.blueBright(`Thank you! Have a good day ahead.`));    
  }
  

  console.log(
    "**".repeat(6) +
      chalk.blue.bold.italic("Welcome to the " +  chalk.magenta("TASKEL") + " , the ultimate cli todo app") +
      "**".repeat(6)
  );
  
  main();
