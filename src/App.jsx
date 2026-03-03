import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import QuadrantPage from './components/QuadrantPage';
import PluginPage from './components/PluginPage';
import RoleSetupsPage from './components/RoleSetupsPage';
import { useRooms } from './hooks/useRooms';
import { usePlugins } from './hooks/usePlugins';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { rooms, loading, error, refetch } = useRooms();
  const { plugins } = usePlugins();
  const { isAdmin, signIn, signOut } = useAuth();
  const [current, setCurrent] = useState(null);
  const [saveStatus, setSaveStatus] = useState('idle');

  useEffect(() => {
    if (rooms.length && !current) setCurrent(rooms[0].id);
  }, [rooms, current]);

  const currentRoom = rooms.find((r) => r.id === current);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-deep)', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-deep)', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
        Failed to load: {error}
      </div>
    );
  }

  return (
    <Layout current={current} onSelect={setCurrent} rooms={rooms}>
      {current === 'setups' ? (
        <RoleSetupsPage />
      ) : current === 'plugins' ? (
        <div className="flex-1 overflow-y-auto">
          <PluginPage plugins={plugins} />
        </div>
      ) : currentRoom ? (
        <QuadrantPage
          key={currentRoom.id}
          room={currentRoom}
          isAdmin={isAdmin}
          signIn={signIn}
          signOut={signOut}
          saveStatus={saveStatus}
          setSaveStatus={setSaveStatus}
          onDataChange={refetch}
        />
      ) : null}
    </Layout>
  );
}
