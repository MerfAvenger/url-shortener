import pool from "../database/pool";
import { User, URL } from "../model";
import { INSERT_URL, SELECT_URLS_BY_USER_ID } from "../queries";

export default class URLService {
  static async getUserUrls(user: User): Promise<URL[] | null> {
    console.log(`URL Service: Getting URLs for user ${user.email}.`);
    const client = await pool.connect();

    const query = {
      text: SELECT_URLS_BY_USER_ID,
      values: [user.id],
    };

    return await client
      .query(query)
      .then((urls) => {
        if (urls.rows.length > 0) {
          const urlsData = urls.rows;
          return urlsData.map((urlData) => ({
            slug: urlData.slug,
            user: urlData.user,
            long: urlData.long,
            visits: urlData.visits,
          }));
        }
        return null;
      })
      .catch((error) => {
        console.error(
          `URL Service: Error getting URLs for user ${user.email}:`,
          error
        );
        throw error;
      })
      .finally(() => {
        console.info("URL Service: Releasing client connection.");
        client.release();
      });
  }

  static async createUrl(userId: number, url: string): Promise<URL | null> {
    console.log(`URL Service: Creating URL for user ${userId}.`);
    const client = await pool.connect();

    const slug = "test-slug";

    const query = {
      text: INSERT_URL,
      values: [slug, url, userId],
    };

    return await client
      .query(query)
      .then((result) => {
        if (result.rows.length > 0) {
          const urlData = result.rows[0];
          return {
            slug: urlData.slug,
            user: urlData.user,
            long: urlData.long,
            visits: urlData.visits,
          };
        }
        return null;
      })
      .catch((error) => {
        console.error(
          `URL Service: Error creating shortened URL ${url} for user ${userId}:`,
          error
        );
        throw error;
      })
      .finally(() => {
        console.info("URL Service: Releasing client connection.");
        client.release();
      });
  }
}
