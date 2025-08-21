import type { tags } from "typia";
import type { IBbsArticle } from "./IBbsArticle";
export declare class BbsArticleService {
    private readonly articles;
    /**
     * Get all articles.
     *
     * List up every articles archived in the BBS DB.
     *
     * @returns List of every articles
     */
    index(): IBbsArticle[];
    /**
     * Create a new article.
     *
     * Writes a new article and archives it into the DB.
     *
     * @param props Properties of create function
     * @returns Newly created article
     */
    create(props: {
        /**
         * Information of the article to create
         */
        input: IBbsArticle.ICreate;
    }): IBbsArticle;
    /**
     * Update an article.
     *
     * Updates an article with new content.
     *
     * @param props Properties of update function
     * @param input New content to update
     */
    update(props: {
        /**
         * Target article's {@link IBbsArticle.id}.
         */
        id: string & tags.Format<"uuid">;
        /**
         * New content to update.
         */
        input: IBbsArticle.IUpdate;
    }): void;
    /**
     * Erase an article.
     *
     * Erases an article from the DB.
     *
     * @param props Properties of erase function
     */
    erase(props: {
        /**
         * Target article's {@link IBbsArticle.id}.
         */
        id: string & tags.Format<"uuid">;
    }): void;
}
