import { getUserInfo } from '@/services/userInfo';
import { createContainer } from 'unstated-next';
import useQuery from '@/utils/hooks/useQuery';

export function useData() {
  const { data: user, query, loading } = useQuery({}, {}, getUserInfo);

  return { user, query, loading };
}

export default createContainer(useData);
