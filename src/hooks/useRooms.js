import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

// Transforms a raw Supabase room row (with nested room_setup, roles, steps)
// into the shape the UI components expect.
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
          step: i + 1,         // display number derived from sorted position
          sort_order: s.sort_order,
          text: s.text,
          tip: s.tip || '',
          video: s.video ?? null,
          image: s.image ?? null, // public URL from step-media storage bucket
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

// Fetches all rooms with their setup, roles, and steps from Supabase.
// Returns { rooms, loading, error, refetch } — refetch is called after edits
// to sync UI with the latest DB state.
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
