
import { supabase } from '@/lib/supabase';

export const subscribeToProperties = (callback: () => void) => {
  const subscription = supabase
    .channel('table-db-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'properties' }, () => {
      callback();
    })
    .subscribe();

  return subscription;
};

export const unsubscribeFromChannel = (subscription: any) => {
  if (subscription) {
    supabase.removeChannel(subscription);
  }
};
