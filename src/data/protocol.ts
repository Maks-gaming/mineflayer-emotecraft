export default {
	types: {
		pstring: "native",
		i32: "native",
		u8: "native",
		bool: "native",
		string: [
			"pstring",
			{
				countType: "u16",
			},
		],
		short: "i16",
		int: "i32",
		long: "i64",
		uuid: [
			"container",
			[
				{
					name: "mostSignificantBits",
					type: "u64",
				},
				{
					name: "lessSignificantBits",
					type: "u64",
				},
			],
		],
		hashmap: [
			"array",
			{
				countType: "int",
				type: [
					"container",
					[
						{
							name: "key",
							type: "string",
						},
						{
							name: "value",
							type: "string",
						},
					],
				],
			},
		],
		codecInfo: [
			"container",
			[
				{
					name: "codec_name",
					type: "string",
				},
				{
					name: "codec_params",
					type: "hashmap",
				},
			],
		],
	},
	login: {
		toClient: {
			types: {
				emotecraft_123456: [
					"container",
					[
						{
							name: "languageName",
							type: "string",
						},
						{
							name: "language",
							type: "hashmap",
						},
					],
				],
				emotecraft_packet: [
					"container",
					[
						{
							name: "id",
							type: [
								"mapper",
								{
									type: "u8",
									mappings: {
										"1": "ConnectionPacket",
										"2": "PlayerInfoRequestPacket",
										"3": "ConfigPacket",
										"4": "ConfigPlayerInfoPacket",
										"5": "LanguageRequestPacket",
										"6": "LanguagePacket",
										"7": "PlayerListPacket",
										"8": "PlayerInfoUpdatePacket",
										"9": "PlayerDisconnectPacket",
										"10": "PlayerInfoPacket",
										"11": "PlayerStatePacket",
										"12": "PlayerAudioEndPacket",
										"13": "PlayerActivationDistancesPacket",
										"14": "DistanceVisualizePacket",
										"15": "SourceInfoRequestPacket",
										"16": "SourceInfoPacket",
										"17": "SelfSourceInfoPacket",
										"18": "SourceAudioEndPacket",
										"19": "ActivationRegisterPacket",
										"20": "ActivationUnregisterPacket",
										"21": "SourceLineRegisterPacket",
										"22": "SourceLineUnregisterPacket",
										"23": "SourceLinePlayerAddPacket",
										"24": "SourceLinePlayerRemovePacket",
										"25": "SourceLinePlayersListPacket",
										"26": "AnimatedActionBarPacket",
									},
								},
							],
						},
						{
							name: "data",
							type: [
								"switch",
								{
									compareTo: "id",
									fields: {
										ConnectionPacket:
											"emotecraft_ConnectionPacket",
										PlayerInfoRequestPacket:
											"emotecraft_PlayerInfoRequestPacket",
										ConfigPacket: "emotecraft_ConfigPacket",
										ConfigPlayerInfoPacket:
											"emotecraft_ConfigPlayerInfoPacket",
										LanguageRequestPacket:
											"emotecraft_LanguageRequestPacket",
										LanguagePacket:
											"emotecraft_LanguagePacket",
										PlayerInfoUpdatePacket:
											"emotecraft_PlayerInfoUpdatePacket",
										PlayerDisconnectPacket:
											"emotecraft_PlayerDisconnectPacket",
										PlayerInfoPacket:
											"emotecraft_PlayerInfoPacket",
										PlayerStatePacket:
											"emotecraft_PlayerStatePacket",

										PlayerListPacket:
											"emotecraft_PlayerListPacket",
										SourceInfoRequestPacket:
											"emotecraft_SourceInfoRequestPacket",
										SourceInfoPacket:
											"emotecraft_SourceInfoPacket",
										SourceLineRegisterPacket:
											"emotecraft_SourceLineRegisterPacket",
										SourceAudioEndPacket:
											"emotecraft_SourceAudioEndPacket",
									},
									default: "void",
								},
							],
						},
					],
				],
			},
		},
	},
	udp: {
		types: {
			emotecraftudp_PingPacket: [
				"container",
				[
					{
						name: "currentTime",
						type: "long",
					},
				],
			],
			emotecraftudp_PlayerAudioPacket: [
				"container",
				[
					{
						name: "sequenceNumber",
						type: "long",
					},
					{
						name: "data",
						type: [
							"buffer",
							{
								countType: "int",
							},
						],
					},
					{
						name: "activationId",
						type: "uuid",
					},
					{
						name: "distance",
						type: "short",
					},
					{
						name: "stereo",
						type: "bool",
					},
				],
			],
			emotecraftudp_SourceAudioPacket: [
				"container",
				[
					{
						name: "sequenceNumber",
						type: "long",
					},
					{
						name: "data",
						type: [
							"buffer",
							{
								countType: "int",
							},
						],
					},
					{
						name: "sourceId",
						type: "uuid",
					},
					{
						name: "sourceState",
						type: "u8",
					},
					{
						name: "distance",
						type: "short",
					},
				],
			],
			emotecraftudp_SelfAudioInfoPacket: [
				"container",
				[
					{
						name: "sourceId",
						type: "uuid",
					},
					{
						name: "sequenceNumber",
						type: "long",
					},
					{
						name: "hasData",
						type: "bool",
					},
					{
						name: "data",
						type: [
							"switch",
							{
								compareTo: "hasData",
								fields: {
									false: "void",
									true: [
										"buffer",
										{
											countType: "int",
										},
									],
								},
								default: "void",
							},
						],
					},
					{
						name: "distance",
						type: "short",
					},
				],
			],
			emotecraftudp_packet: [
				"container",
				[
					{
						name: "magic_number",
						type: "int",
					},
					{
						name: "id",
						type: [
							"mapper",
							{
								type: "u8",
								mappings: {
									"1": "PingPacket",
									"2": "PlayerAudioPacket",
									"3": "SourceAudioPacket",
									"4": "SelfAudioInfoPacket",
									"256": "CustomPacket",
								},
							},
						],
					},
					{
						name: "secret",
						type: "uuid",
					},
					{
						name: "currentTime",
						type: "long",
					},
					{
						name: "data",
						type: [
							"switch",
							{
								compareTo: "id",
								fields: {
									PingPacket: "emotecraftudp_PingPacket",
									PlayerListPacket:
										"emotecraftudp_PlayerListPacket",
									PlayerAudioPacket:
										"emotecraftudp_PlayerAudioPacket",
									SourceAudioPacket:
										"emotecraftudp_SourceAudioPacket",
									SelfAudioInfoPacket:
										"emotecraftudp_SelfAudioInfoPacket",
								},
								default: "void",
							},
						],
					},
				],
			],
		},
	},
};
