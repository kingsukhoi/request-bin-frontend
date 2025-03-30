<script lang="ts">
  import "./app.css";
  import {GetRequestHeadersById, type RbRequest, type RbRequestHeader} from "./api/rbRequest.ts";
  import RequestTable from "./components/RequestTable.svelte";
  import {FormatContent} from "./helpers/formatters.ts";
  import {fade} from "svelte/transition";
  import {X} from "@lucide/svelte"
  import CodeBlock from "./components/CodeBlock.svelte";

  let currRequest: RbRequest | undefined = $state(undefined);
  let requestHeaders: RbRequestHeader[] = $state([])

  $effect(() => {
    if (currRequest) {
      GetRequestHeadersById(currRequest.id).then(r => {
          requestHeaders = r;
        }
      )
    } else {
      requestHeaders = [];
    }
  })

  function handleRowClick(req: RbRequest) {
    currRequest = req;
  }

</script>

<main class="grid h-screen grid-cols-3">

    <RequestTable
            className={currRequest ? "col-span-2" : "col-span-3"}
            handleRowClick={handleRowClick}
    />

    {#if currRequest}
        <div transition:fade={{duration: 300}} class="col-span-1">
            <button class="absolute top-0 right-0"
                    onclick={() => currRequest = undefined}
            >
                <X />
            </button>
            <div>id: {currRequest.id}</div>
            {#each requestHeaders as curr (curr.requestId + curr.name)}
                <div>{curr.name}: {curr.value}</div>
            {/each}
            {#if currRequest.content}
                <CodeBlock lang="json" code= {FormatContent(requestHeaders, currRequest.content)}/>
            {/if}
        </div>
    {/if}

</main>
