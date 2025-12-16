@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    Article Sync Script
echo    JWT Secret: %jwtSecret:~0,10%***%jwtSecret:~-3%
echo ========================================
echo.

:: Get JWT Secret
echo Please enter JWT Secret (press Enter for default):
set /p jwtSecret=
if "%jwtSecret%"=="" (
    set JWT_SECRET=
    echo Using default JWT Secret
) else (
    set JWT_SECRET=%jwtSecret%
    echo Using specified JWT Secret
)
echo.

echo Please select operation:
echo 1. Sync all articles
echo 2. Debug mode (no actual upload)
echo 3. Verbose sync mode
echo 4. Debug + Verbose mode
echo 5. Sync specific article by ID
echo 6. Show help
echo 0. Exit
echo.
set /p choice=Please enter option (0-6): 

if "%choice%"=="1" (
    echo Syncing all articles...
    if "%jwtSecret%"=="" (
        node scripts/sync.js
    ) else (
        set JWT_SECRET=%jwtSecret% && node scripts/sync.js
    )
    git add src/content/blog/*
    git commit -m "update blog"
    git push
) else if "%choice%"=="2" (
    echo Debug mode: Preview upload data
    if "%jwtSecret%"=="" (
        node scripts/sync.js --dry-run
    ) else (
        set JWT_SECRET=%jwtSecret% && node scripts/sync.js --dry-run
    )
) else if "%choice%"=="3" (
    echo Verbose mode sync all articles...
    if "%jwtSecret%"=="" (
        node scripts/sync.js --verbose
    ) else (
        set JWT_SECRET=%jwtSecret% && node scripts/sync.js --verbose
    )
    git add src/content/blog/*
    git commit -m "update blog"
    git push
) else if "%choice%"=="4" (
    echo Debug + Verbose mode: Preview detailed data
    if "%jwtSecret%"=="" (
        node scripts/sync.js --dry-run --verbose
    ) else (
        set JWT_SECRET=%jwtSecret% && node scripts/sync.js --dry-run --verbose
    )
    git add src/content/blog/*
    git commit -m "update blog"
    git push
) else if "%choice%"=="5" (
    set /p articleId=Please enter article ID: 
    echo Syncing article ID: %articleId%...
    if "%jwtSecret%"=="" (
        node scripts/sync.js --id %articleId%
    ) else (
        set JWT_SECRET=%jwtSecret% && node scripts/sync.js --id %articleId%
    )
    git add src/content/blog/*
    git commit -m "update blog"
    git push
) else if "%choice%"=="6" (
    node scripts/sync.js --help
) else if "%choice%"=="0" (
    echo Exit program
    exit /b 0
) else (
    echo Invalid option, please run again
)

echo.
pause