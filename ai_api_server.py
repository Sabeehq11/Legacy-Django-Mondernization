#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/ai/analyze', methods=['POST'])
def analyze():
    """Handle AI analysis requests."""
    try:
        print("\n=== New AI Analysis Request ===")
        data = request.get_json()
        brief_description = data.get('description', '')
        context = data.get('context', {})
        print(f"Description: {brief_description}")
        print(f"Context: {context}")
        
        # Get OpenAI API key from environment
        api_key = os.getenv('OPENAI_API_KEY')
        
        print(f"API Key found: {'Yes' if api_key else 'No'}")
        print(f"API Key length: {len(api_key) if api_key else 0}")
        
        if not api_key:
            print("ERROR: No OpenAI API key found in environment")
            return jsonify({
                'error': 'API key not configured',
                'fallback': True
            }), 500
        
        # Prepare the OpenAI API request
        system_prompt = """You are an expert software debugger and support engineer. When users report issues, provide comprehensive problem-solving analysis in exactly this JSON format:

{
  "solutions": "<h3>🚀 Immediate Solutions to Try:</h3><ol><li><strong>Solution 1</strong><ul><li>Step-by-step instructions</li><li>Why this might work</li></ul></li><li><strong>Solution 2</strong><ul><li>Alternative approach</li></ul></li></ol>",
  "causes": "<h3>🔍 Likely Root Causes:</h3><ol><li><strong>Cause 1</strong> (60% probability)<ul><li>Explanation</li><li>How to verify</li></ul></li><li><strong>Cause 2</strong> (30% probability)<ul><li>Details</li></ul></li></ol>", 
  "diagnostics": "<h3>📊 Diagnostics to Gather:</h3><div style='background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px;'><ul style='list-style: none;'><li>☐ Browser console errors (F12)</li><li>☐ Network logs</li><li>☐ Screenshots</li></ul></div>",
  "ticket": "<h3>📝 Complete Ticket Details:</h3><div style='background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px;'><p><strong>Priority:</strong> High/Medium/Low - Justification</p><p><strong>Summary:</strong> Clear title</p><p><strong>Steps to Reproduce:</strong><br>1. Step one<br>2. Step two</p><p><strong>Investigation Path:</strong><br>1. Check logs<br>2. Verify configuration</p></div>",
  "related": "<h3>🔗 Related Information:</h3><ul><li><strong>Similar Issues:</strong><ul><li>Search for: 'keyword1 keyword2'</li></ul></li><li><strong>Prevention:</strong><ul><li>Best practice 1</li><li>Best practice 2</li></ul></li></ul>"
}

For the solutions section, provide:
- Immediate troubleshooting steps with clear instructions
- Temporary workarounds to unblock the user
- Why each solution might work

For the causes section, provide:
- Technical analysis with probability percentages
- How to verify each potential cause
- Related symptoms to check

For the diagnostics section, provide:
- Checklist of data to gather (console errors, network logs, etc.)
- Specific commands or tools to run
- Screenshots or recordings needed

For the ticket section, provide:
- Priority with justification
- Clear, searchable title
- Detailed reproduction steps
- Environment details
- Investigation paths for developers
- Likely files/functions to check
- Suggested fix approaches

For the related section, provide:
- Search queries to find similar tickets
- Links to related documentation
- Suggestions to prevent recurrence

Be specific about file paths, function names, and technical details. Focus on solving problems, not just documenting them."""

        user_prompt = f"""Issue: {brief_description}
Context: {json.dumps(context)}

Provide comprehensive problem-solving analysis following the 5-section structure."""

        # Make the OpenAI API call
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'gpt-4',
                'messages': [
                    {'role': 'system', 'content': system_prompt},
                    {'role': 'user', 'content': user_prompt}
                ],
                'temperature': 0.7,
                'max_tokens': 2000
            },
            timeout=30
        )
        
        if response.status_code != 200:
            return jsonify({
                'error': f'OpenAI API error: {response.status_code}',
                'fallback': True
            }), 500
        
        # Parse and return the response
        openai_data = response.json()
        print(f"OpenAI response received: {response.status_code}")
        
        try:
            analysis = json.loads(openai_data['choices'][0]['message']['content'])
            print("Successfully parsed OpenAI response")
        except (json.JSONDecodeError, KeyError) as e:
            print(f"Error parsing OpenAI response: {e}")
            print(f"Raw response: {openai_data}")
            raise
        
        return jsonify({
            'success': True,
            'analysis': analysis,
            'usage': openai_data.get('usage', {})
        })
        
    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {str(e)}")
        return jsonify({
            'error': 'Invalid JSON in request or response',
            'fallback': True
        }), 400
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in /ai/analyze endpoint: {str(e)}")
        print(f"Full traceback:\n{error_details}")
        return jsonify({
            'error': 'Internal server error',
            'details': str(e),
            'fallback': True
        }), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    print("Starting AI API Server on port 5001...")
    print("Make sure your .env file contains OPENAI_API_KEY=sk-...")
    app.run(host='0.0.0.0', port=5001, debug=False) 