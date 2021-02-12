## Implementation

I focused on building the UI first, so I could be productive while considering the functionality I needed to build. I prefer Sass to CSS but in the interest of time, I used what was already available. I also would have liked to use the latest with React Hooks but it's not my standard yet, and I wanted to work quickly.

I used a color palette from [Canva - Summer Splash](https://www.canva.com/colors/color-palettes/summer-splash/).

My immediate concerns were to track the song currently selected, and to play or pause it. The next goal was to move forward and backward on the song list. And then to account for shuffling.

I kept my logic and state on the `<PlayerContainer />` component, and passed props down to the `<Player />` and `<SongList />` components. This project was not complicated enough to require Redux or MobX for a store.

I decided to use the HTML Audio element instead of a third party library because I didn't need more than `play` and `pause`.

** Testing **

I added a test on the `App_test.js` file. Frankly, while I'm very intersted in frontend testing, I do not have the experience I'd like with it. I know I could learn it quickly, and it is one of my short-term goals.

** TO DOs **

I made note of the outstanding TODOS in comments on the `<PlayerContainer />`.

- Pausing is not picking back up at the paused time. Instead, the song starts over.

- The shuffled songs need to be monitored so they don't repeat until they've all played through.

- The previous song on shuffle needs to be tracked.

- The amount of `<div>`s is not okay for accessibility. I could have more semantic HTML.


I spent roughly 4 hours of this, including writing this README. I look forward to discussing the project with you!

Thank you,
Rachel Bird

