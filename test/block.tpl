<%defineBlock foo>Foo Block: <$var>, with content: <%use object><%blockContent _></></></%defineBlock
><%block foo>The First Content !! <$var2></%block>
<%use object><%block foo>The Second Content !</%block></%use>
