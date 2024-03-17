import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <>
    <div class="px-4 py-4 bg-[#7d59a0]">
      <div class="max-w-screen-md flex flex-col">
        <img
          class="my-6"
          src="img/logo.svg"
          width="128"
          height="128"
          alt="the Druid logo: a rugged forest dweller with his bear familiar"
        />
        <h1 class="text-4xl">🌿<span class="accent1">a</span><span class="accent2">k</span>Druid</h1>
      </div>
    </div>
    <div class="container mx-4 justify-center px-2 py-6">
        <div class="column lambda mx-auto px-6 py-2">
          <h2 class="lambda-title"><span class="bold accent3 symbol">λ. </span>lambda</h2></div>
        <div class="column args mx-auto px-6 py-2">
          <h2 class="args-title"><span class="bold accent3 symbol">x. </span>args
          </h2>
        </div>
    </div>
    <div class="footer mx-auto py-4">
     © 2024 &mdash; ajnabi workshop
    </div>
    </>
  );
}
