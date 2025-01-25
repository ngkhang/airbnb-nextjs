// Type definitions for assets
type AssetType = keyof typeof typeAssets;

/**
 * Mapping of asset types to their directory paths.
 */
const typeAssets = {
  image: '/images',
  mapRegion: '/images/map-region',
  categories: '/images/categories',
} as const;

/**
 * Retrieves the full path of an asset file in the public folder.
 *
 * @param {AssetType} type - The type of asset (e.g., 'images').
 * @param {string} fileName - The specific file name (e.g., '404-Airbnb.gif').
 * @return {string} The full path to the asset.
 */
export const getPathFileAssets = (type: AssetType, fileName: string): string =>
  `${typeAssets[type]}/${fileName}`;
