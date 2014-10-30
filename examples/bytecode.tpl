<%option mute true>
	<%defineBlock attribute>
		<%bin u16be nameIndex></%bin>
		<%bin u32be info.length></%bin>
		<%loop byte info>
			<%bin u8 byte></%bin>
		</%loop>
	</%defineBlock>

	<%bin u8 202></%bin>
	<%bin u8 254></%bin>
	<%bin u8 186></%bin>
	<%bin u8 190></%bin>

	<%bin u16be version.minor></%bin>
	<%bin u16be version.major></%bin>

	<%bin u16be constants.length></%bin>
	<%loop constant constants>
		<%use constant>
			<%if type == 'Integer'>
				<%bin u8 3></%bin>
				<%bin i32le value></%bin>
			</%if>
			<%if type == 'Utf8'>
				<%bin u8 1></%bin>
				<%bin u16be (value | toBuffer).length></%bin>
				<%loop byte value | toBuffer>
					<%bin u8 byte></%bin>
				</%loop>
			</%if>
			<%if type == 'Class'>
				<%bin u8 7></%bin>
				<%bin u16be nameIndex></%bin>
			</%if>
			<%if type == 'MethodRef'>
				<%bin u8 10></%bin>
				<%bin u16be classIndex></%bin>
				<%bin u16be nameAndTypeIndex></%bin>
			</%if>
			<%if type == 'NameAndType'>
				<%bin u8 12></%bin>
				<%bin u16be nameIndex></%bin>
				<%bin u16be descriptorIndex></%bin>
			</%if>
		</%use>
	</%loop>
	<%bin u16be accessFlags></%bin>
	<%bin u16be thisClassIndex></%bin>
	<%bin u16be superClassIndex></%bin>
	<%bin u16be interfaces.length></%bin>
	<%bin u16be fields.length></%bin>
	<%bin u16be methods.length></%bin>
	<%loop method methods>
		<%use method>
			<%bin u16be accessFlags></%bin>
			<%bin u16be nameIndex></%bin>
			<%bin u16be descriptorIndex></%bin>
			<%bin u16be attributes.length></%bin>
			<%loop attribute attributes>
				<%use attribute>
					<%block attribute></%block>
				</%use>
			</%loop>
		</%use>
	</%loop>
	<%bin u16be attributes.length></%bin>
	<%loop attribute attributes>
		<%use attribute>
			<%block attribute></%block>
		</%use>
	</%loop>
</%option>