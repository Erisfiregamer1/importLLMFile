// This module is available on JSR as @erisws/importllmfile

// Automatically imports an LLM File to the global object (availableLLMs) and gives you information about it so you don't have to waste time writing an implementation.

import * as types from "./llmFile.d.ts"

export default async function importLLMFile(modulePath: string): Promise<types.information | null> {
  try {
    if (!globalThis.availableLLMs) {
      globalThis.availableLLMs = {}
    }

    const module: types.llmFile = await import(`${modulePath}`);

    if (module && module.information && typeof module.send === "function") {
        globalThis.availableLLMs[module.information.id] = {
        information: module.information,
        send: module.send,
      };
      return module.information; // Return the information object
    } else {
      return null; // Return null if the module doesn't have the required exports
    }
  } catch (error) {
    console.error(`Error importing module ${modulePath}':`, error);
    return null; // Return null if there's an error importing the module
  }
}
