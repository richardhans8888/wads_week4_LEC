'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function DocsPage() {
  return (
    <main style={{ minHeight: '100dvh', background: '#ffffff', color: '#111827' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SwaggerUI url="/api/openapi" docExpansion="none" />
      </div>
    </main>
  );
}
