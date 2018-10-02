# This is a project from two students of the DHBW Stuttgart

The library is able to calculate a PDA LALR parser. The input are the rules which need to meet the following properties to be accepted.

- between each terminal/non-terminal must be a **space**
- terminals start with **lower case**
- non-terminals start **with uppercase**
- the mapping is seperated with '**->**'
- on the left side of the arrow is only one non-terminal allowed

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

// calculate the LATR parser
m.constructPDA();

// print the LATR parser
m.printBlocks();

// print the connections table
m.printTable();

````

