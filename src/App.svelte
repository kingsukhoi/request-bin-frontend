<script lang="ts">
  import "./app.css";
  import {GetRequestHeadersById, type RbRequest, type RbRequestHeader} from "./api/rbRequest.ts";
  import RequestTable from "./components/RequestTable.svelte";
  import {HighlightAuto, LineNumbers} from "svelte-highlight";

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


<main class="justify-center">

    <RequestTable handleRowClick={handleRowClick}/>

    {#if currRequest}
        {#each requestHeaders as curr (curr.requestId + curr.name)}
            <div>{curr.name}: {curr.value}</div>
        {/each}
        {#if currRequest.content}
            <HighlightAuto
                    code={currRequest.content}
                    let:highlighted
            >
                <LineNumbers {highlighted}/>
            </HighlightAuto>
        {/if}
    {/if}
</main>
