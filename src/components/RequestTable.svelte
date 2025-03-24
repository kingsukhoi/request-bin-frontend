<script lang="ts">
  import {GetRequests, type RbRequest} from "../api/rbRequest.ts";
  import {onMount} from "svelte";

  import {formatDate} from "../helpers/dates.ts";


  interface Props {
    handleRowClick: (req: RbRequest) => void
  }
  let {handleRowClick} : Props = $props();

  let requests: RbRequest[] = $state([])
  onMount(async () => {
    requests = await GetRequests()
  })
</script>
<div class="">
    <table class="table caption-bottom">
        <thead>
        <tr>
            <td>Id</td>
            <td>Method</td>
            <td>Source Ip</td>
            <td>Response Code</td>
            <td>Time</td>
        </tr>
        </thead>
        <tbody>
        {#each requests as req (req.id)}
            <tr class="hover:bg-gray-700 odd:bg-primary-500" onclick={()=>handleRowClick(req)}>
                <td>{req.id}</td>
                <td>{req.method}</td>
                <td>{req.sourceIp}</td>
                <td>{req.responseCode}</td>
                <td>{formatDate(req.timestamp)}</td>
            </tr>

        {/each}
        </tbody>
    </table>
</div>