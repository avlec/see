# Simple Examination Enviroment - SEE

[![Build Status](https://travis-ci.com/avlec/see.svg?branch=master)](https://travis-ci.com/avlec/see)

SEE is a web based examination tool to take a provided set of Python scripts and
review them for linting, formatting, inconsistencies, security vulnerabilities,
and other tests. Changes are suggested and recommended to have the users code
better follow best practices.

SEE aims to teach users how to write better, more maintainable code, and leave
them with skills and knowledge they can use in all of their projects.

## Main Docs
- Project 2 report: https://docs.google.com/document/d/1XhA_KPn3GKSu7tny57W31G8Ta8A22Qz1k-gpiGhnrAw/edit?usp=sharing
- RACI chart: https://docs.google.com/spreadsheets/d/1-4burQmP3Kx1A23MB8o8pErcu7556QK_79ZMyWVKicE/edit#gid=0
- Project 1 reports: 
  - Requirement Document 0.9: https://docs.google.com/document/d/1Sf7q8Tzf6CpHEHi3JstM1KW_I0hiKc2Uu6jrE4R_M4w/edit?usp=sharing
  - Migrating to Cloud Infrastructure report: https://docs.google.com/document/d/1KJNXKzyBaDS05pCXP4heZdGrcRsNgqLx4wf5luWYALc/edit?usp=sharing

*See the docs folder for pdf versions.*

## Features

  - Automatic code linting and formatting.
  - Codebase security audits
  - Warnings for code quality, poor practices, or concerns of security
  - Recommendations for improvements and optimizations to the codebase.

## Project management

This section provides progress reports on the project by discussing each
iteration of the application.

---

## Iteration 1

The first iteration requires UI, Business Logic, Data Access interactions to
have been established and discussed.

### UI

Our server deploys a webpage application written with the React javascript
framework. The React framework allows for us to create a dynamic UI for users
to interact with.

#### UI Components:
These are the main components/features that the UI offers to the user.

  - Ace text editor (https://github.com/securingsincity/react-ace)
  - Drag and drop file upload
  - Side panel
    - Directory tree of uploaded files
  - Bottom panel
    - List of recommendations and issues reported in the uploaded codebase

#### UI Mockup
This is the first medium fidelity mockup of the UI. It is currently a static
image, progress is being made towards a high-fidelity prototype.

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
a filter does not re-upload any content - which is the need for a session to
provide state between the client and server to reference the same files.

If a user leaves their client idle and lets the server side files be purged due
to expiration, the session may still be revived. When they return and try
linting a file, the server asks the client to resend the files and try again.
This happens without user involvement.

A similar process occurs for changes to files; the content must be resent.

The server uses third party linting and code analysis tools which may reach out
to internet services for further processing. **See risk analysis for details.**

---

## Iteration 2

### Risk analysis

- Data retention policies are not strict. Currently no plans to establish a
  quota or maximum request policy either.

- Cannot guarantee perfect code sand-boxing or sanitization which can be a risk
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

More work is being done 

- UI
    - Creating rough ideas for some user interaction dialogue. (future implementation)
    - Creating views that are associated with different use cases.
    - Integrating feedback on original UI prototype.
    - Progress being made towards high-fidelity prototype.

- Logic
    - Not much changed here. Ideas are pretty static as the scope of the project is fairly narrow.
    - Implementing REST server to start testing the filters.
    - Filter development in progress, some filters completed.

- Data
    - Most of the data is user provided, and it's files.

---

## Iteration 4

### Risk Analysis, Issue Log, and Meeting Minutes

See the google docs link below.

https://docs.google.com/document/d/1P4HeTJXzBEi-NksxkVwjAlQW8VX8TsjYdYj5pSJUNx4/edit

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
  - Inconsistent code language versions (ex: Python 2.7 vs 3.x)
  - Common SQL mistakes
- [x] Research existing web application solutions:
  - Similar: `pep8online` https://github.com/Bryukh/pep8online
- [x] Develop a Medium-Fidelity UI
- [x] Research Python tools used in the community
- [x] Explore Python community for tacit knowledge
- [x] Setup React components for:
  - Directory tree
  - Sidebar
  - Modals
  - Ace editor (https://github.com/securingsincity/react-ace)
  - Drag and drop files
- [x] Develop a High-Fidelity UI
- [x] docs folder for pdf versions of all docs.

### In progress

- None

### Future

- [ ] Make a boolean question flowchart tree. Examples:
  - No requirements.txt or similar -> "Does your project use any dependencies?"
    If yes, recommend a req.txt...
  - Look for license file -> "Is your project licensed? There's no apparent
    license file" Then recommends a basic template for the license file
  - Another example: "Looks like you don't have a readme, you should make one
    and tell people about your project"
- [ ] Complex analysis of source files.
  - Ability to determine which dependencies a source file may have.
  - Ability to analyze how the provided source files interact. This would allow
  us to show codebase complexity and help the user remedy this with suggestions
  for how to make it better.
- [ ] Study Gitlab CI/CD for Python
- [ ] Add more filters including:
  - Recognize design patterns and anti-patterns.
  - Execution environment detection.
  - Library use detection.
  - Codebase security audits.
  - Determining Python version automatically.
  - File/database caching optimizations, speed hacks.

---

## Versioning

Version 5.0

## Authors

Juan Comish - V00839267\
Alec Cox - V00846488\
Michail Roesli - V008953253\
Robbie Tulip - V00846133\
Grant Hames Morgan - V00857826\
Devlyn Dorfer - V00846516

## Acknowledgments

* Yvonne's enthusiasm for keeping us engaged
* Bing Gao's help on Compute Canada's code and creating Docker containers
* Will from Urthecast for providing a better understanding earth observational
  data and the applications of this project
