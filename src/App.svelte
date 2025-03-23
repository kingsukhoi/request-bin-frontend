<script lang="ts">
  import "./app.css";
  import {onMount} from 'svelte';
  import type {RbRequest} from "./api/rbRequest.ts";
  import {GetRequests} from "./api/rbRequest.ts";
  import {HighlightAuto} from "svelte-highlight";
  import {formatDate} from "./helpers/dates.ts";

  let requests: RbRequest[] = $state([])

  onMount(async () => {
    requests = await GetRequests()
  })


</script>


<main class="justify-center">
    <div class="">
        <table class="table caption-bottom">
            <thead>
            <tr>
                <td>Id</td>
                <td>Method</td>
                <td>Content</td>
                <td>Source Ip</td>
                <td>Response Code</td>
                <td>Time</td>
            </tr>
            </thead>
            <tbody>
            {#each requests as req (req.id)}
                <tr>
                    <td>{req.id}</td>
                    <td>{req.method}</td>
                    <td>
                        <HighlightAuto code={req.content}/>
                    </td>
                    <td>{req.sourceIp}</td>
                    <td>{req.responseCode}</td>
                    <td>{formatDate(req.timestamp)}</td>
                </tr>

            {/each}
            </tbody>
        </table>
    </div>
</main>
