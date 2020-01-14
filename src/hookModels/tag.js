import { queryAll } from '@/services/tag';
import { useState } from 'react';
import { createContainer } from 'unstated-next';
import usePage from '@/utils/hooks/usePage';

export function useData() {
  const { list, fetch } = usePage([], {}, queryAll);

  return { list, fetch };
}

export default createContainer(useData);
