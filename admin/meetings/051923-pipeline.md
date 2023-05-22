# Meeting Minutes - CI/CD Pipeline & ADRs

Refer to [Documentation](https://canvas.ucsd.edu/courses/44983/assignments/617836) & [CI/CD Pipeline](https://canvas.ucsd.edu/courses/44983/assignments/617835)

## Date, Time, Location

Monday, May 19th, 2023 from 4:15 pm - 5:00 pm. Hosted on Zoom.

## Attendance
- Andrew Onozuka
- Merrick Qiu
- Abhimanyu Srivastava
- Joseph Del Val
- Vivin Vinil
- Jacob Felts
- Yuantian Zhou

## Agenda

- Discuss how to delegate and begin working on the deliverables due Sunday, May 21st on Canvas

## Overview

- Delegation of tasks and assignment details
1. Test for linting and code style enforcement:
- Ensure that the CI/CD pipeline includes a step that runs a linting tool (e.g., ESLint) to check the code for adherence to coding standards.
- Create a test case that intentionally includes code with style violations and verify that the pipeline fails if the violations are not fixed.
2. Test for code quality via tool (e.g., Codeclimate, Codacy):
- Configure the CI/CD pipeline to integrate with the chosen code quality tool (e.g., Codeclimate).
- Write test cases to analyze code with known issues (e.g., complex code, security vulnerabilities) and confirm that the tool detects these issues and provides appropriate feedback.
3. Test for code quality via human review (e.g., Pull Requests):
- Set up a test scenario with a version control system (e.g., Git) and create a sample pull request with code changes.
- Define test cases to validate that the pull request triggers the necessary code review process and that the feedback is correctly communicated to the developer.
4. Test for unit tests via automation (e.g., Jest, Tape, Ava, Cypress, Mocha/Chai):
- Develop a set of unit tests for a specific module or component of the application.
- Incorporate these tests into the CI/CD pipeline and verify that they are executed automatically during the pipeline’s execution.
- Ensure that the pipeline fails if any of the unit tests fail.
5. Test for documentation generation via automation (e.g., JSDocs):
- Write test cases to validate that the documentation generation step is included in the CI/CD pipeline.
- Create test scenarios where code changes introduce new functions or classes and verify that the documentation is updated accordingly.
- Confirm that the generated documentation is accessible and contains the expected information, such as function signatures, descriptions, and examples.

## Designation & To Do
1. ADR
   - Project file structure
   - UI/UX
   - CRUD and prompt storage
2. CI/CD
   - Linter for camelCase(joseph)
   - set up codeclimate(merrick)
   - evaluate pull requests during meetings(nothing to do)
   - set up jest(andrew)
   - jsdocs(yuantian)
   - diagram phase 1 png, md, video(jacob, vivin)