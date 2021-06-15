export const detailsFilterMap = {
	facilites: {
		type: 'detailGroupTitle',
		displayName: 'Facilities',
		children: {
			numberOfSeats: {
				type: 'singleSelect',
				valuePropName: 'numberOfSeats',
				displayName: 'Number of seats availabe',
				children: {
					option1: {
						displayName: '2 or more',
						value: 2,
					},
					option2: {
						displayName: '5 or more',
						value: 5,
					},
					option3: {
						displayName: '10 or more',
						value: 10,
					},
					option4: {
						displayName: '15 or more',
						value: 15,
					},
					option5: {
						displayName: '20 or more',
						value: 20,
					},
					option6: {
						displayName: '25 or more',
						value: 25,
					},
				},
			},
			privateDiningRooms: {
				type: 'boolean',
				valuePropName: 'privateDiningRooms',
				displayName: 'Private dining rooms available',
				label: '',
			},
			sportsTV: {
				type: 'boolean',
				valuePropName: 'sportsTV',
				displayName: 'Sports TV available',
				label: '',
			},
			fussball: {
				type: 'boolean',
				valuePropName: 'fussball',
				displayName: 'Fussball table available',
				label: '',
			},
			darts: {
				type: 'boolean',
				valuePropName: 'darts',
				displayName: 'Darts available',
				label: '',
			},
			gamingConsole: {
				type: 'boolean',
				valuePropName: 'gamingConsole',
				displayName: 'Gaming console/PC available',
				label: '',
			},
			karaoke: {
				type: 'boolean',
				valuePropName: 'karaoke',
				displayName: 'Karaoke available',
				label: '',
			},
			outdoorTerraceSeating: {
				type: 'boolean',
				valuePropName: 'outdoorTerraceSeating',
				displayName: 'Outdoor/terrace seating available',
				label: '',
			},
			counterSeating: {
				type: 'boolean',
				valuePropName: 'counterSeating',
				displayName: 'Seating at the counter available',
				label: '',
			},
			freeWifi: {
				type: 'boolean',
				valuePropName: 'freeWifi',
				displayName: 'Free Wi-Fi available',
				label: '',
			},
			paidWifi: {
				type: 'boolean',
				valuePropName: 'paidWifi',
				displayName: 'Any Wi-Fi available (including paid)',
				label: '',
			},
			wheelchairSpace: {
				type: 'boolean',
				valuePropName: 'wheelchairSpace',
				displayName: 'Wheelchair accessible space',
				label: '',
			},
			parkingLot: {
				type: 'boolean',
				valuePropName: 'parkingLot',
				displayName: 'Parking lot available',
				label: '',
			},
		},
	},
	features: {
		type: 'detailGroupTitle',
		displayName: 'Features',
		children: {
			vegetarianFriendly: {
				type: 'boolean',
				valuePropName: 'vegetarianFriendly',
				displayName: 'Vegetarian friendly',
				label: '',
			},
			veganFriendly: {
				type: 'boolean',
				valuePropName: 'veganFriendly',
				displayName: 'Vegan friendly',
				label: '',
			},
			allergyLabeled: {
				type: 'boolean',
				valuePropName: 'allergyLabeled',
				displayName: 'Allergy labeled',
				label: '',
			},
			allYouCanEatMenu: {
				type: 'boolean',
				valuePropName: 'allYouCanEatMenu',
				displayName: 'All you can eat menu available',
				label: '',
			},
			allYouCanDrinkMenu: {
				type: 'boolean',
				valuePropName: 'allYouCanDrinkMenu',
				displayName: 'All you can drink menu available',
				label: '',
			},
			courses: {
				type: 'boolean',
				valuePropName: 'courses',
				displayName: 'Courses available',
				label: '',
			},
			takeOut: {
				type: 'boolean',
				valuePropName: 'takeOut',
				displayName: 'Take out available',
				label: '',
			},
			occassion: {
				type: 'multiSelect',
				valuePropName: 'occassion',
				valueType: 'Array',
				displayName: 'Occassion',
				children: {
					option1: {
						displayName: 'Alone',
						value: 'Alone',
					},
					option2: {
						displayName: 'Date',
						value: 'Date',
					},
					option3: {
						displayName: 'With family',
						value: 'With family',
					},
					option4: {
						displayName: 'With friends',
						value: 'With friends',
					},
					option5: {
						displayName: 'Birthday',
						value: 'Birthday',
					},
					option6: {
						displayName: 'Business/Formal',
						value: 'Business/Formal',
					},
					option7: {
						displayName: 'Wedding',
						value: 'Wedding',
					},
				},
			},
			reservations: {
				type: 'singleSelect',
				valuePropName: 'reservations',
				valueType: 'String',
				displayName: 'Reservations',
				children: {
					option1: {
						displayName: 'By reservations only',
						value: 'By reservations only',
					},
					option2: {
						displayName: 'Not available',
						value: 'Not available',
					},
					option3: {
						displayName: 'Available',
						value: 'Available',
					},
				},
			},
			withChildren: {
				type: 'multiSelect',
				valuePropName: 'withChildren',
				valueType: 'Object',
				displayName: 'With children',
				children: {
					babiesWelcome: {
						type: 'boolean',
						valuePropName: 'babiesWelcome',
						displayName: 'Babies are welcome',
					},
					preschoolWelcome: {
						type: 'boolean',
						valuePropName: 'preschoolWelcome',
						displayName: 'Preschool children are welcome',
					},
					elementaryWelcome: {
						type: 'boolean',
						valuePropName: 'elementaryWelcome',
						displayName: 'Elementary school children are welcome',
					},
					childrenMenuAvailable: {
						type: 'boolean',
						valuePropName: 'childrenMenuAvailable',
						displayName: 'Children menu is available',
					},
					babyStrollersAllowed: {
						type: 'boolean',
						valuePropName: 'babyStrollersAllowed',
						displayName: 'Baby strollers are allowed',
					},
					babySeatsAvailable: {
						type: 'boolean',
						valuePropName: 'babySeatsAvailable',
						displayName: 'Baby seats are available',
					},
				},
			},
			withPets: {
				type: 'boolean',
				valuePropName: 'withPets',
				displayName: 'Pets are allowed',
				label: '',
			},
		},
	},
};

export const stateValueMap = {
	numberOfSeats: 2,
	privateDiningRooms: false,
	sportsTV: false,
	fussball: false,
	darts: false,
	gamingConsole: false,
	karaoke: false,
	outdoorTerraceSeating: false,
	counterSeating: false,
	freeWifi: false,
	paidWifi: false,
	wheelchairSpace: false,
	parkingLot: false,
	vegetarianFriendly: false,
	veganFriendly: false,
	allergyLabeled: false,
	allYouCanEatMenu: false,
	allYouCanDrinkMenu: false,
	courses: false,
	takeOut: false,
	occassion: [],
	reservations: '',
	withChildren: {
		babiesWelcome: false,
		preschoolWelcome: false,
		elementaryWelcome: false,
		childrenMenuAvailable: false,
		babyStrollersAllowed: false,
		babySeatsAvailable: false,
	},
	withPets: false,
};
