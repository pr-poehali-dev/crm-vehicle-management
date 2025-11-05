'''
Business: Manage vehicle records with full CRUD operations
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with request_id attribute
Returns: HTTP response with vehicle data or operation result
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
            SELECT id, brand, model, name, category, year, engine_number, 
                   chassis, body_number, color, power, displacement, 
                   engine_type, eco_class, max_weight
            FROM vehicles
            ORDER BY id DESC
        """)
        
        vehicles = []
        for row in cur.fetchall():
            vehicles.append({
                'id': str(row[0]),
                'brand': row[1],
                'model': row[2],
                'name': row[3],
                'category': row[4],
                'year': row[5],
                'engineNumber': row[6],
                'chassis': row[7],
                'bodyNumber': row[8],
                'color': row[9],
                'power': row[10],
                'displacement': row[11],
                'engineType': row[12],
                'ecoClass': row[13],
                'maxWeight': row[14]
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(vehicles),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        cur.execute("""
            INSERT INTO vehicles (brand, model, name, category, year, engine_number,
                                chassis, body_number, color, power, displacement,
                                engine_type, eco_class, max_weight)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            body_data.get('brand'),
            body_data.get('model'),
            body_data.get('name'),
            body_data.get('category'),
            body_data.get('year'),
            body_data.get('engineNumber'),
            body_data.get('chassis'),
            body_data.get('bodyNumber'),
            body_data.get('color'),
            body_data.get('power'),
            body_data.get('displacement'),
            body_data.get('engineType'),
            body_data.get('ecoClass'),
            body_data.get('maxWeight')
        ))
        
        vehicle_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'id': str(vehicle_id), 'message': 'Vehicle created'}),
            'isBase64Encoded': False
        }
    
    if method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        vehicle_id = body_data.get('id')
        
        cur.execute("""
            UPDATE vehicles 
            SET brand = %s, model = %s, name = %s, category = %s, year = %s,
                engine_number = %s, chassis = %s, body_number = %s, color = %s,
                power = %s, displacement = %s, engine_type = %s, eco_class = %s,
                max_weight = %s
            WHERE id = %s
        """, (
            body_data.get('brand'),
            body_data.get('model'),
            body_data.get('name'),
            body_data.get('category'),
            body_data.get('year'),
            body_data.get('engineNumber'),
            body_data.get('chassis'),
            body_data.get('bodyNumber'),
            body_data.get('color'),
            body_data.get('power'),
            body_data.get('displacement'),
            body_data.get('engineType'),
            body_data.get('ecoClass'),
            body_data.get('maxWeight'),
            vehicle_id
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
            'body': json.dumps({'message': 'Vehicle updated'}),
            'isBase64Encoded': False
        }
    
    if method == 'DELETE':
        params = event.get('queryStringParameters', {})
        vehicle_id = params.get('id')
        
        cur.execute("DELETE FROM vehicles WHERE id = %s", (vehicle_id,))
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Vehicle deleted'}),
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
