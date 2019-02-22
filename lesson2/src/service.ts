import { format, parse } from 'url';
import urljoin from 'url-join';

export const getStep = async () => {
  const root = format({
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    port: 3001,
  });
  const url = urljoin(root, 'counter');
  const response = await fetch(url);
  const { step } = (await response.json()) as { step: number };
  return step;
};
