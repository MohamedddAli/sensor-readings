'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fetchAlerts = async () => {
      const res = await fetch('/api/alerts');
      const data = await res.json();
      setAlerts(data);
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 3000);

    return () => clearInterval(interval);
  }, []);

  // 👇 prevent hydration mismatch
  if (!mounted) return null;

  const hasWarnings = alerts.some(alert => alert.message?.toLowerCase().includes('overflow'));
  const warningCount = alerts.filter(alert => alert.message?.toLowerCase().includes('overflow')).length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '40px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{
              margin: 0,
              color: 'white',
              fontSize: '36px',
              fontWeight: '700'
            }}>
              Sensor Alerts
            </h1>
            <p style={{
              margin: '8px 0 0 0',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px'
            }}>
              Real-time monitoring dashboard
            </p>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '20px 30px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#667eea'
            }}>
              {alerts.length}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginTop: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Total Alerts
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        {hasWarnings && (
          <div style={{
            backgroundColor: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: '8px',
            padding: '16px 20px',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#856404'
          }}>
            <div style={{
              fontSize: '24px'
            }}>
              ⚠️
            </div>
            <div>
              <strong>{warningCount} overflow alert{warningCount !== 1 ? 's' : ''} detected!</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>
                Your system is experiencing overflow conditions. Please review and take action.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Alerts Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {alerts.length === 0 ? (
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            padding: '60px 20px',
            textAlign: 'center',
            color: '#999'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <p style={{ fontSize: '16px', margin: 0 }}>No alerts at the moment</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            {alerts.map((alert) => {
              const isOverflow = alert.message?.toLowerCase().includes('overflow');
              return (
                <div
                  key={alert.id}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    borderLeft: `4px solid ${isOverflow ? '#ff6b6b' : '#667eea'}`,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {isOverflow && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      ⚠️ Warning
                    </div>
                  )}
                  <p style={{
                    margin: '0 0 12px 0',
                    fontSize: '16px',
                    color: '#222',
                    fontWeight: '500',
                    lineHeight: '1.5',
                    paddingRight: isOverflow ? '100px' : '0'
                  }}>
                    {alert.message}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid #eee'
                  }}>
                    <small style={{
                      color: '#999',
                      fontSize: '12px'
                    }}>
                      {new Date(alert.created_at).toLocaleString('en-EG', {
                        timeZone: 'Africa/Cairo'
                      })}
                    </small>
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: isOverflow ? '#ffe0e0' : '#f0f0f0',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: isOverflow ? '#ff6b6b' : '#666'
                    }}>
                      ID: {alert.id}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}