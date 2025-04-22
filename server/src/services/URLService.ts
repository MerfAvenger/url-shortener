import pool from "../database/pool";
import { User, URL } from "../model";
import {
  INSERT_URL,
  SELECT_URL_BY_SLUG,
  SELECT_URLS_BY_USER_ID,
  UPDATE_URL_VISITS,
} from "../queries";
import { generateSlug } from "../utils/crypto";

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

  static async getUrlBySlug(slug: string): Promise<URL | null> {
    console.log(`URL Service: Getting URL by slug ${slug}.`);
    const client = await pool.connect();

    const query = {
      text: SELECT_URL_BY_SLUG,
      values: [slug],
    };

    return await client
      .query(query)
      .then((url) => {
        if (url.rows.length > 0) {
          const urlData = url.rows[0];
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
        console.error(`URL Service: Error getting URL by slug ${slug}:`, error);
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

    let slug: string, existingUrl: URL | null;
    const MAX_ATTEMPTS = 10;

    let attemptGeneratingSlug = async (attempts = 0) => {
      slug = await generateSlug();
      existingUrl = await URLService.getUrlBySlug(slug);
      if (existingUrl && attempts < MAX_ATTEMPTS) {
        await attemptGeneratingSlug(attempts + 1);
      } else if (existingUrl && attempts >= MAX_ATTEMPTS) {
        throw new Error("Failed to generate unique slug.");
      }
    };

    await attemptGeneratingSlug();

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

  static async visitUrl(url: URL): Promise<URL | null> {
    console.log(`URL Service: Visiting URL ${url.slug}.`);
    const client = await pool.connect();

    const { slug } = url;

    const query = {
      text: UPDATE_URL_VISITS,
      values: [slug],
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
        console.error(`URL Service: Error visiting URL ${url.slug}:`, error);
        throw error;
      })
      .finally(() => {
        console.info("URL Service: Releasing client connection.");
        client.release();
      });
  }
}
