import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

function shapeRoom(room) {
  const setup = room.room_setup?.[0] ?? {};
  const roles = (room.roles ?? [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((role) => ({
      id: role.id,
      name: role.name,
      summary: role.summary,
      procedure: (role.steps ?? [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((s, i) => ({
          id: s.id,
          step: i + 1,
          sort_order: s.sort_order,
          text: s.text,
          tip: s.tip || '',
          video: s.video ?? null,
          image: s.image ?? null,
        })),
      videos: [],
    }));

  return {
    id: room.id,
    name: room.name,
    shortName: room.short_name,
    color: room.color,
    overview: room.overview,
    setup: {
      notes: setup.notes ?? '',
      image: setup.image ?? null,
      gear: setup.gear ?? [],
      inventory: setup.inventory ?? [],
      stats: setup.stats ?? [],
    },
    roles,
  };
}

export function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('rooms')
      .select('*, room_setup(*), roles(*, steps(*))')
      .order('sort_order');

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setRooms(data.map(shapeRoom));
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { rooms, loading, error, refetch: fetch };
}
