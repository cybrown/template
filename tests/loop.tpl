(<%loop value numbers><$value><%if !last>, </></>)
(<%loop value numbers><%if !first>, </><$value></>)
<%loop value numbers><$index>: <$value>
</%loop><%loop num [1, 2, 3]><$num>
</%loop>
