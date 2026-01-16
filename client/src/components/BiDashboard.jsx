import React from "react";

export default function BiDashboard() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, color: '#2c3e50', fontSize: '28px', fontWeight: '600' }}>📊 Business Intelligence Dashboard</h1>
        <p style={{ margin: '8px 0 0 0', color: '#7f8c8d', fontSize: '14px' }}>E-commerce Analytics & Data Visualization</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #3498db' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d', textTransform: 'uppercase' }}>Total Sales</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '32px', fontWeight: 'bold', color: '#3498db' }}>782,00</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #2ecc71' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d', textTransform: 'uppercase' }}>Total Orders</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '32px', fontWeight: 'bold', color: '#2ecc71' }}>14</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #9b59b6' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d', textTransform: 'uppercase' }}>Total Customers</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '32px', fontWeight: 'bold', color: '#9b59b6' }}>12</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #e74c3c' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d', textTransform: 'uppercase' }}>Total Quantity</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '32px', fontWeight: 'bold', color: '#e74c3c' }}>14</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #f39c12' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d', textTransform: 'uppercase' }}>Categories</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '32px', fontWeight: 'bold', color: '#f39c12' }}>7</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '15px 20px', color: 'white' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>📈 Interactive Analytics Dashboard</h2>
        </div>
        <div style={{ position: 'relative', width: '100%', paddingBottom: '62.25%', height: 0, overflow: 'hidden' }}>
          <iframe 
            title="Bi-Dashboard" 
            src="https://app.powerbi.com/view?r=eyJrIjoiMWZlOTVkNjUtNGY4OC00OGQzLTk3MGMtM2FiNTVmNzZkYzE1IiwidCI6ImI3YmQ0NzE1LTQyMTctNDhjNy05MTllLTJlYTk3ZjU5MmZhNyJ9"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            allowFullScreen={true}
          />
        </div>
      </div>

      <div style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px', marginTop: '20px', borderLeft: '4px solid #2196f3' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#1976d2', fontSize: '16px' }}>ℹ️ Architecture Technique</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#546e7a', fontSize: '14px' }}>
          <li>Processus ETL: Extraction, transformation & chargement des données</li>
          <li>Data Warehouse: Modèle en étoile (1 table de faits + 3+ tables de dimensions)</li>
          <li>Visualisation: Power BI avec mesures DAX & KPIs</li>
          <li>Intégration: Power BI Service (iframe embedded)</li>
          <li>Frontend: React (MERN Stack)</li>
        </ul>
      </div>
    </div>
  );
}