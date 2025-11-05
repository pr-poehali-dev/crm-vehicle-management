'''
Business: Manage employee records with full CRUD operations
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with request_id attribute
Returns: HTTP response with employee data or operation result
'''

import json
import psycopg2
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    if method == 'GET':
        cur.execute("""
            SELECT id, last_name, first_name, middle_name, birth_date, position
            FROM employees
            ORDER BY id DESC
        """)
        
        employees = []
        for row in cur.fetchall():
            employees.append({
                'id': str(row[0]),
                'lastName': row[1],
                'firstName': row[2],
                'middleName': row[3],
                'birthDate': row[4].isoformat() if row[4] else '',
                'position': row[5]
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(employees),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        cur.execute("""
            INSERT INTO employees (last_name, first_name, middle_name, birth_date, position)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
        """, (
            body_data.get('lastName'),
            body_data.get('firstName'),
            body_data.get('middleName'),
            body_data.get('birthDate'),
            body_data.get('position')
        ))
        
        employee_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'id': str(employee_id), 'message': 'Employee created'}),
            'isBase64Encoded': False
        }
    
    if method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        employee_id = body_data.get('id')
        
        cur.execute("""
            UPDATE employees 
            SET last_name = %s, first_name = %s, middle_name = %s, 
                birth_date = %s, position = %s
            WHERE id = %s
        """, (
            body_data.get('lastName'),
            body_data.get('firstName'),
            body_data.get('middleName'),
            body_data.get('birthDate'),
            body_data.get('position'),
            employee_id
        ))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Employee updated'}),
            'isBase64Encoded': False
        }
    
    if method == 'DELETE':
        params = event.get('queryStringParameters', {})
        employee_id = params.get('id')
        
        cur.execute("DELETE FROM employees WHERE id = %s", (employee_id,))
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Employee deleted'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
