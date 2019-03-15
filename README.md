# Simplified Execution Engine

SEE bids farewell to the dark ages of downloading and unzipping datasets.
Instead of bringing the large amounts of data to the execution environment, SEE
brings your code into the cloud where the data already exists. This will grant
faster data access, scalability with computation on the data, and providing
features most wouldn’t dare to implement to run their code.

SEE is also designed to take a users code base, perform linting, security
analysis, and offer change suggestions related to pythons best practices. Plug
and play modules for scanning and other things.

## Features
   - Automatic code linting and formatting.
   - Execution environment detection.
   - Library use detection.
   - Codebase security audits.
   - Determining python version automatically.
   - Optimization.
   - Determining how computationally intelligent the user is.
   - File/database caching optimizations, speed hacks.
   - Recomendations for improvements to code bases.

## Project management

In this section we will provide progress reports on the project through
iterations discussing interations, logic and analysis for different parts of the
system.

## Iteration 1

The first iteration requires UI, Data Access, and Business Logic interactions
and logic.

### UI
Some of the main UI interfaces that will be included in our project
- Plug and play module
    - input code to be linted 

### Data Access


### Business Logic
- filtering and linting 

---

## Task list

The project task list is also documented in our RACI chart.

### Complete

- [x] Create repository and setup CI tools
- [x] Research client side frameworks
- [x] Research server side frameworks
- [x] Create simple blueprints for proposed system
- [x] Create list of core filters to include:
  - Source code length warnings
  - Lint warnings (ex: inconsistent styles)
  - Inconsistent code language verions (ex: Python 2.7 vs 3.x)
  - Common SQL mistakes
- [x] Research existing web application solutions:
  - Similar: `pep8online` https://github.com/Bryukh/pep8online

### In progress

- [ ] Research Python tools used in the community
- [ ] Explore Python community for tacit knowledge
- [ ] Study Gitlab CI/CD for Python
- [ ] Setup React components for:
  - Directory tree
  - Sidebar
  - Modals
  - Ace editor (https://github.com/securingsincity/react-ace)
  - Drag and drop files

<<<<<<< HEAD
=======
---

## Task list

The project task list is also documented in our RACI chart.

### Complete

- [x] Create repository and setup CI tools
- [x] Research client side frameworks
- [x] Research server side frameworks
- [x] Create simple blueprints for proposed system
- [x] Create list of core filters to include:
  - Source code length warnings
  - Lint warnings (ex: inconsistent styles)
  - Inconsistent code language verions (ex: Python 2.7 vs 3.x)
  - Common SQL mistakes
- [x] Research existing web application solutions:
  - Similar: `pep8online` https://github.com/Bryukh/pep8online

### In progress

- [ ] Research Python tools used in the community
- [ ] Explore Python community for tacit knowledge
- [ ] Study Gitlab CI/CD for Python
- [ ] Setup React components for:
  - Directory tree
  - Sidebar
  - Modals
  - Ace editor (https://github.com/securingsincity/react-ace)
  - Drag and drop files

>>>>>>> da0d4950ab30fdc37232a88e5dcd9ae7038cced3
### Future

- [ ] Make a boolean question flowchart tree. Examples:
  - No requirements.txt or similar -> "Does your project use any dependencies?"
    If yes, recommend a req.txt...
  - Look for license file -> "Is your project licensed? There's no apparent
    license file" Then recommends a basic template for the license file
  - Another example: "Looks like you don't have a readme, you should make one
    and tell people about your project"

---

## RACI chart

A static copy of which was handed over to the TA and discusses our current
framework planning.

https://docs.google.com/spreadsheets/d/1-4burQmP3Kx1A23MB8o8pErcu7556QK_79ZMyWVKicE/edit#gid=0

## UI diagram

![UI](docs/SEE-Rough-UI.png?raw=true "SEE code insertions example")

---

## Iteration 2

### Risk analysis

- Data retention policies not established - not part of our project
- Cannot guarantee perfect code sanitization which can be a risk to our system
  since it will remotely run their code - very difficult to be able to perfectly
  link and filter for every single error

### More ideas 

- Should mention somewhere in application that we are no liable for any damages
  caused by the program that is linted through out system

---

## Versioning

Version 2.0

## Authors

Juan Comish - V00839267\
Alec Cox - V00846488\
Michail Roesli - V008953253\
Robbie Tulip - V00846133\
Grant Hames Morgan - V00857826\
Devlyn Dorfer - V00846516

## Acknowledgments

- Yvonne's awesomeness
- Bing Gao's help on Compute Canada's code and creating docker container
  instances
- Will from Urthecast for providing a better understanding earth observational
  data and the applications of this project
- The Canadian Digital Technology Supercluster for providing this project
