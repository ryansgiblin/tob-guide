import { useState } from 'react';
import Layout from './components/Layout';
import RoomPage from './components/RoomPage';
import PluginPage from './components/PluginPage';
import { rooms } from './data/rooms';

export default function App() {
  const [current, setCurrent] = useState(rooms[0].id);

  const currentRoom = rooms.find((r) => r.id === current);

  return (
    <Layout current={current} onSelect={setCurrent}>
      {current === 'plugins' ? (
        <div className="flex-1 overflow-y-auto">
          <PluginPage />
        </div>
      ) : currentRoom ? (
        <RoomPage key={currentRoom.id} room={currentRoom} />
      ) : null}
    </Layout>
  );
}
