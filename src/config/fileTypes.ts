export const SUPPORTED_FILE_TYPES = {
  // Video Types
  'video/mp4': ['.mp4'],
  'video/quicktime': ['.mov'],
  'video/x-msvideo': ['.avi'],
  'video/x-matroska': ['.mkv'],

  // Audio Types
  'audio/mpeg': ['.mp3'],
  'audio/wav': ['.wav'],
  'audio/aac': ['.aac'],
  'audio/m4a': ['.m4a'],
};

/**
 * Returns a comma separated list of all allowed file extensions
 * (e.g. ".mp4, .mov, .avi, .mkv, .mp3, .wav, .aac, .m4a")
 * Perfect for generating readable UI instructions and the native input "accept" attribute.
 */
export const getAllowedExtensionsString = (): string => {
  const extensions = Object.values(SUPPORTED_FILE_TYPES).flat();
  return extensions.join(', ');
};
