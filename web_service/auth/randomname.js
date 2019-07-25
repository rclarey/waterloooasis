const adjectives = [
  'Quizzical',
  'Highfalutin',
  'Dynamic',
  'Wakeful',
  'Cheerful',
  'Thoughtful',
  'Cooperative',
  'Questionable',
  'Abundant',
  'Uneven',
  'Yummy',
  'Juicy',
  'Vacuous',
  'Concerned',
  'Young',
  'Sparkling',
  'Abhorrent',
  'Sweltering',
  'Late',
  'Macho',
  'Scrawny',
  'Friendly',
  'Kaput',
  'Divergent',
  'Busy',
  'Charming',
  'Protective',
  'Premium',
  'Puzzled',
  'Waggish',
  'Rambunctious',
  'Puffy',
  'Hard',
  'Fat',
  'Sedate',
  'Yellow',
  'Resonant',
  'Dapper',
  'Courageous',
  'Vast',
  'Cool',
  'Elated',
  'Wary',
  'Bewildered',
  'Level',
  'Wooden',
  'Ceaseless',
  'Tearful',
  'Cloudy',
  'Gullible',
  'Flashy',
  'Trite',
  'Quick',
  'Nondescript',
  'Round',
  'Slow',
  'Spiritual',
  'Brave',
  'Tenuous',
  'Abstracted',
  'Colossal',
  'Sloppy',
  'Obsolete',
  'Elegant',
  'Fabulous',
  'Vivacious',
  'Exuberant',
  'Faithful',
  'Helpless',
  'Odd',
  'Sordid',
  'Blue',
  'Imported',
  'Ugly',
  'Ruthless',
  'Deeply',
  'Eminent',
  'Reminiscent',
  'Rotten',
  'Sour',
  'Volatile',
  'Succinct',
  'Judicious',
  'Abrupt',
  'Learned',
  'Stereotyped',
  'Evanescent',
  'Efficacious',
  'Festive',
  'Loose',
  'Torpid',
  'Condemned',
  'Selective',
  'Strong',
  'Momentous',
  'Ordinary',
  'Dry',
  'Great',
  'Ultra',
  'Ahead',
  'Broken',
  'Dusty',
  'Piquant',
  'Creepy',
  'Miniature',
  'Periodic',
  'Equable',
  'Unsightly',
  'Narrow',
  'Grieving',
  'Whimsical',
  'Fantastic',
  'Kindhearted',
  'Miscreant',
  'Cowardly',
  'Cloistered',
  'Marked',
  'Bloody',
  'Chunky',
  'Undesirable',
  'Oval',
  'Nauseating',
  'Aberrant',
  'Stingy',
  'Standing',
  'Distinct',
  'Illegal',
  'Angry',
  'Faint',
  'Rustic',
  'Few',
  'Calm',
  'Gorgeous',
  'Mysterious',
  'Tacky',
  'Unadvised',
  'Greasy',
  'Minor',
  'Loving',
  'Melodic',
  'Flat',
  'Wretched',
  'Clever',
  'Barbarous',
  'Pretty',
  'Endurable',
  'Handsomely',
  'Unequaled',
  'Acceptable',
  'Symptomatic',
  'Hurt',
  'Tested',
  'Long',
  'Warm',
  'Ignorant',
  'Ashamed',
  'Excellent',
  'Known',
  'Adamant',
  'Eatable',
  'Verdant',
  'Meek',
  'Unbiased',
  'Rampant',
  'Somber',
  'Cuddly',
  'Harmonious',
  'Salty',
  'Overwrought',
  'Stimulating',
  'Beautiful',
  'Crazy',
  'Grouchy',
  'Thirsty',
  'Joyous',
  'Confused',
  'Terrible',
  'High',
  'Unarmed',
  'Gabby',
  'Wet',
  'Sharp',
  'Wonderful',
  'Magenta',
  'Tan',
  'Huge',
  'Productive',
  'Defective',
  'Chilly',
  'Needy',
  'Imminent',
  'Flaky',
  'Fortunate',
  'Neighborly',
  'Hot',
  'Husky',
  'Optimal',
  'Gaping',
  'Faulty',
  'Guttural',
  'Massive',
  'Watery',
  'Abrasive',
  'Ubiquitous',
  'Aspiring',
  'Impartial',
  'Annoyed',
  'Billowy',
  'Lucky',
  'Panoramic',
  'Heartbreaking',
  'Fragile',
  'Purring',
  'Wistful',
  'Burly',
  'Filthy',
  'Psychedelic',
  'Harsh',
  'Disagreeable',
  'Ambiguous',
  'Short',
  'Splendid',
  'Crowded',
  'Light',
  'Yielding',
  'Hypnotic',
  'Dispensable',
  'Deserted',
  'Nonchalant',
  'Green',
  'Puny',
  'Deafening',
  'Classy',
  'Tall',
  'Typical',
  'Exclusive',
  'Materialistic',
  'Mute',
  'Shaky',
  'Inconclusive',
  'Rebellious',
  'Doubtful',
  'Telling',
  'Unsuitable',
  'Woebegone',
  'Cold',
  'Sassy',
  'Arrogant',
  'Perfect',
  'Adhesive',
  'Industrious',
  'Crabby',
  'Curly',
  'Voiceless',
  'Nostalgic',
  'Better',
  'Slippery',
  'Willing',
  'Nifty',
  'Orange',
  'Victorious',
  'Ritzy',
  'Wacky',
  'Vigorous',
  'Spotless',
  'Good',
  'Powerful',
  'Bashful',
  'Soggy',
  'Grubby',
  'Moaning',
  'Placid',
  'Permissible',
  'Half',
  'Towering',
  'Bawdy',
  'Measly',
  'Abaft',
  'Delightful',
  'Goofy',
  'Capricious',
  'Nonstop',
  'Addicted',
  'Acoustic',
  'Furtive',
  'Erratic',
  'Heavy',
  'Square',
  'Delicious',
  'Needless',
  'Resolute',
  'Innocent',
  'Abnormal',
  'Hurried',
  'Awful',
  'Impossible',
  'Aloof',
  'Giddy',
  'Large',
  'Pointless',
  'Petite',
  'Jolly',
  'Boundless',
  'Abounding',
  'Hilarious',
  'Heavenly',
  'Honorable',
  'Squeamish',
  'Red',
  'Phobic',
  'Trashy',
  'Pathetic',
  'Parched',
  'Godly',
  'Greedy',
  'Pleasant',
  'Small',
  'Aboriginal',
  'Dashing',
  'Icky',
  'Bumpy',
  'Laughable',
  'Hapless',
  'Silent',
  'Scary',
  'Shaggy',
  'Organic',
  'Unbecoming',
  'Inexpensive',
  'Wrong',
  'Repulsive',
  'Flawless',
  'Labored',
  'Disturbed',
  'Aboard',
  'Gusty',
  'Loud',
  'Jumbled',
  'Exotic',
  'Vulgar',
  'Threatening',
  'Belligerent',
  'Synonymous',
  'Encouraging',
  'Fancy',
  'Embarrassed',
  'Clumsy',
  'Fast',
  'Ethereal',
  'Chubby',
  'Plastic',
  'Open',
  'Straight',
  'Little',
  'Ancient',
  'Fair',
  'Psychotic',
  'Murky',
  'Earthy',
  'Callous',
  'Heady',
  'Lamentable',
  'Hallowed',
  'Obtainable',
  'Toothsome',
  'Oafish',
  'Gainful',
  'Flippant',
  'Tangy',
  'Tightfisted',
  'Damaging',
  'Utopian',
  'Gaudy',
  'Brainy',
  'Imperfect',
  'Shiny',
  'Fanatical',
  'Snotty',
  'Relieved',
  'Shallow',
  'Foamy',
  'Parsimonious',
  'Gruesome',
  'Elite',
  'Wide',
  'Kind',
  'Bored',
  'Tangible',
  'Depressed',
  'Boring',
  'Screeching',
  'Outrageous',
  'Determined',
  'Picayune',
  'Glossy',
  'Historical',
  'Staking',
  'Curious',
  'Gigantic',
  'Wandering',
  'Profuse',
  'Vengeful',
  'Glib',
  'Unaccountable',
  'Frightened',
  'Outstanding',
  'Chivalrous',
  'Workable',
  'Modern',
  'Swanky',
  'Comfortable',
  'Gentle',
  'Substantial',
  'Brawny',
  'Curved',
  'Nebulous',
  'Boorish',
  'Afraid',
  'Fierce',
  'Efficient',
  'Lackadaisical',
  'Recondite',
  'Internal',
  'Absorbed',
  'Squealing',
  'Frail',
  'Thundering',
  'Wanting',
  'Cooing',
  'Axiomatic',
  'Debonair',
  'Boiling',
  'Tired',
  'Numberless',
  'Flowery',
  'Mushy',
  'Enthusiastic',
  'Proud',
  'Upset',
  'Hungry',
  'Astonishing',
  'Deadpan',
  'Prickly',
  'Mammoth',
  'Absurd',
  'Clean',
  'Jittery',
  'Wry',
  'Entertaining',
  'Literate',
  'Lying',
  'Uninterested',
  'Aquatic',
  'Super',
  'Languid',
  'Cute',
  'Absorbing',
  'Scattered',
  'Brief',
  'Halting',
  'Bright',
  'Fuzzy',
  'Lethal',
  'Scarce',
  'Aggressive',
  'Obsequious',
  'Fine',
  'Giant',
  'Holistic',
  'Pastoral',
  'Stormy',
  'Quaint',
  'Nervous',
  'Wasteful',
  'Grotesque',
  'Loutish',
  'Abiding',
  'Unable',
  'Black',
  'Dysfunctional',
  'Knowledgeable',
  'Truculent',
  'Various',
  'Luxuriant',
  'Shrill',
  'Spiffy',
  'Guarded',
  'Colorful',
  'Misty',
  'Spurious',
  'Freezing',
  'Glamorous',
  'Famous',
  'New',
  'Instinctive',
  'Nasty',
  'Exultant',
  'Seemly',
  'Tawdry',
  'Maniacal',
  'Wrathful',
  'Shy',
  'Nutritious',
  'Idiotic',
  'Worried',
  'Bad',
  'Stupid',
  'Ruddy',
  'Wholesale',
  'Naughty',
  'Thoughtless',
  'Futuristic',
  'Available',
  'Slimy',
  'Cynical',
  'Fluffy',
  'Plausible',
  'Nasty',
  'Tender',
  'Changeable',
  'Smiling',
  'Oceanic',
  'Satisfying',
  'Steadfast',
  'Ugliest',
  'Crooked',
  'Subsequent',
  'Fascinated',
  'Woozy',
  'Teeny',
  'Quickest',
  'Moldy',
  'Uppity',
  'Sable',
  'Horrible',
  'Silly',
  'Ad hoc',
  'Numerous',
  'Berserk',
  'Wiry',
  'Knowing',
  'Lazy',
  'Childlike',
  'Zippy',
  'Fearless',
  'Pumped',
  'Weak',
  'Tacit',
  'Weary',
  'Rapid',
  'Precious',
  'Smoggy',
  'Swift',
  'Lyrical',
  'Steep',
  'Quack',
  'Direful',
  'Talented',
  'Hesitant',
  'Fallacious',
  'Ill',
  'Quarrelsome',
  'Quiet',
  'Didactic',
  'Fluttering',
  'Glorious',
  'Tough',
  'Sulky',
  'Elfin',
  'Abortive',
  'Sweet',
  'Habitual',
  'Supreme',
  'Hollow',
  'Possessive',
  'Inquisitive',
  'Adjoining',
  'Incandescent',
  'Lowly',
  'Majestic',
  'Bizarre',
  'Acrid',
  'Expensive',
  'Aback',
  'Unusual',
  'Foolish',
  'Jobless',
  'Capable',
  'Damp',
  'Political',
  'Dazzling',
  'Erect',
  'Early',
  'Immense',
  'Hellish',
  'Omniscient',
  'Reflective',
  'Lovely',
  'Incompetent',
  'Empty',
  'Breakable',
  'Educated',
  'Easy',
  'Devilish',
  'Assorted',
  'Decorous',
  'Jaded',
  'Homely',
  'Dangerous',
  'Adaptable',
  'Coherent',
  'Dramatic',
  'Tense',
  'Abject',
  'Fretful',
  'Troubled',
  'Diligent',
  'Solid',
  'Plain',
  'Raspy',
  'Irate',
  'Offbeat',
  'Healthy',
  'Melted',
  'Cagey',
  'Many',
  'Wild',
  'Venomous',
  'Animated',
  'Alike',
  'Youthful',
  'Ripe',
  'Alcoholic',
  'Sincere',
  'Lush',
  'Defeated',
  'Zonked',
  'Foregoing',
  'Dizzy',
  'Frantic',
  'Obnoxious',
  'Funny',
  'Damaged',
  'Grandiose',
  'Spectacular',
  'Maddening',
  'Defiant',
  'Makeshift',
  'Strange',
  'Painstaking',
  'Merciful',
  'Madly',
  'Clammy',
  'Itchy',
  'Difficult',
  'Clear',
  'Used',
  'Temporary',
  'Abandoned',
  'Null',
  'Rainy',
  'Evil',
  'Alert',
  'Domineering',
  'Amuck',
  'Rabid',
  'Jealous',
  'Robust',
  'Obeisant',
  'Overt',
  'Enchanting',
  'Longing',
  'Cautious',
  'Motionless',
  'Bitter',
  'Anxious',
  'Craven',
  'Breezy',
  'Ragged',
  'Skillful',
  'Quixotic',
  'Knotty',
  'Grumpy',
  'Dark',
  'Draconian',
  'Alluring',
  'Magical',
  'Versed',
  'Humdrum',
  'Accurate',
  'Ludicrous',
  'Sleepy',
  'Envious',
  'Lavish',
  'Roasted',
  'Thinkable',
  'Overconfident',
  'Roomy',
  'Painful',
  'Wee',
  'Observant',
  'Drunk',
  'Royal',
  'Likeable',
  'Adventurous',
  'Eager',
  'Obedient',
  'Attractive',
  'Spooky',
  'Poised',
  'Righteous',
  'Excited',
  'Real',
  'Abashed',
  'Womanly',
  'Ambitious',
  'Lacking',
  'Testy',
  'Big',
  'Gamy',
  'Early',
  'Auspicious',
  'Discreet',
  'Nappy',
  'Vague',
  'Helpful',
  'Nosy',
  'Perpetual',
  'Disillusioned',
  'Overrated',
  'Gleaming',
  'Tart',
  'Soft',
  'Agreeable',
  'Therapeutic',
  'Accessible',
  'Poor',
  'Gifted',
  'Old',
  'Humorous',
  'Flagrant',
  'Magnificent',
  'Alive',
  'Understood',
  'Economic',
  'Mighty',
  'Ablaze',
  'Racial',
  'Tasteful',
  'Purple',
  'Broad',
  'Lean',
  'Legal',
  'Witty',
  'Nutty',
  'Icy',
  'Feigned',
  'Redundant',
  'Adorable',
  'Apathetic',
  'Jumpy',
  'Scientific',
  'Combative',
  'Worthless',
  'Tasteless',
  'Voracious',
  'Jazzy',
  'Uptight',
  'Utter',
  'Hospitable',
  'Imaginary',
  'Finicky',
  'Shocking',
  'Dead',
  'Noisy',
  'Shivering',
  'Subdued',
  'Rare',
  'Zealous',
  'Demonic',
  'Ratty',
  'Snobbish',
  'Deranged',
  'Muddy',
  'Whispering',
  'Credible',
  'Hulking',
  'Fertile',
  'Tight',
  'Abusive',
  'Functional',
  'Obscene',
  'Thankful',
  'Daffy',
  'Smelly',
  'Lively',
  'Homeless',
  'Secretive',
  'Amused',
  'Lewd',
  'Mere',
  'Agonizing',
  'Sad',
  'Innate',
  'Sneaky',
  'Noxious',
  'Illustrious',
  'Alleged',
  'Cultured',
  'Tame',
  'Macabre',
  'Lonely',
  'Mindless',
  'Low',
  'Scintillating',
  'Statuesque',
  'Decisive',
  'Rhetorical',
  'Hysterical',
  'Happy',
  'Earsplitting',
  'Mundane',
  'Spicy',
  'Overjoyed',
  'Taboo',
  'Peaceful',
  'Forgetful',
  'Elderly',
  'Upbeat',
  'Squalid',
  'Warlike',
  'Dull',
  'Plucky',
  'Handsome',
  'Groovy',
  'Absent',
  'Wise',
  'Romantic',
  'Invincible',
  'Receptive',
  'Smooth',
  'Different',
  'Tiny',
  'Cruel',
  'Dirty',
  'Mature',
  'Faded',
  'Tiresome',
  'Wicked',
  'Average',
  'Panicky',
  'Detailed',
  'Juvenile',
  'Scandalous',
  'Steady',
  'Wealthy',
  'Deep',
  'Sticky',
  'Jagged',
  'Wideeyed',
  'Tasty',
  'Disgusted',
  'Garrulous',
  'Graceful',
  'Tranquil',
  'Annoying',
  'Hissing',
  'Noiseless',
  'Selfish',
  'Onerous',
  'Lopsided',
  'Ossified',
  'Penitent',
  'Malicious',
  'Aromatic',
  'Successful',
  'Zany',
  'Evasive',
  'Wet',
  'Naive',
  'Nice',
  'Uttermost',
  'Brash',
  'Muddled',
  'Energetic',
  'Accidental',
  'Silky',
  'Guiltless',
  'Important',
  'Drab',
  'Aware',
  'Skinny',
  'Careful',
  'Rightful',
  'Tricky',
  'Sore',
  'Rich',
  'Blushing',
  'Stale',
  'Daily',
  'Watchful',
  'Uncovered',
  'Rough',
  'Fresh',
  'Hushed',
  'Rural',
];

