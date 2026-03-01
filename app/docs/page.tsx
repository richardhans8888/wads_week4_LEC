'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function Docs() {
  const [spec, setSpec] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/openapi');
        if (!res.ok) throw new Error(`Failed to load spec: ${res.status}`);
        const json = await res.json();
        if (active) setSpec(json);
      } catch {
        setError('Unable to load API definition');
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#111827', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>API Documentation</h1>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
          <span style={{ display: 'inline-block', backgroundColor: '#10b981', color: '#ffffff', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>GET</span>
          <span style={{ display: 'inline-block', backgroundColor: '#3b82f6', color: '#ffffff', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>POST</span>
          <span style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#111827', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>PUT</span>
          <span style={{ display: 'inline-block', backgroundColor: '#ef4444', color: '#ffffff', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>DELETE</span>
        </div>

        <h2 style={{ marginBottom: '12px' }}>API Endpoints Summary</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #d1d5db' }}>Method</th>
              <th style={{ padding: '10px', border: '1px solid #d1d5db' }}>Path</th>
              <th style={{ padding: '10px', border: '1px solid #d1d5db' }}>Description</th>
              <th style={{ padding: '10px', border: '1px solid #d1d5db' }}>Success Code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>
                <span style={{ display: 'inline-block', backgroundColor: '#10b981', color: '#ffffff', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>GET</span>
              </td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>/api/users</td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>Retrieve all users (list)</td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>200</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>
                <span style={{ display: 'inline-block', backgroundColor: '#3b82f6', color: '#ffffff', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>POST</span>
              </td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>/api/users</td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>Create a new user</td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>201</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>
                <span style={{ display: 'inline-block', backgroundColor: '#10b981', color: '#ffffff', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>GET</span>
              </td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>/api/users/{'{'}id{'}'}</td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>Retrieve a user by ID</td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>200</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>
                <span style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#111827', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>PUT</span>
              </td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>/api/users/{'{'}id{'}'}</td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>Update a user by ID</td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>200</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>
                <span style={{ display: 'inline-block', backgroundColor: '#ef4444', color: '#ffffff', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>DELETE</span>
              </td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>/api/users/{'{'}id{'}'}</td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>Delete a user by ID</td>
              <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>200</td>
            </tr>
          </tbody>
        </table>

        <h2 style={{ marginBottom: '12px' }}>Interactive API Explorer</h2>
        {spec ? (
          <SwaggerUI
            spec={spec}
            docExpansion="list"
            deepLinking
            displayOperationId
            defaultModelsExpandDepth={0}
            defaultModelExpandDepth={1}
            operationsSorter="method"
            tagsSorter="alpha"
            supportedSubmitMethods={['get', 'post', 'put', 'delete']}
          />
        ) : (
          <div style={{ padding: 12, border: '1px dashed #d1d5db', color: '#6b7280' }}>
            {error ?? 'Loading API definition...'}
          </div>
        )}
      </div>
    </main>
  );
}
