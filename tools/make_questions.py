#!/usr/bin/env python3
"""Builds questions.js: a fixed bank of multiple-choice questions (UK KS2, Year 3-4)."""
import json, random
random.seed(7)
Q = []
def add(sub, q, ans, wrong, hint=""):
    opts = [ans] + list(wrong)[:3]
    assert len(set(map(str, opts))) == 4, (q, opts)
    Q.append({"s": sub, "q": q, "a": str(ans), "o": [str(o) for o in opts], "h": hint})
def nums(ans, lo=0, spread=4):
    out = set()
    for d in (1, -1, 2, -2, 10, -10, 3, -3, 5):
        v = ans + d
        if v >= lo and v != ans: out.add(v)
        if len(out) == 3: break
    return sorted(out)[:3]

# --- MATHS (generated, then fixed in the file) ---
for a, b in [(7, 8), (6, 9), (12, 4), (5, 11), (9, 9), (8, 6), (3, 12), (7, 7)]:
    add("maths", f"A wizard has {a} bags with {b} Galleons in each. How many Galleons is that?", a*b, nums(a*b), "Multiply.")
for a, b in [(48, 6), (56, 7), (72, 8), (36, 4), (45, 5), (63, 9), (96, 8), (60, 5)]:
    add("maths", f"{a} sweets are shared fairly between {b} first-years. How many does each get?", a//b, nums(a//b, 1), "Divide.")
for a, b in [(246, 138), (319, 205), (457, 126), (178, 215), (364, 229), (508, 117)]:
    add("maths", f"What is {a} + {b}?", a+b, [a+b+10, a+b-10, a+b+100])
for a, b in [(500, 237), (642, 318), (900, 456), (715, 289), (830, 175), (403, 128)]:
    add("maths", f"What is {a} - {b}?", a-b, [a-b+10, a-b-10, a-b+100])
for n in [3, 4, 5, 6, 8]:
    add("maths", f"Hedwig delivers {n} letters every day. How many letters in 7 days?", n*7, nums(n*7), "Use the times table.")
for n, d, w in [(2, 4, "half"), (1, 4, "a quarter"), (3, 4, "three quarters")]:
    pass
add("maths", "What is half of 86?", 43, [42, 44, 53])
add("maths", "What is a quarter of 64?", 16, [32, 14, 18])
add("maths", "What is one tenth of 230?", 23, [2, 230, 203])
add("maths", "What is 3/4 of 20?", 15, [5, 12, 16])
add("maths", "Which fraction is bigger: 1/2 or 1/4?", "1/2", ["1/4", "They are the same", "1/8"])
add("maths", "Which fraction is the same as 2/4?", "1/2", ["1/4", "3/4", "2/3"])
add("maths", "What is 1/3 of 18?", 6, [3, 9, 5])
add("maths", "What is 100 more than 3,452?", "3,552", ["3,462", "4,452", "3,442"])
add("maths", "What is 10 less than 2,005?", "1,995", ["2,015", "1,905", "2,004"])
add("maths", "Round 746 to the nearest 10.", 750, [740, 700, 800])
add("maths", "Round 3,280 to the nearest 100.", "3,300", ["3,200", "3,000", "4,000"])
add("maths", "Which is the smallest: 405, 450 or 54?", 54, [405, 450, "They are equal"])
add("maths", "What is the value of the 6 in 4,682?", "600", ["6", "60", "6,000"])
add("maths", "What is 4 x 25?", 100, [90, 29, 110])
add("maths", "What is 9 x 11?", 99, [90, 109, 101])
add("maths", "What is 12 x 12?", 144, [124, 142, 122])
add("maths", "Which number is odd: 18, 24, 31, 40?", 31, [18, 24, 40])
add("maths", "How many sides does a hexagon have?", 6, [5, 7, 8])
add("maths", "How many sides does an octagon have?", 8, [6, 7, 10])
add("maths", "How many right angles does a rectangle have?", 4, [2, 3, 0])
add("maths", "How many faces does a cube have?", 6, [4, 8, 12])
add("maths", "A square has sides of 5 cm. What is its perimeter?", "20 cm", ["10 cm", "25 cm", "15 cm"])
add("maths", "A rectangle is 6 cm long and 3 cm wide. What is its perimeter?", "18 cm", ["9 cm", "12 cm", "24 cm"])
add("maths", "A rectangle is 4 cm by 3 cm. What is its area?", "12 square cm", ["7 square cm", "14 square cm", "10 square cm"])
add("maths", "The lesson starts at 9:15 and lasts 45 minutes. When does it end?", "10:00", ["9:45", "10:15", "9:60"])
add("maths", "How many minutes are there in 2 hours?", 120, [100, 60, 200])
add("maths", "How many days are there in two weeks?", 14, [10, 12, 16])
add("maths", "How many months have 30 days: April, May, June, July?", "April and June", ["May and July", "April and May", "June and July"])
add("maths", "Which is longer: 1 metre or 80 centimetres?", "1 metre", ["80 centimetres", "They are the same", "Neither"])
add("maths", "How many centimetres are in 3 metres?", 300, [30, 3000, 103])
add("maths", "How many grams are in 2 kilograms?", "2,000", ["200", "20", "20,000"])
add("maths", "How many millilitres are in 1 litre?", "1,000", ["100", "10", "10,000"])
add("maths", "A potion costs £2.50. How much for 2 potions?", "£5.00", ["£4.00", "£4.50", "£2.50"])
add("maths", "You pay £5 for a £3.20 wand polish. How much change?", "£1.80", ["£2.80", "£1.20", "£2.20"])
add("maths", "What comes next: 5, 10, 15, 20, ...?", 25, [30, 24, 22])
add("maths", "What comes next: 100, 90, 80, 70, ...?", 60, [50, 65, 75])
add("maths", "What comes next: 2, 4, 8, 16, ...?", 32, [24, 20, 18])
add("maths", "Which is the 4 times table: 4, 8, 12, 16 or 3, 6, 9, 12?", "4, 8, 12, 16", ["3, 6, 9, 12", "Both", "Neither"])
add("maths", "What is 7 x 6?", 42, [36, 48, 49])
add("maths", "What is 8 x 8?", 64, [56, 72, 88])
add("maths", "What is 9 x 7?", 63, [56, 72, 54])
add("maths", "What is 11 x 5?", 55, [45, 65, 50])
add("maths", "What is 90 divided by 10?", 9, [10, 99, 8])
add("maths", "What is 81 divided by 9?", 9, [8, 7, 10])
add("maths", "A tally chart shows 3 groups of five and 2 more. What is the total?", 17, [15, 12, 20])
add("maths", "5 witches each have 3 cats. How many cats in all?", 15, [8, 12, 18])
add("maths", "There are 40 dragons. 13 fly away. How many are left?", 27, [37, 33, 53])
add("maths", "A broom costs £70. It is on sale for £15 off. What is the new price?", "£55", ["£85", "£65", "£45"])
add("maths", "What is 1,000 - 1?", 999, [900, 1001, 99])
add("maths", "What is 25 + 25 + 25 + 25?", 100, [75, 50, 125])
add("maths", "What is double 35?", 70, [65, 75, 53])
add("maths", "What is half of 100?", 50, [25, 5, 20])
add("maths", "Which number has the digits 3, 0, 7 in the hundreds, tens, ones places: 307, 370 or 703?", 307, [370, 703, 37])
add("maths", "Write in digits: four hundred and six.", 406, [46, 460, 4006])
add("maths", "What is the missing number? 14 + ? = 31", 17, [15, 27, 45])
add("maths", "What is the missing number? ? x 5 = 35", 7, [6, 8, 30])
add("maths", "How many corners does a triangle have?", 3, [2, 4, 5])
add("maths", "Which shape has 4 equal sides and 4 right angles?", "Square", ["Triangle", "Circle", "Pentagon"])
add("maths", "A clock shows quarter past 3. What time is it?", "3:15", ["3:45", "4:15", "2:45"])
add("maths", "A clock shows half past 7. What time is it?", "7:30", ["6:30", "7:15", "8:30"])
add("maths", "How many degrees is a right angle?", 90, [45, 180, 60])
add("maths", "A pictogram: each 🦉 means 2 owls. There are 6 🦉. How many owls?", 12, [6, 8, 14])

# --- SCIENCE ---
S = [
("Which part of a plant takes in water from the soil?","Roots",["Leaves","Flower","Stem"]),
("What do plants need to make their food?","Sunlight",["Darkness","Sugar","Salt"]),
("Which gas do plants take in from the air?","Carbon dioxide",["Oxygen","Helium","Smoke"]),
("What is the job of the stem?","Carries water up the plant",["Makes seeds","Holds the soil","Makes noise"]),
("What do we call an animal that eats only plants?","Herbivore",["Carnivore","Omnivore","Predator"]),
("What do we call an animal that eats only meat?","Carnivore",["Herbivore","Omnivore","Producer"]),
("Which of these is a mammal?","Bat",["Owl","Frog","Salmon"]),
("Which of these is a bird?","Owl",["Bat","Frog","Lizard"]),
("What is the hard part inside our bodies that holds us up?","Skeleton",["Muscle","Skin","Blood"]),
("How many bones does a child have roughly?","About 200",["About 20","About 2","About 2,000"]),
("Which organ pumps blood around the body?","Heart",["Lungs","Stomach","Brain"]),
("Which organ do we use to breathe?","Lungs",["Heart","Liver","Kidney"]),
("What do teeth do?","Bite and chew food",["Pump blood","Smell","Hear"]),
("Which is a force?","A push",["A colour","A smell","A song"]),
("What force pulls things towards the Earth?","Gravity",["Magnetism","Friction","Sound"]),
("Which material is magnetic?","Iron",["Wood","Plastic","Glass"]),
("What is it called when water turns to a gas?","Evaporation",["Freezing","Melting","Condensing"]),
("What is it called when ice turns to water?","Melting",["Freezing","Boiling","Evaporating"]),
("At what temperature does water freeze?","0 degrees Celsius",["10 degrees Celsius","100 degrees Celsius","-50 degrees Celsius"]),
("Which is a source of light?","The Sun",["The Moon","A mirror","A book"]),
("What do we need to see things?","Light",["Sound","Heat","Wind"]),
("What makes a shadow?","Something blocks light",["Something makes light","Wind","Heat"]),
("What is made when something vibrates?","Sound",["Light","Heat","Magnets"]),
("Which planet do we live on?","Earth",["Mars","Venus","Jupiter"]),
("What does the Earth orbit?","The Sun",["The Moon","Mars","The Stars"]),
("What does the Moon orbit?","The Earth",["The Sun","Jupiter","Venus"]),
("What is it called when rock is broken down into small pieces and carried away?","Erosion",["Evaporation","Gravity","Fossil"]),
("What are the remains of an animal that lived long ago, found in rock?","A fossil",["A crystal","A seed","A mineral"]),
("Which is a solid?","A brick",["Water","Steam","Air"]),
("Which is a liquid?","Milk",["Ice","Wood","Smoke"]),
("A circuit needs a battery, wires and what else to make a bulb light?","A bulb",["A magnet","A spoon","A stone"]),
("Which material is a good electrical conductor?","Copper",["Rubber","Wood","Plastic"]),
("Which season do leaves usually fall?","Autumn",["Spring","Summer","Winter"]),
("What do bees help flowers to do?","Make seeds (pollination)",["Grow roots","Change colour","Stay closed"]),
("What do we call the animals that hunt others?","Predators",["Prey","Producers","Plants"]),
]
for q,a,w in S: add("science", q, a, w)

# --- ENGLISH ---
E = [
("Which word is a noun?","Castle",["Quickly","Jump","Brave"]),
("Which word is a verb?","Run",["Table","Happy","Under"]),
("Which word is an adjective? 'The old wizard smiled.'","old",["wizard","smiled","The"]),
("Which word is an adverb? 'The owl flew silently.'","silently",["owl","flew","The"]),
("Which is the correct spelling?","Because",["Becuase","Becase","Becos"]),
("Which is the correct spelling?","Necessary",["Neccessary","Necesary","Necessery"]),
("Which is the correct spelling?","Library",["Libary","Liberry","Librery"]),
("Which is the correct spelling?","Believe",["Beleive","Belive","Beleeve"]),
("Which sentence is punctuated correctly?","The wand was lost.",["the wand was lost","The wand was lost","the wand was lost."]),
("Which punctuation mark ends a question?","?",[".","!",","]),
("Which punctuation mark shows excitement?","!",["?",",","'"]),
("What does a comma do in a list?","Separates the items",["Ends the sentence","Starts a question","Shows a quote"]),
("Which word is a synonym (same meaning) for 'big'?","Huge",["Tiny","Thin","Soft"]),
("Which word is an antonym (opposite) of 'hot'?","Cold",["Warm","Boiling","Sunny"]),
("Which is the plural of 'mouse'?","Mice",["Mouses","Mices","Mouse's"]),
("Which is the plural of 'child'?","Children",["Childs","Childes","Childrens"]),
("Which is the plural of 'witch'?","Witches",["Witchs","Witchies","Witch's"]),
("Which word has a prefix?","Unhappy",["Happy","Hopeful","Slowly"]),
("What does the prefix 'un-' usually mean?","Not",["Again","Before","Many"]),
("What does the prefix 're-' usually mean?","Again",["Not","Under","Half"]),
("Which word has a suffix?","Careful",["Care","Cat","Carry"]),
("Which is a contraction of 'do not'?","Don't",["Do'nt","Dont","Do'not"]),
("Which is a contraction of 'it is'?","It's",["Its'","Its","I'ts"]),
("Which sentence uses 'their' correctly?","The students lost their wands.",["Their going to class.","Put it over their.","Their is a dragon."]),
("Which word is a pronoun?","She",["Table","Quick","Jump"]),
("Which sentence is in the past tense?","The dragon flew away.",["The dragon flies away.","The dragon will fly away.","The dragon is flying away."]),
("Which sentence is in the future tense?","I will cast a spell.",["I cast a spell.","I cast a spell yesterday.","I have cast a spell."]),
("What is a story's first part called?","The beginning",["The blurb","The index","The glossary"]),
("What do we call a book that tells true facts?","Non-fiction",["Fiction","Poetry","Fantasy"]),
("Which word means the same as 'happy'?","Cheerful",["Gloomy","Angry","Sleepy"]),
("What is a word that sounds like a noise, such as 'buzz'?","Onomatopoeia",["Alliteration","Simile","Metaphor"]),
("Which is alliteration?","Silly snakes slither slowly",["The sun is hot","A big blue sky","Run to school"]),
("Which is a simile?","As brave as a lion",["The lion is brave","A lion roared","Lions live in Africa"]),
("Which sentence has a capital letter in the right place?","Harry lives in London.",["harry lives in London.","Harry lives in london.","harry lives in london."]),
("Which word is spelt correctly?","Friend",["Freind","Frend","Firend"]),
]
for q,a,w in E: add("english", q, a, w)

# --- PHONICS ---
P = [
("Which word has the 'ai' sound as in 'rain'?","Train",["Tin","Trap","Trim"]),
("Which word rhymes with 'night'?","Light",["Lit","Late","Lot"]),
("Which word has the 'oa' sound as in 'boat'?","Coat",["Cot","Cat","Cut"]),
("Which word has the 'ee' sound as in 'feet'?","Sleep",["Slap","Slip","Slop"]),
("Which letters make the 'sh' sound at the start of 'ship'?","s and h together",["c and h","t and h","w and h"]),
("Which word starts with the 'ch' sound?","Chair",["Share","Table","Thick"]),
("Which word starts with the 'th' sound?","Thumb",["Chum","Sum","Tum"]),
("How many sounds (phonemes) are in 'cat'?","3",["2","4","1"]),
("How many syllables are in 'wizard'?","2",["1","3","4"]),
("How many syllables are in 'dragon'?","2",["1","3","4"]),
("How many syllables are in 'broomstick'?","2",["1","3","4"]),
("How many syllables are in 'potion'?","2",["1","3","4"]),
("Which word has the 'igh' sound?","High",["Hip","Hop","Hum"]),
("Which word has the 'ow' sound as in 'cow'?","Town",["Tin","Ten","Ton"]),
("Which word has the 'ar' sound as in 'car'?","Star",["Stir","Stun","Stop"]),
("Which word has the 'or' sound as in 'fork'?","Horse",["Hose","Hurt","Hat"]),
("Which word has the 'oo' sound as in 'moon'?","Spoon",["Spin","Span","Spun"]),
("Which word has the 'ur' sound as in 'burn'?","Turn",["Torn","Tarn","Tern"]),
("Which word has the 'air' sound as in 'hair'?","Chair",["Chin","Chip","Chop"]),
("Which word has the 'ear' sound as in 'near'?","Deer",["Dare","Door","Dire"]),
("Which letter is silent in 'knight'?","k",["n","i","t"]),
("Which letter is silent in 'wrist'?","w",["r","i","t"]),
("Which letter is silent in 'lamb'?","b",["l","a","m"]),
("The 'ph' in 'phone' makes which sound?","f",["p","h","s"]),
("The 'c' in 'city' makes which sound?","s",["k","ch","z"]),
("The 'g' in 'giant' makes which sound?","j",["g","h","k"]),
("Which word is spelt with 'tion' (the 'shun' ending)?","Potion",["Potshun","Potchun","Potsion"]),
("Which word has the 'a-e' split vowel as in 'cake'?","Wave",["Wag","Wad","Wax"]),
("Which word has the 'i-e' sound as in 'kite'?","Bike",["Bit","Bin","Big"]),
("Which word has the 'o-e' sound as in 'bone'?","Rope",["Rot","Rob","Rod"]),
("Which word has the 'u-e' sound as in 'cube'?","Tune",["Tub","Tug","Tun"]),
("Which word has the 'ou' sound as in 'cloud'?","Mouse",["Mess","Miss","Moss"]),
("Which word has the 'oi' sound as in 'coin'?","Boil",["Bell","Bull","Ball"]),
("Which word ends with the 'ng' sound?","Ring",["Rin","Rid","Rim"]),
("Which word has a double 'l' ending?","Spell",["Spel","Spelt","Speld"]),
]
for q,a,w in P: add("phonics", q, a, w)

# --- HISTORY ---
H = [
("Which people built Hadrian's Wall in Britain?","The Romans",["The Vikings","The Tudors","The Victorians"]),
("Which people invaded Britain in 1066?","The Normans",["The Romans","The Greeks","The Aztecs"]),
("Who won the Battle of Hastings in 1066?","William the Conqueror",["King Harold","Julius Caesar","King Arthur"]),
("Who was the queen who sent ships against the Spanish Armada?","Queen Elizabeth I",["Queen Victoria","Queen Anne","Queen Mary II"]),
("Which king had six wives?","Henry VIII",["Henry V","Richard III","King John"]),
("In which year did the Great Fire of London start?","1666",["1066","1966","1766"]),
("Who wrote a diary about the Great Fire of London?","Samuel Pepys",["Anne Frank","Charles Dickens","William Shakespeare"]),
("Where did the Great Fire of London start?","A bakery in Pudding Lane",["A castle","A church","A school"]),
("Who was the queen of Britain for 63 years in the 1800s?","Queen Victoria",["Queen Anne","Queen Elizabeth I","Queen Mary"]),
("Which period were the Tudors in Britain?","1485 to 1603",["55 BC to 400","1837 to 1901","1939 to 1945"]),
("Which people sailed in longships and raided Britain?","The Vikings",["The Romans","The Tudors","The Greeks"]),
("What was the name of the Roman leader who invaded Britain in 55 BC?","Julius Caesar",["King Alfred","Henry II","Boudicca"]),
("Which Iceni queen fought against the Romans?","Boudicca",["Cleopatra","Elizabeth I","Victoria"]),
("What did Stone Age people use to make tools?","Stone and flint",["Plastic","Steel","Glass"]),
("What is the name of the famous stone circle in Wiltshire?","Stonehenge",["Windsor","Big Ben","Hadrian"]),
("Which ancient people built the pyramids?","The Egyptians",["The Romans","The Vikings","The Tudors"]),
("What were the Ancient Egyptians' picture-writing called?","Hieroglyphics",["Alphabet","Cuneiform","Braille"]),
("Which ancient country held the first Olympic Games?","Greece",["Italy","Egypt","China"]),
("Who was King of England during the Magna Carta in 1215?","King John",["Henry VIII","Alfred the Great","Charles I"]),
("Which railway engineer built the Great Western Railway?","Isambard Kingdom Brunel",["Henry VIII","Samuel Pepys","Florence Nightingale"]),
("Which nurse helped soldiers in the Crimean War?","Florence Nightingale",["Queen Victoria","Anne Boleyn","Julius Caesar"]),
("In the Victorian times, many children worked in which places?","Factories and mines",["Zoos","Theme parks","Cinemas"]),
("What was the name of the first steam train engine to run for the public in 1825?","Locomotion No. 1",["Hogwarts Express","Flying Scotsman","Mallard"]),
("Which year did World War Two start?","1939",["1914","1966","1945"]),
("What name was given to children sent out of cities during World War Two?","Evacuees",["Pilgrims","Invaders","Sailors"]),
("Who was Britain's Prime Minister in World War Two?","Winston Churchill",["Henry VIII","Margaret Thatcher","Tony Blair"]),
("Which Roman building was used for gladiator fights?","The Colosseum",["Stonehenge","The Pantheon","Big Ben"]),
("What is a castle's moat?","A ditch filled with water",["A tall tower","A drawbridge","A cannon"]),
("Which Anglo-Saxon king burned the cakes in the story?","King Alfred",["King Henry","King John","King Canute"]),
("Which clock tower is part of the Houses of Parliament in London?","Big Ben",["Tower Bridge","Stonehenge","Windsor"]),
("What was the name of the ship that carried the Pilgrims to America in 1620?","The Mayflower",["The Titanic","The Golden Hind","The Victory"]),
("Which Queen's reign is called the Victorian era?","Queen Victoria",["Queen Anne","Elizabeth II","Mary I"]),
]
for q,a,w in H: add("history", q, a, w)

# fix a few items where the 'wrong' list shortened
for x in Q:
    x["o"] = list(dict.fromkeys(x["o"]))
Q = [x for x in Q if len(x["o"]) == 4 and x["a"] in x["o"]]
json.dump(Q, open("questions.json", "w"), ensure_ascii=False, indent=0)
open("questions.js", "w").write("window.QUESTIONS=" + json.dumps(Q, ensure_ascii=False) + ";")
from collections import Counter; print(len(Q), Counter(x["s"] for x in Q))
