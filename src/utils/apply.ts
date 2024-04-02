import { Lucid, applyParamsToScript, fromHex, toHex } from "https://deno.land/x/lucid/mod.ts";
import * as cbor from "https://deno.land/x/cbor@v1.4.1/index.js";
 
function cborizeCompiled(compiledCode: string): string {
  return toHex(cbor.encode(fromHex(compiledCode)))
}

// async function mkAppliedScript(): string {
//   const validator = JSON.parse(await Deno.readTextFile("plutus.json")).validators[0]
//   applyParamsToScript
//   return "finish me!"
// }