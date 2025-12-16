@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    文章同步脚本快捷方式
echo    JWT Secret: %jwtSecret:~0,10%***%jwtSecret:~-3%
echo ========================================
echo.

:: 获取JWT Secret
echo 请输入JWT Secret (留空使用默认值):
set /p jwtSecret=
if "%jwtSecret%"=="" (
    set JWT_SECRET=
    echo 将使用默认JWT Secret
) else (
    set JWT_SECRET=%jwtSecret%
    echo 将使用指定的JWT Secret
)
echo.

echo 请选择操作：
echo 1. 同步所有文章
echo 2. 调试模式（不实际上传）
echo 3. 详细模式同步
echo 4. 调试+详细模式
echo 5. 同步指定ID的文章
echo 6. 显示帮助
echo 0. 退出
echo.
set /p choice=请输入选项 (0-6): 

if "%choice%"=="1" (
    echo 正在同步所有文章...
    if "%jwtSecret%"=="" (
        node scripts/sync.js
    ) else (
        set JWT_SECRET=%jwtSecret% && node scripts/sync.js
    )
    git add src/content/blog/*
    git commit -m "update blog"
    git push
) else if "%choice%"=="2" (
    echo 调试模式：预览要上传的数据
    if "%jwtSecret%"=="" (
        node scripts/sync.js --dry-run
    ) else (
        set JWT_SECRET=%jwtSecret% && node scripts/sync.js --dry-run
    )
) else if "%choice%"=="3" (
    echo 详细模式同步所有文章...
    if "%jwtSecret%"=="" (
        node scripts/sync.js --verbose
    ) else (
        set JWT_SECRET=%jwtSecret% && node scripts/sync.js --verbose
    )
    git add src/content/blog/*
    git commit -m "update blog"
    git push
) else if "%choice%"=="4" (
    echo 调试+详细模式：预览详细数据
    if "%jwtSecret%"=="" (
        node scripts/sync.js --dry-run --verbose
    ) else (
        set JWT_SECRET=%jwtSecret% && node scripts/sync.js --dry-run --verbose
    )
    git add src/content/blog/*
    git commit -m "update blog"
    git push
) else if "%choice%"=="5" (
    set /p articleId=请输入文章ID: 
    echo 正在同步ID为 %articleId% 的文章...
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
    echo 退出程序
    exit /b 0
) else (
    echo 无效选项，请重新运行
)

echo.
pause