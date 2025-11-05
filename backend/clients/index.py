'''
Business: Manage client records with full CRUD operations
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with request_id attribute
Returns: HTTP response with client data or operation result
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
            SELECT id, last_name, first_name, middle_name, birth_date,
                   passport_series, passport_number, license_series,
                   license_number, license_date, phone
            FROM clients
            ORDER BY id DESC
        """)
        
        clients = []
        for row in cur.fetchall():
            clients.append({
                'id': str(row[0]),
                'lastName': row[1],
                'firstName': row[2],
                'middleName': row[3],
                'birthDate': row[4].isoformat() if row[4] else '',
                'passportSeries': row[5],
                'passportNumber': row[6],
                'licenseSeries': row[7],
                'licenseNumber': row[8],
                'licenseDate': row[9].isoformat() if row[9] else '',
                'phone': row[10]
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(clients),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        cur.execute("""
            INSERT INTO clients (last_name, first_name, middle_name, birth_date,
                               passport_series, passport_number, license_series,
                               license_number, license_date, phone)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            body_data.get('lastName'),
            body_data.get('firstName'),
            body_data.get('middleName'),
            body_data.get('birthDate'),
            body_data.get('passportSeries'),
            body_data.get('passportNumber'),
            body_data.get('licenseSeries'),
            body_data.get('licenseNumber'),
            body_data.get('licenseDate'),
            body_data.get('phone')
        ))
        
        client_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'id': str(client_id), 'message': 'Client created'}),
            'isBase64Encoded': False
        }
    
    if method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        client_id = body_data.get('id')
        
        cur.execute("""
            UPDATE clients 
            SET last_name = %s, first_name = %s, middle_name = %s, birth_date = %s,
                passport_series = %s, passport_number = %s, license_series = %s,
                license_number = %s, license_date = %s, phone = %s
            WHERE id = %s
        """, (
            body_data.get('lastName'),
            body_data.get('firstName'),
            body_data.get('middleName'),
            body_data.get('birthDate'),
            body_data.get('passportSeries'),
            body_data.get('passportNumber'),
            body_data.get('licenseSeries'),
            body_data.get('licenseNumber'),
            body_data.get('licenseDate'),
            body_data.get('phone'),
            client_id
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
            'body': json.dumps({'message': 'Client updated'}),
            'isBase64Encoded': False
        }
    
    if method == 'DELETE':
        params = event.get('queryStringParameters', {})
        client_id = params.get('id')
        
        cur.execute("DELETE FROM clients WHERE id = %s", (client_id,))
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Client deleted'}),
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
