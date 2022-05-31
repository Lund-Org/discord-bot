declare namespace mb {
  type HttpMethod =
    | 'all'
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | 'options'
    | 'head';

  type Route = {
    methods: HttpMethod[];
    url: string;
    handler: (req: Express.Request, res: Express.Response) => Promise<void>;
  };
}
