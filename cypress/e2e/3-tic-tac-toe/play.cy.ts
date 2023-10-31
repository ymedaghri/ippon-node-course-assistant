/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

export const dataSelector = (selector: string) =>
  `[data-selector="${selector}"]`

const stubPostNewGame = () =>
  cy.intercept("http://localhost:3000/new-game", {
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  })

const stubGetComputerMark = (board) =>
  cy.intercept("http://localhost:3000/get-computer-mark", { board })

const stubPutMarkPlayer = (cellNumber, board) =>
  cy.intercept("http://localhost:3000/mark-player/" + cellNumber, { board })

describe("example to-do app", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    //cy.visit('/exerices/tic-tac-toe')
  })

  it("Should not show book with invalid ISBN", () => {
    stubPostNewGame().as("newGameRequest")
    cy.visit("/exercices/tic-tac-toe")
    cy.get(dataSelector("new-game-button")).click()
    cy.wait("@newGameRequest")

    stubPutMarkPlayer(4, [0, 0, 0, 0, 1, 0, 0, 0, 0]).as("markPlayerRow1Col1")
    stubGetComputerMark([2, 0, 0, 0, 1, 0, 0, 0, 0]).as("getComputerMark1")
    cy.get(dataSelector("board.row(1).col(1)")).click()
    cy.wait("@markPlayerRow1Col1")
    cy.wait("@getComputerMark1")

    stubPutMarkPlayer(2, [2, 0, 1, 0, 1, 0, 0, 0, 0]).as("markPlayerRow0Col2")
    stubGetComputerMark([2, 0, 1, 0, 1, 0, 2, 0, 0]).as("getComputerMark2")
    cy.get(dataSelector("board.row(0).col(2)")).click()
    cy.wait("@markPlayerRow0Col2")
    cy.wait("@getComputerMark2")

    stubPutMarkPlayer(8, [2, 0, 1, 0, 1, 0, 2, 0, 1]).as("markPlayerRow2Col2")
    stubGetComputerMark([2, 0, 1, 2, 1, 0, 2, 0, 1]).as("getComputerMark3")
    cy.get(dataSelector("board.row(2).col(2)")).click()
    cy.wait("@markPlayerRow2Col2")
    cy.wait("@getComputerMark3")

    cy.get(dataSelector("text.winner")).should(
      "contain.text",
      "Computer has won",
    )
    cy.get(dataSelector("board.row(0).col(0)")).should(
      "have.class",
      "bg-orange-400",
    )
    cy.get(dataSelector("board.row(1).col(0)")).should(
      "have.class",
      "bg-orange-400",
    )
    cy.get(dataSelector("board.row(2).col(0)")).should(
      "have.class",
      "bg-orange-400",
    )
  })
})
