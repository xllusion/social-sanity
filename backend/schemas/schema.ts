import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Post
 *
 *
 */
export interface Post extends SanityDocument {
  _type: "post";

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;

  /**
   * Video — `file`
   *
   *
   */
  video?: { _type: "file"; asset: SanityReference<any> };

  /**
   * UserId — `string`
   *
   *
   */
  userId?: string;

  /**
   * PostedBy — `postedBy`
   *
   *
   */
  postedBy?: PostedBy;

  /**
   * Likes — `array`
   *
   *
   */
  likes?: Array<SanityKeyedReference<User>>;

  /**
   * Comments — `array`
   *
   *
   */
  comments?: Array<SanityKeyed<Comment>>;

  /**
   * Topic — `string`
   *
   *
   */
  topic?: string;
}

/**
 * User
 *
 *
 */
export interface User extends SanityDocument {
  _type: "user";

  /**
   * User Name — `string`
   *
   *
   */
  userName?: string;

  /**
   * Image — `string`
   *
   *
   */
  image?: string;
}

/**
 * Comment
 *
 *
 */
export interface Comment extends SanityDocument {
  _type: "comment";

  /**
   * Posted By — `postedBy`
   *
   *
   */
  postedBy?: PostedBy;

  /**
   * Comment — `string`
   *
   *
   */
  comment?: string;
}

export type PostedBy = SanityReference<User>;

export type Documents = Post | User | Comment;
