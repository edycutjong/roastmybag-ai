import type { WalletStats, RoastResult } from './types';

export interface DemoProfile {
  id: number;
  stats: WalletStats;
  roast: RoastResult;
}

export const DEMO_PROFILES: DemoProfile[] = [
  {
    "id": 90000,
    "stats": {
      "totalMissedUsd": 9,
      "worstSell": {
        "tokenName": "TEST0 Token",
        "tokenSymbol": "TEST0",
        "contractAddress": "0x0000",
        "amountSold": 1000,
        "sellPrice": 1.0,
        "currentPrice": 2.0,
        "missedGains": 9,
        "sellDate": "2026-04-01",
        "txHash": "0xabc0"
      },
      "jeetScore": 99,
      "tokensJeeted": 1,
      "trades": [
        {
          "tokenName": "TEST0 Token",
          "tokenSymbol": "TEST0",
          "contractAddress": "0x0000",
          "amountSold": 1000,
          "sellPrice": 1.0,
          "currentPrice": 2.0,
          "missedGains": 9,
          "sellDate": "2026-04-01",
          "txHash": "0xabc0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $TEST0 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $9 today. You left $9 on the table. Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $TEST0 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $9 today.",
          "highlight": "$9"
        },
        {
          "type": "comparison",
          "text": "You left $9 on the table.",
          "highlight": "$9"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
          "highlight": "99/100"
        }
      ],
      "title": "Test Edge Case",
      "jeetScore": 99
    }
  },
  {
    "id": 90001,
    "stats": {
      "totalMissedUsd": 99,
      "worstSell": {
        "tokenName": "TEST1 Token",
        "tokenSymbol": "TEST1",
        "contractAddress": "0x0001",
        "amountSold": 1000,
        "sellPrice": 1.0,
        "currentPrice": 2.0,
        "missedGains": 99,
        "sellDate": "2026-04-01",
        "txHash": "0xabc1"
      },
      "jeetScore": 99,
      "tokensJeeted": 1,
      "trades": [
        {
          "tokenName": "TEST1 Token",
          "tokenSymbol": "TEST1",
          "contractAddress": "0x0001",
          "amountSold": 1000,
          "sellPrice": 1.0,
          "currentPrice": 2.0,
          "missedGains": 99,
          "sellDate": "2026-04-01",
          "txHash": "0xabc1"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $TEST1 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $99 today. You left $99 on the table. Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $TEST1 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $99 today.",
          "highlight": "$99"
        },
        {
          "type": "comparison",
          "text": "You left $99 on the table.",
          "highlight": "$99"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
          "highlight": "99/100"
        }
      ],
      "title": "Test Edge Case",
      "jeetScore": 99
    }
  },
  {
    "id": 90002,
    "stats": {
      "totalMissedUsd": 999,
      "worstSell": {
        "tokenName": "TEST2 Token",
        "tokenSymbol": "TEST2",
        "contractAddress": "0x0002",
        "amountSold": 1000,
        "sellPrice": 1.0,
        "currentPrice": 2.0,
        "missedGains": 999,
        "sellDate": "2026-04-01",
        "txHash": "0xabc2"
      },
      "jeetScore": 99,
      "tokensJeeted": 1,
      "trades": [
        {
          "tokenName": "TEST2 Token",
          "tokenSymbol": "TEST2",
          "contractAddress": "0x0002",
          "amountSold": 1000,
          "sellPrice": 1.0,
          "currentPrice": 2.0,
          "missedGains": 999,
          "sellDate": "2026-04-01",
          "txHash": "0xabc2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $TEST2 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $999 today. You left $999 on the table. Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $TEST2 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $999 today.",
          "highlight": "$999"
        },
        {
          "type": "comparison",
          "text": "You left $999 on the table.",
          "highlight": "$999"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
          "highlight": "99/100"
        }
      ],
      "title": "Test Edge Case",
      "jeetScore": 99
    }
  },
  {
    "id": 90003,
    "stats": {
      "totalMissedUsd": 9999,
      "worstSell": {
        "tokenName": "TEST3 Token",
        "tokenSymbol": "TEST3",
        "contractAddress": "0x0003",
        "amountSold": 1000,
        "sellPrice": 1.0,
        "currentPrice": 2.0,
        "missedGains": 9999,
        "sellDate": "2026-04-01",
        "txHash": "0xabc3"
      },
      "jeetScore": 99,
      "tokensJeeted": 1,
      "trades": [
        {
          "tokenName": "TEST3 Token",
          "tokenSymbol": "TEST3",
          "contractAddress": "0x0003",
          "amountSold": 1000,
          "sellPrice": 1.0,
          "currentPrice": 2.0,
          "missedGains": 9999,
          "sellDate": "2026-04-01",
          "txHash": "0xabc3"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $TEST3 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $9,999 today. You left $9,999 on the table. Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $TEST3 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $9,999 today.",
          "highlight": "$9,999"
        },
        {
          "type": "comparison",
          "text": "You left $9,999 on the table.",
          "highlight": "$9,999"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
          "highlight": "99/100"
        }
      ],
      "title": "Test Edge Case",
      "jeetScore": 99
    }
  },
  {
    "id": 90004,
    "stats": {
      "totalMissedUsd": 99999,
      "worstSell": {
        "tokenName": "TEST4 Token",
        "tokenSymbol": "TEST4",
        "contractAddress": "0x0004",
        "amountSold": 1000,
        "sellPrice": 1.0,
        "currentPrice": 2.0,
        "missedGains": 99999,
        "sellDate": "2026-04-01",
        "txHash": "0xabc4"
      },
      "jeetScore": 99,
      "tokensJeeted": 1,
      "trades": [
        {
          "tokenName": "TEST4 Token",
          "tokenSymbol": "TEST4",
          "contractAddress": "0x0004",
          "amountSold": 1000,
          "sellPrice": 1.0,
          "currentPrice": 2.0,
          "missedGains": 99999,
          "sellDate": "2026-04-01",
          "txHash": "0xabc4"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $TEST4 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $99,999 today. You left $99,999 on the table. Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $TEST4 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $99,999 today.",
          "highlight": "$99,999"
        },
        {
          "type": "comparison",
          "text": "You left $99,999 on the table.",
          "highlight": "$99,999"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
          "highlight": "99/100"
        }
      ],
      "title": "Test Edge Case",
      "jeetScore": 99
    }
  },
  {
    "id": 90005,
    "stats": {
      "totalMissedUsd": 999999,
      "worstSell": {
        "tokenName": "TEST5 Token",
        "tokenSymbol": "TEST5",
        "contractAddress": "0x0005",
        "amountSold": 1000,
        "sellPrice": 1.0,
        "currentPrice": 2.0,
        "missedGains": 999999,
        "sellDate": "2026-04-01",
        "txHash": "0xabc5"
      },
      "jeetScore": 99,
      "tokensJeeted": 1,
      "trades": [
        {
          "tokenName": "TEST5 Token",
          "tokenSymbol": "TEST5",
          "contractAddress": "0x0005",
          "amountSold": 1000,
          "sellPrice": 1.0,
          "currentPrice": 2.0,
          "missedGains": 999999,
          "sellDate": "2026-04-01",
          "txHash": "0xabc5"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $TEST5 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $999,999 today. You left $999,999 on the table. Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $TEST5 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $999,999 today.",
          "highlight": "$999,999"
        },
        {
          "type": "comparison",
          "text": "You left $999,999 on the table.",
          "highlight": "$999,999"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
          "highlight": "99/100"
        }
      ],
      "title": "Test Edge Case",
      "jeetScore": 99
    }
  },
  {
    "id": 90006,
    "stats": {
      "totalMissedUsd": 9999999,
      "worstSell": {
        "tokenName": "TEST6 Token",
        "tokenSymbol": "TEST6",
        "contractAddress": "0x0006",
        "amountSold": 1000,
        "sellPrice": 1.0,
        "currentPrice": 2.0,
        "missedGains": 9999999,
        "sellDate": "2026-04-01",
        "txHash": "0xabc6"
      },
      "jeetScore": 99,
      "tokensJeeted": 1,
      "trades": [
        {
          "tokenName": "TEST6 Token",
          "tokenSymbol": "TEST6",
          "contractAddress": "0x0006",
          "amountSold": 1000,
          "sellPrice": 1.0,
          "currentPrice": 2.0,
          "missedGains": 9999999,
          "sellDate": "2026-04-01",
          "txHash": "0xabc6"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $TEST6 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $9,999,999 today. You left $9,999,999 on the table. Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $TEST6 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $9,999,999 today.",
          "highlight": "$9,999,999"
        },
        {
          "type": "comparison",
          "text": "You left $9,999,999 on the table.",
          "highlight": "$9,999,999"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
          "highlight": "99/100"
        }
      ],
      "title": "Test Edge Case",
      "jeetScore": 99
    }
  },
  {
    "id": 90007,
    "stats": {
      "totalMissedUsd": 99999999,
      "worstSell": {
        "tokenName": "TEST7 Token",
        "tokenSymbol": "TEST7",
        "contractAddress": "0x0007",
        "amountSold": 1000,
        "sellPrice": 1.0,
        "currentPrice": 2.0,
        "missedGains": 99999999,
        "sellDate": "2026-04-01",
        "txHash": "0xabc7"
      },
      "jeetScore": 99,
      "tokensJeeted": 1,
      "trades": [
        {
          "tokenName": "TEST7 Token",
          "tokenSymbol": "TEST7",
          "contractAddress": "0x0007",
          "amountSold": 1000,
          "sellPrice": 1.0,
          "currentPrice": 2.0,
          "missedGains": 99999999,
          "sellDate": "2026-04-01",
          "txHash": "0xabc7"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $TEST7 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $99,999,999 today. You left $99,999,999 on the table. Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $TEST7 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $99,999,999 today.",
          "highlight": "$99,999,999"
        },
        {
          "type": "comparison",
          "text": "You left $99,999,999 on the table.",
          "highlight": "$99,999,999"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
          "highlight": "99/100"
        }
      ],
      "title": "Test Edge Case",
      "jeetScore": 99
    }
  },
  {
    "id": 90008,
    "stats": {
      "totalMissedUsd": 999999999,
      "worstSell": {
        "tokenName": "TEST8 Token",
        "tokenSymbol": "TEST8",
        "contractAddress": "0x0008",
        "amountSold": 1000,
        "sellPrice": 1.0,
        "currentPrice": 2.0,
        "missedGains": 999999999,
        "sellDate": "2026-04-01",
        "txHash": "0xabc8"
      },
      "jeetScore": 99,
      "tokensJeeted": 1,
      "trades": [
        {
          "tokenName": "TEST8 Token",
          "tokenSymbol": "TEST8",
          "contractAddress": "0x0008",
          "amountSold": 1000,
          "sellPrice": 1.0,
          "currentPrice": 2.0,
          "missedGains": 999999999,
          "sellDate": "2026-04-01",
          "txHash": "0xabc8"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $TEST8 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $999,999,999 today. You left $999,999,999 on the table. Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $TEST8 early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $999,999,999 today.",
          "highlight": "$999,999,999"
        },
        {
          "type": "comparison",
          "text": "You left $999,999,999 on the table.",
          "highlight": "$999,999,999"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 99 out of 100, you've earned the title of Test Edge Case.",
          "highlight": "99/100"
        }
      ],
      "title": "Test Edge Case",
      "jeetScore": 99
    }
  },

  {
    "id": 0,
    "stats": {
      "totalMissedUsd": 34964,
      "worstSell": {
        "tokenName": "DOGE Token",
        "tokenSymbol": "DOGE",
        "contractAddress": "0x78da09dcc0c9e000000000000000000000000000",
        "amountSold": 458801,
        "sellPrice": 0.018234,
        "currentPrice": 3.067423,
        "missedGains": 7624,
        "sellDate": "2026-04-01",
        "txHash": "0xabc0...3"
      },
      "jeetScore": 81,
      "tokensJeeted": 7,
      "trades": [
        {
          "tokenName": "DOGE Token",
          "tokenSymbol": "DOGE",
          "contractAddress": "0x78da09dcc0c9e000000000000000000000000000",
          "amountSold": 458801,
          "sellPrice": 0.018234,
          "currentPrice": 3.067423,
          "missedGains": 7624,
          "sellDate": "2026-04-01",
          "txHash": "0xabc0...3"
        },
        {
          "tokenName": "SLERF Token",
          "tokenSymbol": "SLERF",
          "contractAddress": "0xe58662cb650ba000000000000000000000000000",
          "amountSold": 670651,
          "sellPrice": 0.002944,
          "currentPrice": 8.268118,
          "missedGains": 7592,
          "sellDate": "2024-01-01",
          "txHash": "0xabc0...4"
        },
        {
          "tokenName": "BOME Token",
          "tokenSymbol": "BOME",
          "contractAddress": "0x564759501d69b000000000000000000000000000",
          "amountSold": 856692,
          "sellPrice": 0.021908,
          "currentPrice": 7.972859,
          "missedGains": 7012,
          "sellDate": "2025-09-01",
          "txHash": "0xabc0...0"
        },
        {
          "tokenName": "FLOKI Token",
          "tokenSymbol": "FLOKI",
          "contractAddress": "0xd3f3f88b56afa000000000000000000000000000",
          "amountSold": 7925,
          "sellPrice": 0.089628,
          "currentPrice": 5.267029,
          "missedGains": 6627,
          "sellDate": "2024-09-01",
          "txHash": "0xabc0...6"
        },
        {
          "tokenName": "WEN Token",
          "tokenSymbol": "WEN",
          "contractAddress": "0x764aaf0512b0b000000000000000000000000000",
          "amountSold": 78347,
          "sellPrice": 0.023219,
          "currentPrice": 9.947948,
          "missedGains": 3237,
          "sellDate": "2025-09-01",
          "txHash": "0xabc0...1"
        },
        {
          "tokenName": "POPCAT Token",
          "tokenSymbol": "POPCAT",
          "contractAddress": "0x2d740010fed1b000000000000000000000000000",
          "amountSold": 459486,
          "sellPrice": 0.097599,
          "currentPrice": 5.829905,
          "missedGains": 1611,
          "sellDate": "2026-03-01",
          "txHash": "0xabc0...5"
        },
        {
          "tokenName": "ARB Token",
          "tokenSymbol": "ARB",
          "contractAddress": "0x3242d15d12e51000000000000000000000000000",
          "amountSold": 129464,
          "sellPrice": 0.092503,
          "currentPrice": 9.679075,
          "missedGains": 1261,
          "sellDate": "2023-04-01",
          "txHash": "0xabc0...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $DOGE early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,624 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $SLERF right before it exploded too. You left $34,964 on the table across 7 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 81 out of 100, you've earned the title of Buy High Sell Low Specialist.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $DOGE early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,624 today. My GPU is literally crying for you.",
          "highlight": "$7,624"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $SLERF right before it exploded too.",
          "highlight": "$SLERF"
        },
        {
          "type": "comparison",
          "text": "You left $34,964 on the table across 7 tokens. That's life-changing money you just gave away.",
          "highlight": "$34,964"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 81 out of 100, you've earned the title of Buy High Sell Low Specialist.",
          "highlight": "81/100"
        }
      ],
      "title": "Buy High Sell Low Specialist",
      "jeetScore": 81
    }
  },
  {
    "id": 1,
    "stats": {
      "totalMissedUsd": 23660,
      "worstSell": {
        "tokenName": "AGIX Token",
        "tokenSymbol": "AGIX",
        "contractAddress": "0x437beeb2f3bb0000000000000000000000000000",
        "amountSold": 456167,
        "sellPrice": 0.022748,
        "currentPrice": 9.845043,
        "missedGains": 8077,
        "sellDate": "2026-12-01",
        "txHash": "0xabc1...6"
      },
      "jeetScore": 83,
      "tokensJeeted": 7,
      "trades": [
        {
          "tokenName": "AGIX Token",
          "tokenSymbol": "AGIX",
          "contractAddress": "0x437beeb2f3bb0000000000000000000000000000",
          "amountSold": 456167,
          "sellPrice": 0.022748,
          "currentPrice": 9.845043,
          "missedGains": 8077,
          "sellDate": "2026-12-01",
          "txHash": "0xabc1...6"
        },
        {
          "tokenName": "BOME Token",
          "tokenSymbol": "BOME",
          "contractAddress": "0x5b9821b1b8a5f000000000000000000000000000",
          "amountSold": 940784,
          "sellPrice": 0.038287,
          "currentPrice": 4.97232,
          "missedGains": 5591,
          "sellDate": "2023-02-01",
          "txHash": "0xabc1...3"
        },
        {
          "tokenName": "DOGE Token",
          "tokenSymbol": "DOGE",
          "contractAddress": "0x50d1ec62c6f5b000000000000000000000000000",
          "amountSold": 354358,
          "sellPrice": 0.006441,
          "currentPrice": 0.378526,
          "missedGains": 2533,
          "sellDate": "2026-10-01",
          "txHash": "0xabc1...4"
        },
        {
          "tokenName": "LADYS Token",
          "tokenSymbol": "LADYS",
          "contractAddress": "0x2cf02667a0b08000000000000000000000000000",
          "amountSold": 301103,
          "sellPrice": 0.041156,
          "currentPrice": 1.140287,
          "missedGains": 2480,
          "sellDate": "2026-06-01",
          "txHash": "0xabc1...0"
        },
        {
          "tokenName": "SEI Token",
          "tokenSymbol": "SEI",
          "contractAddress": "0x3c1d4dd4d214f000000000000000000000000000",
          "amountSold": 949136,
          "sellPrice": 0.083863,
          "currentPrice": 5.906011,
          "missedGains": 1892,
          "sellDate": "2026-02-01",
          "txHash": "0xabc1...2"
        },
        {
          "tokenName": "WIF Token",
          "tokenSymbol": "WIF",
          "contractAddress": "0x185cb5eb2e9a9000000000000000000000000000",
          "amountSold": 190626,
          "sellPrice": 0.079351,
          "currentPrice": 8.942042,
          "missedGains": 1666,
          "sellDate": "2025-12-01",
          "txHash": "0xabc1...5"
        },
        {
          "tokenName": "SPX Token",
          "tokenSymbol": "SPX",
          "contractAddress": "0x2f74ccf2e7131000000000000000000000000000",
          "amountSold": 672879,
          "sellPrice": 0.03119,
          "currentPrice": 4.926573,
          "missedGains": 1421,
          "sellDate": "2025-11-01",
          "txHash": "0xabc1...1"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $AGIX early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,077 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $BOME right before it exploded too. You left $23,660 on the table across 7 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 83 out of 100, you've earned the title of Paper Handed Peasant.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $AGIX early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,077 today. My GPU is literally crying for you.",
          "highlight": "$8,077"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $BOME right before it exploded too.",
          "highlight": "$BOME"
        },
        {
          "type": "comparison",
          "text": "You left $23,660 on the table across 7 tokens. That's life-changing money you just gave away.",
          "highlight": "$23,660"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 83 out of 100, you've earned the title of Paper Handed Peasant.",
          "highlight": "83/100"
        }
      ],
      "title": "Paper Handed Peasant",
      "jeetScore": 83
    }
  },
  {
    "id": 2,
    "stats": {
      "totalMissedUsd": 14405,
      "worstSell": {
        "tokenName": "DEGEN Token",
        "tokenSymbol": "DEGEN",
        "contractAddress": "0x1e085094e5ce2000000000000000000000000000",
        "amountSold": 949551,
        "sellPrice": 0.064862,
        "currentPrice": 1.299658,
        "missedGains": 7720,
        "sellDate": "2023-09-01",
        "txHash": "0xabc2...0"
      },
      "jeetScore": 86,
      "tokensJeeted": 4,
      "trades": [
        {
          "tokenName": "DEGEN Token",
          "tokenSymbol": "DEGEN",
          "contractAddress": "0x1e085094e5ce2000000000000000000000000000",
          "amountSold": 949551,
          "sellPrice": 0.064862,
          "currentPrice": 1.299658,
          "missedGains": 7720,
          "sellDate": "2023-09-01",
          "txHash": "0xabc2...0"
        },
        {
          "tokenName": "SATS Token",
          "tokenSymbol": "SATS",
          "contractAddress": "0x25a9c88bed156000000000000000000000000000",
          "amountSold": 232829,
          "sellPrice": 0.009385,
          "currentPrice": 6.598573,
          "missedGains": 3328,
          "sellDate": "2025-02-01",
          "txHash": "0xabc2...3"
        },
        {
          "tokenName": "WIF Token",
          "tokenSymbol": "WIF",
          "contractAddress": "0x6d745dc08afee000000000000000000000000000",
          "amountSold": 101791,
          "sellPrice": 0.079242,
          "currentPrice": 7.425653,
          "missedGains": 1815,
          "sellDate": "2026-04-01",
          "txHash": "0xabc2...1"
        },
        {
          "tokenName": "RNDR Token",
          "tokenSymbol": "RNDR",
          "contractAddress": "0x16504afdc9730000000000000000000000000000",
          "amountSold": 722857,
          "sellPrice": 0.047866,
          "currentPrice": 3.583602,
          "missedGains": 1542,
          "sellDate": "2026-03-01",
          "txHash": "0xabc2...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $DEGEN early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,720 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $SATS right before it exploded too. You left $14,405 on the table across 4 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 86 out of 100, you've earned the title of Buy High Sell Low Specialist.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $DEGEN early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,720 today. My GPU is literally crying for you.",
          "highlight": "$7,720"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $SATS right before it exploded too.",
          "highlight": "$SATS"
        },
        {
          "type": "comparison",
          "text": "You left $14,405 on the table across 4 tokens. That's life-changing money you just gave away.",
          "highlight": "$14,405"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 86 out of 100, you've earned the title of Buy High Sell Low Specialist.",
          "highlight": "86/100"
        }
      ],
      "title": "Buy High Sell Low Specialist",
      "jeetScore": 86
    }
  },
  {
    "id": 3,
    "stats": {
      "totalMissedUsd": 17732,
      "worstSell": {
        "tokenName": "MOG Token",
        "tokenSymbol": "MOG",
        "contractAddress": "0x6bec93f91f70e000000000000000000000000000",
        "amountSold": 896277,
        "sellPrice": 0.003017,
        "currentPrice": 2.818153,
        "missedGains": 7891,
        "sellDate": "2023-03-01",
        "txHash": "0xabc3...2"
      },
      "jeetScore": 94,
      "tokensJeeted": 6,
      "trades": [
        {
          "tokenName": "MOG Token",
          "tokenSymbol": "MOG",
          "contractAddress": "0x6bec93f91f70e000000000000000000000000000",
          "amountSold": 896277,
          "sellPrice": 0.003017,
          "currentPrice": 2.818153,
          "missedGains": 7891,
          "sellDate": "2023-03-01",
          "txHash": "0xabc3...2"
        },
        {
          "tokenName": "COQ Token",
          "tokenSymbol": "COQ",
          "contractAddress": "0xf7f3322d3bee0000000000000000000000000000",
          "amountSold": 160742,
          "sellPrice": 0.028967,
          "currentPrice": 6.001669,
          "missedGains": 3937,
          "sellDate": "2023-11-01",
          "txHash": "0xabc3...0"
        },
        {
          "tokenName": "BRETT Token",
          "tokenSymbol": "BRETT",
          "contractAddress": "0x1345c0c1e42a4000000000000000000000000000",
          "amountSold": 23815,
          "sellPrice": 0.043111,
          "currentPrice": 2.346968,
          "missedGains": 3397,
          "sellDate": "2024-04-01",
          "txHash": "0xabc3...3"
        },
        {
          "tokenName": "PEPE Token",
          "tokenSymbol": "PEPE",
          "contractAddress": "0x9231dbc0f46de000000000000000000000000000",
          "amountSold": 643082,
          "sellPrice": 0.015182,
          "currentPrice": 5.58791,
          "missedGains": 1923,
          "sellDate": "2026-03-01",
          "txHash": "0xabc3...4"
        },
        {
          "tokenName": "TIA Token",
          "tokenSymbol": "TIA",
          "contractAddress": "0xfb022c209f694000000000000000000000000000",
          "amountSold": 310790,
          "sellPrice": 0.029666,
          "currentPrice": 8.479621,
          "missedGains": 413,
          "sellDate": "2024-04-01",
          "txHash": "0xabc3...1"
        },
        {
          "tokenName": "MEME Token",
          "tokenSymbol": "MEME",
          "contractAddress": "0xc3e599d8b36a3000000000000000000000000000",
          "amountSold": 2864,
          "sellPrice": 0.063983,
          "currentPrice": 7.270434,
          "missedGains": 171,
          "sellDate": "2024-03-01",
          "txHash": "0xabc3...5"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $MOG early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,891 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $COQ right before it exploded too. You left $17,732 on the table across 6 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 94 out of 100, you've earned the title of Master of Missed Gains.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $MOG early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,891 today. My GPU is literally crying for you.",
          "highlight": "$7,891"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $COQ right before it exploded too.",
          "highlight": "$COQ"
        },
        {
          "type": "comparison",
          "text": "You left $17,732 on the table across 6 tokens. That's life-changing money you just gave away.",
          "highlight": "$17,732"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 94 out of 100, you've earned the title of Master of Missed Gains.",
          "highlight": "94/100"
        }
      ],
      "title": "Master of Missed Gains",
      "jeetScore": 94
    }
  },
  {
    "id": 4,
    "stats": {
      "totalMissedUsd": 17709,
      "worstSell": {
        "tokenName": "SATS Token",
        "tokenSymbol": "SATS",
        "contractAddress": "0xc11095a7d2c2b000000000000000000000000000",
        "amountSold": 897681,
        "sellPrice": 0.060852,
        "currentPrice": 6.356443,
        "missedGains": 7144,
        "sellDate": "2026-10-01",
        "txHash": "0xabc4...2"
      },
      "jeetScore": 77,
      "tokensJeeted": 6,
      "trades": [
        {
          "tokenName": "SATS Token",
          "tokenSymbol": "SATS",
          "contractAddress": "0xc11095a7d2c2b000000000000000000000000000",
          "amountSold": 897681,
          "sellPrice": 0.060852,
          "currentPrice": 6.356443,
          "missedGains": 7144,
          "sellDate": "2026-10-01",
          "txHash": "0xabc4...2"
        },
        {
          "tokenName": "SEI Token",
          "tokenSymbol": "SEI",
          "contractAddress": "0x9dee03fda8e2c000000000000000000000000000",
          "amountSold": 888031,
          "sellPrice": 0.066319,
          "currentPrice": 2.436402,
          "missedGains": 3145,
          "sellDate": "2025-10-01",
          "txHash": "0xabc4...4"
        },
        {
          "tokenName": "DOGE Token",
          "tokenSymbol": "DOGE",
          "contractAddress": "0xa21589fa7c48b000000000000000000000000000",
          "amountSold": 778572,
          "sellPrice": 0.082566,
          "currentPrice": 2.370246,
          "missedGains": 2678,
          "sellDate": "2023-10-01",
          "txHash": "0xabc4...0"
        },
        {
          "tokenName": "FLOKI Token",
          "tokenSymbol": "FLOKI",
          "contractAddress": "0x97be78ca401f1000000000000000000000000000",
          "amountSold": 537821,
          "sellPrice": 0.028052,
          "currentPrice": 9.706025,
          "missedGains": 2300,
          "sellDate": "2025-04-01",
          "txHash": "0xabc4...5"
        },
        {
          "tokenName": "WIF Token",
          "tokenSymbol": "WIF",
          "contractAddress": "0x457ab75818df9000000000000000000000000000",
          "amountSold": 744084,
          "sellPrice": 0.051633,
          "currentPrice": 0.706474,
          "missedGains": 1697,
          "sellDate": "2024-11-01",
          "txHash": "0xabc4...1"
        },
        {
          "tokenName": "MYRO Token",
          "tokenSymbol": "MYRO",
          "contractAddress": "0x3b6669f0bc921000000000000000000000000000",
          "amountSold": 154199,
          "sellPrice": 0.068312,
          "currentPrice": 8.737444,
          "missedGains": 745,
          "sellDate": "2024-03-01",
          "txHash": "0xabc4...3"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $SATS early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,144 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $SEI right before it exploded too. You left $17,709 on the table across 6 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 77 out of 100, you've earned the title of Exit Liquidity Provider.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $SATS early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,144 today. My GPU is literally crying for you.",
          "highlight": "$7,144"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $SEI right before it exploded too.",
          "highlight": "$SEI"
        },
        {
          "type": "comparison",
          "text": "You left $17,709 on the table across 6 tokens. That's life-changing money you just gave away.",
          "highlight": "$17,709"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 77 out of 100, you've earned the title of Exit Liquidity Provider.",
          "highlight": "77/100"
        }
      ],
      "title": "Exit Liquidity Provider",
      "jeetScore": 77
    }
  },
  {
    "id": 5,
    "stats": {
      "totalMissedUsd": 36472,
      "worstSell": {
        "tokenName": "MOG Token",
        "tokenSymbol": "MOG",
        "contractAddress": "0x433603a6e489d000000000000000000000000000",
        "amountSold": 539440,
        "sellPrice": 0.009883,
        "currentPrice": 7.831222,
        "missedGains": 8398,
        "sellDate": "2026-12-01",
        "txHash": "0xabc5...4"
      },
      "jeetScore": 82,
      "tokensJeeted": 6,
      "trades": [
        {
          "tokenName": "MOG Token",
          "tokenSymbol": "MOG",
          "contractAddress": "0x433603a6e489d000000000000000000000000000",
          "amountSold": 539440,
          "sellPrice": 0.009883,
          "currentPrice": 7.831222,
          "missedGains": 8398,
          "sellDate": "2026-12-01",
          "txHash": "0xabc5...4"
        },
        {
          "tokenName": "PENDLE Token",
          "tokenSymbol": "PENDLE",
          "contractAddress": "0xd21b852a6ab1b000000000000000000000000000",
          "amountSold": 614979,
          "sellPrice": 0.045833,
          "currentPrice": 2.678912,
          "missedGains": 7176,
          "sellDate": "2026-06-01",
          "txHash": "0xabc5...3"
        },
        {
          "tokenName": "MEME Token",
          "tokenSymbol": "MEME",
          "contractAddress": "0x0fa5ca6541ae1000000000000000000000000000",
          "amountSold": 306215,
          "sellPrice": 0.058706,
          "currentPrice": 9.188774,
          "missedGains": 6579,
          "sellDate": "2023-05-01",
          "txHash": "0xabc5...1"
        },
        {
          "tokenName": "RATS Token",
          "tokenSymbol": "RATS",
          "contractAddress": "0x26c1c5b462eee000000000000000000000000000",
          "amountSold": 850249,
          "sellPrice": 0.091359,
          "currentPrice": 8.850509,
          "missedGains": 5838,
          "sellDate": "2026-07-01",
          "txHash": "0xabc5...2"
        },
        {
          "tokenName": "WIF Token",
          "tokenSymbol": "WIF",
          "contractAddress": "0x3a647692414f1000000000000000000000000000",
          "amountSold": 745486,
          "sellPrice": 0.05046,
          "currentPrice": 3.274588,
          "missedGains": 4800,
          "sellDate": "2026-05-01",
          "txHash": "0xabc5...5"
        },
        {
          "tokenName": "GMX Token",
          "tokenSymbol": "GMX",
          "contractAddress": "0x099fbda6bcd14000000000000000000000000000",
          "amountSold": 149179,
          "sellPrice": 0.011962,
          "currentPrice": 3.477227,
          "missedGains": 3681,
          "sellDate": "2024-07-01",
          "txHash": "0xabc5...0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $MOG early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,398 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $PENDLE right before it exploded too. You left $36,472 on the table across 6 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 82 out of 100, you've earned the title of Buy High Sell Low Specialist.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $MOG early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,398 today. My GPU is literally crying for you.",
          "highlight": "$8,398"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $PENDLE right before it exploded too.",
          "highlight": "$PENDLE"
        },
        {
          "type": "comparison",
          "text": "You left $36,472 on the table across 6 tokens. That's life-changing money you just gave away.",
          "highlight": "$36,472"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 82 out of 100, you've earned the title of Buy High Sell Low Specialist.",
          "highlight": "82/100"
        }
      ],
      "title": "Buy High Sell Low Specialist",
      "jeetScore": 82
    }
  },
  {
    "id": 6,
    "stats": {
      "totalMissedUsd": 24005,
      "worstSell": {
        "tokenName": "APT Token",
        "tokenSymbol": "APT",
        "contractAddress": "0xfb0128f5bcceb000000000000000000000000000",
        "amountSold": 94524,
        "sellPrice": 0.081091,
        "currentPrice": 9.029815,
        "missedGains": 5188,
        "sellDate": "2024-10-01",
        "txHash": "0xabc6...5"
      },
      "jeetScore": 83,
      "tokensJeeted": 7,
      "trades": [
        {
          "tokenName": "APT Token",
          "tokenSymbol": "APT",
          "contractAddress": "0xfb0128f5bcceb000000000000000000000000000",
          "amountSold": 94524,
          "sellPrice": 0.081091,
          "currentPrice": 9.029815,
          "missedGains": 5188,
          "sellDate": "2024-10-01",
          "txHash": "0xabc6...5"
        },
        {
          "tokenName": "FLOKI Token",
          "tokenSymbol": "FLOKI",
          "contractAddress": "0x8ba64478918ce000000000000000000000000000",
          "amountSold": 406009,
          "sellPrice": 0.088958,
          "currentPrice": 2.610522,
          "missedGains": 4778,
          "sellDate": "2023-01-01",
          "txHash": "0xabc6...4"
        },
        {
          "tokenName": "SUI Token",
          "tokenSymbol": "SUI",
          "contractAddress": "0x285637e4e90a9000000000000000000000000000",
          "amountSold": 679882,
          "sellPrice": 0.086551,
          "currentPrice": 4.216968,
          "missedGains": 4543,
          "sellDate": "2023-03-01",
          "txHash": "0xabc6...3"
        },
        {
          "tokenName": "TURBO Token",
          "tokenSymbol": "TURBO",
          "contractAddress": "0x4ecd2aef2ac77000000000000000000000000000",
          "amountSold": 697363,
          "sellPrice": 0.053299,
          "currentPrice": 5.052138,
          "missedGains": 4011,
          "sellDate": "2024-01-01",
          "txHash": "0xabc6...1"
        },
        {
          "tokenName": "SATS Token",
          "tokenSymbol": "SATS",
          "contractAddress": "0xf6777f61512f6000000000000000000000000000",
          "amountSold": 803091,
          "sellPrice": 0.07478,
          "currentPrice": 6.844998,
          "missedGains": 3055,
          "sellDate": "2023-08-01",
          "txHash": "0xabc6...2"
        },
        {
          "tokenName": "PEPE Token",
          "tokenSymbol": "PEPE",
          "contractAddress": "0x84188b6854fec000000000000000000000000000",
          "amountSold": 290519,
          "sellPrice": 0.00836,
          "currentPrice": 6.103588,
          "missedGains": 2263,
          "sellDate": "2026-05-01",
          "txHash": "0xabc6...0"
        },
        {
          "tokenName": "SAMO Token",
          "tokenSymbol": "SAMO",
          "contractAddress": "0xe9380658fe726000000000000000000000000000",
          "amountSold": 274061,
          "sellPrice": 0.007495,
          "currentPrice": 1.214424,
          "missedGains": 167,
          "sellDate": "2025-07-01",
          "txHash": "0xabc6...6"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $APT early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $5,188 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $FLOKI right before it exploded too. You left $24,005 on the table across 7 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 83 out of 100, you've earned the title of The 10% Profit Prodigy.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $APT early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $5,188 today. My GPU is literally crying for you.",
          "highlight": "$5,188"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $FLOKI right before it exploded too.",
          "highlight": "$FLOKI"
        },
        {
          "type": "comparison",
          "text": "You left $24,005 on the table across 7 tokens. That's life-changing money you just gave away.",
          "highlight": "$24,005"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 83 out of 100, you've earned the title of The 10% Profit Prodigy.",
          "highlight": "83/100"
        }
      ],
      "title": "The 10% Profit Prodigy",
      "jeetScore": 83
    }
  },
  {
    "id": 7,
    "stats": {
      "totalMissedUsd": 11425,
      "worstSell": {
        "tokenName": "FET Token",
        "tokenSymbol": "FET",
        "contractAddress": "0x46a2c48562844000000000000000000000000000",
        "amountSold": 712748,
        "sellPrice": 0.02069,
        "currentPrice": 2.443976,
        "missedGains": 5788,
        "sellDate": "2024-03-01",
        "txHash": "0xabc7...0"
      },
      "jeetScore": 97,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "FET Token",
          "tokenSymbol": "FET",
          "contractAddress": "0x46a2c48562844000000000000000000000000000",
          "amountSold": 712748,
          "sellPrice": 0.02069,
          "currentPrice": 2.443976,
          "missedGains": 5788,
          "sellDate": "2024-03-01",
          "txHash": "0xabc7...0"
        },
        {
          "tokenName": "AGIX Token",
          "tokenSymbol": "AGIX",
          "contractAddress": "0x4d5761d537a51000000000000000000000000000",
          "amountSold": 238136,
          "sellPrice": 0.072614,
          "currentPrice": 0.912203,
          "missedGains": 3437,
          "sellDate": "2025-03-01",
          "txHash": "0xabc7...2"
        },
        {
          "tokenName": "OP Token",
          "tokenSymbol": "OP",
          "contractAddress": "0xa60a4b4d387a0000000000000000000000000000",
          "amountSold": 645266,
          "sellPrice": 0.067969,
          "currentPrice": 9.19266,
          "missedGains": 2200,
          "sellDate": "2024-01-01",
          "txHash": "0xabc7...1"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $FET early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $5,788 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $AGIX right before it exploded too. You left $11,425 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 97 out of 100, you've earned the title of Exit Liquidity Provider.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $FET early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $5,788 today. My GPU is literally crying for you.",
          "highlight": "$5,788"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $AGIX right before it exploded too.",
          "highlight": "$AGIX"
        },
        {
          "type": "comparison",
          "text": "You left $11,425 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$11,425"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 97 out of 100, you've earned the title of Exit Liquidity Provider.",
          "highlight": "97/100"
        }
      ],
      "title": "Exit Liquidity Provider",
      "jeetScore": 97
    }
  },
  {
    "id": 8,
    "stats": {
      "totalMissedUsd": 19410,
      "worstSell": {
        "tokenName": "POPCAT Token",
        "tokenSymbol": "POPCAT",
        "contractAddress": "0x5dc29ca9bb406000000000000000000000000000",
        "amountSold": 474052,
        "sellPrice": 0.034346,
        "currentPrice": 3.221822,
        "missedGains": 6164,
        "sellDate": "2023-02-01",
        "txHash": "0xabc8...3"
      },
      "jeetScore": 60,
      "tokensJeeted": 5,
      "trades": [
        {
          "tokenName": "POPCAT Token",
          "tokenSymbol": "POPCAT",
          "contractAddress": "0x5dc29ca9bb406000000000000000000000000000",
          "amountSold": 474052,
          "sellPrice": 0.034346,
          "currentPrice": 3.221822,
          "missedGains": 6164,
          "sellDate": "2023-02-01",
          "txHash": "0xabc8...3"
        },
        {
          "tokenName": "OP Token",
          "tokenSymbol": "OP",
          "contractAddress": "0x85fb4064a5b3e000000000000000000000000000",
          "amountSold": 734482,
          "sellPrice": 0.03622,
          "currentPrice": 2.964336,
          "missedGains": 5437,
          "sellDate": "2025-10-01",
          "txHash": "0xabc8...4"
        },
        {
          "tokenName": "TIA Token",
          "tokenSymbol": "TIA",
          "contractAddress": "0x81e1265ccae81000000000000000000000000000",
          "amountSold": 883610,
          "sellPrice": 0.092225,
          "currentPrice": 6.935646,
          "missedGains": 3916,
          "sellDate": "2023-08-01",
          "txHash": "0xabc8...2"
        },
        {
          "tokenName": "GMX Token",
          "tokenSymbol": "GMX",
          "contractAddress": "0xcfef41677dadc000000000000000000000000000",
          "amountSold": 122558,
          "sellPrice": 0.041473,
          "currentPrice": 6.660111,
          "missedGains": 3340,
          "sellDate": "2026-10-01",
          "txHash": "0xabc8...1"
        },
        {
          "tokenName": "WEN Token",
          "tokenSymbol": "WEN",
          "contractAddress": "0x32dff4d3cc118000000000000000000000000000",
          "amountSold": 552166,
          "sellPrice": 0.026042,
          "currentPrice": 5.011218,
          "missedGains": 553,
          "sellDate": "2023-02-01",
          "txHash": "0xabc8...0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $POPCAT early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $6,164 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $OP right before it exploded too. You left $19,410 on the table across 5 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 60 out of 100, you've earned the title of Exit Liquidity Provider.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $POPCAT early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $6,164 today. My GPU is literally crying for you.",
          "highlight": "$6,164"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $OP right before it exploded too.",
          "highlight": "$OP"
        },
        {
          "type": "comparison",
          "text": "You left $19,410 on the table across 5 tokens. That's life-changing money you just gave away.",
          "highlight": "$19,410"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 60 out of 100, you've earned the title of Exit Liquidity Provider.",
          "highlight": "60/100"
        }
      ],
      "title": "Exit Liquidity Provider",
      "jeetScore": 60
    }
  },
  {
    "id": 9,
    "stats": {
      "totalMissedUsd": 9733,
      "worstSell": {
        "tokenName": "SAMO Token",
        "tokenSymbol": "SAMO",
        "contractAddress": "0x1c986359b972a000000000000000000000000000",
        "amountSold": 306323,
        "sellPrice": 0.026763,
        "currentPrice": 8.203157,
        "missedGains": 6427,
        "sellDate": "2026-10-01",
        "txHash": "0xabc9...0"
      },
      "jeetScore": 70,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "SAMO Token",
          "tokenSymbol": "SAMO",
          "contractAddress": "0x1c986359b972a000000000000000000000000000",
          "amountSold": 306323,
          "sellPrice": 0.026763,
          "currentPrice": 8.203157,
          "missedGains": 6427,
          "sellDate": "2026-10-01",
          "txHash": "0xabc9...0"
        },
        {
          "tokenName": "PORK Token",
          "tokenSymbol": "PORK",
          "contractAddress": "0x4386b4ec19680000000000000000000000000000",
          "amountSold": 584971,
          "sellPrice": 0.013842,
          "currentPrice": 2.66647,
          "missedGains": 1857,
          "sellDate": "2025-12-01",
          "txHash": "0xabc9...2"
        },
        {
          "tokenName": "POPCAT Token",
          "tokenSymbol": "POPCAT",
          "contractAddress": "0x61a5791c14125000000000000000000000000000",
          "amountSold": 103029,
          "sellPrice": 0.079611,
          "currentPrice": 1.393791,
          "missedGains": 1449,
          "sellDate": "2024-01-01",
          "txHash": "0xabc9...1"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $SAMO early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $6,427 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $PORK right before it exploded too. You left $9,733 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 70 out of 100, you've earned the title of Generational Fumble Champion.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $SAMO early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $6,427 today. My GPU is literally crying for you.",
          "highlight": "$6,427"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $PORK right before it exploded too.",
          "highlight": "$PORK"
        },
        {
          "type": "comparison",
          "text": "You left $9,733 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$9,733"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 70 out of 100, you've earned the title of Generational Fumble Champion.",
          "highlight": "70/100"
        }
      ],
      "title": "Generational Fumble Champion",
      "jeetScore": 70
    }
  },
  {
    "id": 10,
    "stats": {
      "totalMissedUsd": 28598,
      "worstSell": {
        "tokenName": "COQ Token",
        "tokenSymbol": "COQ",
        "contractAddress": "0x3e83a7b5e9564000000000000000000000000000",
        "amountSold": 299402,
        "sellPrice": 0.057248,
        "currentPrice": 6.656993,
        "missedGains": 8844,
        "sellDate": "2024-11-01",
        "txHash": "0xabc10...2"
      },
      "jeetScore": 86,
      "tokensJeeted": 6,
      "trades": [
        {
          "tokenName": "COQ Token",
          "tokenSymbol": "COQ",
          "contractAddress": "0x3e83a7b5e9564000000000000000000000000000",
          "amountSold": 299402,
          "sellPrice": 0.057248,
          "currentPrice": 6.656993,
          "missedGains": 8844,
          "sellDate": "2024-11-01",
          "txHash": "0xabc10...2"
        },
        {
          "tokenName": "FLOKI Token",
          "tokenSymbol": "FLOKI",
          "contractAddress": "0x0d3f043846b78000000000000000000000000000",
          "amountSold": 909124,
          "sellPrice": 0.05898,
          "currentPrice": 6.888517,
          "missedGains": 7210,
          "sellDate": "2026-02-01",
          "txHash": "0xabc10...1"
        },
        {
          "tokenName": "SATS Token",
          "tokenSymbol": "SATS",
          "contractAddress": "0x051bfd112cac8000000000000000000000000000",
          "amountSold": 637715,
          "sellPrice": 0.070525,
          "currentPrice": 3.722849,
          "missedGains": 3952,
          "sellDate": "2026-12-01",
          "txHash": "0xabc10...3"
        },
        {
          "tokenName": "TAO Token",
          "tokenSymbol": "TAO",
          "contractAddress": "0x83603db99cf8a000000000000000000000000000",
          "amountSold": 79436,
          "sellPrice": 0.052599,
          "currentPrice": 0.235692,
          "missedGains": 3204,
          "sellDate": "2025-09-01",
          "txHash": "0xabc10...5"
        },
        {
          "tokenName": "SHIB Token",
          "tokenSymbol": "SHIB",
          "contractAddress": "0xc2be6e3776cb4000000000000000000000000000",
          "amountSold": 2607,
          "sellPrice": 0.059313,
          "currentPrice": 4.167755,
          "missedGains": 3043,
          "sellDate": "2023-11-01",
          "txHash": "0xabc10...0"
        },
        {
          "tokenName": "ORDI Token",
          "tokenSymbol": "ORDI",
          "contractAddress": "0x4cf3df3e57a43000000000000000000000000000",
          "amountSold": 896325,
          "sellPrice": 0.055724,
          "currentPrice": 7.078611,
          "missedGains": 2345,
          "sellDate": "2023-01-01",
          "txHash": "0xabc10...4"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $COQ early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,844 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $FLOKI right before it exploded too. You left $28,598 on the table across 6 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 86 out of 100, you've earned the title of Buy High Sell Low Specialist.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $COQ early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,844 today. My GPU is literally crying for you.",
          "highlight": "$8,844"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $FLOKI right before it exploded too.",
          "highlight": "$FLOKI"
        },
        {
          "type": "comparison",
          "text": "You left $28,598 on the table across 6 tokens. That's life-changing money you just gave away.",
          "highlight": "$28,598"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 86 out of 100, you've earned the title of Buy High Sell Low Specialist.",
          "highlight": "86/100"
        }
      ],
      "title": "Buy High Sell Low Specialist",
      "jeetScore": 86
    }
  },
  {
    "id": 11,
    "stats": {
      "totalMissedUsd": 12941,
      "worstSell": {
        "tokenName": "PORK Token",
        "tokenSymbol": "PORK",
        "contractAddress": "0xbbe61bedf04e0000000000000000000000000000",
        "amountSold": 966520,
        "sellPrice": 0.012988,
        "currentPrice": 5.665208,
        "missedGains": 4581,
        "sellDate": "2024-11-01",
        "txHash": "0xabc11...3"
      },
      "jeetScore": 60,
      "tokensJeeted": 4,
      "trades": [
        {
          "tokenName": "PORK Token",
          "tokenSymbol": "PORK",
          "contractAddress": "0xbbe61bedf04e0000000000000000000000000000",
          "amountSold": 966520,
          "sellPrice": 0.012988,
          "currentPrice": 5.665208,
          "missedGains": 4581,
          "sellDate": "2024-11-01",
          "txHash": "0xabc11...3"
        },
        {
          "tokenName": "DOGE Token",
          "tokenSymbol": "DOGE",
          "contractAddress": "0x0a53f602bb64c000000000000000000000000000",
          "amountSold": 362788,
          "sellPrice": 0.015023,
          "currentPrice": 6.391841,
          "missedGains": 4547,
          "sellDate": "2025-07-01",
          "txHash": "0xabc11...1"
        },
        {
          "tokenName": "BONK Token",
          "tokenSymbol": "BONK",
          "contractAddress": "0x476cebd851537000000000000000000000000000",
          "amountSold": 105527,
          "sellPrice": 0.087795,
          "currentPrice": 5.051766,
          "missedGains": 2128,
          "sellDate": "2023-06-01",
          "txHash": "0xabc11...0"
        },
        {
          "tokenName": "AGIX Token",
          "tokenSymbol": "AGIX",
          "contractAddress": "0xa3a0843bf6d40000000000000000000000000000",
          "amountSold": 276748,
          "sellPrice": 0.027706,
          "currentPrice": 2.55825,
          "missedGains": 1685,
          "sellDate": "2024-03-01",
          "txHash": "0xabc11...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $PORK early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $4,581 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $DOGE right before it exploded too. You left $12,941 on the table across 4 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 60 out of 100, you've earned the title of Paper Handed Peasant.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $PORK early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $4,581 today. My GPU is literally crying for you.",
          "highlight": "$4,581"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $DOGE right before it exploded too.",
          "highlight": "$DOGE"
        },
        {
          "type": "comparison",
          "text": "You left $12,941 on the table across 4 tokens. That's life-changing money you just gave away.",
          "highlight": "$12,941"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 60 out of 100, you've earned the title of Paper Handed Peasant.",
          "highlight": "60/100"
        }
      ],
      "title": "Paper Handed Peasant",
      "jeetScore": 60
    }
  },
  {
    "id": 12,
    "stats": {
      "totalMissedUsd": 18075,
      "worstSell": {
        "tokenName": "POPCAT Token",
        "tokenSymbol": "POPCAT",
        "contractAddress": "0xe346cc2ae8c78000000000000000000000000000",
        "amountSold": 608058,
        "sellPrice": 0.030403,
        "currentPrice": 6.831157,
        "missedGains": 8717,
        "sellDate": "2024-05-01",
        "txHash": "0xabc12...0"
      },
      "jeetScore": 80,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "POPCAT Token",
          "tokenSymbol": "POPCAT",
          "contractAddress": "0xe346cc2ae8c78000000000000000000000000000",
          "amountSold": 608058,
          "sellPrice": 0.030403,
          "currentPrice": 6.831157,
          "missedGains": 8717,
          "sellDate": "2024-05-01",
          "txHash": "0xabc12...0"
        },
        {
          "tokenName": "SLERF Token",
          "tokenSymbol": "SLERF",
          "contractAddress": "0x2ea06d424d008000000000000000000000000000",
          "amountSold": 771488,
          "sellPrice": 0.091536,
          "currentPrice": 3.830434,
          "missedGains": 7645,
          "sellDate": "2025-12-01",
          "txHash": "0xabc12...1"
        },
        {
          "tokenName": "LADYS Token",
          "tokenSymbol": "LADYS",
          "contractAddress": "0x369da5e90790e000000000000000000000000000",
          "amountSold": 197673,
          "sellPrice": 0.060723,
          "currentPrice": 7.771481,
          "missedGains": 1713,
          "sellDate": "2026-08-01",
          "txHash": "0xabc12...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $POPCAT early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,717 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $SLERF right before it exploded too. You left $18,075 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 80 out of 100, you've earned the title of Paper Handed Peasant.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $POPCAT early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,717 today. My GPU is literally crying for you.",
          "highlight": "$8,717"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $SLERF right before it exploded too.",
          "highlight": "$SLERF"
        },
        {
          "type": "comparison",
          "text": "You left $18,075 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$18,075"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 80 out of 100, you've earned the title of Paper Handed Peasant.",
          "highlight": "80/100"
        }
      ],
      "title": "Paper Handed Peasant",
      "jeetScore": 80
    }
  },
  {
    "id": 13,
    "stats": {
      "totalMissedUsd": 16433,
      "worstSell": {
        "tokenName": "RNDR Token",
        "tokenSymbol": "RNDR",
        "contractAddress": "0xe371ebb520a7d000000000000000000000000000",
        "amountSold": 141402,
        "sellPrice": 0.005441,
        "currentPrice": 3.029343,
        "missedGains": 5914,
        "sellDate": "2025-12-01",
        "txHash": "0xabc13...2"
      },
      "jeetScore": 86,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "RNDR Token",
          "tokenSymbol": "RNDR",
          "contractAddress": "0xe371ebb520a7d000000000000000000000000000",
          "amountSold": 141402,
          "sellPrice": 0.005441,
          "currentPrice": 3.029343,
          "missedGains": 5914,
          "sellDate": "2025-12-01",
          "txHash": "0xabc13...2"
        },
        {
          "tokenName": "DOGE Token",
          "tokenSymbol": "DOGE",
          "contractAddress": "0xe8b511823f1b7000000000000000000000000000",
          "amountSold": 424133,
          "sellPrice": 0.033398,
          "currentPrice": 8.127193,
          "missedGains": 5709,
          "sellDate": "2026-08-01",
          "txHash": "0xabc13...0"
        },
        {
          "tokenName": "WEN Token",
          "tokenSymbol": "WEN",
          "contractAddress": "0x95ae0317eee16000000000000000000000000000",
          "amountSold": 903904,
          "sellPrice": 0.005375,
          "currentPrice": 8.984654,
          "missedGains": 4810,
          "sellDate": "2024-08-01",
          "txHash": "0xabc13...1"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $RNDR early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $5,914 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $DOGE right before it exploded too. You left $16,433 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 86 out of 100, you've earned the title of The 10% Profit Prodigy.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $RNDR early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $5,914 today. My GPU is literally crying for you.",
          "highlight": "$5,914"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $DOGE right before it exploded too.",
          "highlight": "$DOGE"
        },
        {
          "type": "comparison",
          "text": "You left $16,433 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$16,433"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 86 out of 100, you've earned the title of The 10% Profit Prodigy.",
          "highlight": "86/100"
        }
      ],
      "title": "The 10% Profit Prodigy",
      "jeetScore": 86
    }
  },
  {
    "id": 14,
    "stats": {
      "totalMissedUsd": 23982,
      "worstSell": {
        "tokenName": "SHIB Token",
        "tokenSymbol": "SHIB",
        "contractAddress": "0xe6024cf34e703000000000000000000000000000",
        "amountSold": 624722,
        "sellPrice": 0.024157,
        "currentPrice": 3.441635,
        "missedGains": 8888,
        "sellDate": "2026-09-01",
        "txHash": "0xabc14...3"
      },
      "jeetScore": 78,
      "tokensJeeted": 5,
      "trades": [
        {
          "tokenName": "SHIB Token",
          "tokenSymbol": "SHIB",
          "contractAddress": "0xe6024cf34e703000000000000000000000000000",
          "amountSold": 624722,
          "sellPrice": 0.024157,
          "currentPrice": 3.441635,
          "missedGains": 8888,
          "sellDate": "2026-09-01",
          "txHash": "0xabc14...3"
        },
        {
          "tokenName": "RATS Token",
          "tokenSymbol": "RATS",
          "contractAddress": "0xedc194fe8add8000000000000000000000000000",
          "amountSold": 148526,
          "sellPrice": 0.057047,
          "currentPrice": 4.536482,
          "missedGains": 8259,
          "sellDate": "2024-11-01",
          "txHash": "0xabc14...0"
        },
        {
          "tokenName": "RNDR Token",
          "tokenSymbol": "RNDR",
          "contractAddress": "0xba1b702ebb39d000000000000000000000000000",
          "amountSold": 855837,
          "sellPrice": 0.078907,
          "currentPrice": 3.008745,
          "missedGains": 2837,
          "sellDate": "2026-11-01",
          "txHash": "0xabc14...1"
        },
        {
          "tokenName": "GMX Token",
          "tokenSymbol": "GMX",
          "contractAddress": "0x3ae70d5162357000000000000000000000000000",
          "amountSold": 763459,
          "sellPrice": 0.024334,
          "currentPrice": 7.076937,
          "missedGains": 2328,
          "sellDate": "2026-05-01",
          "txHash": "0xabc14...4"
        },
        {
          "tokenName": "MOG Token",
          "tokenSymbol": "MOG",
          "contractAddress": "0x2f03adb5bfa32000000000000000000000000000",
          "amountSold": 121794,
          "sellPrice": 0.001623,
          "currentPrice": 4.68889,
          "missedGains": 1670,
          "sellDate": "2024-05-01",
          "txHash": "0xabc14...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $SHIB early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,888 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $RATS right before it exploded too. You left $23,982 on the table across 5 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 78 out of 100, you've earned the title of Paper Handed Peasant.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $SHIB early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,888 today. My GPU is literally crying for you.",
          "highlight": "$8,888"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $RATS right before it exploded too.",
          "highlight": "$RATS"
        },
        {
          "type": "comparison",
          "text": "You left $23,982 on the table across 5 tokens. That's life-changing money you just gave away.",
          "highlight": "$23,982"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 78 out of 100, you've earned the title of Paper Handed Peasant.",
          "highlight": "78/100"
        }
      ],
      "title": "Paper Handed Peasant",
      "jeetScore": 78
    }
  },
  {
    "id": 15,
    "stats": {
      "totalMissedUsd": 13526,
      "worstSell": {
        "tokenName": "AGIX Token",
        "tokenSymbol": "AGIX",
        "contractAddress": "0x26e814b3911c3000000000000000000000000000",
        "amountSold": 542633,
        "sellPrice": 0.041967,
        "currentPrice": 2.547367,
        "missedGains": 7179,
        "sellDate": "2026-02-01",
        "txHash": "0xabc15...2"
      },
      "jeetScore": 80,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "AGIX Token",
          "tokenSymbol": "AGIX",
          "contractAddress": "0x26e814b3911c3000000000000000000000000000",
          "amountSold": 542633,
          "sellPrice": 0.041967,
          "currentPrice": 2.547367,
          "missedGains": 7179,
          "sellDate": "2026-02-01",
          "txHash": "0xabc15...2"
        },
        {
          "tokenName": "ARB Token",
          "tokenSymbol": "ARB",
          "contractAddress": "0xf075335a69927000000000000000000000000000",
          "amountSold": 379078,
          "sellPrice": 0.074914,
          "currentPrice": 2.972586,
          "missedGains": 5029,
          "sellDate": "2026-09-01",
          "txHash": "0xabc15...1"
        },
        {
          "tokenName": "SEI Token",
          "tokenSymbol": "SEI",
          "contractAddress": "0xf12fb3beae322000000000000000000000000000",
          "amountSold": 798235,
          "sellPrice": 0.093178,
          "currentPrice": 9.925252,
          "missedGains": 1318,
          "sellDate": "2023-10-01",
          "txHash": "0xabc15...0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $AGIX early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,179 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $ARB right before it exploded too. You left $13,526 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 80 out of 100, you've earned the title of Generational Fumble Champion.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $AGIX early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,179 today. My GPU is literally crying for you.",
          "highlight": "$7,179"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $ARB right before it exploded too.",
          "highlight": "$ARB"
        },
        {
          "type": "comparison",
          "text": "You left $13,526 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$13,526"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 80 out of 100, you've earned the title of Generational Fumble Champion.",
          "highlight": "80/100"
        }
      ],
      "title": "Generational Fumble Champion",
      "jeetScore": 80
    }
  },
  {
    "id": 16,
    "stats": {
      "totalMissedUsd": 13194,
      "worstSell": {
        "tokenName": "SLERF Token",
        "tokenSymbol": "SLERF",
        "contractAddress": "0x5ffb45b7c06a8000000000000000000000000000",
        "amountSold": 448273,
        "sellPrice": 0.094034,
        "currentPrice": 7.678534,
        "missedGains": 7188,
        "sellDate": "2023-04-01",
        "txHash": "0xabc16...2"
      },
      "jeetScore": 92,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "SLERF Token",
          "tokenSymbol": "SLERF",
          "contractAddress": "0x5ffb45b7c06a8000000000000000000000000000",
          "amountSold": 448273,
          "sellPrice": 0.094034,
          "currentPrice": 7.678534,
          "missedGains": 7188,
          "sellDate": "2023-04-01",
          "txHash": "0xabc16...2"
        },
        {
          "tokenName": "ORDI Token",
          "tokenSymbol": "ORDI",
          "contractAddress": "0x2762be23d7241000000000000000000000000000",
          "amountSold": 396141,
          "sellPrice": 0.089863,
          "currentPrice": 6.784013,
          "missedGains": 3101,
          "sellDate": "2025-04-01",
          "txHash": "0xabc16...1"
        },
        {
          "tokenName": "SAMO Token",
          "tokenSymbol": "SAMO",
          "contractAddress": "0x2c60ba26a011d000000000000000000000000000",
          "amountSold": 606778,
          "sellPrice": 0.081527,
          "currentPrice": 9.101164,
          "missedGains": 2905,
          "sellDate": "2025-05-01",
          "txHash": "0xabc16...0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $SLERF early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,188 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $ORDI right before it exploded too. You left $13,194 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 92 out of 100, you've earned the title of Generational Fumble Champion.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $SLERF early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,188 today. My GPU is literally crying for you.",
          "highlight": "$7,188"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $ORDI right before it exploded too.",
          "highlight": "$ORDI"
        },
        {
          "type": "comparison",
          "text": "You left $13,194 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$13,194"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 92 out of 100, you've earned the title of Generational Fumble Champion.",
          "highlight": "92/100"
        }
      ],
      "title": "Generational Fumble Champion",
      "jeetScore": 92
    }
  },
  {
    "id": 17,
    "stats": {
      "totalMissedUsd": 23123,
      "worstSell": {
        "tokenName": "SAMO Token",
        "tokenSymbol": "SAMO",
        "contractAddress": "0x4548a3525b565000000000000000000000000000",
        "amountSold": 406132,
        "sellPrice": 0.035821,
        "currentPrice": 0.780331,
        "missedGains": 6839,
        "sellDate": "2023-07-01",
        "txHash": "0xabc17...1"
      },
      "jeetScore": 83,
      "tokensJeeted": 6,
      "trades": [
        {
          "tokenName": "SAMO Token",
          "tokenSymbol": "SAMO",
          "contractAddress": "0x4548a3525b565000000000000000000000000000",
          "amountSold": 406132,
          "sellPrice": 0.035821,
          "currentPrice": 0.780331,
          "missedGains": 6839,
          "sellDate": "2023-07-01",
          "txHash": "0xabc17...1"
        },
        {
          "tokenName": "MEME Token",
          "tokenSymbol": "MEME",
          "contractAddress": "0x91183a5750ed0000000000000000000000000000",
          "amountSold": 256619,
          "sellPrice": 0.036564,
          "currentPrice": 0.671065,
          "missedGains": 6230,
          "sellDate": "2024-02-01",
          "txHash": "0xabc17...3"
        },
        {
          "tokenName": "RATS Token",
          "tokenSymbol": "RATS",
          "contractAddress": "0x45aee3e66d1ff000000000000000000000000000",
          "amountSold": 66706,
          "sellPrice": 0.087082,
          "currentPrice": 2.985803,
          "missedGains": 6186,
          "sellDate": "2025-04-01",
          "txHash": "0xabc17...4"
        },
        {
          "tokenName": "POPCAT Token",
          "tokenSymbol": "POPCAT",
          "contractAddress": "0x5e4196bc69dd1000000000000000000000000000",
          "amountSold": 154195,
          "sellPrice": 0.013576,
          "currentPrice": 4.446022,
          "missedGains": 2427,
          "sellDate": "2026-08-01",
          "txHash": "0xabc17...5"
        },
        {
          "tokenName": "BONK Token",
          "tokenSymbol": "BONK",
          "contractAddress": "0x3fe669d1420e0000000000000000000000000000",
          "amountSold": 575213,
          "sellPrice": 0.006546,
          "currentPrice": 5.552796,
          "missedGains": 973,
          "sellDate": "2024-04-01",
          "txHash": "0xabc17...0"
        },
        {
          "tokenName": "AGIX Token",
          "tokenSymbol": "AGIX",
          "contractAddress": "0xc097f495d73b3000000000000000000000000000",
          "amountSold": 657535,
          "sellPrice": 0.077267,
          "currentPrice": 4.870061,
          "missedGains": 468,
          "sellDate": "2024-01-01",
          "txHash": "0xabc17...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $SAMO early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $6,839 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $MEME right before it exploded too. You left $23,123 on the table across 6 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 83 out of 100, you've earned the title of Master of Missed Gains.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $SAMO early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $6,839 today. My GPU is literally crying for you.",
          "highlight": "$6,839"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $MEME right before it exploded too.",
          "highlight": "$MEME"
        },
        {
          "type": "comparison",
          "text": "You left $23,123 on the table across 6 tokens. That's life-changing money you just gave away.",
          "highlight": "$23,123"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 83 out of 100, you've earned the title of Master of Missed Gains.",
          "highlight": "83/100"
        }
      ],
      "title": "Master of Missed Gains",
      "jeetScore": 83
    }
  },
  {
    "id": 18,
    "stats": {
      "totalMissedUsd": 26483,
      "worstSell": {
        "tokenName": "MEME Token",
        "tokenSymbol": "MEME",
        "contractAddress": "0xf0e3e6a14bafe000000000000000000000000000",
        "amountSold": 524372,
        "sellPrice": 0.011062,
        "currentPrice": 7.558871,
        "missedGains": 7971,
        "sellDate": "2026-09-01",
        "txHash": "0xabc18...1"
      },
      "jeetScore": 62,
      "tokensJeeted": 6,
      "trades": [
        {
          "tokenName": "MEME Token",
          "tokenSymbol": "MEME",
          "contractAddress": "0xf0e3e6a14bafe000000000000000000000000000",
          "amountSold": 524372,
          "sellPrice": 0.011062,
          "currentPrice": 7.558871,
          "missedGains": 7971,
          "sellDate": "2026-09-01",
          "txHash": "0xabc18...1"
        },
        {
          "tokenName": "POPCAT Token",
          "tokenSymbol": "POPCAT",
          "contractAddress": "0xdb1d348433863000000000000000000000000000",
          "amountSold": 414692,
          "sellPrice": 0.034934,
          "currentPrice": 0.121544,
          "missedGains": 6075,
          "sellDate": "2023-12-01",
          "txHash": "0xabc18...4"
        },
        {
          "tokenName": "MOG Token",
          "tokenSymbol": "MOG",
          "contractAddress": "0x5c9fe19648095000000000000000000000000000",
          "amountSold": 83931,
          "sellPrice": 0.009589,
          "currentPrice": 0.372953,
          "missedGains": 4489,
          "sellDate": "2026-07-01",
          "txHash": "0xabc18...5"
        },
        {
          "tokenName": "FLOKI Token",
          "tokenSymbol": "FLOKI",
          "contractAddress": "0x853b7d7071114000000000000000000000000000",
          "amountSold": 862294,
          "sellPrice": 0.023206,
          "currentPrice": 4.846605,
          "missedGains": 4318,
          "sellDate": "2025-06-01",
          "txHash": "0xabc18...0"
        },
        {
          "tokenName": "RNDR Token",
          "tokenSymbol": "RNDR",
          "contractAddress": "0x7efe24120a8b4000000000000000000000000000",
          "amountSold": 971149,
          "sellPrice": 0.038971,
          "currentPrice": 1.977218,
          "missedGains": 2860,
          "sellDate": "2025-03-01",
          "txHash": "0xabc18...3"
        },
        {
          "tokenName": "DEGEN Token",
          "tokenSymbol": "DEGEN",
          "contractAddress": "0x4e6975d2548ba000000000000000000000000000",
          "amountSold": 542322,
          "sellPrice": 0.082614,
          "currentPrice": 3.806978,
          "missedGains": 770,
          "sellDate": "2024-03-01",
          "txHash": "0xabc18...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $MEME early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,971 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $POPCAT right before it exploded too. You left $26,483 on the table across 6 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 62 out of 100, you've earned the title of Exit Liquidity Provider.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $MEME early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,971 today. My GPU is literally crying for you.",
          "highlight": "$7,971"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $POPCAT right before it exploded too.",
          "highlight": "$POPCAT"
        },
        {
          "type": "comparison",
          "text": "You left $26,483 on the table across 6 tokens. That's life-changing money you just gave away.",
          "highlight": "$26,483"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 62 out of 100, you've earned the title of Exit Liquidity Provider.",
          "highlight": "62/100"
        }
      ],
      "title": "Exit Liquidity Provider",
      "jeetScore": 62
    }
  },
  {
    "id": 19,
    "stats": {
      "totalMissedUsd": 27612,
      "worstSell": {
        "tokenName": "INJ Token",
        "tokenSymbol": "INJ",
        "contractAddress": "0xc1b81c1993bd1000000000000000000000000000",
        "amountSold": 164057,
        "sellPrice": 0.011621,
        "currentPrice": 7.405912,
        "missedGains": 8809,
        "sellDate": "2026-04-01",
        "txHash": "0xabc19...1"
      },
      "jeetScore": 61,
      "tokensJeeted": 5,
      "trades": [
        {
          "tokenName": "INJ Token",
          "tokenSymbol": "INJ",
          "contractAddress": "0xc1b81c1993bd1000000000000000000000000000",
          "amountSold": 164057,
          "sellPrice": 0.011621,
          "currentPrice": 7.405912,
          "missedGains": 8809,
          "sellDate": "2026-04-01",
          "txHash": "0xabc19...1"
        },
        {
          "tokenName": "FET Token",
          "tokenSymbol": "FET",
          "contractAddress": "0x2c23b77747afc000000000000000000000000000",
          "amountSold": 295736,
          "sellPrice": 0.04903,
          "currentPrice": 2.454965,
          "missedGains": 7674,
          "sellDate": "2023-03-01",
          "txHash": "0xabc19...3"
        },
        {
          "tokenName": "SEI Token",
          "tokenSymbol": "SEI",
          "contractAddress": "0x40c9f16302cfa000000000000000000000000000",
          "amountSold": 338076,
          "sellPrice": 0.0167,
          "currentPrice": 3.946432,
          "missedGains": 5844,
          "sellDate": "2026-04-01",
          "txHash": "0xabc19...2"
        },
        {
          "tokenName": "ARB Token",
          "tokenSymbol": "ARB",
          "contractAddress": "0xc3ed03695f986000000000000000000000000000",
          "amountSold": 973307,
          "sellPrice": 0.033368,
          "currentPrice": 2.034789,
          "missedGains": 2694,
          "sellDate": "2026-08-01",
          "txHash": "0xabc19...4"
        },
        {
          "tokenName": "OCEAN Token",
          "tokenSymbol": "OCEAN",
          "contractAddress": "0xeb195331c63a4000000000000000000000000000",
          "amountSold": 527341,
          "sellPrice": 0.064337,
          "currentPrice": 9.979188,
          "missedGains": 2591,
          "sellDate": "2023-03-01",
          "txHash": "0xabc19...0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $INJ early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,809 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $FET right before it exploded too. You left $27,612 on the table across 5 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 61 out of 100, you've earned the title of Paper Handed Peasant.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $INJ early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,809 today. My GPU is literally crying for you.",
          "highlight": "$8,809"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $FET right before it exploded too.",
          "highlight": "$FET"
        },
        {
          "type": "comparison",
          "text": "You left $27,612 on the table across 5 tokens. That's life-changing money you just gave away.",
          "highlight": "$27,612"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 61 out of 100, you've earned the title of Paper Handed Peasant.",
          "highlight": "61/100"
        }
      ],
      "title": "Paper Handed Peasant",
      "jeetScore": 61
    }
  },
  {
    "id": 20,
    "stats": {
      "totalMissedUsd": 12852,
      "worstSell": {
        "tokenName": "PEPE Token",
        "tokenSymbol": "PEPE",
        "contractAddress": "0x392da620febe4000000000000000000000000000",
        "amountSold": 539224,
        "sellPrice": 0.018316,
        "currentPrice": 6.957804,
        "missedGains": 6749,
        "sellDate": "2026-10-01",
        "txHash": "0xabc20...0"
      },
      "jeetScore": 98,
      "tokensJeeted": 4,
      "trades": [
        {
          "tokenName": "PEPE Token",
          "tokenSymbol": "PEPE",
          "contractAddress": "0x392da620febe4000000000000000000000000000",
          "amountSold": 539224,
          "sellPrice": 0.018316,
          "currentPrice": 6.957804,
          "missedGains": 6749,
          "sellDate": "2026-10-01",
          "txHash": "0xabc20...0"
        },
        {
          "tokenName": "FET Token",
          "tokenSymbol": "FET",
          "contractAddress": "0x1557b4199cbf5000000000000000000000000000",
          "amountSold": 623177,
          "sellPrice": 0.024239,
          "currentPrice": 9.030978,
          "missedGains": 2578,
          "sellDate": "2023-12-01",
          "txHash": "0xabc20...3"
        },
        {
          "tokenName": "OP Token",
          "tokenSymbol": "OP",
          "contractAddress": "0x1e851884b079f000000000000000000000000000",
          "amountSold": 29399,
          "sellPrice": 0.073839,
          "currentPrice": 9.41419,
          "missedGains": 1908,
          "sellDate": "2023-05-01",
          "txHash": "0xabc20...2"
        },
        {
          "tokenName": "TAO Token",
          "tokenSymbol": "TAO",
          "contractAddress": "0xeb7ea8014d85a000000000000000000000000000",
          "amountSold": 189941,
          "sellPrice": 0.034698,
          "currentPrice": 2.351953,
          "missedGains": 1617,
          "sellDate": "2024-06-01",
          "txHash": "0xabc20...1"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $PEPE early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $6,749 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $FET right before it exploded too. You left $12,852 on the table across 4 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 98 out of 100, you've earned the title of Buy High Sell Low Specialist.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $PEPE early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $6,749 today. My GPU is literally crying for you.",
          "highlight": "$6,749"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $FET right before it exploded too.",
          "highlight": "$FET"
        },
        {
          "type": "comparison",
          "text": "You left $12,852 on the table across 4 tokens. That's life-changing money you just gave away.",
          "highlight": "$12,852"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 98 out of 100, you've earned the title of Buy High Sell Low Specialist.",
          "highlight": "98/100"
        }
      ],
      "title": "Buy High Sell Low Specialist",
      "jeetScore": 98
    }
  },
  {
    "id": 21,
    "stats": {
      "totalMissedUsd": 9678,
      "worstSell": {
        "tokenName": "SEI Token",
        "tokenSymbol": "SEI",
        "contractAddress": "0x93779057facc6000000000000000000000000000",
        "amountSold": 66514,
        "sellPrice": 0.022796,
        "currentPrice": 4.720027,
        "missedGains": 7704,
        "sellDate": "2024-01-01",
        "txHash": "0xabc21...0"
      },
      "jeetScore": 73,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "SEI Token",
          "tokenSymbol": "SEI",
          "contractAddress": "0x93779057facc6000000000000000000000000000",
          "amountSold": 66514,
          "sellPrice": 0.022796,
          "currentPrice": 4.720027,
          "missedGains": 7704,
          "sellDate": "2024-01-01",
          "txHash": "0xabc21...0"
        },
        {
          "tokenName": "DOGE Token",
          "tokenSymbol": "DOGE",
          "contractAddress": "0xba6bc75c7b7b7000000000000000000000000000",
          "amountSold": 350523,
          "sellPrice": 0.058096,
          "currentPrice": 3.597798,
          "missedGains": 1175,
          "sellDate": "2025-03-01",
          "txHash": "0xabc21...1"
        },
        {
          "tokenName": "PENDLE Token",
          "tokenSymbol": "PENDLE",
          "contractAddress": "0x61d58cb37cec3000000000000000000000000000",
          "amountSold": 153591,
          "sellPrice": 0.046175,
          "currentPrice": 2.363741,
          "missedGains": 799,
          "sellDate": "2025-11-01",
          "txHash": "0xabc21...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $SEI early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,704 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $DOGE right before it exploded too. You left $9,678 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 73 out of 100, you've earned the title of Master of Missed Gains.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $SEI early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,704 today. My GPU is literally crying for you.",
          "highlight": "$7,704"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $DOGE right before it exploded too.",
          "highlight": "$DOGE"
        },
        {
          "type": "comparison",
          "text": "You left $9,678 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$9,678"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 73 out of 100, you've earned the title of Master of Missed Gains.",
          "highlight": "73/100"
        }
      ],
      "title": "Master of Missed Gains",
      "jeetScore": 73
    }
  },
  {
    "id": 22,
    "stats": {
      "totalMissedUsd": 10593,
      "worstSell": {
        "tokenName": "SEI Token",
        "tokenSymbol": "SEI",
        "contractAddress": "0x3942f3d9e9a94000000000000000000000000000",
        "amountSold": 805987,
        "sellPrice": 0.067811,
        "currentPrice": 9.004888,
        "missedGains": 6641,
        "sellDate": "2026-09-01",
        "txHash": "0xabc22...1"
      },
      "jeetScore": 83,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "SEI Token",
          "tokenSymbol": "SEI",
          "contractAddress": "0x3942f3d9e9a94000000000000000000000000000",
          "amountSold": 805987,
          "sellPrice": 0.067811,
          "currentPrice": 9.004888,
          "missedGains": 6641,
          "sellDate": "2026-09-01",
          "txHash": "0xabc22...1"
        },
        {
          "tokenName": "SLERF Token",
          "tokenSymbol": "SLERF",
          "contractAddress": "0x3691b5cd35adb000000000000000000000000000",
          "amountSold": 633379,
          "sellPrice": 0.08003,
          "currentPrice": 4.642543,
          "missedGains": 3484,
          "sellDate": "2026-11-01",
          "txHash": "0xabc22...2"
        },
        {
          "tokenName": "GMX Token",
          "tokenSymbol": "GMX",
          "contractAddress": "0xd2e6a1ec1556e000000000000000000000000000",
          "amountSold": 146380,
          "sellPrice": 0.006542,
          "currentPrice": 4.969641,
          "missedGains": 468,
          "sellDate": "2024-06-01",
          "txHash": "0xabc22...0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $SEI early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $6,641 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $SLERF right before it exploded too. You left $10,593 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 83 out of 100, you've earned the title of Certified Degen Ruglord.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $SEI early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $6,641 today. My GPU is literally crying for you.",
          "highlight": "$6,641"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $SLERF right before it exploded too.",
          "highlight": "$SLERF"
        },
        {
          "type": "comparison",
          "text": "You left $10,593 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$10,593"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 83 out of 100, you've earned the title of Certified Degen Ruglord.",
          "highlight": "83/100"
        }
      ],
      "title": "Certified Degen Ruglord",
      "jeetScore": 83
    }
  },
  {
    "id": 23,
    "stats": {
      "totalMissedUsd": 33002,
      "worstSell": {
        "tokenName": "SATS Token",
        "tokenSymbol": "SATS",
        "contractAddress": "0xb09020302f006000000000000000000000000000",
        "amountSold": 816304,
        "sellPrice": 0.003852,
        "currentPrice": 0.158152,
        "missedGains": 8898,
        "sellDate": "2023-06-01",
        "txHash": "0xabc23...2"
      },
      "jeetScore": 77,
      "tokensJeeted": 4,
      "trades": [
        {
          "tokenName": "SATS Token",
          "tokenSymbol": "SATS",
          "contractAddress": "0xb09020302f006000000000000000000000000000",
          "amountSold": 816304,
          "sellPrice": 0.003852,
          "currentPrice": 0.158152,
          "missedGains": 8898,
          "sellDate": "2023-06-01",
          "txHash": "0xabc23...2"
        },
        {
          "tokenName": "WIF Token",
          "tokenSymbol": "WIF",
          "contractAddress": "0x10e267c12a7f8000000000000000000000000000",
          "amountSold": 463642,
          "sellPrice": 0.074697,
          "currentPrice": 3.550328,
          "missedGains": 8787,
          "sellDate": "2024-08-01",
          "txHash": "0xabc23...0"
        },
        {
          "tokenName": "FET Token",
          "tokenSymbol": "FET",
          "contractAddress": "0xbbef73cd82433000000000000000000000000000",
          "amountSold": 712647,
          "sellPrice": 0.015792,
          "currentPrice": 7.739523,
          "missedGains": 8737,
          "sellDate": "2023-04-01",
          "txHash": "0xabc23...1"
        },
        {
          "tokenName": "RNDR Token",
          "tokenSymbol": "RNDR",
          "contractAddress": "0x949d94ba8e620000000000000000000000000000",
          "amountSold": 597612,
          "sellPrice": 0.048643,
          "currentPrice": 5.938203,
          "missedGains": 6580,
          "sellDate": "2025-10-01",
          "txHash": "0xabc23...3"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $SATS early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,898 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $WIF right before it exploded too. You left $33,002 on the table across 4 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 77 out of 100, you've earned the title of Master of Missed Gains.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $SATS early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,898 today. My GPU is literally crying for you.",
          "highlight": "$8,898"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $WIF right before it exploded too.",
          "highlight": "$WIF"
        },
        {
          "type": "comparison",
          "text": "You left $33,002 on the table across 4 tokens. That's life-changing money you just gave away.",
          "highlight": "$33,002"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 77 out of 100, you've earned the title of Master of Missed Gains.",
          "highlight": "77/100"
        }
      ],
      "title": "Master of Missed Gains",
      "jeetScore": 77
    }
  },
  {
    "id": 24,
    "stats": {
      "totalMissedUsd": 24329,
      "worstSell": {
        "tokenName": "ARB Token",
        "tokenSymbol": "ARB",
        "contractAddress": "0xfb4e981cdf9a4000000000000000000000000000",
        "amountSold": 362668,
        "sellPrice": 0.062298,
        "currentPrice": 3.877798,
        "missedGains": 8573,
        "sellDate": "2025-01-01",
        "txHash": "0xabc24...4"
      },
      "jeetScore": 65,
      "tokensJeeted": 6,
      "trades": [
        {
          "tokenName": "ARB Token",
          "tokenSymbol": "ARB",
          "contractAddress": "0xfb4e981cdf9a4000000000000000000000000000",
          "amountSold": 362668,
          "sellPrice": 0.062298,
          "currentPrice": 3.877798,
          "missedGains": 8573,
          "sellDate": "2025-01-01",
          "txHash": "0xabc24...4"
        },
        {
          "tokenName": "SHIB Token",
          "tokenSymbol": "SHIB",
          "contractAddress": "0x82ff6eb1379bf000000000000000000000000000",
          "amountSold": 465109,
          "sellPrice": 0.089848,
          "currentPrice": 2.429894,
          "missedGains": 4377,
          "sellDate": "2026-08-01",
          "txHash": "0xabc24...1"
        },
        {
          "tokenName": "SNEK Token",
          "tokenSymbol": "SNEK",
          "contractAddress": "0xbf8823bfd9d31000000000000000000000000000",
          "amountSold": 591841,
          "sellPrice": 0.026648,
          "currentPrice": 7.907014,
          "missedGains": 3966,
          "sellDate": "2023-11-01",
          "txHash": "0xabc24...5"
        },
        {
          "tokenName": "RATS Token",
          "tokenSymbol": "RATS",
          "contractAddress": "0xe678792488d14000000000000000000000000000",
          "amountSold": 416376,
          "sellPrice": 0.052093,
          "currentPrice": 2.661903,
          "missedGains": 2635,
          "sellDate": "2023-12-01",
          "txHash": "0xabc24...2"
        },
        {
          "tokenName": "MYRO Token",
          "tokenSymbol": "MYRO",
          "contractAddress": "0xfff657ebe1b21000000000000000000000000000",
          "amountSold": 266253,
          "sellPrice": 0.052838,
          "currentPrice": 2.936137,
          "missedGains": 2590,
          "sellDate": "2026-08-01",
          "txHash": "0xabc24...0"
        },
        {
          "tokenName": "LADYS Token",
          "tokenSymbol": "LADYS",
          "contractAddress": "0x917bc8b03aade000000000000000000000000000",
          "amountSold": 586063,
          "sellPrice": 0.001594,
          "currentPrice": 2.235232,
          "missedGains": 2188,
          "sellDate": "2024-01-01",
          "txHash": "0xabc24...3"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $ARB early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,573 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $SHIB right before it exploded too. You left $24,329 on the table across 6 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 65 out of 100, you've earned the title of Paper Handed Peasant.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $ARB early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,573 today. My GPU is literally crying for you.",
          "highlight": "$8,573"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $SHIB right before it exploded too.",
          "highlight": "$SHIB"
        },
        {
          "type": "comparison",
          "text": "You left $24,329 on the table across 6 tokens. That's life-changing money you just gave away.",
          "highlight": "$24,329"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 65 out of 100, you've earned the title of Paper Handed Peasant.",
          "highlight": "65/100"
        }
      ],
      "title": "Paper Handed Peasant",
      "jeetScore": 65
    }
  },
  {
    "id": 25,
    "stats": {
      "totalMissedUsd": 15872,
      "worstSell": {
        "tokenName": "BONK Token",
        "tokenSymbol": "BONK",
        "contractAddress": "0x3d5863251fa9f000000000000000000000000000",
        "amountSold": 948948,
        "sellPrice": 0.043989,
        "currentPrice": 7.603611,
        "missedGains": 8715,
        "sellDate": "2024-03-01",
        "txHash": "0xabc25...1"
      },
      "jeetScore": 76,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "BONK Token",
          "tokenSymbol": "BONK",
          "contractAddress": "0x3d5863251fa9f000000000000000000000000000",
          "amountSold": 948948,
          "sellPrice": 0.043989,
          "currentPrice": 7.603611,
          "missedGains": 8715,
          "sellDate": "2024-03-01",
          "txHash": "0xabc25...1"
        },
        {
          "tokenName": "SAMO Token",
          "tokenSymbol": "SAMO",
          "contractAddress": "0xec7b447e6a956000000000000000000000000000",
          "amountSold": 807945,
          "sellPrice": 0.016563,
          "currentPrice": 9.424012,
          "missedGains": 5716,
          "sellDate": "2024-05-01",
          "txHash": "0xabc25...0"
        },
        {
          "tokenName": "GMX Token",
          "tokenSymbol": "GMX",
          "contractAddress": "0xec35ebca2bd93000000000000000000000000000",
          "amountSold": 397324,
          "sellPrice": 0.031682,
          "currentPrice": 9.556549,
          "missedGains": 1441,
          "sellDate": "2023-01-01",
          "txHash": "0xabc25...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $BONK early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,715 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $SAMO right before it exploded too. You left $15,872 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 76 out of 100, you've earned the title of Paper Handed Peasant.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $BONK early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,715 today. My GPU is literally crying for you.",
          "highlight": "$8,715"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $SAMO right before it exploded too.",
          "highlight": "$SAMO"
        },
        {
          "type": "comparison",
          "text": "You left $15,872 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$15,872"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 76 out of 100, you've earned the title of Paper Handed Peasant.",
          "highlight": "76/100"
        }
      ],
      "title": "Paper Handed Peasant",
      "jeetScore": 76
    }
  },
  {
    "id": 26,
    "stats": {
      "totalMissedUsd": 16479,
      "worstSell": {
        "tokenName": "GMX Token",
        "tokenSymbol": "GMX",
        "contractAddress": "0x87a34032a32ad000000000000000000000000000",
        "amountSold": 324517,
        "sellPrice": 0.068608,
        "currentPrice": 7.994896,
        "missedGains": 6979,
        "sellDate": "2024-05-01",
        "txHash": "0xabc26...4"
      },
      "jeetScore": 84,
      "tokensJeeted": 5,
      "trades": [
        {
          "tokenName": "GMX Token",
          "tokenSymbol": "GMX",
          "contractAddress": "0x87a34032a32ad000000000000000000000000000",
          "amountSold": 324517,
          "sellPrice": 0.068608,
          "currentPrice": 7.994896,
          "missedGains": 6979,
          "sellDate": "2024-05-01",
          "txHash": "0xabc26...4"
        },
        {
          "tokenName": "MOG Token",
          "tokenSymbol": "MOG",
          "contractAddress": "0x8a501e4037f32000000000000000000000000000",
          "amountSold": 856831,
          "sellPrice": 0.029139,
          "currentPrice": 0.977336,
          "missedGains": 3072,
          "sellDate": "2024-08-01",
          "txHash": "0xabc26...2"
        },
        {
          "tokenName": "FET Token",
          "tokenSymbol": "FET",
          "contractAddress": "0x08dd0c6f7461a000000000000000000000000000",
          "amountSold": 294749,
          "sellPrice": 0.053672,
          "currentPrice": 1.916765,
          "missedGains": 2803,
          "sellDate": "2026-12-01",
          "txHash": "0xabc26...1"
        },
        {
          "tokenName": "FLOKI Token",
          "tokenSymbol": "FLOKI",
          "contractAddress": "0x47e0a529aa543000000000000000000000000000",
          "amountSold": 159187,
          "sellPrice": 0.055424,
          "currentPrice": 7.931421,
          "missedGains": 2595,
          "sellDate": "2023-05-01",
          "txHash": "0xabc26...3"
        },
        {
          "tokenName": "SHIB Token",
          "tokenSymbol": "SHIB",
          "contractAddress": "0x7886d1a9d6a1f000000000000000000000000000",
          "amountSold": 513619,
          "sellPrice": 0.014311,
          "currentPrice": 7.522775,
          "missedGains": 1030,
          "sellDate": "2025-06-01",
          "txHash": "0xabc26...0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $GMX early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $6,979 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $MOG right before it exploded too. You left $16,479 on the table across 5 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 84 out of 100, you've earned the title of Generational Fumble Champion.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $GMX early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $6,979 today. My GPU is literally crying for you.",
          "highlight": "$6,979"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $MOG right before it exploded too.",
          "highlight": "$MOG"
        },
        {
          "type": "comparison",
          "text": "You left $16,479 on the table across 5 tokens. That's life-changing money you just gave away.",
          "highlight": "$16,479"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 84 out of 100, you've earned the title of Generational Fumble Champion.",
          "highlight": "84/100"
        }
      ],
      "title": "Generational Fumble Champion",
      "jeetScore": 84
    }
  },
  {
    "id": 27,
    "stats": {
      "totalMissedUsd": 21755,
      "worstSell": {
        "tokenName": "SLERF Token",
        "tokenSymbol": "SLERF",
        "contractAddress": "0x8eba57b6aada1000000000000000000000000000",
        "amountSold": 57228,
        "sellPrice": 0.033203,
        "currentPrice": 6.69624,
        "missedGains": 7241,
        "sellDate": "2023-11-01",
        "txHash": "0xabc27...2"
      },
      "jeetScore": 84,
      "tokensJeeted": 4,
      "trades": [
        {
          "tokenName": "SLERF Token",
          "tokenSymbol": "SLERF",
          "contractAddress": "0x8eba57b6aada1000000000000000000000000000",
          "amountSold": 57228,
          "sellPrice": 0.033203,
          "currentPrice": 6.69624,
          "missedGains": 7241,
          "sellDate": "2023-11-01",
          "txHash": "0xabc27...2"
        },
        {
          "tokenName": "POPCAT Token",
          "tokenSymbol": "POPCAT",
          "contractAddress": "0x4401c858b8ccc000000000000000000000000000",
          "amountSold": 843313,
          "sellPrice": 0.064843,
          "currentPrice": 1.374982,
          "missedGains": 6452,
          "sellDate": "2023-02-01",
          "txHash": "0xabc27...3"
        },
        {
          "tokenName": "GMX Token",
          "tokenSymbol": "GMX",
          "contractAddress": "0x969967f285196000000000000000000000000000",
          "amountSold": 730687,
          "sellPrice": 0.009996,
          "currentPrice": 9.669931,
          "missedGains": 5045,
          "sellDate": "2024-08-01",
          "txHash": "0xabc27...1"
        },
        {
          "tokenName": "SPX Token",
          "tokenSymbol": "SPX",
          "contractAddress": "0x3b93ae84fb995000000000000000000000000000",
          "amountSold": 790229,
          "sellPrice": 0.092142,
          "currentPrice": 7.828976,
          "missedGains": 3017,
          "sellDate": "2023-11-01",
          "txHash": "0xabc27...0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $SLERF early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,241 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $POPCAT right before it exploded too. You left $21,755 on the table across 4 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 84 out of 100, you've earned the title of Master of Missed Gains.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $SLERF early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,241 today. My GPU is literally crying for you.",
          "highlight": "$7,241"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $POPCAT right before it exploded too.",
          "highlight": "$POPCAT"
        },
        {
          "type": "comparison",
          "text": "You left $21,755 on the table across 4 tokens. That's life-changing money you just gave away.",
          "highlight": "$21,755"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 84 out of 100, you've earned the title of Master of Missed Gains.",
          "highlight": "84/100"
        }
      ],
      "title": "Master of Missed Gains",
      "jeetScore": 84
    }
  },
  {
    "id": 28,
    "stats": {
      "totalMissedUsd": 16520,
      "worstSell": {
        "tokenName": "TIA Token",
        "tokenSymbol": "TIA",
        "contractAddress": "0xc6280ac18e280000000000000000000000000000",
        "amountSold": 62779,
        "sellPrice": 0.050577,
        "currentPrice": 1.556791,
        "missedGains": 5221,
        "sellDate": "2026-08-01",
        "txHash": "0xabc28...3"
      },
      "jeetScore": 75,
      "tokensJeeted": 4,
      "trades": [
        {
          "tokenName": "TIA Token",
          "tokenSymbol": "TIA",
          "contractAddress": "0xc6280ac18e280000000000000000000000000000",
          "amountSold": 62779,
          "sellPrice": 0.050577,
          "currentPrice": 1.556791,
          "missedGains": 5221,
          "sellDate": "2026-08-01",
          "txHash": "0xabc28...3"
        },
        {
          "tokenName": "GMX Token",
          "tokenSymbol": "GMX",
          "contractAddress": "0x8608b2db3782e000000000000000000000000000",
          "amountSold": 601591,
          "sellPrice": 0.025383,
          "currentPrice": 3.512757,
          "missedGains": 4843,
          "sellDate": "2023-03-01",
          "txHash": "0xabc28...2"
        },
        {
          "tokenName": "WEN Token",
          "tokenSymbol": "WEN",
          "contractAddress": "0x9cd987d319698000000000000000000000000000",
          "amountSold": 710489,
          "sellPrice": 0.097731,
          "currentPrice": 6.486059,
          "missedGains": 3701,
          "sellDate": "2024-06-01",
          "txHash": "0xabc28...1"
        },
        {
          "tokenName": "MYRO Token",
          "tokenSymbol": "MYRO",
          "contractAddress": "0x1cfbd008ac439000000000000000000000000000",
          "amountSold": 559086,
          "sellPrice": 0.05557,
          "currentPrice": 7.112753,
          "missedGains": 2755,
          "sellDate": "2026-01-01",
          "txHash": "0xabc28...0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $TIA early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $5,221 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $GMX right before it exploded too. You left $16,520 on the table across 4 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 75 out of 100, you've earned the title of The 10% Profit Prodigy.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $TIA early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $5,221 today. My GPU is literally crying for you.",
          "highlight": "$5,221"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $GMX right before it exploded too.",
          "highlight": "$GMX"
        },
        {
          "type": "comparison",
          "text": "You left $16,520 on the table across 4 tokens. That's life-changing money you just gave away.",
          "highlight": "$16,520"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 75 out of 100, you've earned the title of The 10% Profit Prodigy.",
          "highlight": "75/100"
        }
      ],
      "title": "The 10% Profit Prodigy",
      "jeetScore": 75
    }
  },
  {
    "id": 29,
    "stats": {
      "totalMissedUsd": 35519,
      "worstSell": {
        "tokenName": "ORDI Token",
        "tokenSymbol": "ORDI",
        "contractAddress": "0xcbc954284dbd6000000000000000000000000000",
        "amountSold": 671209,
        "sellPrice": 0.099031,
        "currentPrice": 1.769164,
        "missedGains": 8660,
        "sellDate": "2025-02-01",
        "txHash": "0xabc29...1"
      },
      "jeetScore": 82,
      "tokensJeeted": 7,
      "trades": [
        {
          "tokenName": "ORDI Token",
          "tokenSymbol": "ORDI",
          "contractAddress": "0xcbc954284dbd6000000000000000000000000000",
          "amountSold": 671209,
          "sellPrice": 0.099031,
          "currentPrice": 1.769164,
          "missedGains": 8660,
          "sellDate": "2025-02-01",
          "txHash": "0xabc29...1"
        },
        {
          "tokenName": "WEN Token",
          "tokenSymbol": "WEN",
          "contractAddress": "0x65affdbdd2876000000000000000000000000000",
          "amountSold": 854882,
          "sellPrice": 0.055851,
          "currentPrice": 5.460813,
          "missedGains": 6703,
          "sellDate": "2023-09-01",
          "txHash": "0xabc29...5"
        },
        {
          "tokenName": "RATS Token",
          "tokenSymbol": "RATS",
          "contractAddress": "0x05570bf487db2000000000000000000000000000",
          "amountSold": 509593,
          "sellPrice": 0.052214,
          "currentPrice": 1.904206,
          "missedGains": 5824,
          "sellDate": "2024-12-01",
          "txHash": "0xabc29...3"
        },
        {
          "tokenName": "FLOKI Token",
          "tokenSymbol": "FLOKI",
          "contractAddress": "0x23c810ca7e263000000000000000000000000000",
          "amountSold": 994297,
          "sellPrice": 0.073033,
          "currentPrice": 3.551388,
          "missedGains": 4926,
          "sellDate": "2026-03-01",
          "txHash": "0xabc29...0"
        },
        {
          "tokenName": "WIF Token",
          "tokenSymbol": "WIF",
          "contractAddress": "0x4eae079b7ef56000000000000000000000000000",
          "amountSold": 860138,
          "sellPrice": 0.078329,
          "currentPrice": 4.739901,
          "missedGains": 4029,
          "sellDate": "2024-01-01",
          "txHash": "0xabc29...4"
        },
        {
          "tokenName": "POPCAT Token",
          "tokenSymbol": "POPCAT",
          "contractAddress": "0x141dddec79ca9000000000000000000000000000",
          "amountSold": 548320,
          "sellPrice": 0.095236,
          "currentPrice": 5.619842,
          "missedGains": 3250,
          "sellDate": "2025-04-01",
          "txHash": "0xabc29...6"
        },
        {
          "tokenName": "OCEAN Token",
          "tokenSymbol": "OCEAN",
          "contractAddress": "0x9de26d0dc8c55000000000000000000000000000",
          "amountSold": 882426,
          "sellPrice": 0.044086,
          "currentPrice": 2.593446,
          "missedGains": 2127,
          "sellDate": "2024-05-01",
          "txHash": "0xabc29...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $ORDI early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,660 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $WEN right before it exploded too. You left $35,519 on the table across 7 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 82 out of 100, you've earned the title of Premature Seller Syndrome.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $ORDI early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,660 today. My GPU is literally crying for you.",
          "highlight": "$8,660"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $WEN right before it exploded too.",
          "highlight": "$WEN"
        },
        {
          "type": "comparison",
          "text": "You left $35,519 on the table across 7 tokens. That's life-changing money you just gave away.",
          "highlight": "$35,519"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 82 out of 100, you've earned the title of Premature Seller Syndrome.",
          "highlight": "82/100"
        }
      ],
      "title": "Premature Seller Syndrome",
      "jeetScore": 82
    }
  },
  {
    "id": 30,
    "stats": {
      "totalMissedUsd": 29622,
      "worstSell": {
        "tokenName": "SNEK Token",
        "tokenSymbol": "SNEK",
        "contractAddress": "0xa8782a5b6bda6000000000000000000000000000",
        "amountSold": 459404,
        "sellPrice": 0.065066,
        "currentPrice": 7.169872,
        "missedGains": 7594,
        "sellDate": "2025-05-01",
        "txHash": "0xabc30...3"
      },
      "jeetScore": 62,
      "tokensJeeted": 5,
      "trades": [
        {
          "tokenName": "SNEK Token",
          "tokenSymbol": "SNEK",
          "contractAddress": "0xa8782a5b6bda6000000000000000000000000000",
          "amountSold": 459404,
          "sellPrice": 0.065066,
          "currentPrice": 7.169872,
          "missedGains": 7594,
          "sellDate": "2025-05-01",
          "txHash": "0xabc30...3"
        },
        {
          "tokenName": "SHIB Token",
          "tokenSymbol": "SHIB",
          "contractAddress": "0x7243a9b00fe27000000000000000000000000000",
          "amountSold": 823224,
          "sellPrice": 0.085685,
          "currentPrice": 6.204717,
          "missedGains": 7042,
          "sellDate": "2024-08-01",
          "txHash": "0xabc30...1"
        },
        {
          "tokenName": "COQ Token",
          "tokenSymbol": "COQ",
          "contractAddress": "0x2e1c3a567721d000000000000000000000000000",
          "amountSold": 409901,
          "sellPrice": 0.012309,
          "currentPrice": 0.346248,
          "missedGains": 5499,
          "sellDate": "2024-04-01",
          "txHash": "0xabc30...2"
        },
        {
          "tokenName": "WEN Token",
          "tokenSymbol": "WEN",
          "contractAddress": "0xe8acdbe51c7d5000000000000000000000000000",
          "amountSold": 981576,
          "sellPrice": 0.061019,
          "currentPrice": 0.443439,
          "missedGains": 4748,
          "sellDate": "2026-06-01",
          "txHash": "0xabc30...0"
        },
        {
          "tokenName": "LADYS Token",
          "tokenSymbol": "LADYS",
          "contractAddress": "0xda0898762b696000000000000000000000000000",
          "amountSold": 118466,
          "sellPrice": 0.08403,
          "currentPrice": 6.844527,
          "missedGains": 4739,
          "sellDate": "2026-12-01",
          "txHash": "0xabc30...4"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $SNEK early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,594 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $SHIB right before it exploded too. You left $29,622 on the table across 5 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 62 out of 100, you've earned the title of Generational Fumble Champion.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $SNEK early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,594 today. My GPU is literally crying for you.",
          "highlight": "$7,594"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $SHIB right before it exploded too.",
          "highlight": "$SHIB"
        },
        {
          "type": "comparison",
          "text": "You left $29,622 on the table across 5 tokens. That's life-changing money you just gave away.",
          "highlight": "$29,622"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 62 out of 100, you've earned the title of Generational Fumble Champion.",
          "highlight": "62/100"
        }
      ],
      "title": "Generational Fumble Champion",
      "jeetScore": 62
    }
  },
  {
    "id": 31,
    "stats": {
      "totalMissedUsd": 10694,
      "worstSell": {
        "tokenName": "DOGE Token",
        "tokenSymbol": "DOGE",
        "contractAddress": "0x71be2f98af612000000000000000000000000000",
        "amountSold": 442912,
        "sellPrice": 0.073061,
        "currentPrice": 1.679317,
        "missedGains": 2568,
        "sellDate": "2026-06-01",
        "txHash": "0xabc31...1"
      },
      "jeetScore": 76,
      "tokensJeeted": 7,
      "trades": [
        {
          "tokenName": "DOGE Token",
          "tokenSymbol": "DOGE",
          "contractAddress": "0x71be2f98af612000000000000000000000000000",
          "amountSold": 442912,
          "sellPrice": 0.073061,
          "currentPrice": 1.679317,
          "missedGains": 2568,
          "sellDate": "2026-06-01",
          "txHash": "0xabc31...1"
        },
        {
          "tokenName": "SHIB Token",
          "tokenSymbol": "SHIB",
          "contractAddress": "0x5c1cebb64970b000000000000000000000000000",
          "amountSold": 583721,
          "sellPrice": 0.083045,
          "currentPrice": 3.873296,
          "missedGains": 2032,
          "sellDate": "2026-08-01",
          "txHash": "0xabc31...6"
        },
        {
          "tokenName": "PENDLE Token",
          "tokenSymbol": "PENDLE",
          "contractAddress": "0x2594397158308000000000000000000000000000",
          "amountSold": 665821,
          "sellPrice": 0.057221,
          "currentPrice": 6.979284,
          "missedGains": 1943,
          "sellDate": "2025-12-01",
          "txHash": "0xabc31...0"
        },
        {
          "tokenName": "RATS Token",
          "tokenSymbol": "RATS",
          "contractAddress": "0xa40a8758b3b2f000000000000000000000000000",
          "amountSold": 76651,
          "sellPrice": 0.064806,
          "currentPrice": 4.82419,
          "missedGains": 1330,
          "sellDate": "2026-05-01",
          "txHash": "0xabc31...4"
        },
        {
          "tokenName": "LADYS Token",
          "tokenSymbol": "LADYS",
          "contractAddress": "0x97785526082f0000000000000000000000000000",
          "amountSold": 728707,
          "sellPrice": 0.042749,
          "currentPrice": 1.306561,
          "missedGains": 1202,
          "sellDate": "2024-03-01",
          "txHash": "0xabc31...3"
        },
        {
          "tokenName": "TURBO Token",
          "tokenSymbol": "TURBO",
          "contractAddress": "0x56ff1665c9942000000000000000000000000000",
          "amountSold": 582963,
          "sellPrice": 0.074298,
          "currentPrice": 3.235336,
          "missedGains": 840,
          "sellDate": "2025-02-01",
          "txHash": "0xabc31...2"
        },
        {
          "tokenName": "SUI Token",
          "tokenSymbol": "SUI",
          "contractAddress": "0x9ff33fcab94c9000000000000000000000000000",
          "amountSold": 391946,
          "sellPrice": 0.069016,
          "currentPrice": 0.38167,
          "missedGains": 779,
          "sellDate": "2023-09-01",
          "txHash": "0xabc31...5"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $DOGE early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $2,568 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $SHIB right before it exploded too. You left $10,694 on the table across 7 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 76 out of 100, you've earned the title of Certified Degen Ruglord.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $DOGE early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $2,568 today. My GPU is literally crying for you.",
          "highlight": "$2,568"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $SHIB right before it exploded too.",
          "highlight": "$SHIB"
        },
        {
          "type": "comparison",
          "text": "You left $10,694 on the table across 7 tokens. That's life-changing money you just gave away.",
          "highlight": "$10,694"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 76 out of 100, you've earned the title of Certified Degen Ruglord.",
          "highlight": "76/100"
        }
      ],
      "title": "Certified Degen Ruglord",
      "jeetScore": 76
    }
  },
  {
    "id": 32,
    "stats": {
      "totalMissedUsd": 20090,
      "worstSell": {
        "tokenName": "WIF Token",
        "tokenSymbol": "WIF",
        "contractAddress": "0xcd79dc0cde0dc000000000000000000000000000",
        "amountSold": 519050,
        "sellPrice": 0.054694,
        "currentPrice": 7.990546,
        "missedGains": 7766,
        "sellDate": "2023-12-01",
        "txHash": "0xabc32...2"
      },
      "jeetScore": 61,
      "tokensJeeted": 4,
      "trades": [
        {
          "tokenName": "WIF Token",
          "tokenSymbol": "WIF",
          "contractAddress": "0xcd79dc0cde0dc000000000000000000000000000",
          "amountSold": 519050,
          "sellPrice": 0.054694,
          "currentPrice": 7.990546,
          "missedGains": 7766,
          "sellDate": "2023-12-01",
          "txHash": "0xabc32...2"
        },
        {
          "tokenName": "AGIX Token",
          "tokenSymbol": "AGIX",
          "contractAddress": "0x60c7e574f9756000000000000000000000000000",
          "amountSold": 863550,
          "sellPrice": 0.095091,
          "currentPrice": 4.469796,
          "missedGains": 6631,
          "sellDate": "2026-08-01",
          "txHash": "0xabc32...0"
        },
        {
          "tokenName": "TURBO Token",
          "tokenSymbol": "TURBO",
          "contractAddress": "0xb12b2d9898071000000000000000000000000000",
          "amountSold": 18921,
          "sellPrice": 0.049436,
          "currentPrice": 1.540721,
          "missedGains": 5065,
          "sellDate": "2026-03-01",
          "txHash": "0xabc32...3"
        },
        {
          "tokenName": "PENDLE Token",
          "tokenSymbol": "PENDLE",
          "contractAddress": "0x4b4675a7fa560000000000000000000000000000",
          "amountSold": 258092,
          "sellPrice": 0.02486,
          "currentPrice": 4.489895,
          "missedGains": 628,
          "sellDate": "2026-01-01",
          "txHash": "0xabc32...1"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $WIF early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,766 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $AGIX right before it exploded too. You left $20,090 on the table across 4 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 61 out of 100, you've earned the title of Generational Fumble Champion.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $WIF early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,766 today. My GPU is literally crying for you.",
          "highlight": "$7,766"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $AGIX right before it exploded too.",
          "highlight": "$AGIX"
        },
        {
          "type": "comparison",
          "text": "You left $20,090 on the table across 4 tokens. That's life-changing money you just gave away.",
          "highlight": "$20,090"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 61 out of 100, you've earned the title of Generational Fumble Champion.",
          "highlight": "61/100"
        }
      ],
      "title": "Generational Fumble Champion",
      "jeetScore": 61
    }
  },
  {
    "id": 33,
    "stats": {
      "totalMissedUsd": 13117,
      "worstSell": {
        "tokenName": "PENDLE Token",
        "tokenSymbol": "PENDLE",
        "contractAddress": "0x532ef9ca280e3000000000000000000000000000",
        "amountSold": 138296,
        "sellPrice": 0.035966,
        "currentPrice": 3.732668,
        "missedGains": 7818,
        "sellDate": "2024-08-01",
        "txHash": "0xabc33...2"
      },
      "jeetScore": 61,
      "tokensJeeted": 4,
      "trades": [
        {
          "tokenName": "PENDLE Token",
          "tokenSymbol": "PENDLE",
          "contractAddress": "0x532ef9ca280e3000000000000000000000000000",
          "amountSold": 138296,
          "sellPrice": 0.035966,
          "currentPrice": 3.732668,
          "missedGains": 7818,
          "sellDate": "2024-08-01",
          "txHash": "0xabc33...2"
        },
        {
          "tokenName": "DEGEN Token",
          "tokenSymbol": "DEGEN",
          "contractAddress": "0x6179c60bae0ea000000000000000000000000000",
          "amountSold": 158206,
          "sellPrice": 0.035489,
          "currentPrice": 1.489991,
          "missedGains": 3041,
          "sellDate": "2024-06-01",
          "txHash": "0xabc33...1"
        },
        {
          "tokenName": "APT Token",
          "tokenSymbol": "APT",
          "contractAddress": "0x59ecddba98962000000000000000000000000000",
          "amountSold": 285678,
          "sellPrice": 0.028132,
          "currentPrice": 0.419798,
          "missedGains": 1436,
          "sellDate": "2023-08-01",
          "txHash": "0xabc33...3"
        },
        {
          "tokenName": "BOME Token",
          "tokenSymbol": "BOME",
          "contractAddress": "0x7bbb64946db8e000000000000000000000000000",
          "amountSold": 562345,
          "sellPrice": 0.0772,
          "currentPrice": 8.600975,
          "missedGains": 822,
          "sellDate": "2026-03-01",
          "txHash": "0xabc33...0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $PENDLE early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,818 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $DEGEN right before it exploded too. You left $13,117 on the table across 4 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 61 out of 100, you've earned the title of Buy High Sell Low Specialist.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $PENDLE early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,818 today. My GPU is literally crying for you.",
          "highlight": "$7,818"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $DEGEN right before it exploded too.",
          "highlight": "$DEGEN"
        },
        {
          "type": "comparison",
          "text": "You left $13,117 on the table across 4 tokens. That's life-changing money you just gave away.",
          "highlight": "$13,117"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 61 out of 100, you've earned the title of Buy High Sell Low Specialist.",
          "highlight": "61/100"
        }
      ],
      "title": "Buy High Sell Low Specialist",
      "jeetScore": 61
    }
  },
  {
    "id": 34,
    "stats": {
      "totalMissedUsd": 29030,
      "worstSell": {
        "tokenName": "APT Token",
        "tokenSymbol": "APT",
        "contractAddress": "0x312f4e998b3f6000000000000000000000000000",
        "amountSold": 476202,
        "sellPrice": 0.008258,
        "currentPrice": 2.973541,
        "missedGains": 8921,
        "sellDate": "2026-04-01",
        "txHash": "0xabc34...5"
      },
      "jeetScore": 90,
      "tokensJeeted": 6,
      "trades": [
        {
          "tokenName": "APT Token",
          "tokenSymbol": "APT",
          "contractAddress": "0x312f4e998b3f6000000000000000000000000000",
          "amountSold": 476202,
          "sellPrice": 0.008258,
          "currentPrice": 2.973541,
          "missedGains": 8921,
          "sellDate": "2026-04-01",
          "txHash": "0xabc34...5"
        },
        {
          "tokenName": "TIA Token",
          "tokenSymbol": "TIA",
          "contractAddress": "0x1a28387e6102f000000000000000000000000000",
          "amountSold": 498909,
          "sellPrice": 0.050234,
          "currentPrice": 5.966384,
          "missedGains": 7049,
          "sellDate": "2026-03-01",
          "txHash": "0xabc34...3"
        },
        {
          "tokenName": "MOG Token",
          "tokenSymbol": "MOG",
          "contractAddress": "0x80ef7b3a26e38000000000000000000000000000",
          "amountSold": 115191,
          "sellPrice": 0.055066,
          "currentPrice": 0.998611,
          "missedGains": 6118,
          "sellDate": "2024-11-01",
          "txHash": "0xabc34...2"
        },
        {
          "tokenName": "OP Token",
          "tokenSymbol": "OP",
          "contractAddress": "0x821239b4c850c000000000000000000000000000",
          "amountSold": 795115,
          "sellPrice": 0.082112,
          "currentPrice": 0.33411,
          "missedGains": 3564,
          "sellDate": "2024-07-01",
          "txHash": "0xabc34...4"
        },
        {
          "tokenName": "WIF Token",
          "tokenSymbol": "WIF",
          "contractAddress": "0x628e0065f0ad0000000000000000000000000000",
          "amountSold": 865931,
          "sellPrice": 0.074977,
          "currentPrice": 1.617262,
          "missedGains": 1716,
          "sellDate": "2025-12-01",
          "txHash": "0xabc34...0"
        },
        {
          "tokenName": "DOGE Token",
          "tokenSymbol": "DOGE",
          "contractAddress": "0x09ac0bb746556000000000000000000000000000",
          "amountSold": 687644,
          "sellPrice": 0.010002,
          "currentPrice": 7.427999,
          "missedGains": 1662,
          "sellDate": "2023-09-01",
          "txHash": "0xabc34...1"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $APT early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,921 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $TIA right before it exploded too. You left $29,030 on the table across 6 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 90 out of 100, you've earned the title of Buy High Sell Low Specialist.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $APT early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,921 today. My GPU is literally crying for you.",
          "highlight": "$8,921"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $TIA right before it exploded too.",
          "highlight": "$TIA"
        },
        {
          "type": "comparison",
          "text": "You left $29,030 on the table across 6 tokens. That's life-changing money you just gave away.",
          "highlight": "$29,030"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 90 out of 100, you've earned the title of Buy High Sell Low Specialist.",
          "highlight": "90/100"
        }
      ],
      "title": "Buy High Sell Low Specialist",
      "jeetScore": 90
    }
  },
  {
    "id": 35,
    "stats": {
      "totalMissedUsd": 17148,
      "worstSell": {
        "tokenName": "TIA Token",
        "tokenSymbol": "TIA",
        "contractAddress": "0x81423e784a8f4000000000000000000000000000",
        "amountSold": 770391,
        "sellPrice": 0.041211,
        "currentPrice": 9.586456,
        "missedGains": 8630,
        "sellDate": "2025-10-01",
        "txHash": "0xabc35...3"
      },
      "jeetScore": 63,
      "tokensJeeted": 4,
      "trades": [
        {
          "tokenName": "TIA Token",
          "tokenSymbol": "TIA",
          "contractAddress": "0x81423e784a8f4000000000000000000000000000",
          "amountSold": 770391,
          "sellPrice": 0.041211,
          "currentPrice": 9.586456,
          "missedGains": 8630,
          "sellDate": "2025-10-01",
          "txHash": "0xabc35...3"
        },
        {
          "tokenName": "SLERF Token",
          "tokenSymbol": "SLERF",
          "contractAddress": "0x8e7741cf65e9b000000000000000000000000000",
          "amountSold": 635017,
          "sellPrice": 0.08698,
          "currentPrice": 7.492232,
          "missedGains": 5023,
          "sellDate": "2025-02-01",
          "txHash": "0xabc35...0"
        },
        {
          "tokenName": "COQ Token",
          "tokenSymbol": "COQ",
          "contractAddress": "0xe9c037832c094000000000000000000000000000",
          "amountSold": 775686,
          "sellPrice": 0.023817,
          "currentPrice": 8.102635,
          "missedGains": 2342,
          "sellDate": "2026-05-01",
          "txHash": "0xabc35...1"
        },
        {
          "tokenName": "ORDI Token",
          "tokenSymbol": "ORDI",
          "contractAddress": "0x11fa36a01edff000000000000000000000000000",
          "amountSold": 532287,
          "sellPrice": 0.008904,
          "currentPrice": 3.5815,
          "missedGains": 1153,
          "sellDate": "2024-04-01",
          "txHash": "0xabc35...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $TIA early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,630 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $SLERF right before it exploded too. You left $17,148 on the table across 4 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 63 out of 100, you've earned the title of The 10% Profit Prodigy.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $TIA early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $8,630 today. My GPU is literally crying for you.",
          "highlight": "$8,630"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $SLERF right before it exploded too.",
          "highlight": "$SLERF"
        },
        {
          "type": "comparison",
          "text": "You left $17,148 on the table across 4 tokens. That's life-changing money you just gave away.",
          "highlight": "$17,148"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 63 out of 100, you've earned the title of The 10% Profit Prodigy.",
          "highlight": "63/100"
        }
      ],
      "title": "The 10% Profit Prodigy",
      "jeetScore": 63
    }
  },
  {
    "id": 36,
    "stats": {
      "totalMissedUsd": 12538,
      "worstSell": {
        "tokenName": "SLERF Token",
        "tokenSymbol": "SLERF",
        "contractAddress": "0xfa85068daca9c000000000000000000000000000",
        "amountSold": 427118,
        "sellPrice": 0.099131,
        "currentPrice": 6.767241,
        "missedGains": 7357,
        "sellDate": "2023-01-01",
        "txHash": "0xabc36...2"
      },
      "jeetScore": 73,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "SLERF Token",
          "tokenSymbol": "SLERF",
          "contractAddress": "0xfa85068daca9c000000000000000000000000000",
          "amountSold": 427118,
          "sellPrice": 0.099131,
          "currentPrice": 6.767241,
          "missedGains": 7357,
          "sellDate": "2023-01-01",
          "txHash": "0xabc36...2"
        },
        {
          "tokenName": "BOME Token",
          "tokenSymbol": "BOME",
          "contractAddress": "0x78bbf11e94d37000000000000000000000000000",
          "amountSold": 505396,
          "sellPrice": 0.002984,
          "currentPrice": 9.678296,
          "missedGains": 3680,
          "sellDate": "2026-06-01",
          "txHash": "0xabc36...1"
        },
        {
          "tokenName": "WIF Token",
          "tokenSymbol": "WIF",
          "contractAddress": "0xf52f97823fc1b000000000000000000000000000",
          "amountSold": 96631,
          "sellPrice": 0.052498,
          "currentPrice": 7.774814,
          "missedGains": 1501,
          "sellDate": "2024-07-01",
          "txHash": "0xabc36...0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $SLERF early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,357 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $BOME right before it exploded too. You left $12,538 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 73 out of 100, you've earned the title of Generational Fumble Champion.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $SLERF early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,357 today. My GPU is literally crying for you.",
          "highlight": "$7,357"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $BOME right before it exploded too.",
          "highlight": "$BOME"
        },
        {
          "type": "comparison",
          "text": "You left $12,538 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$12,538"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 73 out of 100, you've earned the title of Generational Fumble Champion.",
          "highlight": "73/100"
        }
      ],
      "title": "Generational Fumble Champion",
      "jeetScore": 73
    }
  },
  {
    "id": 37,
    "stats": {
      "totalMissedUsd": 14592,
      "worstSell": {
        "tokenName": "MEME Token",
        "tokenSymbol": "MEME",
        "contractAddress": "0x5ec7740f9d23a000000000000000000000000000",
        "amountSold": 950211,
        "sellPrice": 0.044783,
        "currentPrice": 0.809546,
        "missedGains": 7472,
        "sellDate": "2026-01-01",
        "txHash": "0xabc37...0"
      },
      "jeetScore": 72,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "MEME Token",
          "tokenSymbol": "MEME",
          "contractAddress": "0x5ec7740f9d23a000000000000000000000000000",
          "amountSold": 950211,
          "sellPrice": 0.044783,
          "currentPrice": 0.809546,
          "missedGains": 7472,
          "sellDate": "2026-01-01",
          "txHash": "0xabc37...0"
        },
        {
          "tokenName": "MOG Token",
          "tokenSymbol": "MOG",
          "contractAddress": "0x24101cb8a6bce000000000000000000000000000",
          "amountSold": 350430,
          "sellPrice": 0.057709,
          "currentPrice": 0.302822,
          "missedGains": 3912,
          "sellDate": "2026-08-01",
          "txHash": "0xabc37...1"
        },
        {
          "tokenName": "RATS Token",
          "tokenSymbol": "RATS",
          "contractAddress": "0xc452c6686d1de000000000000000000000000000",
          "amountSold": 364390,
          "sellPrice": 0.013016,
          "currentPrice": 0.312021,
          "missedGains": 3208,
          "sellDate": "2025-06-01",
          "txHash": "0xabc37...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $MEME early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,472 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $MOG right before it exploded too. You left $14,592 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 72 out of 100, you've earned the title of Generational Fumble Champion.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $MEME early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $7,472 today. My GPU is literally crying for you.",
          "highlight": "$7,472"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $MOG right before it exploded too.",
          "highlight": "$MOG"
        },
        {
          "type": "comparison",
          "text": "You left $14,592 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$14,592"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 72 out of 100, you've earned the title of Generational Fumble Champion.",
          "highlight": "72/100"
        }
      ],
      "title": "Generational Fumble Champion",
      "jeetScore": 72
    }
  },
  {
    "id": 38,
    "stats": {
      "totalMissedUsd": 5568,
      "worstSell": {
        "tokenName": "OCEAN Token",
        "tokenSymbol": "OCEAN",
        "contractAddress": "0x40847980b32aa000000000000000000000000000",
        "amountSold": 324005,
        "sellPrice": 0.014053,
        "currentPrice": 4.85564,
        "missedGains": 2448,
        "sellDate": "2026-02-01",
        "txHash": "0xabc38...1"
      },
      "jeetScore": 80,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "OCEAN Token",
          "tokenSymbol": "OCEAN",
          "contractAddress": "0x40847980b32aa000000000000000000000000000",
          "amountSold": 324005,
          "sellPrice": 0.014053,
          "currentPrice": 4.85564,
          "missedGains": 2448,
          "sellDate": "2026-02-01",
          "txHash": "0xabc38...1"
        },
        {
          "tokenName": "WEN Token",
          "tokenSymbol": "WEN",
          "contractAddress": "0x0033d26983657000000000000000000000000000",
          "amountSold": 387499,
          "sellPrice": 0.068178,
          "currentPrice": 4.024641,
          "missedGains": 1737,
          "sellDate": "2026-05-01",
          "txHash": "0xabc38...2"
        },
        {
          "tokenName": "SNEK Token",
          "tokenSymbol": "SNEK",
          "contractAddress": "0xfcb6371fb00ea000000000000000000000000000",
          "amountSold": 227363,
          "sellPrice": 0.05582,
          "currentPrice": 0.911611,
          "missedGains": 1383,
          "sellDate": "2025-05-01",
          "txHash": "0xabc38...0"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $OCEAN early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $2,448 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $WEN right before it exploded too. You left $5,568 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 80 out of 100, you've earned the title of The 10% Profit Prodigy.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $OCEAN early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $2,448 today. My GPU is literally crying for you.",
          "highlight": "$2,448"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $WEN right before it exploded too.",
          "highlight": "$WEN"
        },
        {
          "type": "comparison",
          "text": "You left $5,568 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$5,568"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 80 out of 100, you've earned the title of The 10% Profit Prodigy.",
          "highlight": "80/100"
        }
      ],
      "title": "The 10% Profit Prodigy",
      "jeetScore": 80
    }
  },
  {
    "id": 39,
    "stats": {
      "totalMissedUsd": 5532,
      "worstSell": {
        "tokenName": "WIF Token",
        "tokenSymbol": "WIF",
        "contractAddress": "0x17183510e207e000000000000000000000000000",
        "amountSold": 116703,
        "sellPrice": 0.055598,
        "currentPrice": 7.87846,
        "missedGains": 3682,
        "sellDate": "2023-03-01",
        "txHash": "0xabc39...0"
      },
      "jeetScore": 67,
      "tokensJeeted": 3,
      "trades": [
        {
          "tokenName": "WIF Token",
          "tokenSymbol": "WIF",
          "contractAddress": "0x17183510e207e000000000000000000000000000",
          "amountSold": 116703,
          "sellPrice": 0.055598,
          "currentPrice": 7.87846,
          "missedGains": 3682,
          "sellDate": "2023-03-01",
          "txHash": "0xabc39...0"
        },
        {
          "tokenName": "SEI Token",
          "tokenSymbol": "SEI",
          "contractAddress": "0x9927ff318c781000000000000000000000000000",
          "amountSold": 905202,
          "sellPrice": 0.035104,
          "currentPrice": 2.289333,
          "missedGains": 1623,
          "sellDate": "2025-01-01",
          "txHash": "0xabc39...1"
        },
        {
          "tokenName": "AGIX Token",
          "tokenSymbol": "AGIX",
          "contractAddress": "0xf48f6a9950ec2000000000000000000000000000",
          "amountSold": 988780,
          "sellPrice": 0.054807,
          "currentPrice": 2.033943,
          "missedGains": 227,
          "sellDate": "2024-07-01",
          "txHash": "0xabc39...2"
        }
      ]
    },
    "roast": {
      "script": "Let me get this straight. You bought $WIF early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $3,682 today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $SEI right before it exploded too. You left $5,532 on the table across 3 tokens. That's life-changing money you just gave away. Congratulations — with a Jeet Score of 67 out of 100, you've earned the title of Exit Liquidity Provider.",
      "beats": [
        {
          "type": "opening",
          "text": "Let me get this straight. You bought $WIF early, watched it pump, and STILL decided to sell for peanuts? That bag is worth $3,682 today. My GPU is literally crying for you.",
          "highlight": "$3,682"
        },
        {
          "type": "data",
          "text": "And that wasn't even your worst month! You dumped $SEI right before it exploded too.",
          "highlight": "$SEI"
        },
        {
          "type": "comparison",
          "text": "You left $5,532 on the table across 3 tokens. That's life-changing money you just gave away.",
          "highlight": "$5,532"
        },
        {
          "type": "closing",
          "text": "Congratulations — with a Jeet Score of 67 out of 100, you've earned the title of Exit Liquidity Provider.",
          "highlight": "67/100"
        }
      ],
      "title": "Exit Liquidity Provider",
      "jeetScore": 67
    }
  }
];

export function getRandomDemoProfile(): DemoProfile {
  const randomIndex = Math.floor(Math.random() * DEMO_PROFILES.length);
  return DEMO_PROFILES[randomIndex];
}
