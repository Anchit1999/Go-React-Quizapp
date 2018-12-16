# Web based quiz game based on two frameworks - Go and React

*Coded by:* **Anchit Gupta**

This is a Go server that implements REST API and interacts with the database at the backend. The front end is a React application that is an interactive quiz. This was SSAD Assignment 2.

## Functionality

1. Admin privileges to one user along with admin panel
    Admin can:
    - View/Create/Delete quizzes
    - Create/Delete/Edit questions/options in each quiz
    - View all users
    - Delete users
2. Registration and login for users
3. Multiple genre of quizzes
4. Each user can attempt a quiz once(so attempt carefully)
5. At least two different types of questions
6. Global Leaderboard across genre
7. Powerups(used once per quiz):
    -Reveal the number of correct options.
    -Reveal the complete ans.

## Packages used for go

> - fmt
> - github.com/gin-contrib/cors
> - github.com/gin-gonic/gin
> - github.com/jinzhu/gorm
> - github.com/jinzhu/gorm/dialects/sqlite

## Getting Started

Directory/:

    --go/
    ---react-app/
    ---README.md

In one terminal:

    cd ./go/src
    go run ReactGoQuiz.go

In another terminal:

    cd ./react-app
    yarn start