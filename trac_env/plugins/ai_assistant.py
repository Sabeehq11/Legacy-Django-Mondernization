#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import os
import traceback
from datetime import datetime

import requests
from trac.core import Component, implements
from trac.web import IRequestHandler
from trac.web.chrome import add_script, add_stylesheet

# Load environment variables from .env file
from dotenv import load_dotenv

# Load .env file from project root
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(env_path)


class AIAssistantPlugin(Component):
    """Plugin to handle AI ticket assistant functionality with OpenAI integration."""
    
    implements(IRequestHandler)
    
    # IRequestHandler methods
    def match_request(self, req):
        """Match requests to /ai/analyze endpoint."""
        return req.path_info == '/ai/analyze'
    
    def process_request(self, req):
        """Process AI analysis requests."""
        if req.method != 'POST':
            req.send_response(405)
            req.send_header('Content-Type', 'application/json')
            req.end_headers()
            req.write(json.dumps({'error': 'Method not allowed'}))
            return
        
        try:
            # Parse request body
            data = json.loads(req.read())
            brief_description = data.get('description', '')
            context = data.get('context', {})
            
            # Get OpenAI API key from environment
            api_key = os.getenv('OPENAI_API_KEY')
            
            if not api_key:
                self.log.error('OpenAI API key not found in environment')
                req.send_response(500)
                req.send_header('Content-Type', 'application/json')
                req.end_headers()
                req.write(json.dumps({
                    'error': 'API key not configured',
                    'fallback': True
                }))
                return
            
            # Prepare the OpenAI API request
            system_prompt = """You are an expert software debugger and support engineer. When users report issues, provide comprehensive problem-solving analysis in exactly this JSON format:

{
  "solutions": "HTML content for immediate solutions to try",
  "causes": "HTML content for likely root causes with probabilities", 
  "diagnostics": "HTML content for diagnostic steps and information to gather",
  "ticket": "HTML content for complete ticket structure",
  "related": "HTML content for related issues and prevention"
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
                self.log.error(f'OpenAI API error: {response.status_code} - {response.text}')
                req.send_response(500)
                req.send_header('Content-Type', 'application/json')
                req.end_headers()
                req.write(json.dumps({
                    'error': f'OpenAI API error: {response.status_code}',
                    'fallback': True
                }))
                return
            
            # Parse and return the response
            openai_data = response.json()
            analysis = json.loads(openai_data['choices'][0]['message']['content'])
            
            # Log successful API call
            self.log.info(f'AI analysis completed successfully for: {brief_description[:50]}...')
            
            req.send_response(200)
            req.send_header('Content-Type', 'application/json')
            req.end_headers()
            req.write(json.dumps({
                'success': True,
                'analysis': analysis,
                'usage': openai_data.get('usage', {})
            }))
            
        except json.JSONDecodeError as e:
            self.log.error(f'JSON decode error: {str(e)}')
            req.send_response(400)
            req.send_header('Content-Type', 'application/json')
            req.end_headers()
            req.write(json.dumps({
                'error': 'Invalid JSON in request',
                'fallback': True
            }))
        except Exception as e:
            self.log.error(f'AI assistant error: {str(e)}\n{traceback.format_exc()}')
            req.send_response(500)
            req.send_header('Content-Type', 'application/json')
            req.end_headers()
            req.write(json.dumps({
                'error': 'Internal server error',
                'fallback': True
            })) 