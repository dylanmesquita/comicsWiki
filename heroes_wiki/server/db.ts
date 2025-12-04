import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, characters, InsertCharacter, favorites } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllCharacters() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get characters: database not available");
    return [];
  }

  try {
    const result = await db.select().from(characters).orderBy(characters.name);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get characters:", error);
    throw error;
  }
}

export async function getCharacterById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get character: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(characters).where(eq(characters.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get character:", error);
    throw error;
  }
}

export async function createCharacter(data: InsertCharacter) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create character: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(characters).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create character:", error);
    throw error;
  }
}

export async function toggleFavorite(userId: number, characterId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot toggle favorite: database not available");
    return false;
  }

  try {
    const existing = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, userId),
          eq(favorites.characterId, characterId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Remove favorite
      await db
        .delete(favorites)
        .where(
          and(
            eq(favorites.userId, userId),
            eq(favorites.characterId, characterId)
          )
        );
      return false;
    } else {
      // Add favorite
      await db.insert(favorites).values({ userId, characterId });
      return true;
    }
  } catch (error) {
    console.error("[Database] Failed to toggle favorite:", error);
    throw error;
  }
}

export async function isFavorite(userId: number, characterId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot check favorite: database not available");
    return false;
  }

  try {
    const result = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, userId),
          eq(favorites.characterId, characterId)
        )
      )
      .limit(1);

    return result.length > 0;
  } catch (error) {
    console.error("[Database] Failed to check favorite:", error);
    throw error;
  }
}

export async function searchCharacters(query: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot search characters: database not available");
    return [];
  }

  try {
    const { like } = await import("drizzle-orm");
    const result = await db
      .select()
      .from(characters)
      .where(like(characters.name, `%${query}%`))
      .orderBy(characters.name);
    return result;
  } catch (error) {
    console.error("[Database] Failed to search characters:", error);
    throw error;
  }
}

export async function getCharactersByAffiliation(affiliation: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get characters by affiliation: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(characters)
      .where(eq(characters.affiliation, affiliation))
      .orderBy(characters.name);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get characters by affiliation:", error);
    throw error;
  }
}

// TODO: add feature queries here as your schema grows.
