
#!/bin/bash

# 🚀 Скрипт для автоматической синхронизации с GitHub
# Используется для проекта SSV Nauka

echo "=========================================="
echo "🚀 GitHub Sync Script for SSV Nauka"
echo "=========================================="
echo ""

# Переход в директорию проекта
cd /home/ubuntu/ssvnauka

# Проверка статуса
echo "📊 Checking current status..."
git status

echo ""
echo "=========================================="
read -p "Continue with sync? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    # Добавление всех изменений
    echo "📦 Adding all changes..."
    git add -A
    
    # Запрос описания коммита
    echo ""
    read -p "Enter commit message: " commit_message
    
    # Если описание не указано, используем дефолтное
    if [ -z "$commit_message" ]; then
        commit_message="Update from $(date +%Y-%m-%d)"
    fi
    
    # Создание коммита
    echo ""
    echo "💾 Creating commit..."
    git commit -m "$commit_message"
    
    # Push в GitHub
    echo ""
    echo "🚀 Pushing to GitHub..."
    git push origin main
    
    # Проверка результата
    if [ $? -eq 0 ]; then
        echo ""
        echo "=========================================="
        echo "✅ Successfully synced with GitHub!"
        echo "=========================================="
        echo ""
        echo "📊 Latest commits:"
        git log -3 --oneline
    else
        echo ""
        echo "=========================================="
        echo "❌ Failed to push to GitHub"
        echo "=========================================="
        echo ""
        echo "Please check your connection and credentials."
    fi
else
    echo ""
    echo "❌ Sync cancelled."
fi

echo ""
echo "Done!"
