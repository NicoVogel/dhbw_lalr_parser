# This is a project from two students of the DHBW Stuttgart

The library is able to calculate a PDA LALR parser. The input are the rules which need to meet the following properties to be accepted.

- between each terminal/non-terminal must be a **space**
- terminals start with **lower case**
- non-terminals start **with uppercase**
- the mapping is seperated with '**->**'
- on the left side of the arrow only one non-terminal is allowed

*Further information:*
- the no character is called **dollar** 
- the library is not able to calculate the start table like: "*S' -> .S dollar, ?*", so there is one block missing.

## How to use it?

The main part is the *Manager.js* and it has the following *functions*:

````javascript

// create manager
let m = new Manager();

// add rules for the PDA
m.addRule("S -> a S a");
m.addRule("S -> b S b");
m.addRule("S -> a");
m.addRule("S -> b");

// calculate the LALR parser
m.constructPDA();

// print the LALR parser to console (ugly version)
m.printBlocks();

// print the LALR parser to console
console.log(m.prettyString);

// print the connections table to console
m.printTable();

````

## How to get it up and running?

There are two ways to do so:

1. clone the repo and use docker-compose to start a node container which executes the sample code. Use the following commands: 
    - git clone https://github.com/nicovogel/dhbw_lalr_parser
    - cd dhbw_lalr_parser
    - \# if you use ubuntu add *sudo* before the following command 
    - docker-compose up

2. clone the repo and start the node server from your host machine. Of course, you need to have node installed for that. Use the following commands to run the sample code:
    - git clone https://github.com/nicovogel/dhbw_lalr_parser
    - cd ./dhbw_lalr_parser/node
    - node app.js
