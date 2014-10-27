<%defineBlock foo>Foo Block: <$var>, with content: <%blockContent _></></%defineBlock
><%block foo>The First Content !!</%block>
<%use object><%block foo>The Second Content <$var> !</%block></%use>
