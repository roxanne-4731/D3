import * as functions from '../../helpers/functions';

export const custom = {
    nodes: [
        {
            id: "mammal", group: 0, label: "Mammals", level: 1, children: [
                {id: "a", group: 2, label: "a", level: 2},
                {id: "b", group: 2, label: "b", level: 5},
                {id: "c", group: 2, label: "c", level: 2}
            ]
        },
        {id: "dog", group: 1, label: "Dogs", level: 2},
        {id: "cat", group: 1, label: "Cats", level: 2},
        {id: "fox", group: 1, label: "Foxes", level: 2},
        {id: "elk", group: 0, label: "Elk", level: 2},
        // {id: "insect", group: 1, label: "Insects", level: 1},
        {id: "ant", group: 1, label: "Ants", level: 2},
        // {id: "bee", group: 1, label: "Bees", level: 2},
        // {id: "fish", group: 2, label: "Fish", level: 1},
        // {id: "carp", group: 2, label: "Carp", level: 2},
        // {id: "pike", group: 2, label: "Pikes", level: 2}
    ],
    links: [
        {target: "mammal", source: "dog", strength: 0.7, type: "IS_A"},
        {target: "dog", source: "cat", strength: 0.7, type: "WORKS_ON"},
        {target: "ant", source: "fox", strength: 0.7, type: "IS_A"},
        {target: "fox", source: "elk", strength: 0.7, type: "FOUNDED"},
        // {target: "insect", source: "ant", strength: 0.7, type: "FOUNDED"},
        // {target: "insect", source: "bee", strength: 0.7, type: "IS_A"},
        // {target: "fish", source: "carp", strength: 0.7, type: "WORKS_ON"},
        // {target: "fish", source: "pike", strength: 0.7, type: "KNOWS"},
        // {target: "cat", source: "elk", strength: 0.1, type: "KNOWS"},
        // {target: "carp", source: "ant", strength: 0.1, type: "IS_A"},
        // {target: "elk", source: "bee", strength: 0.1, type: "WORKS_ON"},
        // {target: "dog", source: "cat", strength: 0.1, type: "KNOWS"},
        // {target: "fox", source: "ant", strength: 0.1, type: "KNOWS"},
        // {target: "pike", source: "dog", strength: 0.1, type: "FOUNDED"}
    ]
};

export const neo4j = {
    nodes: [
        {id: "pak", group: 1, label: "لبنیات پاک", level: 1},
        {id: "1010032", group: 1, label: "1010032", level: 2},
        {id: "ali", group: 1, label: "علیرضا سجادی", level: 2},
        {id: "mali", group: 1, label: "گروه توسعه مالی مهر آیندگان", level: 2},
        {id: "bonyad", group: 1, label: "بنیاد مستضعفان", level: 2},
        {id: "sarmaye", group: 1, label: "سرمایه گذاری", level: 2},
        {id: "sina", group: 1, label: "مالی و سرمایه گذاری سینا", level: 2},
        {id: "mathar", group: 1, label: "شرکت مادر تخصصی", level: 2},
    ],
    links: [
        {target: "1010032", source: "pak", strength: 0.7, type: "introduction"},
        {target: "ali", source: "pak", strength: 0.7, type: "CEO"},
        {target: "mali", source: "pak", strength: 0.7, type: "BOARD_Me"},
        {target: "bonyad", source: "pak", strength: 0.7, type: "BOARD_Me"},
        {target: "sarmaye", source: "pak", strength: 0.7, type: "BOARD_Me"},
        {target: "sina", source: "pak", strength: 0.7, type: "BOARD_Me"},
        {target: "mathar", source: "pak", strength: 0.7, type: "BOARD_Me"},
    ]
};

