# Contributing to Saral Mitti

Thank you for your interest in contributing to Saral Mitti! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/Saral-Mitti.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m "Add your meaningful commit message"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Code Style Guidelines

### Python (Backend)
- Follow PEP 8 style guide
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Keep functions small and focused
- Write tests for new features

### TypeScript/React (Frontend)
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety
- Keep components small and reusable
- Use meaningful component and variable names

## Commit Message Guidelines

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update documentation for any new features
3. Ensure all tests pass
4. Request review from maintainers
5. Address any feedback from reviewers

## Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## ML Model Integration

When contributing ML model improvements:

1. Document model architecture and requirements
2. Provide model performance metrics
3. Include preprocessing requirements
4. Update the ml_model.py file with proper error handling
5. Add sample test images if possible

## Areas for Contribution

- Bug fixes
- Feature enhancements
- Documentation improvements
- Test coverage improvements
- UI/UX improvements
- ML model improvements
- Performance optimizations

## Questions?

Feel free to open an issue for any questions or concerns about contributing.

Thank you for contributing to Saral Mitti!
