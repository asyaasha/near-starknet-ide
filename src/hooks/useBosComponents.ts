import { componentsByNetworkId } from '@/data/bos-components';
import { networkId } from '@/utils/config';

export function useBosComponents() {
  const components = componentsByNetworkId[networkId];
  console.log('useBosComponents components');
  console.log(components);

  if (!components) {
    throw new Error(
      `useBosComponents(): unimplemented NetworkId "${networkId}". Add values to "data/bos-components.ts"`,
    );
  }

  return components;
}
