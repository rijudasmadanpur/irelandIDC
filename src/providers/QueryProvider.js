import React from "react";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";

// ✅ Compressed sessionStorage persister using JSON
export const localStoragePersister = {
  persistClient: async (client) => {
    try {
      const compressed = compressToUTF16(JSON.stringify(client));
      sessionStorage.setItem("REACT_QUERY_OFFLINE_CACHE", compressed);
    } catch (err) {
      console.warn("Failed to persist cache:", err);
    }
  },
  restoreClient: async () => {
    try {
      const compressed = sessionStorage.getItem("REACT_QUERY_OFFLINE_CACHE");
      return compressed
        ? JSON.parse(decompressFromUTF16(compressed))
        : undefined;
    } catch (err) {
      console.warn("Failed to restore cache:", err);
      return undefined;
    }
  },
  removeClient: async () => {
    sessionStorage.removeItem("REACT_QUERY_OFFLINE_CACHE");
  },
};

// ✅ Dummy Provider (since React Query is removed)
export function QueryProvider({ children }) {
  return <>{children}</>;
}
