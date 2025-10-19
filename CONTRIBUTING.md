# Contributing to 3D Tic-Tac-Toe

First off, thank you for considering contributing to 3D Tic-Tac-Toe! It's people like you that make this project such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. By participating, you are expected to uphold this standard.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript and React styleguides
* Include screenshots and animated GIFs in your pull request whenever possible
* End all files with a newline
* Avoid platform-dependent code

## Development Process

1. Fork the repo and create your branch from `main`
2. Install dependencies: `npm install`
3. Make your changes
4. Test your changes: `npm run dev`
5. Ensure the build works: `npm run build`
6. Lint your code: `npm run lint`
7. Commit your changes using a descriptive commit message
8. Push to your fork and submit a pull request

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

* Use TypeScript for all new code
* Prefer `const` over `let`, avoid `var`
* Use meaningful variable names
* Add types for function parameters and return values
* Use interfaces for object shapes

### React Styleguide

* Use functional components with hooks
* Keep components small and focused
* Use meaningful component and prop names
* Extract reusable logic into custom hooks
* Follow the existing component structure

## Project Structure

```
src/
├── components/     # React components
│   ├── ui/        # shadcn/ui components
│   └── ...        # Game-specific components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
└── ...
```

## Testing Guidelines

Currently, the project doesn't have automated tests, but when adding new features:

1. Manually test all functionality
2. Test on different browsers (Chrome, Firefox, Safari)
3. Test on different screen sizes
4. Ensure 3D graphics render correctly
5. Check for console errors

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉
