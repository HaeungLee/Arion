import type { tags } from "typia";
/**
 * Article entity.
 *
 * `IBbsArticle` is an entity representing an article in the BBS (Bulletin Board System).
 */
export interface IBbsArticle extends IBbsArticle.ICreate {
    /**
     * Primary Key.
     */
    id: string & tags.Format<"uuid">;
    /**
     * Creation time of the article.
     */
    created_at: string & tags.Format<"date-time">;
    /**
     * Last updated time of the article.
     */
    updated_at: string & tags.Format<"date-time">;
}
export declare namespace IBbsArticle {
    /**
     * Information of the article to create.
     */
    interface ICreate {
        /**
         * Title of the article.
         *
         * Representative title of the article.
         */
        title: string;
        /**
         * Content body.
         *
         * Content body of the article writtn in the markdown format.
         */
        body: string;
        /**
         * Thumbnail image URI.
         *
         * Thumbnail image URI which can represent the article.
         *
         * If configured as `null`, it means that no thumbnail image in the article.
         */
        thumbnail: null | (string & tags.Format<"uri"> & tags.ContentMediaType<"image/*">);
    }
    /**
     * Information of the article to update.
     *
     * Only the filled properties will be updated.
     */
    type IUpdate = Partial<ICreate>;
}
