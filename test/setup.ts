// Ensure the transformer registry is populated before any test runs.
// Individual transformer tests import src/transformers/* directly (not through
// index.ts), so without this setup the mutable registry in registry.ts would
// be empty when transform() is called.
// eslint-disable-next-line import-x/no-unassigned-import
import '../src/transformers/index';
