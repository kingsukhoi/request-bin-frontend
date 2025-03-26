<script lang="ts">
  import "./app.css";
  import {GetRequestHeadersById, type RbRequest, type RbRequestHeader} from "./api/rbRequest.ts";
  import RequestTable from "./components/RequestTable.svelte";
  import {HighlightAuto, LineNumbers} from "svelte-highlight";
  import {FormatContent} from "./helpers/formatters.ts";
  import "svelte-highlight/styles/dark-violet.css";

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

<main class="flex flex-col">

    <RequestTable handleRowClick={handleRowClick}/>

    {#if currRequest}
        <div>
            <div>id: {currRequest.id}</div>
            {#each requestHeaders as curr (curr.requestId + curr.name)}
                <div>{curr.name}: {curr.value}</div>
            {/each}
            {#if currRequest.content}
                <HighlightAuto
                        code={FormatContent(requestHeaders, currRequest.content)}
                        let:highlighted
                >
                    <LineNumbers {highlighted}/>
                </HighlightAuto>
            {/if}
        </div>
    {/if}

</main>
