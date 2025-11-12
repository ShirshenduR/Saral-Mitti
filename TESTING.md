# Testing Guide for Saral Mitti

This document provides comprehensive testing instructions for the Saral Mitti application.

## Prerequisites

- Both backend and frontend servers should be running
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

## Automated Testing

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

## Manual Testing Guide

### 1. User Registration

**Steps:**
1. Navigate to `http://localhost:3000/register`
2. Fill in the registration form:
   - Username: testuser
   - Email: test@example.com
   - Password: securepass123
   - Confirm Password: securepass123
   - First Name: Test
   - Last Name: User
3. Click "Create account"

**Expected Result:**
- User should be automatically logged in
- Redirected to `/dashboard`
- Success message displayed

**API Test:**
```bash
curl -X POST http://localhost:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "password2": "testpass123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### 2. User Login

**Steps:**
1. Navigate to `http://localhost:3000/login`
2. Enter credentials:
   - Username: testuser
   - Password: securepass123
3. Click "Sign in"

**Expected Result:**
- User logged in successfully
- JWT tokens stored in localStorage
- Redirected to `/dashboard`

**API Test:**
```bash
curl -X POST http://localhost:8000/api/users/token/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

### 3. Protected Routes

**Steps:**
1. Logout (if logged in)
2. Try to access `http://localhost:3000/dashboard` directly

**Expected Result:**
- Automatically redirected to `/login`
- Cannot access dashboard without authentication

### 4. Image Upload

**Steps:**
1. Login to the application
2. Navigate to dashboard (`/dashboard`)
3. Drag and drop an image OR click to select an image file
4. Preview should appear
5. Click "Analyze" button

**Expected Result:**
- Loading spinner appears
- Analysis result displayed with:
  - Disease name
  - Confidence score
  - Description
  - Suggested actions

**API Test:**
```bash
# First, get an access token
TOKEN=$(curl -s -X POST http://localhost:8000/api/users/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}' | \
  python3 -c "import sys, json; print(json.load(sys.stdin)['access'])")

# Upload an image
curl -X POST http://localhost:8000/api/analysis/upload/ \
  -H "Authorization: Bearer $TOKEN" \
  -F "image=@path/to/test/image.jpg"
```

### 5. User Profile

**Steps:**
1. Login to the application
2. Navigate to dashboard
3. Check navbar shows username

**Expected Result:**
- Username displayed in navbar
- Logout button visible

**API Test:**
```bash
TOKEN="your_access_token_here"
curl http://localhost:8000/api/users/me/ \
  -H "Authorization: Bearer $TOKEN"
```

### 6. Logout

**Steps:**
1. While logged in, click "Logout" button in navbar

**Expected Result:**
- User logged out
- Redirected to `/login`
- JWT tokens removed from localStorage
- Cannot access protected routes

### 7. Analysis History

**API Test:**
```bash
TOKEN="your_access_token_here"
curl http://localhost:8000/api/analysis/history/ \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Result:**
- Returns list of previous analyses for the user

## Error Handling Tests

### 1. Invalid Registration

Test with:
- Mismatched passwords
- Duplicate email
- Duplicate username
- Weak password

**Expected Result:**
- Appropriate error messages displayed
- No user created

### 2. Invalid Login

Test with:
- Wrong password
- Non-existent username
- Empty fields

**Expected Result:**
- Error message displayed
- No JWT tokens issued

### 3. Invalid Image Upload

Test with:
- Non-image file
- Corrupted image
- Very large file

**Expected Result:**
- Error message displayed
- No analysis created

### 4. Expired Token

**Steps:**
1. Get a token
2. Wait for expiration (or manually expire)
3. Try to access protected endpoint

**Expected Result:**
- 401 Unauthorized response
- Frontend should attempt token refresh

## Security Tests

### 1. CORS Protection

```bash
curl -X POST http://localhost:8000/api/users/register/ \
  -H "Origin: http://malicious-site.com" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

**Expected Result:**
- Request blocked by CORS policy

### 2. Authentication Required

```bash
curl http://localhost:8000/api/users/me/
```

**Expected Result:**
- 401 Unauthorized (no token provided)

### 3. Token Validation

```bash
curl http://localhost:8000/api/users/me/ \
  -H "Authorization: Bearer invalid_token"
```

**Expected Result:**
- 401 Unauthorized (invalid token)

## Performance Tests

### 1. Image Upload Performance

Test with various image sizes:
- Small (< 1MB)
- Medium (1-5MB)
- Large (5-10MB)

Monitor:
- Upload time
- Processing time
- Response time

### 2. Concurrent Users

Simulate multiple users:
- Registering simultaneously
- Uploading images simultaneously
- Accessing dashboard simultaneously

## Browser Compatibility

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mobile Responsiveness

Test on different screen sizes:
- Mobile (320px - 480px)
- Tablet (768px - 1024px)
- Desktop (1024px+)

## Test Results Documentation

Record test results in the following format:

```
Test: [Test Name]
Date: [Date]
Tester: [Name]
Result: [Pass/Fail]
Notes: [Any observations]
```

## Known Issues

Document any known issues here:
- Issue description
- Steps to reproduce
- Workaround (if available)

## Continuous Integration

The application includes GitHub Actions workflows for:
- Running backend tests
- Running frontend tests
- Building Docker containers
- Security scanning

## Reporting Bugs

When reporting bugs, please include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Screenshots (if applicable)
5. Browser/OS information
6. Console errors (if any)
