#!/bin/bash

echo "Setting up AI Assistant Plugin for Trac..."

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Make sure the plugin is executable
chmod +x ai_assistant.py

echo ""
echo "Setup complete!"
echo ""
echo "To enable the AI assistant:"
echo "1. Make sure your .env file contains: OPENAI_API_KEY=sk-..."
echo "2. Restart the Trac server"
echo "3. The AI assistant will now use your OpenAI API key securely from the backend"
echo ""
echo "Note: The plugin will be automatically loaded by Trac from the plugins directory." 