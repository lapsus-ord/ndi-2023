<script lang="ts">
  import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';

  const sourceData = [
    { username: 'kuruyia', score: 10811 },
    { username: 'john.doe', score: 6231 },
    { username: 'noetarbouriech', score: 5742 },
    { username: 'assstra', score: 4122 },
    { username: 'lapsus-ord', score: 10 },
  ];

  const tableSimple: TableSource = {
    head: ['Username', 'Score'],
    body: tableMapperValues(sourceData, ['username', 'score']),
    meta: tableMapperValues(sourceData, ['username', 'score']),
  };
</script>

<div class="w-full">
  <Table source={tableSimple} />
</div>
