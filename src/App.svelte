<script lang="ts">
  import "./app.css";
  import {onMount} from 'svelte';
  import type {RbRequest} from "./api/rbRequest.ts";
  import {GetRequests} from "./api/rbRequest.ts";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from 'flowbite-svelte';
  import {HighlightAuto} from "svelte-highlight";


  let requests: RbRequest[] = $state([])

  onMount(async () => {
    requests = await GetRequests()
  })

  function formatDate(date: Date) {
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return `${dateFormatter.format(date)} ${timeFormatter.format(date).toLowerCase()}`;
  }
</script>

{@debug requests}

<main class="justify-center">
    <div class="">
        <Table hoverable={true} striped={true}>
            <TableHead>
                <TableHeadCell>Id</TableHeadCell>
                <TableHeadCell>Method</TableHeadCell>
                <TableHeadCell>Content</TableHeadCell>
                <TableHeadCell>Source Ip</TableHeadCell>
                <TableHeadCell>Response Code</TableHeadCell>
                <TableHeadCell>Time</TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
                {#each requests as req (req.id)}
                    <TableBodyRow>
                        <TableBodyCell>{req.id}</TableBodyCell>
                        <TableBodyCell>{req.method}</TableBodyCell>
                        <TableBodyCell>
                            <HighlightAuto code={req.content} />
                        </TableBodyCell>
                        <TableBodyCell>{req.sourceIp}</TableBodyCell>
                        <TableBodyCell>{req.responseCode}</TableBodyCell>
                        <TableBodyCell>{formatDate(req.timestamp)}</TableBodyCell>
                    </TableBodyRow>

                {/each}
            </TableBody>
        </Table>
    </div>
</main>