export const neo4jTree = {
    id: "pak",
    group: 1,
    label: "لبنیات پاک",
    level: 1,
    size: 16000,
    children: [
        {
            id: "1010032",
            type: 'BOARD_Me',

            size: 9000,
            group: 1,
            label: "1010032",
            level: 2,

            children: [
                { id: 'a',
                    type: 'BOARD_Me',
                    group: 3, label: 'one', level: 3, size: 4000
                },
                {
                    id: 'b',
                    type: 'BOARD_Me',
                    group: 3, label: 'two', level: 3, size: 4000
                }
            ]
        },
        {
            size: 9000,
            id: "ali",
            type: 'BOARD_Me',
            group: 1, label: "علیرضا سجادی", level: 2,

            children: [
                {
                    size: 4000,
                    id: 'c',
                    type: 'BOARD_Me',
                    group: 3, label: 'three', level: 3,

                    children: [
                        {
                            id: 'd',
                            type: 'introduction',
                            group: 3, label: 'four', level: 4, size: 1000
                        },
                        {
                            id: 'e',
                            type: 'introduction',
                            group: 3, label: 'five', level: 4, size: 1000
                        }
                    ]
                },
                {
                    id: 'f',
                    type: 'introduction',
                    group: 3, label: 'six', level: 3, size: 4000,
                },
                {
                    id: 'g',
                    type: 'introduction',
                    group: 3, label: 'seven', level: 3, size: 4000,
                },
                {
                    size: 4000,

                    id: 'h',
                    type: 'introduction',
                    group: 3, label: 'eight', level: 3,
                    children: [
                        {
                            id: 'i',
                            type: 'introduction',
                            group: 3, label: 'nine', level: 4
                        },
                        {
                            id: 'j',
                            type: 'introduction',
                            group: 3, label: 'ten', level: 4,
                            children: [
                                {
                                    id: 'k',
                                    type: 'introduction',
                                    group: 3, label: 'eleven', level: 5, size: 1000
                                },
                                {
                                    id: 'l',
                                    type: 'CEO',
                                    group: 3, label: 'Twelve', level: 5, size: 1000
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            size: 9000,
            id: "mali",
            type: 'CEO',
            group: 1, label: "گروه توسعه مالی مهر آیندگان", level: 2

        }
    ]
};
export const neo4jTest = {
    "label": "pak",
    "id": 'pak',
    level: 1,
    group: 2,
    size: 4000,
    "children": [
        {
            "label": "ali",
            size: 9000,
            "id": 'ali',
            level: 2,
            group: 2,
            "children": [
                {
                    "label": "tahmasb",
                    "id": 'tahmasb',
                    level: 2,
                    group: 2,
                    size: 4000,
                    "children": [
                        {
                            id: 'a', group: 3, label: 'a', level: 5, size: 1000,
                        },
                        {id: 'b', group: 3, label: 'b', level: 5, size: 1000},
                        {id: 'c', group: 3, label: 'c', level: 5, size: 1000},
                        {id: 'd', group: 3, label: 'd', level: 5, size: 1000},
                        {id: 'e', group: 3, label: 'e', level: 5, size: 1000}
                    ]
                }
            ]
        },
        {
            "label": "homayoon",
            "id": 'homayoon',
            size: 9000,
            level: 2,
            group: 2,
            "children": [
                {id: 'a', group: 3, label: 'a', level: 5, size: 4000},
                {id: 'b', group: 3, label: 'b', level: 5, size: 4000},
                {id: 'c', group: 3, label: 'c', level: 5, size: 4000},
                {id: 'd', group: 3, label: 'd', level: 5, size: 4000},
                {id: 'e', group: 3, label: 'e', level: 5, size: 4000}
            ]
        },
        {
            "label": "1010032",
            "id": '1010032',
            size: 9000,
            level: 2,
            group: 2,
            "children": [
                {id: 'a', group: 3, label: 'a', level: 5, size: 4000},
                {id: 'b', group: 3, label: 'b', level: 5, size: 4000},
                {id: 'c', group: 3, label: 'c', level: 5, size: 4000},
                {id: 'd', group: 3, label: 'd', level: 5, size: 4000},
                {id: 'e', group: 3, label: 'e', level: 5, size: 4000}
            ]
        }
    ]
};

export const collapse = {
    "name": "flare",
    "children": [
        {
            "name": "analytics",
            "children": [
                {
                    "name": "cluster",
                    "children": [
                        {"name": "AgglomerativeCluster", "size": 3938},
                        {"name": "CommunityStructure", "size": 3812},
                        {"name": "HierarchicalCluster", "size": 6714},
                        {"name": "MergeEdge", "size": 743}
                    ]
                },
                {
                    "name": "graph",
                    "children": [
                        {"name": "BetweennessCentrality", "size": 3534},
                        {"name": "LinkDistance", "size": 5731},
                        {"name": "MaxFlowMinCut", "size": 7840},
                        {"name": "ShortestPaths", "size": 5914},
                        {"name": "SpanningTree", "size": 3416}
                    ]
                },
                {
                    "name": "optimization",
                    "children": [
                        {"name": "AspectRatioBanker", "size": 7074}
                    ]
                }
            ]
        }
    ]
};


export const data = {
    "nodes": [{"id": 78}, {
        "id": 33,
        "col": "red"
    }, {"id": 556}, {"id": 531}, {"id": 122}, {"id": 335}, {"id": 764}, {"id": 842}, {"id": 749}, {"id": 775}, {"id": 625}, {"id": 519}, {"id": 100}, {"id": 332}, {"id": 248}, {"id": 758}, {"id": 602}, {"id": 831}, {"id": 865}, {"id": 72}, {"id": 356}, {"id": 657}, {"id": 608}, {"id": 744}, {"id": 292}, {"id": 760}, {"id": 795}, {"id": 558}, {"id": 788}, {"id": 773}, {"id": 903}, {"id": 674}, {"id": 507}, {"id": 808}, {"id": 787}, {"id": 6}, {"id": 355}, {"id": 571}, {"id": 134}, {"id": 646}, {"id": 733}, {"id": 950}, {"id": 425}, {"id": 822}, {"id": 88}, {"id": 987}, {"id": 916}, {"id": 649}, {"id": 464}, {"id": 653}, {"id": 592}, {"id": 597}, {"id": 204}, {"id": 319}, {"id": 661}, {"id": 113}, {"id": 856}, {"id": 939}, {"id": 641}, {"id": 269}, {"id": 410}, {"id": 855}, {"id": 54}, {"id": 633}, {"id": 671}, {"id": 250}, {"id": 299}, {"id": 472}, {"id": 747}, {"id": 178}, {"id": 328}, {"id": 797}, {"id": 252}, {"id": 462}, {"id": 114}, {"id": 69}, {"id": 236}, {"id": 551}, {"id": 870}, {"id": 175}, {"id": 345}, {"id": 962}, {"id": 10}, {"id": 720}, {"id": 7}, {"id": 993}, {"id": 320}, {"id": 658}, {"id": 675}, {"id": 17}, {"id": 156}, {"id": 838}, {"id": 828}, {"id": 887}, {"id": 527}, {"id": 402}, {"id": 652}, {"id": 712}, {"id": 255}, {"id": 921}, {"id": 443}, {"id": 132}, {"id": 286}, {"id": 569}, {"id": 432}, {"id": 341}, {"id": 827}, {"id": 334}, {"id": 636}, {"id": 900}, {"id": 713}, {"id": 45}, {"id": 978}, {"id": 731}, {"id": 68}, {"id": 429}, {"id": 644}, {"id": 529}, {"id": 485}, {"id": 76}, {"id": 162}, {"id": 284}, {"id": 898}, {"id": 231}, {"id": 863}, {"id": 346}, {"id": 19}, {"id": 210}, {"id": 161}, {"id": 560}, {"id": 358}, {"id": 719}, {"id": 702}, {"id": 793}, {"id": 919}, {"id": 273}, {"id": 491}, {"id": 67}, {"id": 458}, {"id": 847}, {"id": 890}, {"id": 392}, {"id": 803}, {"id": 420}, {"id": 405}, {"id": 244}, {"id": 422}, {"id": 956}, {"id": 424}, {"id": 160}, {"id": 81}, {"id": 515}, {"id": 882}, {"id": 363}, {"id": 14}, {"id": 326}, {"id": 813}, {"id": 683}, {"id": 187}, {"id": 743}, {"id": 835}, {"id": 351}, {"id": 348}, {"id": 858}, {"id": 190}, {"id": 883}, {"id": 309}, {"id": 512}, {"id": 748}, {"id": 476}, {"id": 198}, {"id": 611}, {"id": 331}, {"id": 518}, {"id": 173}, {"id": 395}, {"id": 639}, {"id": 872}, {"id": 667}, {"id": 498}, {"id": 650}, {"id": 763}, {"id": 336}, {"id": 709}, {"id": 765}, {"id": 946}, {"id": 645}, {"id": 688}, {"id": 228}, {"id": 502}, {"id": 770}, {"id": 541}, {"id": 925}, {"id": 965}, {"id": 695}, {"id": 923}, {"id": 200}, {"id": 533}, {"id": 90}, {"id": 843}, {"id": 318}, {"id": 257}, {"id": 716}, {"id": 783}, {"id": 834}, {"id": 607}, {"id": 102}, {"id": 938}, {"id": 394}, {"id": 745}, {"id": 107}, {"id": 283}, {"id": 880}, {"id": 669}, {"id": 767}, {"id": 230}, {"id": 918}, {"id": 262}, {"id": 87}, {"id": 561}, {"id": 964}, {"id": 948}, {"id": 460}, {"id": 110}, {"id": 181}, {"id": 224}, {"id": 637}, {"id": 89}, {"id": 163}, {"id": 792}, {"id": 489}, {"id": 682}, {"id": 881}, {"id": 59}, {"id": 782}, {"id": 141}, {"id": 540}, {"id": 158}, {"id": 811}, {"id": 55}, {"id": 577}, {"id": 837}, {"id": 470}, {"id": 448}, {"id": 557}, {"id": 812}, {"id": 907}, {"id": 182}, {"id": 126}, {"id": 223}, {"id": 866}, {"id": 899}, {"id": 534}, {"id": 740}, {"id": 484}, {"id": 22}, {"id": 232}, {"id": 972}, {"id": 222}, {"id": 172}, {"id": 139}, {"id": 401}, {"id": 593}, {"id": 927}, {"id": 810}, {"id": 183}, {"id": 941}, {"id": 265}, {"id": 643}, {"id": 801}, {"id": 520}, {"id": 991}, {"id": 229}, {"id": 562}, {"id": 694}, {"id": 421}, {"id": 500}, {"id": 375}, {"id": 990}, {"id": 769}, {"id": 568}, {"id": 668}, {"id": 913}, {"id": 960}, {"id": 951}, {"id": 908}, {"id": 237}, {"id": 548}, {"id": 435}, {"id": 588}, {"id": 266}, {"id": 267}, {"id": 604}, {"id": 729}, {"id": 137}, {"id": 984}, {"id": 171}, {"id": 27}, {"id": 612}, {"id": 297}, {"id": 777}, {"id": 606}, {"id": 359}, {"id": 258}, {"id": 620}, {"id": 184}, {"id": 389}, {"id": 651}, {"id": 135}, {"id": 979}, {"id": 902}, {"id": 505}, {"id": 851}, {"id": 817}, {"id": 34}, {"id": 61}, {"id": 693}, {"id": 495}, {"id": 259}, {"id": 580}, {"id": 419}, {"id": 154}, {"id": 289}, {"id": 699}, {"id": 260}, {"id": 407}, {"id": 321}, {"id": 70}, {"id": 411}, {"id": 859}, {"id": 285}, {"id": 52}, {"id": 278}, {"id": 84}, {"id": 681}, {"id": 535}, {"id": 841}, {"id": 799}, {"id": 501}, {"id": 570}, {"id": 656}, {"id": 463}, {"id": 626}, {"id": 598}, {"id": 581}, {"id": 647}, {"id": 796}, {"id": 756}, {"id": 700}, {"id": 794}, {"id": 600}, {"id": 893}, {"id": 957}, {"id": 975}, {"id": 191}, {"id": 365}, {"id": 65}, {"id": 998}, {"id": 977}, {"id": 631}, {"id": 380}, {"id": 989}, {"id": 885}, {"id": 13}, {"id": 911}, {"id": 452}, {"id": 741}, {"id": 875}, {"id": 404}, {"id": 640}, {"id": 750}, {"id": 929}, {"id": 614}, {"id": 403}, {"id": 947}, {"id": 804}, {"id": 465}, {"id": 282}, {"id": 864}, {"id": 824}, {"id": 829}, {"id": 915}, {"id": 400}, {"id": 616}, {"id": 854}, {"id": 725}, {"id": 327}, {"id": 479}, {"id": 192}, {"id": 205}, {"id": 755}, {"id": 844}, {"id": 376}, {"id": 369}, {"id": 704}, {"id": 39}, {"id": 431}, {"id": 92}, {"id": 757}, {"id": 897}, {"id": 619}, {"id": 202}, {"id": 133}, {"id": 195}, {"id": 32}, {"id": 249}, {"id": 227}, {"id": 189}, {"id": 253}, {"id": 679}, {"id": 196}, {"id": 414}, {"id": 384}, {"id": 234}, {"id": 298}, {"id": 791}, {"id": 514}, {"id": 879}, {"id": 506}, {"id": 690}, {"id": 15}, {"id": 496}, {"id": 372}, {"id": 949}, {"id": 301}, {"id": 723}, {"id": 874}, {"id": 20}, {"id": 490}, {"id": 305}, {"id": 169}, {"id": 717}, {"id": 677}, {"id": 147}, {"id": 215}, {"id": 576}, {"id": 781}, {"id": 559}, {"id": 779}, {"id": 860}, {"id": 73}, {"id": 357}, {"id": 123}, {"id": 444}, {"id": 352}, {"id": 623}, {"id": 575}, {"id": 917}, {"id": 239}, {"id": 638}, {"id": 82}, {"id": 762}, {"id": 618}, {"id": 486}, {"id": 378}, {"id": 774}, {"id": 308}, {"id": 413}, {"id": 909}, {"id": 146}, {"id": 595}, {"id": 374}, {"id": 508}, {"id": 839}, {"id": 31}, {"id": 373}, {"id": 446}, {"id": 953}, {"id": 482}, {"id": 876}, {"id": 108}, {"id": 967}, {"id": 954}, {"id": 654}, {"id": 124}, {"id": 313}, {"id": 582}, {"id": 665}, {"id": 786}, {"id": 871}, {"id": 930}, {"id": 599}, {"id": 976}, {"id": 825}, {"id": 86}, {"id": 214}, {"id": 148}, {"id": 474}, {"id": 936}, {"id": 945}, {"id": 385}, {"id": 511}, {"id": 728}, {"id": 193}, {"id": 768}, {"id": 784}, {"id": 466}, {"id": 635}, {"id": 906}, {"id": 99}, {"id": 442}, {"id": 566}, {"id": 800}, {"id": 821}, {"id": 691}, {"id": 579}, {"id": 663}, {"id": 296}, {"id": 272}, {"id": 439}, {"id": 624}, {"id": 350}, {"id": 530}, {"id": 983}, {"id": 596}, {"id": 51}, {"id": 814}, {"id": 3}, {"id": 23}, {"id": 263}, {"id": 523}, {"id": 25}, {"id": 219}, {"id": 145}, {"id": 12}, {"id": 970}, {"id": 538}, {"id": 21}, {"id": 426}, {"id": 423}, {"id": 730}, {"id": 323}, {"id": 18}, {"id": 988}, {"id": 727}, {"id": 381}, {"id": 330}, {"id": 370}, {"id": 142}, {"id": 707}, {"id": 197}, {"id": 565}, {"id": 845}, {"id": 995}, {"id": 672}, {"id": 542}, {"id": 680}, {"id": 119}, {"id": 648}, {"id": 366}, {"id": 451}, {"id": 50}, {"id": 628}, {"id": 955}, {"id": 41}, {"id": 399}, {"id": 739}, {"id": 574}, {"id": 952}, {"id": 247}, {"id": 279}, {"id": 85}, {"id": 216}, {"id": 746}, {"id": 961}, {"id": 714}, {"id": 261}, {"id": 816}, {"id": 29}, {"id": 48}, {"id": 140}, {"id": 120}, {"id": 188}, {"id": 437}, {"id": 293}, {"id": 93}, {"id": 368}, {"id": 973}, {"id": 44}, {"id": 80}, {"id": 152}, {"id": 934}, {"id": 807}, {"id": 698}, {"id": 342}, {"id": 211}, {"id": 802}, {"id": 706}, {"id": 177}, {"id": 609}, {"id": 26}, {"id": 339}, {"id": 325}, {"id": 166}, {"id": 304}, {"id": 708}, {"id": 245}, {"id": 477}, {"id": 901}, {"id": 736}, {"id": 467}, {"id": 75}, {"id": 453}, {"id": 397}, {"id": 150}, {"id": 753}, {"id": 737}, {"id": 338}, {"id": 689}, {"id": 344}, {"id": 180}, {"id": 867}, {"id": 655}, {"id": 521}, {"id": 555}, {"id": 836}, {"id": 510}, {"id": 772}, {"id": 933}, {"id": 417}, {"id": 924}, {"id": 670}, {"id": 678}, {"id": 563}, {"id": 131}, {"id": 944}, {"id": 347}, {"id": 780}, {"id": 862}, {"id": 144}, {"id": 46}, {"id": 212}, {"id": 170}, {"id": 572}, {"id": 617}, {"id": 554}, {"id": 703}, {"id": 317}, {"id": 408}, {"id": 164}, {"id": 999}, {"id": 873}, {"id": 398}, {"id": 806}, {"id": 409}, {"id": 428}, {"id": 891}, {"id": 734}, {"id": 382}, {"id": 963}, {"id": 982}, {"id": 276}, {"id": 738}, {"id": 271}, {"id": 532}, {"id": 718}, {"id": 361}, {"id": 594}, {"id": 846}, {"id": 316}, {"id": 340}, {"id": 302}, {"id": 525}, {"id": 274}, {"id": 724}, {"id": 238}, {"id": 905}, {"id": 483}, {"id": 40}, {"id": 343}, {"id": 629}, {"id": 697}, {"id": 281}, {"id": 809}, {"id": 685}, {"id": 213}, {"id": 38}, {"id": 449}, {"id": 473}, {"id": 174}, {"id": 627}, {"id": 97}, {"id": 117}, {"id": 220}, {"id": 199}, {"id": 71}, {"id": 115}, {"id": 270}, {"id": 499}, {"id": 440}, {"id": 221}, {"id": 159}, {"id": 98}, {"id": 615}, {"id": 848}, {"id": 203}, {"id": 383}, {"id": 290}, {"id": 850}, {"id": 516}, {"id": 5}, {"id": 165}, {"id": 240}, {"id": 711}, {"id": 940}, {"id": 456}, {"id": 264}, {"id": 761}, {"id": 552}, {"id": 928}, {"id": 985}, {"id": 63}, {"id": 853}, {"id": 16}, {"id": 121}, {"id": 185}, {"id": 785}, {"id": 613}, {"id": 387}, {"id": 889}, {"id": 826}, {"id": 526}, {"id": 662}, {"id": 840}, {"id": 377}, {"id": 9}, {"id": 722}, {"id": 509}, {"id": 295}, {"id": 94}, {"id": 553}, {"id": 992}, {"id": 168}, {"id": 630}, {"id": 726}, {"id": 487}, {"id": 884}, {"id": 461}, {"id": 390}, {"id": 475}, {"id": 536}, {"id": 36}, {"id": 524}, {"id": 959}, {"id": 371}, {"id": 932}, {"id": 771}, {"id": 776}, {"id": 732}, {"id": 242}, {"id": 904}, {"id": 896}, {"id": 789}, {"id": 912}, {"id": 573}, {"id": 217}, {"id": 798}, {"id": 610}, {"id": 684}, {"id": 478}, {"id": 549}, {"id": 567}, {"id": 632}, {"id": 878}, {"id": 634}, {"id": 129}, {"id": 433}, {"id": 415}, {"id": 660}, {"id": 820}],
    "links": [{"source": 78, "target": 33}, {"source": 556, "target": 33}, {"source": 33, "target": 531}, {
        "source": 33,
        "target": 122
    }, {"source": 33, "target": 335}, {"source": 33, "target": 764}, {"source": 122, "target": 842}, {
        "source": 122,
        "target": 749
    }, {"source": 775, "target": 122}, {"source": 625, "target": 122}, {"source": 519, "target": 335}, {
        "source": 764,
        "target": 100
    }, {"source": 332, "target": 764}, {"source": 248, "target": 556}, {"source": 519, "target": 758}, {
        "source": 519,
        "target": 602
    }, {"source": 831, "target": 519}, {"source": 865, "target": 749}, {"source": 72, "target": 749}, {
        "source": 749,
        "target": 356
    }, {"source": 657, "target": 775}, {"source": 608, "target": 775}, {"source": 775, "target": 744}, {
        "source": 292,
        "target": 842
    }, {"source": 248, "target": 760}, {"source": 795, "target": 248}, {"source": 558, "target": 248}, {
        "source": 788,
        "target": 100
    }, {"source": 100, "target": 773}, {"source": 758, "target": 903}, {"source": 674, "target": 758}, {
        "source": 507,
        "target": 356
    }, {"source": 332, "target": 808}, {"source": 657, "target": 787}, {"source": 657, "target": 6}, {
        "source": 657,
        "target": 355
    }, {"source": 625, "target": 571}, {"source": 134, "target": 625}, {"source": 646, "target": 625}, {
        "source": 733,
        "target": 865
    }, {"source": 950, "target": 865}, {"source": 865, "target": 425}, {"source": 822, "target": 608}, {
        "source": 88,
        "target": 773
    }, {"source": 773, "target": 987}, {"source": 773, "target": 916}, {"source": 773, "target": 649}, {
        "source": 773,
        "target": 464
    }, {"source": 903, "target": 653}, {"source": 592, "target": 903}, {"source": 597, "target": 903}, {
        "source": 903,
        "target": 204
    }, {"source": 831, "target": 592}, {"source": 319, "target": 831}, {"source": 831, "target": 661}, {
        "source": 113,
        "target": 795
    }, {"source": 856, "target": 292}, {"source": 760, "target": 939}, {"source": 744, "target": 760}, {
        "source": 641,
        "target": 760
    }, {"source": 744, "target": 269}, {"source": 410, "target": 744}, {"source": 808, "target": 855}, {
        "source": 787,
        "target": 355
    }, {"source": 54, "target": 787}, {"source": 787, "target": 633}, {"source": 787, "target": 671}, {
        "source": 6,
        "target": 250
    }, {"source": 299, "target": 6}, {"source": 6, "target": 472}, {"source": 747, "target": 355}, {
        "source": 178,
        "target": 355
    }, {"source": 328, "target": 571}, {"source": 134, "target": 797}, {"source": 134, "target": 252}, {
        "source": 134,
        "target": 462
    }, {"source": 134, "target": 114}, {"source": 646, "target": 69}, {"source": 646, "target": 236}, {
        "source": 646,
        "target": 551
    }, {"source": 870, "target": 646}, {"source": 507, "target": 175}, {"source": 345, "target": 507}, {
        "source": 462,
        "target": 507
    }, {"source": 962, "target": 674}, {"source": 10, "target": 674}, {"source": 720, "target": 674}, {
        "source": 7,
        "target": 674
    }, {"source": 993, "target": 674}, {"source": 425, "target": 320}, {"source": 425, "target": 658}, {
        "source": 675,
        "target": 425
    }, {"source": 17, "target": 425}, {"source": 822, "target": 156}, {"source": 838, "target": 88}, {
        "source": 987,
        "target": 828
    }, {"source": 987, "target": 887}, {"source": 527, "target": 916}, {"source": 402, "target": 916}, {
        "source": 652,
        "target": 733
    }, {"source": 733, "target": 712}, {"source": 597, "target": 255}, {"source": 597, "target": 921}, {
        "source": 443,
        "target": 204
    }, {"source": 661, "target": 175}, {"source": 132, "target": 661}, {"source": 286, "target": 653}, {
        "source": 569,
        "target": 653
    }, {"source": 592, "target": 432}, {"source": 592, "target": 341}, {"source": 856, "target": 827}, {
        "source": 334,
        "target": 856
    }, {"source": 636, "target": 856}, {"source": 319, "target": 900}, {"source": 410, "target": 320}, {
        "source": 633,
        "target": 713
    }, {"source": 633, "target": 45}, {"source": 747, "target": 978}, {"source": 747, "target": 731}, {
        "source": 178,
        "target": 334
    }, {"source": 68, "target": 178}, {"source": 429, "target": 178}, {"source": 644, "target": 178}, {
        "source": 269,
        "target": 529
    }, {"source": 485, "target": 269}, {"source": 250, "target": 76}, {"source": 162, "target": 250}, {
        "source": 284,
        "target": 250
    }, {"source": 898, "target": 250}, {"source": 231, "target": 641}, {"source": 863, "target": 641}, {
        "source": 641,
        "target": 472
    }, {"source": 939, "target": 346}, {"source": 19, "target": 299}, {"source": 299, "target": 210}, {
        "source": 299,
        "target": 161
    }, {"source": 472, "target": 560}, {"source": 358, "target": 472}, {"source": 719, "target": 462}, {
        "source": 114,
        "target": 702
    }, {"source": 69, "target": 793}, {"source": 919, "target": 69}, {"source": 236, "target": 273}, {
        "source": 236,
        "target": 491
    }, {"source": 236, "target": 67}, {"source": 458, "target": 870}, {"source": 847, "target": 328}, {
        "source": 328,
        "target": 890
    }, {"source": 392, "target": 797}, {"source": 803, "target": 797}, {"source": 962, "target": 529}, {
        "source": 720,
        "target": 420
    }, {"source": 405, "target": 7}, {"source": 244, "target": 993}, {"source": 422, "target": 993}, {
        "source": 993,
        "target": 956
    }, {"source": 424, "target": 658}, {"source": 160, "target": 675}, {"source": 702, "target": 675}, {
        "source": 81,
        "target": 675
    }, {"source": 515, "target": 838}, {"source": 838, "target": 882}, {"source": 828, "target": 363}, {
        "source": 14,
        "target": 828
    }, {"source": 887, "target": 326}, {"source": 887, "target": 813}, {"source": 683, "target": 887}, {
        "source": 527,
        "target": 187
    }, {"source": 527, "target": 743}, {"source": 835, "target": 402}, {"source": 402, "target": 351}, {
        "source": 348,
        "target": 652
    }, {"source": 652, "target": 858}, {"source": 712, "target": 890}, {"source": 190, "target": 712}, {
        "source": 883,
        "target": 712
    }, {"source": 17, "target": 309}, {"source": 512, "target": 156}, {"source": 748, "target": 443}, {
        "source": 443,
        "target": 326
    }, {"source": 443, "target": 476}, {"source": 198, "target": 132}, {"source": 132, "target": 644}, {
        "source": 286,
        "target": 611
    }, {"source": 286, "target": 331}, {"source": 518, "target": 286}, {"source": 173, "target": 286}, {
        "source": 395,
        "target": 569
    }, {"source": 432, "target": 639}, {"source": 872, "target": 432}, {"source": 667, "target": 341}, {
        "source": 498,
        "target": 255
    }, {"source": 255, "target": 650}, {"source": 763, "target": 255}, {"source": 921, "target": 336}, {
        "source": 709,
        "target": 921
    }, {"source": 900, "target": 765}, {"source": 900, "target": 946}, {"source": 900, "target": 645}, {
        "source": 688,
        "target": 900
    }, {"source": 228, "target": 900}, {"source": 502, "target": 713}, {"source": 770, "target": 713}, {
        "source": 541,
        "target": 713
    }, {"source": 978, "target": 405}, {"source": 925, "target": 978}, {"source": 731, "target": 965}, {
        "source": 695,
        "target": 731
    }, {"source": 68, "target": 923}, {"source": 923, "target": 334}, {"source": 636, "target": 200}, {
        "source": 636,
        "target": 533
    }, {"source": 529, "target": 90}, {"source": 843, "target": 529}, {"source": 318, "target": 529}, {
        "source": 485,
        "target": 257
    }, {"source": 346, "target": 485}, {"source": 716, "target": 485}, {"source": 76, "target": 783}, {
        "source": 76,
        "target": 834
    }, {"source": 607, "target": 162}, {"source": 162, "target": 965}, {"source": 162, "target": 102}, {
        "source": 14,
        "target": 162
    }, {"source": 938, "target": 162}, {"source": 898, "target": 394}, {"source": 745, "target": 898}, {
        "source": 107,
        "target": 231
    }, {"source": 231, "target": 283}, {"source": 863, "target": 880}, {"source": 644, "target": 669}, {
        "source": 210,
        "target": 843
    }, {"source": 767, "target": 161}, {"source": 161, "target": 230}, {"source": 918, "target": 161}, {
        "source": 262,
        "target": 161
    }, {"source": 560, "target": 87}, {"source": 561, "target": 358}, {"source": 358, "target": 964}, {
        "source": 719,
        "target": 607
    }, {"source": 948, "target": 702}, {"source": 702, "target": 460}, {"source": 110, "target": 793}, {
        "source": 919,
        "target": 181
    }, {"source": 224, "target": 273}, {"source": 637, "target": 273}, {"source": 346, "target": 89}, {
        "source": 163,
        "target": 491
    }, {"source": 67, "target": 792}, {"source": 458, "target": 489}, {"source": 682, "target": 847}, {
        "source": 244,
        "target": 890
    }, {"source": 881, "target": 890}, {"source": 392, "target": 59}, {"source": 803, "target": 782}, {
        "source": 803,
        "target": 141
    }, {"source": 803, "target": 540}, {"source": 158, "target": 405}, {"source": 405, "target": 811}, {
        "source": 424,
        "target": 55
    }, {"source": 502, "target": 160}, {"source": 577, "target": 160}, {"source": 160, "target": 837}, {
        "source": 160,
        "target": 470
    }, {"source": 160, "target": 448}, {"source": 81, "target": 557}, {"source": 812, "target": 515}, {
        "source": 907,
        "target": 515
    }, {"source": 182, "target": 882}, {"source": 882, "target": 126}, {"source": 363, "target": 498}, {
        "source": 223,
        "target": 363
    }, {"source": 866, "target": 14}, {"source": 899, "target": 14}, {"source": 14, "target": 834}, {
        "source": 14,
        "target": 534
    }, {"source": 244, "target": 740}, {"source": 200, "target": 422}, {"source": 484, "target": 422}, {
        "source": 422,
        "target": 22
    }, {"source": 813, "target": 232}, {"source": 972, "target": 683}, {"source": 222, "target": 683}, {
        "source": 683,
        "target": 172
    }, {"source": 187, "target": 139}, {"source": 743, "target": 607}, {"source": 743, "target": 401}, {
        "source": 593,
        "target": 351
    }, {"source": 927, "target": 351}, {"source": 810, "target": 348}, {"source": 190, "target": 183}, {
        "source": 190,
        "target": 941
    }, {"source": 190, "target": 265}, {"source": 309, "target": 643}, {"source": 309, "target": 801}, {
        "source": 512,
        "target": 520
    }, {"source": 991, "target": 512}, {"source": 748, "target": 229}, {"source": 476, "target": 562}, {
        "source": 476,
        "target": 694
    }, {"source": 198, "target": 421}, {"source": 198, "target": 669}, {"source": 198, "target": 918}, {
        "source": 611,
        "target": 500
    }, {"source": 375, "target": 611}, {"source": 518, "target": 990}, {"source": 518, "target": 769}, {
        "source": 883,
        "target": 568
    }, {"source": 668, "target": 883}, {"source": 872, "target": 913}, {"source": 960, "target": 667}, {
        "source": 951,
        "target": 667
    }, {"source": 667, "target": 960}, {"source": 498, "target": 223}, {"source": 498, "target": 489}, {
        "source": 908,
        "target": 763
    }, {"source": 763, "target": 237}, {"source": 946, "target": 336}, {"source": 548, "target": 173}, {
        "source": 435,
        "target": 395
    }, {"source": 395, "target": 588}, {"source": 266, "target": 395}, {"source": 395, "target": 267}, {
        "source": 395,
        "target": 604
    }, {"source": 669, "target": 395}, {"source": 729, "target": 946}, {"source": 946, "target": 137}, {
        "source": 645,
        "target": 984
    }, {"source": 688, "target": 171}, {"source": 27, "target": 688}, {"source": 688, "target": 612}, {
        "source": 688,
        "target": 297
    }, {"source": 228, "target": 267}, {"source": 228, "target": 777}, {"source": 606, "target": 502}, {
        "source": 262,
        "target": 502
    }, {"source": 359, "target": 502}, {"source": 258, "target": 541}, {"source": 925, "target": 620}, {
        "source": 925,
        "target": 184
    }, {"source": 389, "target": 765}, {"source": 651, "target": 765}, {"source": 135, "target": 765}, {
        "source": 540,
        "target": 923
    }, {"source": 979, "target": 923}, {"source": 902, "target": 200}, {"source": 505, "target": 90}, {
        "source": 90,
        "target": 851
    }, {"source": 843, "target": 817}, {"source": 843, "target": 34}, {"source": 557, "target": 843}, {
        "source": 61,
        "target": 843
    }, {"source": 716, "target": 693}, {"source": 716, "target": 495}, {"source": 716, "target": 588}, {
        "source": 695,
        "target": 259
    }, {"source": 695, "target": 580}, {"source": 102, "target": 419}, {"source": 102, "target": 154}, {
        "source": 102,
        "target": 289
    }, {"source": 801, "target": 938}, {"source": 699, "target": 938}, {"source": 260, "target": 938}, {
        "source": 394,
        "target": 407
    }, {"source": 394, "target": 620}, {"source": 321, "target": 394}, {"source": 745, "target": 70}, {
        "source": 411,
        "target": 107
    }, {"source": 107, "target": 859}, {"source": 880, "target": 812}, {"source": 285, "target": 880}, {
        "source": 52,
        "target": 880
    }, {"source": 651, "target": 783}, {"source": 278, "target": 783}, {"source": 834, "target": 84}, {
        "source": 681,
        "target": 767
    }, {"source": 767, "target": 535}, {"source": 841, "target": 767}, {"source": 799, "target": 230}, {
        "source": 918,
        "target": 501
    }, {"source": 570, "target": 918}, {"source": 262, "target": 656}, {"source": 87, "target": 972}, {
        "source": 463,
        "target": 561
    }, {"source": 561, "target": 626}, {"source": 598, "target": 964}, {"source": 948, "target": 581}, {
        "source": 139,
        "target": 460
    }, {"source": 647, "target": 669}, {"source": 796, "target": 669}, {"source": 756, "target": 181}, {
        "source": 181,
        "target": 700
    }, {"source": 794, "target": 224}, {"source": 224, "target": 600}, {"source": 224, "target": 893}, {
        "source": 163,
        "target": 577
    }, {"source": 792, "target": 957}, {"source": 792, "target": 975}, {"source": 792, "target": 191}, {
        "source": 365,
        "target": 792
    }, {"source": 489, "target": 65}, {"source": 998, "target": 489}, {"source": 881, "target": 977}, {
        "source": 110,
        "target": 631
    }, {"source": 380, "target": 782}, {"source": 989, "target": 141}, {"source": 885, "target": 141}, {
        "source": 141,
        "target": 13
    }, {"source": 141, "target": 911}, {"source": 141, "target": 452}, {"source": 741, "target": 540}, {
        "source": 540,
        "target": 258
    }, {"source": 158, "target": 875}, {"source": 404, "target": 158}, {"source": 158, "target": 640}, {
        "source": 750,
        "target": 811
    }, {"source": 811, "target": 929}, {"source": 580, "target": 55}, {"source": 577, "target": 421}, {
        "source": 577,
        "target": 614
    }, {"source": 837, "target": 403}, {"source": 837, "target": 947}, {"source": 59, "target": 484}, {
        "source": 804,
        "target": 59
    }, {"source": 557, "target": 465}, {"source": 557, "target": 282}, {"source": 812, "target": 864}, {
        "source": 991,
        "target": 812
    }, {"source": 812, "target": 824}, {"source": 907, "target": 829}, {"source": 915, "target": 182}, {
        "source": 400,
        "target": 182
    }, {"source": 223, "target": 616}, {"source": 854, "target": 223}, {"source": 725, "target": 866}, {
        "source": 866,
        "target": 327
    }, {"source": 479, "target": 448}, {"source": 448, "target": 192}, {"source": 470, "target": 205}, {
        "source": 755,
        "target": 470
    }, {"source": 844, "target": 470}, {"source": 740, "target": 376}, {"source": 369, "target": 740}, {
        "source": 740,
        "target": 61
    }, {"source": 22, "target": 704}, {"source": 22, "target": 39}, {"source": 431, "target": 22}, {
        "source": 972,
        "target": 389
    }, {"source": 92, "target": 972}, {"source": 757, "target": 972}, {"source": 897, "target": 972}, {
        "source": 222,
        "target": 505
    }, {"source": 619, "target": 172}, {"source": 202, "target": 927}, {"source": 927, "target": 133}, {
        "source": 195,
        "target": 810
    }, {"source": 799, "target": 183}, {"source": 941, "target": 32}, {"source": 249, "target": 941}, {
        "source": 941,
        "target": 227
    }, {"source": 189, "target": 520}, {"source": 991, "target": 253}, {"source": 562, "target": 679}, {
        "source": 196,
        "target": 562
    }, {"source": 380, "target": 562}, {"source": 414, "target": 421}, {"source": 384, "target": 421}, {
        "source": 234,
        "target": 500
    }, {"source": 375, "target": 298}, {"source": 990, "target": 791}, {"source": 514, "target": 769}, {
        "source": 879,
        "target": 568
    }, {"source": 229, "target": 588}, {"source": 506, "target": 229}, {"source": 960, "target": 690}, {
        "source": 15,
        "target": 960
    }, {"source": 496, "target": 960}, {"source": 372, "target": 237}, {"source": 548, "target": 949}, {
        "source": 301,
        "target": 548
    }, {"source": 435, "target": 723}, {"source": 435, "target": 874}, {"source": 913, "target": 267}, {
        "source": 600,
        "target": 913
    }, {"source": 260, "target": 267}, {"source": 604, "target": 20}, {"source": 729, "target": 490}, {
        "source": 305,
        "target": 137
    }, {"source": 984, "target": 169}, {"source": 171, "target": 717}, {"source": 171, "target": 677}, {
        "source": 171,
        "target": 535
    }, {"source": 147, "target": 171}, {"source": 27, "target": 215}, {"source": 27, "target": 576}, {
        "source": 975,
        "target": 266
    }, {"source": 266, "target": 781}, {"source": 559, "target": 266}, {"source": 777, "target": 779}, {
        "source": 860,
        "target": 606
    }, {"source": 258, "target": 73}, {"source": 357, "target": 258}, {"source": 258, "target": 123}, {
        "source": 444,
        "target": 620
    }, {"source": 620, "target": 817}, {"source": 352, "target": 184}, {"source": 623, "target": 135}, {
        "source": 575,
        "target": 297
    }, {"source": 297, "target": 917}, {"source": 297, "target": 239}, {"source": 902, "target": 638}, {
        "source": 496,
        "target": 902
    }, {"source": 82, "target": 505}, {"source": 762, "target": 851}, {"source": 618, "target": 817}, {
        "source": 34,
        "target": 486
    }, {"source": 378, "target": 61}, {"source": 61, "target": 864}, {"source": 61, "target": 774}, {
        "source": 365,
        "target": 693
    }, {"source": 495, "target": 308}, {"source": 259, "target": 413}, {"source": 909, "target": 259}, {
        "source": 146,
        "target": 259
    }, {"source": 979, "target": 595}, {"source": 419, "target": 374}, {"source": 301, "target": 154}, {
        "source": 289,
        "target": 191
    }, {"source": 508, "target": 289}, {"source": 289, "target": 839}, {"source": 31, "target": 289}, {
        "source": 699,
        "target": 373
    }, {"source": 260, "target": 446}, {"source": 953, "target": 321}, {"source": 482, "target": 321}, {
        "source": 70,
        "target": 215
    }, {"source": 70, "target": 876}, {"source": 253, "target": 580}, {"source": 285, "target": 108}, {
        "source": 967,
        "target": 84
    }, {"source": 681, "target": 431}, {"source": 954, "target": 681}, {"source": 654, "target": 681}, {
        "source": 124,
        "target": 535
    }, {"source": 313, "target": 535}, {"source": 582, "target": 841}, {"source": 799, "target": 378}, {
        "source": 799,
        "target": 665
    }, {"source": 799, "target": 786}, {"source": 859, "target": 871}, {"source": 859, "target": 305}, {
        "source": 930,
        "target": 859
    }, {"source": 717, "target": 656}, {"source": 626, "target": 376}, {"source": 626, "target": 599}, {
        "source": 598,
        "target": 976
    }, {"source": 581, "target": 825}, {"source": 86, "target": 581}, {"source": 214, "target": 581}, {
        "source": 647,
        "target": 148
    }, {"source": 249, "target": 647}, {"source": 474, "target": 647}, {"source": 936, "target": 647}, {
        "source": 945,
        "target": 796
    }, {"source": 796, "target": 385}, {"source": 796, "target": 511}, {"source": 796, "target": 728}, {
        "source": 193,
        "target": 700
    }, {"source": 570, "target": 768}, {"source": 784, "target": 600}, {"source": 893, "target": 466}, {
        "source": 202,
        "target": 893
    }, {"source": 957, "target": 635}, {"source": 906, "target": 957}, {"source": 99, "target": 975}, {
        "source": 191,
        "target": 169
    }, {"source": 442, "target": 365}, {"source": 566, "target": 65}, {"source": 65, "target": 800}, {
        "source": 821,
        "target": 65
    }, {"source": 998, "target": 691}, {"source": 998, "target": 579}, {"source": 663, "target": 977}, {
        "source": 977,
        "target": 296
    }, {"source": 977, "target": 272}, {"source": 947, "target": 794}, {"source": 439, "target": 380}, {
        "source": 380,
        "target": 624
    }, {"source": 313, "target": 989}, {"source": 989, "target": 148}, {"source": 350, "target": 989}, {
        "source": 885,
        "target": 530
    }, {"source": 13, "target": 357}, {"source": 983, "target": 13}, {"source": 596, "target": 911}, {
        "source": 51,
        "target": 741
    }, {"source": 741, "target": 814}, {"source": 875, "target": 3}, {"source": 875, "target": 23}, {
        "source": 263,
        "target": 750
    }, {"source": 523, "target": 929}, {"source": 25, "target": 614}, {"source": 192, "target": 403}, {
        "source": 219,
        "target": 403
    }, {"source": 145, "target": 804}, {"source": 804, "target": 12}, {"source": 804, "target": 970}, {
        "source": 465,
        "target": 538
    }, {"source": 465, "target": 21}, {"source": 640, "target": 23}, {"source": 779, "target": 824}, {
        "source": 618,
        "target": 915
    }, {"source": 915, "target": 967}, {"source": 426, "target": 616}, {"source": 854, "target": 423}, {
        "source": 575,
        "target": 725
    }, {"source": 725, "target": 730}, {"source": 124, "target": 725}, {"source": 327, "target": 323}, {
        "source": 864,
        "target": 18
    }, {"source": 864, "target": 988}, {"source": 727, "target": 864}, {"source": 381, "target": 205}, {
        "source": 755,
        "target": 330
    }, {"source": 376, "target": 370}, {"source": 142, "target": 376}, {"source": 707, "target": 369}, {
        "source": 39,
        "target": 197
    }, {"source": 39, "target": 565}, {"source": 845, "target": 39}, {"source": 995, "target": 431}, {
        "source": 672,
        "target": 479
    }, {"source": 479, "target": 635}, {"source": 479, "target": 988}, {"source": 542, "target": 757}, {
        "source": 680,
        "target": 619
    }, {"source": 119, "target": 619}, {"source": 648, "target": 202}, {"source": 202, "target": 707}, {
        "source": 133,
        "target": 366
    }, {"source": 133, "target": 372}, {"source": 511, "target": 133}, {"source": 559, "target": 249}, {
        "source": 582,
        "target": 249
    }, {"source": 227, "target": 451}, {"source": 50, "target": 227}, {"source": 628, "target": 227}, {
        "source": 955,
        "target": 92
    }, {"source": 253, "target": 41}, {"source": 399, "target": 253}, {"source": 679, "target": 739}, {
        "source": 679,
        "target": 574
    }, {"source": 384, "target": 952}, {"source": 384, "target": 247}, {"source": 279, "target": 234}, {
        "source": 85,
        "target": 234
    }, {"source": 216, "target": 298}, {"source": 189, "target": 746}, {"source": 961, "target": 690}, {
        "source": 714,
        "target": 496
    }, {"source": 949, "target": 261}, {"source": 301, "target": 816}, {"source": 301, "target": 29}, {
        "source": 874,
        "target": 566
    }, {"source": 874, "target": 48}, {"source": 879, "target": 140}, {"source": 879, "target": 717}, {
        "source": 305,
        "target": 120
    }, {"source": 188, "target": 305}, {"source": 437, "target": 305}, {"source": 293, "target": 305}, {
        "source": 93,
        "target": 717
    }, {"source": 717, "target": 368}, {"source": 973, "target": 717}, {"source": 44, "target": 717}, {
        "source": 352,
        "target": 717
    }, {"source": 677, "target": 80}, {"source": 579, "target": 215}, {"source": 781, "target": 152}, {
        "source": 523,
        "target": 781
    }, {"source": 20, "target": 934}, {"source": 807, "target": 779}, {"source": 779, "target": 698}, {
        "source": 342,
        "target": 73
    }, {"source": 211, "target": 73}, {"source": 3, "target": 357}, {"source": 802, "target": 357}, {
        "source": 123,
        "target": 3
    }, {"source": 706, "target": 123}, {"source": 444, "target": 177}, {"source": 444, "target": 707}, {
        "source": 444,
        "target": 609
    }, {"source": 575, "target": 26}, {"source": 559, "target": 339}, {"source": 325, "target": 559}, {
        "source": 559,
        "target": 166
    }, {"source": 304, "target": 239}, {"source": 708, "target": 638}, {"source": 638, "target": 672}, {
        "source": 245,
        "target": 82
    }, {"source": 293, "target": 82}, {"source": 25, "target": 762}, {"source": 423, "target": 618}, {
        "source": 618,
        "target": 477
    }, {"source": 595, "target": 618}, {"source": 486, "target": 901}, {"source": 486, "target": 736}, {
        "source": 378,
        "target": 467
    }, {"source": 774, "target": 75}, {"source": 917, "target": 453}, {"source": 917, "target": 397}, {
        "source": 917,
        "target": 150
    }, {"source": 482, "target": 909}, {"source": 146, "target": 753}, {"source": 737, "target": 595}, {
        "source": 342,
        "target": 839
    }, {"source": 338, "target": 31}, {"source": 689, "target": 31}, {"source": 800, "target": 31}, {
        "source": 344,
        "target": 446
    }, {"source": 413, "target": 180}, {"source": 867, "target": 413}, {"source": 413, "target": 655}, {
        "source": 304,
        "target": 413
    }, {"source": 876, "target": 521}, {"source": 108, "target": 555}, {"source": 108, "target": 836}, {
        "source": 510,
        "target": 954
    }, {"source": 654, "target": 772}, {"source": 582, "target": 933}, {"source": 417, "target": 582}, {
        "source": 366,
        "target": 871
    }, {"source": 871, "target": 836}, {"source": 930, "target": 924}, {"source": 670, "target": 599}, {
        "source": 976,
        "target": 678
    }, {"source": 563, "target": 825}, {"source": 131, "target": 86}, {"source": 86, "target": 944}, {
        "source": 214,
        "target": 347
    }, {"source": 214, "target": 780}, {"source": 665, "target": 836}, {"source": 510, "target": 936}, {
        "source": 862,
        "target": 936
    }, {"source": 945, "target": 144}, {"source": 46, "target": 511}, {"source": 511, "target": 212}, {
        "source": 511,
        "target": 170
    }, {"source": 728, "target": 572}, {"source": 728, "target": 370}, {"source": 193, "target": 617}, {
        "source": 768,
        "target": 296
    }, {"source": 554, "target": 768}, {"source": 609, "target": 784}, {"source": 474, "target": 703}, {
        "source": 474,
        "target": 317
    }, {"source": 119, "target": 635}, {"source": 99, "target": 408}, {"source": 442, "target": 164}, {
        "source": 999,
        "target": 566
    }, {"source": 873, "target": 800}, {"source": 398, "target": 691}, {"source": 691, "target": 988}, {
        "source": 691,
        "target": 806
    }, {"source": 409, "target": 691}, {"source": 428, "target": 579}, {"source": 891, "target": 579}, {
        "source": 466,
        "target": 734
    }, {"source": 296, "target": 382}, {"source": 963, "target": 272}, {"source": 439, "target": 982}, {
        "source": 276,
        "target": 624
    }, {"source": 350, "target": 738}, {"source": 271, "target": 350}, {"source": 350, "target": 532}, {
        "source": 596,
        "target": 718
    }, {"source": 361, "target": 596}, {"source": 51, "target": 594}, {"source": 663, "target": 952}, {
        "source": 3,
        "target": 846
    }, {"source": 316, "target": 3}, {"source": 25, "target": 340}, {"source": 302, "target": 219}, {
        "source": 145,
        "target": 525
    }, {"source": 145, "target": 274}, {"source": 145, "target": 724}, {"source": 238, "target": 12}, {
        "source": 970,
        "target": 678
    }, {"source": 905, "target": 814}, {"source": 370, "target": 21}, {"source": 426, "target": 483}, {
        "source": 423,
        "target": 816
    }, {"source": 538, "target": 423}, {"source": 40, "target": 730}, {"source": 343, "target": 323}, {
        "source": 18,
        "target": 737
    }, {"source": 952, "target": 727}, {"source": 629, "target": 381}, {"source": 697, "target": 538}, {
        "source": 281,
        "target": 370
    }, {"source": 142, "target": 809}, {"source": 707, "target": 685}, {"source": 901, "target": 845}, {
        "source": 213,
        "target": 845
    }, {"source": 140, "target": 845}, {"source": 672, "target": 38}, {"source": 449, "target": 672}, {
        "source": 473,
        "target": 672
    }, {"source": 330, "target": 739}, {"source": 119, "target": 174}, {"source": 119, "target": 382}, {
        "source": 627,
        "target": 648
    }, {"source": 97, "target": 366}, {"source": 50, "target": 117}, {"source": 220, "target": 955}, {
        "source": 41,
        "target": 199
    }, {"source": 772, "target": 952}, {"source": 71, "target": 279}, {"source": 29, "target": 115}, {
        "source": 188,
        "target": 270
    }, {"source": 188, "target": 499}, {"source": 261, "target": 93}, {"source": 736, "target": 973}, {
        "source": 440,
        "target": 44
    }, {"source": 807, "target": 221}, {"source": 698, "target": 159}, {"source": 98, "target": 93}, {
        "source": 615,
        "target": 93
    }, {"source": 368, "target": 848}, {"source": 802, "target": 203}, {"source": 383, "target": 802}, {
        "source": 325,
        "target": 290
    }, {"source": 325, "target": 850}, {"source": 166, "target": 516}, {"source": 5, "target": 342}, {
        "source": 165,
        "target": 245
    }, {"source": 240, "target": 901}, {"source": 304, "target": 711}, {"source": 940, "target": 737}, {
        "source": 456,
        "target": 737
    }, {"source": 264, "target": 338}, {"source": 180, "target": 761}, {"source": 552, "target": 867}, {
        "source": 867,
        "target": 928
    }, {"source": 655, "target": 985}, {"source": 63, "target": 836}, {"source": 417, "target": 853}, {
        "source": 924,
        "target": 16
    }, {"source": 121, "target": 924}, {"source": 924, "target": 718}, {"source": 670, "target": 185}, {
        "source": 785,
        "target": 521
    }, {"source": 131, "target": 613}, {"source": 131, "target": 387}, {"source": 944, "target": 889}, {
        "source": 347,
        "target": 826
    }, {"source": 144, "target": 526}, {"source": 662, "target": 144}, {"source": 840, "target": 46}, {
        "source": 377,
        "target": 212
    }, {"source": 473, "target": 212}, {"source": 563, "target": 9}, {"source": 703, "target": 428}, {
        "source": 722,
        "target": 170
    }, {"source": 509, "target": 409}, {"source": 891, "target": 295}, {"source": 785, "target": 734}, {
        "source": 94,
        "target": 963
    }, {"source": 553, "target": 963}, {"source": 992, "target": 963}, {"source": 982, "target": 992}, {
        "source": 982,
        "target": 168
    }, {"source": 630, "target": 276}, {"source": 398, "target": 726}, {"source": 532, "target": 487}, {
        "source": 884,
        "target": 718
    }, {"source": 718, "target": 220}, {"source": 846, "target": 461}, {"source": 390, "target": 316}, {
        "source": 475,
        "target": 316
    }, {"source": 340, "target": 168}, {"source": 340, "target": 536}, {"source": 36, "target": 340}, {
        "source": 738,
        "target": 524
    }, {"source": 959, "target": 738}, {"source": 274, "target": 371}, {"source": 274, "target": 932}, {
        "source": 771,
        "target": 905
    }, {"source": 776, "target": 483}, {"source": 629, "target": 483}, {"source": 732, "target": 281}, {
        "source": 242,
        "target": 809
    }, {"source": 809, "target": 904}, {"source": 685, "target": 896}, {"source": 213, "target": 789}, {
        "source": 449,
        "target": 912
    }, {"source": 449, "target": 573}, {"source": 217, "target": 174}, {"source": 798, "target": 627}, {
        "source": 697,
        "target": 610
    }, {"source": 684, "target": 220}, {"source": 220, "target": 16}, {"source": 220, "target": 478}, {
        "source": 549,
        "target": 499
    }, {"source": 567, "target": 221}, {"source": 632, "target": 97}, {"source": 240, "target": 878}, {
        "source": 536,
        "target": 711
    }, {"source": 549, "target": 63}, {"source": 16, "target": 524}, {"source": 121, "target": 928}, {
        "source": 121,
        "target": 634
    }, {"source": 129, "target": 889}, {"source": 889, "target": 433}, {"source": 487, "target": 415}, {
        "source": 371,
        "target": 660
    }, {"source": 820, "target": 932}, {"source": 726, "target": 573}]
};
