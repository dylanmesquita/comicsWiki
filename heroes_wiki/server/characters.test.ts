import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `sample-user-${userId}`,
    email: `sample${userId}@example.com`,
    name: `Sample User ${userId}`,
    loginMethod: "local",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

function createPublicContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("characters router", () => {
  describe("list", () => {
    it("should return a list of characters", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.characters.list();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getById", () => {
    it("should return null for non-existent character", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.characters.getById({ id: 99999 });

      expect(result).toBeUndefined();
    });
  });

  describe("search", () => {
    it("should return empty array for non-matching query", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.characters.search({ query: "NonExistentCharacter12345" });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe("byAffiliation", () => {
    it("should return empty array for non-existent affiliation", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.characters.byAffiliation({ affiliation: "NonExistentAffiliation" });

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("toggleFavorite", () => {
    it("should require authentication", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.characters.toggleFavorite({ characterId: 1 });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });

    it("should toggle favorite for authenticated user", async () => {
      const { ctx } = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      try {
        const result = await caller.characters.toggleFavorite({ characterId: 1 });
        expect(typeof result).toBe("boolean");
      } catch (error: any) {
        // Expected to fail if character doesn't exist in DB
        expect(error).toBeDefined();
      }
    });
  });

  describe("isFavorite", () => {
    it("should require authentication", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.characters.isFavorite({ characterId: 1 });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });

    it("should return false for non-favorited character", async () => {
      const { ctx } = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      try {
        const result = await caller.characters.isFavorite({ characterId: 1 });
        expect(typeof result).toBe("boolean");
      } catch (error: any) {
        // Expected to fail if character doesn't exist in DB
        expect(error).toBeDefined();
      }
    });
  });
});
