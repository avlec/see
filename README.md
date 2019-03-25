# Simple Examination Enviroment - SEE

SEE is a web based examination tool to take a provided set of Python scripts and
review them for linting, formatting, inconsistencies, security vulnerabilties,
and other tests. Changes are suggested and recommended to have the code better
follow known best practices.

SEE attempts to teach users how to write better, more maintainable code, and
leave them with skills they can use in all of their projects.

## Features

  - Automatic code linting and formatting.
  - Execution environment detection.
  - Library use detection.
  - Codebase security audits.
  - Determining Python version automatically.
  - Determining how technologically literate the users are.
  - File/database caching optimizations, speed hacks.
  - Recomendations for improvements and optimizations to the codebase.

## Project management

This section provides progress reports on the project by discussing each
interation of the application.

## Iteration 1

The first iteration requires UI, Business Logic, Data Access interactions to
have been established and discussed.

### UI

Our server deploys a single page application (SPA) written with the React
framework to a browser. Our interface consists of 4 main components:

  - Ace text editor (https://github.com/securingsincity/react-ace)
  - Drag and drop file upload
  - Side panel
    - Directory tree of uploaded files
  - Bottom panel
    - List of recommendations and issues reported in the uploaded codebase

Here is a mockup of the proposed UI:

![UI](docs/SEE-Rough-UI.png?raw=true "SEE code insertions example")

The client is entirely self supporting and does not need to be contiuously
rerendered by the server. After initialization, client and server only talk over
JSON messages and `x-url-encoded multipart` form data for file upload.

We intend on supporting only Python for syntax highlighting (possibly via
highlight.js) and linting of the code. The syntax highlighting is purely
aesthetic and handled in browser.

### Business Logic

Our server is a Node + Express (framework) application that hosts a REST API to
support sessions, file upload, and running some or all "filters" on some or all
of the uploaded files.

Our program passes the uploaded files, from the UI, through a series of filters.
A "filter" is a linters, code checkers, or conditional expression to check for
such as line length or character encoding. These may be implemented in any
language, as Node is able to spawn children for other executables as needed and
read from their stdout.

There's some nice Python linters and security audit testers available. So we'll
be using Pylama. GitLab has a well established CI/CD tool for Python, so we'll
be looking at how they do things and working from there.

### Data Access

We store files server side for the duration of the session, which can be
terminated by the user directly or expires after 10 minutes of inactivity from a
client.

Sessions are started once a user uploads a file. Requests to run a file through
a filter does not reupload any content - which is the need for a session to
provide state between the client and server to reference the same files.

If a user leaves their client idle and lets the server side files be purged due
to expiration, the session may still be revived. When they return and try
linting a file, the server asks the client to resend the files and try again.
This happens without user involvement.

A similar process occurs for changes to files; the content must be resent.

The server uses third party linting and code analysis tools which may reach out
to internet services for further processing. **See risk analysis for details.**

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

---

## Iteration 2

### Risk analysis

- Data retention policies are not strict. Currently no plans to establish a
  quota or maximum request policy either.

- Cannot guarantee perfect code sandboxing or sanitization which can be a risk
  to our server since third party linters or auditing tools may run the user
  uploaded code, producing a remote code execution vulnerability.

- Cannot provide any guarantees that our program is operation correctly on the
  content due to the dependencies of third party programs.

- Our program may not be applicable to some researchers who are restricted by
  privacy or data protection laws that restrict the distribution of their work.
  This is in part because or server may be hosted via a cloud provider such as
  Heroku and be subject to their data privacy laws or the country which the
  infrastructure resides. Furthermore, our server relies on third party tools
  which may operate by uploading the content to yet another service or cloud
  platform.

  These concerns must be displayed to the user at start up with a request for
  their understanding and consent to continue.

### More ideas 

- Should mention somewhere in application that we are no liable for any damages
  caused by the program that is linted through out system

---

## Iteration 3

### UML Diagrams

- Created Context level and Data Flow level 1 diagrams
Live versions: 
https://drive.google.com/file/d/1B-CMzSXRfYptWzY1d_dPxAJR8aMtiR5r/view?usp=sharing
https://drive.google.com/file/d/1m72DH4H_mo4rEBOsiaDgeiwHcV9pyOK2/view?usp=sharing

### Progress on 3 tier Architecture



---

## Iteration 4

### Issue Log

1. Issue 1
- Date
- Issue
- Resolution
2. Issue 2
- Date
- Issue
- Resolution

### Further Risk Analysis



### Meeting Minutes

1. Final Weeks Meeting 1 (Date, Agenda, Highlight)
- Discussion points [Action points]

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

- Yvonne's enthusiasm for keeping us engaged

- Bing Gao's help on Compute Canada's code and creating Docker containers

- Will from Urthecast for providing a better understanding earth observational
  data and the applications of this project
