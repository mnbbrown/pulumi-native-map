import * as cloud from '@pulumi/cloud-aws'
import { container } from './container'
import { TYPES } from "./types";
import { Warrior } from "./interfaces";

const endpoint = new cloud.API("hello-world");
endpoint.get("/{route+}", (_, res) => {
  const ninja = container.get<Warrior>(TYPES.Warrior);
  res.status(200).json([
    ninja.fight(),
    ninja.sneak(),
  ]);
});

exports.endpoint = endpoint.publish().url;
