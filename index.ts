import * as cloud from '@pulumi/cloud-aws'

const v = new Map<string, string>();

const endpoint = new cloud.API("hello-world");
endpoint.get("/{route+}", (req, res) => {
  const route = req.params['route'] || 'test'
  res.status(200).json({
    route,
    result: v.get(route)
  });
});

exports.endpoint = endpoint.publish().url;
