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

  const currentAlert = alerts[0];
  const isOverflow = currentAlert?.message?.toLowerCase().includes('overflow');
  const hasAlert = Boolean(currentAlert);
  const statusLabel = isOverflow ? 'Overflow' : 'Normal';
  const statusMessage = currentAlert?.message ?? 'Waiting for the next status update';
  const panelColor = isOverflow ? '#ff6b6b' : '#2ecc71';
  const panelTint = isOverflow ? 'rgba(255, 107, 107, 0.14)' : 'rgba(46, 204, 113, 0.14)';
  const lastUpdated = hasAlert
    ? new Date(currentAlert.created_at).toLocaleString('en-EG', {
        timeZone: 'Africa/Cairo'
      })
    : 'Waiting for updates';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top, rgba(255,255,255,0.14), transparent 35%), linear-gradient(135deg, #0f172a 0%, #111827 55%, #1e293b 100%)',
      padding: '28px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '980px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '20px',
          marginBottom: '22px',
          color: 'white',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{
              display: 'inline-block',
              padding: '7px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.16)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}>
              Live dashboard
            </div>
            <h1 style={{
              margin: 0,
              fontSize: '42px',
              lineHeight: 1.05,
              fontWeight: 800
            }}>
              Sensor Alerts
            </h1>
            <p style={{
              margin: '10px 0 0 0',
              color: 'rgba(255,255,255,0.72)',
              fontSize: '15px'
            }}>
              Single live manhole status, refreshed every 3 seconds.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(140px, 1fr))',
            gap: '12px'
          }}>
            <div style={{
              minWidth: '160px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: '18px',
              padding: '16px 18px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.72)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Live State
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 700,
                color: panelColor
              }}>
                {statusLabel}
              </div>
            </div>
            <div style={{
              minWidth: '160px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: '18px',
              padding: '16px 18px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.72)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Updated At
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                lineHeight: 1.4
              }}>
                {lastUpdated}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04)), ${panelTint}`,
          border: `1px solid ${panelColor}`,
          borderRadius: '32px',
          padding: '34px 32px',
          boxShadow: '0 28px 90px rgba(0, 0, 0, 0.34)',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at top, ${panelColor}22, transparent 42%)`,
            pointerEvents: 'none'
          }} />
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '999px',
            backgroundColor: panelColor,
            color: 'white',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            Manhole Status
          </div>

          <div style={{
            fontSize: '56px',
            fontWeight: '800',
            lineHeight: 1,
            color: panelColor,
            marginBottom: '10px',
            position: 'relative'
          }}>
            {statusLabel}
          </div>

          <p style={{
            margin: '0 auto',
            maxWidth: '480px',
            fontSize: '18px',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.92)',
            position: 'relative'
          }}>
            {statusMessage}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '28px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.14)',
              borderRadius: '999px',
              padding: '10px 16px',
              fontSize: '13px',
              color: 'white',
              position: 'relative'
            }}>
              {lastUpdated}
            </div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.14)',
              borderRadius: '999px',
              padding: '10px 16px',
              fontSize: '13px',
              color: 'white',
              position: 'relative'
            }}>
              {hasAlert ? `ID: ${currentAlert.id}` : 'No active alert'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}