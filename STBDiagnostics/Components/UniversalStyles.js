const colorSpace = {
	appBG: "#F1F1F1",
	cardBG: "#FFFFFF",
	altCardBG: "#FFFFFF",
	errorCardBG: "#FF7061",
	warningCardBG: "#F2BB13",

}

export const universalstyles = {
	container: {
		flex: 1,
		backgroundColor: colorSpace.appBG,

	},
	stbdiagnostic: {
		flex: 1,	
	},
	header: {
		backgroundColor: colorSpace.cardBG,
		borderBottomWidth:0,
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 15 },
	    shadowOpacity: 0.2,
	    shadowRadius: 15,
	},
	card: {
		borderRadius: 10,
		borderWidth: 0,
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 15 },
	    shadowOpacity: 0.2,
	    shadowRadius: 15,
	},
	failedCard: {
		borderRadius: 10,
		borderWidth: 0,
		backgroundColor: colorSpace.errorCardBG,
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 15 },
	    shadowOpacity: 0.2,
	    shadowRadius: 15,
	},
	pendingCard: {
		borderRadius: 10,
		borderWidth: 0,
		backgroundColor: colorSpace.warningCardBG,
		opacity: 0.6,
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 15 },
	    shadowOpacity: 0.2,
	    shadowRadius: 15,
	},
	mbpsTitle: {
		fontSize: 25,
		fontWeight: 'bold',
		paddingBottom: 10,
		color: '#000000',
	},
	successTitle: {
		fontSize: 40,
		fontWeight: 'bold',
		paddingBottom: 2,
		color: '#EC008C',
	},
	failedTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 2,
		color: '#000000',
	},
	pendingTitle: {
		fontSize: 40,
		fontWeight: 'bold',
		paddingBottom: 2,
		color: '#EC008C',
	},
	cardTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 10,
		color: '#EC008C',
	},
	altCardTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 10,
		color: '#EC008C',
	},
	emptyCard: {
		opacity: 0,
		padding: 20
	},
	cardContent: {
		fontSize: 15,
	},
	bold: {
		fontWeight: 'bold'
	},
	positive: {
		fontWeight: 'bold',
		color: '#142615',
	},
	negative: {
		fontWeight: 'bold',
		color: 'red',
	},
	successbutton: {
		borderRadius: 20,
		width: 150,
		backgroundColor: '#2A6637'
	},
	failedbutton: {
		borderRadius: 20,
		width: 150,
		backgroundColor: '#B23242',
	},
	button: {
		borderRadius: 0,
		maxWidth: 200,
		minWidth: 120,
		height: 50,
		marginHorizontal: 15,
		backgroundColor: '#FFFFFF',
	},
	buttonText: {
		fontSize:15,
		color: '#000000',
	},
	footerCard: {
		backgroundColor: colorSpace.cardBG,
		height: 80,
	},
	footerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 5,
	}
}