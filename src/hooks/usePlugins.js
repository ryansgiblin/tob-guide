import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function usePlugins() {
  const [plugins, setPlugins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('plugins')
        .select('*')
        .order('sort_order');

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setPlugins(
        data.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          description: p.description,
          hubLink: p.hub_link,
          tags: p.tags ?? [],
          builtin: p.builtin ?? false,
          images: p.images ?? [],
          npcIds: p.npc_ids ?? null,
        }))
      );
      setLoading(false);
    }
    fetch();
  }, []);

  return { plugins, loading, error };
}
