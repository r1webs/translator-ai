import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';

interface ReqOptions {
  path: string;
  method: string;
  body?: object;
  headers?: object;
  params?: object;
  queryKey: string[];
  enableFetch?: boolean;
}

/**
 * Creates a custom HTTP request client.
 *
 * @return {Function} The HTTP request client.
 */
const useHttpReqClient = () => {
  /**
   * For example:
   * path: 'main/translate'
   * method: 'GET'
   * body: undefined
   * headers: undefined
   * params: undefined
   * queryKey: ['translate']
   */
  const httpReqClient = useCallback((reqOptions: ReqOptions) => {
    const { path, method, body, headers, params, queryKey, enableFetch } =
      reqOptions;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryFn = useQuery({
      queryKey,
      enabled: enableFetch || false,
      /**
       * Executes an HTTP request using axios and returns the response data.
       *
       * @return {Promise<any>} A Promise that resolves to the response data.
       */
      queryFn: () =>
        axios
          .request({
            url: `http://localhost:8080/v1/${path}`,
            method,
            data: body,
            headers,
            params,
          })
          .then((res) => res.data),
    });
    return queryFn;
  }, []);
  return httpReqClient;
};

export default useHttpReqClient;