const animals = [
  'Aardvark',
  'Abyssinian',
  'Affenpinscher',
  'Akbash',
  'Akita',
  'Albatross',
  'Alligator',
  'Angelfish',
  'Ant',
  'Anteater',
  'Antelope',
  'Armadillo',
  'Avocet',
  'Axolotl',
  'Baboon',
  'Badger',
  'Balinese',
  'Bandicoot',
  'Barb',
  'Barnacle',
  'Barracuda',
  'Bat',
  'Beagle',
  'Bear',
  'Beaver',
  'Beetle',
  'Binturong',
  'Bird',
  'Birman',
  'Bison',
  'Bloodhound',
  'Bobcat',
  'Bombay',
  'Bongo',
  'Bonobo',
  'Booby',
  'Budgerigar',
  'Buffalo',
  'Bulldog',
  'Bullfrog',
  'Burmese',
  'Butterfly',
  'Caiman',
  'Camel',
  'Capybara',
  'Caracal',
  'Cassowary',
  'Cat',
  'Caterpillar',
  'Catfish',
  'Centipede',
  'Chameleon',
  'Chamois',
  'Cheetah',
  'Chicken',
  'Chihuahua',
  'Chimpanzee',
  'Chinchilla',
  'Chinook',
  'Chipmunk',
  'Cichlid',
  'Coati',
  'Cockroach',
  'Collie',
  'Coral',
  'Cougar',
  'Cow',
  'Coyote',
  'Crab',
  'Crane',
  'Crocodile',
  'Cuscus',
  'Cuttlefish',
  'Dachshund',
  'Dalmatian',
  'Deer',
  'Dhole',
  'Dingo',
  'Discus',
  'Dodo',
  'Dog',
  'Dolphin',
  'Donkey',
  'Dormouse',
  'Dragonfly',
  'Drever',
  'Duck',
  'Dugong',
  'Dunker',
  'Eagle',
  'Earwig',
  'Echidna',
  'Elephant',
  'Emu',
  'Falcon',
  'Ferret',
  'Fish',
  'Flamingo',
  'Flounder',
  'Fly',
  'Fossa',
  'Fox',
  'Frigatebird',
  'Frog',
  'Gar',
  'Gecko',
  'Gerbil',
  'Gharial',
  'Gibbon',
  'Giraffe',
  'Goat',
  'Goose',
  'Gopher',
  'Gorilla',
  'Grasshopper',
  'Greyhound',
  'Grouse',
  'Guppy',
  'Hamster',
  'Hare',
  'Harrier',
  'Havanese',
  'Hedgehog',
  'Heron',
  'Himalayan',
  'Hippopotamus',
  'Horse',
  'Human',
  'Hummingbird',
  'Hyena',
  'Ibis',
  'Iguana',
  'Impala',
  'Indri',
  'Insect',
  'Jackal',
  'Jaguar',
  'Javanese',
  'Jellyfish',
  'Kakapo',
  'Kangaroo',
  'Kingfisher',
  'Kiwi',
  'Koala',
  'Kudu',
  'Labradoodle',
  'Ladybird',
  'Lemming',
  'Lemur',
  'Leopard',
  'Liger',
  'Lion',
  'Lionfish',
  'Lizard',
  'Llama',
  'Lobster',
  'Lynx',
  'Macaw',
  'Magpie',
  'Maltese',
  'Manatee',
  'Mandrill',
  'Markhor',
  'Mastiff',
  'Mayfly',
  'Meerkat',
  'Millipede',
  'Mole',
  'Molly',
  'Mongoose',
  'Mongrel',
  'Monkey',
  'Moorhen',
  'Moose',
  'Moth',
  'Mouse',
  'Mule',
  'Neanderthal',
  'Newfoundland',
  'Newt',
  'Nightingale',
  'Numbat',
  'Ocelot',
  'Octopus',
  'Okapi',
  'Olm',
  'Opossum',
  'Orang-utan',
  'Ostrich',
  'Otter',
  'Oyster',
  'Pademelon',
  'Panther',
  'Parrot',
  'Peacock',
  'Pekingese',
  'Pelican',
  'Penguin',
  'Persian',
  'Pheasant',
  'Pig',
  'Pika',
  'Pike',
  'Piranha',
  'Platypus',
  'Pointer',
  'Poodle',
  'Porcupine',
  'Possum',
  'Prawn',
  'Puffin',
  'Pug',
  'Puma',
  'Quail',
  'Quetzal',
  'Quokka',
  'Quoll',
  'Rabbit',
  'Raccoon',
  'Ragdoll',
  'Rat',
  'Rattlesnake',
  'Reindeer',
  'Rhinoceros',
  'Robin',
  'Rottweiler',
  'Salamander',
  'Saola',
  'Scorpion',
  'Seahorse',
  'Seal',
  'Serval',
  'Sheep',
  'Shrimp',
  'Siamese',
  'Siberian',
  'Skunk',
  'Sloth',
  'Snail',
  'Snake',
  'Snowshoe',
  'Somali',
  'Sparrow',
  'Sponge',
  'Squid',
  'Squirrel',
  'Starfish',
  'Stingray',
  'Stoat',
  'Swan',
  'Tang',
  'Tapir',
  'Tarsier',
  'Termite',
  'Tetra',
  'Tiffany',
  'Tiger',
  'Tortoise',
  'Toucan',
  'Tropicbird',
  'Tuatara',
  'Turkey',
  'Uakari',
  'Uguisu',
  'Umbrellabird',
  'Vulture',
  'Wallaby',
  'Walrus',
  'Warthog',
  'Wasp',
  'Weasel',
  'Whippet',
  'Wildebeest',
  'Wolf',
  'Wolverine',
  'Wombat',
  'Woodlouse',
  'Woodpecker',
  'Wrasse',
  'Yak',
  'Zebra',
  'Zebu',
  'Zonkey',
  'Zorse',
];

/**
 * Since there are 906 ajectives and 284 animals there are 257304 possibilities.
 * The probability of all 5 colliding when we have the entire coop student
 * population (~20000) already registered is (20000/257304)^5 = 0.00003%
 */
module.exports = function randomNames() {
  return Array(5)
    .fill()
    .map(() => {
      const a = Math.floor(Math.random() * adjectives.length);
      const b = Math.floor(Math.random() * animals.length);
      return adjectives[a] + animals[b];
    });
};
