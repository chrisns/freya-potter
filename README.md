# The Wizard's Challenge

A browser game designed by Freya, age 7. It is about saving Harry Potter and his friends from He Who Must Not Be Named.

Play it here: https://chrisns.github.io/freya-potter/

## How to play

1. Make your own wizard, or pick a character from the books.
2. The Sorting Hat puts you in a house.
3. Choose a pet. More pets unlock as you reach higher levels.
4. Work through 20 levels. Each level is a place at Hogwarts, or near it, where an attack happens.
5. On each level, pick a subject, pick any spell, and answer one question.
6. A right answer casts your spell and drives him back. A wrong answer sends you back to level 1.
7. Finish level 20 to get a certificate with your name. You can print it or save it as a picture.

Level 1 is always maths. Later levels let you pick maths, science, English, phonics or history.
Questions follow the UK Key Stage 2 syllabus and suit a child of 7 to 8.
There are about 230 questions. The game picks them at random.

## Pets

Each pet gives you one helper power per run. You get extra uses at levels 6, 11 and 16.

- Fifty-fifty removes two wrong answers.
- Swap gives you a new question.
- The phoenix brings you back once if you get a question wrong.

## Spells

There are 14 spells. Each has its own effect, for example fire, water, ice, a Patronus, a shield and confetti.

## Build notes

There is no build step. The game is plain HTML, CSS and JavaScript.

- `tools/make_questions.py` writes `questions.js` from the question bank.
- `tools/gen_images.py` makes the pictures with AtlasCloud (`bytedance/seedream-v4.7`).
- `tools/gen_audio.py` makes the music (`minimax/music-3.0`) and sound effects (`bytedance/seed-audio-1.0`).
- Both tools read `ATLASCLOUD_API_KEY` from a `.env` file that git ignores.

This is a fan-made game for a child. It is not affiliated with the Harry Potter books or films.
