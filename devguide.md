# Developers guide

Let's define basic features regarding the project...

### Our environment.

We use build system based on Node.js  6.x version, gulp as task runner and some other npm modules.

### Install project.

  We are using git as version control. We are using GitHub as git host-server. So the first thing that you should do -
get permission for the project repository. Write me (laplandin.denis@gmail.com) a couple of lines.
  After you have access to the repo, do following steps:

1. Open your project folder [/Users/you/projects/fisht-travel]
2. Open terminal in this folder.
3. `git init`
4. `git remote add origin https://github.com/laplandin/fisht-travel.git`
5. `git pull origin master`
6. `npm install`

Congrats! You have code of project.

### Working process

We are going to use git branches for each personal task. For successful objective resolution you have to do following steps:

1. `git checkout -b <nameOfBranch>`
    where nameOfBranch = workField#target-taskAlias, example: Task name is "Authentication",
                                                  so I write: `git checkout -b MARKUP#TOURS_REVIEWS`
                                                  or `git checkout -b JS#INDEX_NAV-DROPDOWNS`
                                            
    Let's divide our tasks for next areas: MARKUP, JS, FIX, FEATURE
2. Code your cool features
3. Push changes on remote server

    `git push origin <nameOfBranch>`

4. Go to GitHub and create new pull request. Setup project-lead as reviewer
5. Wait when I review your code.

Last two steps for cases, when you not have permission for directly merge your code into repository.
