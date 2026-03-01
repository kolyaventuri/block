import {type Child} from '../constants/types';

type TransformersType = Record<string, (child: Child) => unknown>;

// Mutable registry populated by index.ts at module init time.
// transform.ts imports this directly to avoid a circular dependency.
const Transformers: TransformersType = {};

export default Transformers;
