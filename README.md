# Simplified Execution Engine

Our system is designed to take a users code base, perform linting, security analysis, and offer change suggestions related to pythons best practices.
Plug and play modules for scanning and other thins.

## Features
   - Automatic code linting and formatting.
   - Execution environment detection.
   - Library use detection.
   - Codebase security audits.
   - Determining python version automatically.
   - Optimization.
   - Determining what level of stupid they are.
   - File/database caching optimizations, speed hacks.
   - Recomendations for improvements to code bases.

# Project Management

## Things done
* Created Repo and established CI tools
* Researched client side frameworks
* Researched server side frameworks
* Created simple blueprints for proposed System
* List of core filters we want included
  * source code length warnings
  * lint warnings (ex: inconsistent styles)
  * inconsistent code language verions (ex: python 2.7 vs 3.x)
  * common sql mistakes
* Reasearched some existing web app solutions
  * pep8online (https://github.com/Bryukh/pep8online)

## Stuff todo
* Research python tools
* React dir tree
* React in browser code editor
* study gitlab CI/CD for python

## More ideas
* Boolean question flowchart tree
  * no requirements.txt or similar -> "Does your project use any dependencies?" If yes, recommend a req.txt...
  * Look for license file -> "Is your project licensed? There's no apparent license file" Then recommends a basic template for the license file
  * Another example: "Looks like you don't have a readme, you should make one and tell people about your project"

#This is the RACI chart for the group.

https://docs.google.com/spreadsheets/d/1-4burQmP3Kx1A23MB8o8pErcu7556QK_79ZMyWVKicE/edit#gid=0

A static copy of which was handed over to the TA and discusses our current framework planning.

We currently have the list of some core filters we want included and are in the process of figuring out the implementation of these filters.

We have some napkin diagrams of our UI already laid out as well.

## Versioning

Version 1.0

## Authors

Juan Comish - V00839267\
Alec Cox -  V00846488\
Michail Roesli - V008953253\
Robbie Tulip - V00846133\
Grant Hames Morgan - V00\
Devlyn Dorfer - V00846516

## Acknowledgments