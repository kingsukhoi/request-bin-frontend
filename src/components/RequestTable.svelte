<script lang="ts">
  import {GetRequests, type RbRequest} from "../api/rbRequest.ts";
  import {onMount} from "svelte";

  import {formatDate} from "../helpers/dates.ts";


  interface Props {
    handleRowClick: (req: RbRequest) => void
    refreshInterval: number
  }
  let {handleRowClick, refreshInterval = 5000} : Props = $props();

  let requests: RbRequest[] = $state([])
  onMount(async () => {
    requests = await GetRequests()
    setInterval(async () => {
      requests = await GetRequests()
    }, refreshInterval)

  })
</script>
<div class="">
    <table class="table caption-bottom">
        <thead>
        <tr>
            <td>Received</td>
            <td>Method</td>
            <td>Response Code</td>
            <td>Source Ip</td>
            <td>Id</td>
        </tr>
        </thead>
        <tbody>
        {#each requests as req (req.id)}
            <tr class="hover:preset-tonal odd:preset-tonal-primary" onclick={()=>handleRowClick(req)}>
                <td>{formatDate(req.timestamp)}</td>
                <td>{req.method}</td>
                <td>{req.responseCode}</td>
                <td>{req.sourceIp}</td>
                <td>{req.id.split("-").pop()}</td>
            </tr>

        {/each}
        </tbody>
    </table>
</div>