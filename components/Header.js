import React from 'react';
import { View, Text } from 'react-native';

const Header = ({ title }) => {
	const { viewStyle, textStyle } = styles;
	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{title}</Text>
		</View>
	);
};

const styles = {
	viewStyle: {
		backgroundColor: '#f8f8f8',
		alignItems: 'center',
		justifyContent: 'center',
		height: 60,
		paddingTop: 15,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2
	},
	textStyle: {
		fontSize: 20
	}
};

export { Header };
