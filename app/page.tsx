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

  return (
    <div style={{ padding: 20 }}>
      <h1>Sensor Alerts</h1>

      {alerts.map((alert) => (
        <div key={alert.id}>
          <p>{alert.message}</p>
          <small>{alert.created_at}</small>
          <hr />
        </div>
      ))}
    </div>
  );
}