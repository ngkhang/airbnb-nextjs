// Type definitions for assets
type AssetType = keyof typeof typeAssets;
type FileNameType = keyof typeof fileNameAssets;

/**
 * Mapping of asset types to their directory paths.
 */
const typeAssets = {
  image: '/images',
} as const;

/**
 * Mapping of file names to their respective filenames.
 */
const fileNameAssets = {
  '404': '404-Airbnb.gif',
  placeholder: 'placeholder.svg',
} as const;

/**
 * Retrieves the full path of an asset file in the public folder.
 *
 * @param {AssetType} type - The type of asset (e.g., 'image').
 * @param {FileNameType} fileName - The specific file name (e.g., '404').
 * @return {string} The full path to the asset.
 */
export const getPathFileAssets = (
  type: AssetType,
  fileName: FileNameType
): string => `${typeAssets[type]}/${fileNameAssets[fileName]}`;
