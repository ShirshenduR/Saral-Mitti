#!/bin/bash

# Saral Mitti Installation Verification Script

echo "================================================"
echo "  Saral Mitti Installation Verification"
echo "================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check function
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1"
        return 1
    fi
}

echo "Checking Prerequisites..."
echo "------------------------"

# Check Python
python3 --version > /dev/null 2>&1
check "Python 3 installed"

# Check pip
pip3 --version > /dev/null 2>&1
check "pip3 installed"

# Check Node.js
node --version > /dev/null 2>&1
check "Node.js installed"

# Check npm
npm --version > /dev/null 2>&1
check "npm installed"

echo ""
echo "Checking Backend Setup..."
echo "------------------------"

# Check if backend directory exists
if [ -d "backend" ]; then
    echo -e "${GREEN}✓${NC} Backend directory exists"
    
    # Check if virtual environment exists
    if [ -d "backend/venv" ]; then
        echo -e "${GREEN}✓${NC} Virtual environment exists"
    else
        echo -e "${YELLOW}!${NC} Virtual environment not found (will be created on first run)"
    fi
    
    # Check if requirements.txt exists
    if [ -f "backend/requirements.txt" ]; then
        echo -e "${GREEN}✓${NC} requirements.txt exists"
    else
        echo -e "${RED}✗${NC} requirements.txt missing"
    fi
    
    # Check if migrations exist
    if [ -d "backend/analysis/migrations" ]; then
        echo -e "${GREEN}✓${NC} Migrations directory exists"
    else
        echo -e "${YELLOW}!${NC} Migrations not found"
    fi
    
    # Check if Django project files exist
    if [ -f "backend/manage.py" ]; then
        echo -e "${GREEN}✓${NC} Django manage.py exists"
    else
        echo -e "${RED}✗${NC} Django manage.py missing"
    fi
else
    echo -e "${RED}✗${NC} Backend directory missing"
fi

echo ""
echo "Checking Frontend Setup..."
echo "------------------------"

# Check if frontend directory exists
if [ -d "frontend" ]; then
    echo -e "${GREEN}✓${NC} Frontend directory exists"
    
    # Check if node_modules exists
    if [ -d "frontend/node_modules" ]; then
        echo -e "${GREEN}✓${NC} node_modules installed"
    else
        echo -e "${YELLOW}!${NC} node_modules not found (will be installed on first run)"
    fi
    
    # Check if package.json exists
    if [ -f "frontend/package.json" ]; then
        echo -e "${GREEN}✓${NC} package.json exists"
    else
        echo -e "${RED}✗${NC} package.json missing"
    fi
    
    # Check if Next.js config exists
    if [ -f "frontend/next.config.ts" ]; then
        echo -e "${GREEN}✓${NC} next.config.ts exists"
    else
        echo -e "${RED}✗${NC} next.config.ts missing"
    fi
else
    echo -e "${RED}✗${NC} Frontend directory missing"
fi

echo ""
echo "Checking Documentation..."
echo "------------------------"

# Check documentation files
if [ -f "README.md" ] || [ -f "Readme.md" ]; then
    echo -e "${GREEN}✓${NC} README.md exists"
else
    echo -e "${RED}✗${NC} README.md missing"
fi

if [ -f "CONTRIBUTING.md" ]; then
    echo -e "${GREEN}✓${NC} CONTRIBUTING.md exists"
else
    echo -e "${YELLOW}!${NC} CONTRIBUTING.md missing"
fi

if [ -f "TESTING.md" ]; then
    echo -e "${GREEN}✓${NC} TESTING.md exists"
else
    echo -e "${YELLOW}!${NC} TESTING.md missing"
fi

echo ""
echo "Checking Docker Setup..."
echo "------------------------"

if [ -f "docker-compose.yml" ]; then
    echo -e "${GREEN}✓${NC} docker-compose.yml exists"
else
    echo -e "${YELLOW}!${NC} docker-compose.yml missing"
fi

if [ -f "backend/Dockerfile" ]; then
    echo -e "${GREEN}✓${NC} Backend Dockerfile exists"
else
    echo -e "${YELLOW}!${NC} Backend Dockerfile missing"
fi

if [ -f "frontend/Dockerfile" ]; then
    echo -e "${GREEN}✓${NC} Frontend Dockerfile exists"
else
    echo -e "${YELLOW}!${NC} Frontend Dockerfile missing"
fi

echo ""
echo "================================================"
echo "  Verification Complete"
echo "================================================"
echo ""
echo "Next Steps:"
echo "1. Backend: cd backend && ./start.sh"
echo "2. Frontend: cd frontend && ./start.sh"
echo "3. Or use Docker: docker-compose up"
echo ""
echo "Visit http://localhost:3000 to access the application"
echo ""
