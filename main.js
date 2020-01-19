// // look into Inquirer.js

// const rl = require('readline').createInterface({
//    input: process.stdin,
//    output: process.stdout,
// })

// const gameMap = {
//     0: {
//         0: {text: '0,0'},
//         1: {text: '0,1'},
//         2: {text: '0,2'},
//     },
//     1: {
//         0: {text: '1,0'},
//         1: {text: '1,1'},
//         2: {text: '1,2'},
//     },
//     2: {
//         0: {text: '2,0'},
//         1: {text: '2,1'},
//         2: {text: '2,2'},
//     },
// }

let num1 = Math.floor((Math.random() * 10) + 1);
let num2 = Math.floor((Math.random() * 10) + 1);
let answer = num1 + num2;

// rl.question(`What is ${ num1 } + ${ num2 }? \n`,
// (userInput) => {
//     if (userInput.trim() == answer){
//         rl.close();
//     } else {
//         rl.setPrompt('Incorrect. Please try again\n')
//         rl.prompt();
//         rl.on('line', (userInput)=>{
//             if (userInput.trim() == answer){
//                 rl.close();
//             } else {
//                 rl.setPrompt(`Your answer is of ${ userInput} is incorrect \n`)
//                 rl.prompt();
//             }
//         })
//     }
// });

// rl.on('close', ()=>{
//     console.log('Correct!');
// })

const inquirer = require('inquirer')
// inquirer
//     .prompt([
//         {
//             type: 'input',
//             name: 'name',
//             message: 'your name?',
//         },
//         {
//             type: 'input',
//             name: 'age',
//             message: 'how old are you?',
//         }
//     ]).then(answers => {
//         console.log(`OK, ${answers.name}. Let's play a game.`)
//     })

const game = () => {
    const loop = () => {
        inquirer.prompt([{
            type: 'input',
            name: 'sum',
            message: `What's ${num1} + ${num2}?`
        }]).then(ans => {
            if (ans.sum == answer) {
                console.log(`Yes. ${ans.sum} is the sum of ${num1} and ${num2}.`)
            } else {
                console.log('Sorry, please try again.')
                loop()
            }
        })
    }
    loop()
}

game()